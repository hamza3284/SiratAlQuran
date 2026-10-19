<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Throwable;

class VerseText
{
    public function forReference(int $surah, int $ayat): ?array
    {
        if ($surah < 1 || $surah > 114 || $ayat < 1 || $ayat > 286) {
            return null;
        }

        $reference = "{$surah}:{$ayat}";
        $key = "verse-text:v1:{$reference}";

        try {
            $result = Cache::remember($key, now()->addDays(7), function () use ($reference, $surah, $ayat) {
                // One paired-edition request avoids two serial requests and mixed editions.
                $response = Http::connectTimeout(2)->timeout(3)
                    ->get("https://api.alquran.cloud/v1/ayah/{$reference}/editions/quran-uthmani,en.sahih")
                    ->throw();

                $editions = collect($response->json('data', []))->keyBy('edition.identifier');
                $arabic = $editions->get('quran-uthmani');
                $english = $editions->get('en.sahih');

                foreach ([$arabic, $english] as $edition) {
                    if (!is_array($edition)
                        || (int) data_get($edition, 'surah.number') !== $surah
                        || (int) data_get($edition, 'numberInSurah') !== $ayat
                        || !is_string($edition['text'] ?? null)
                        || trim($edition['text']) === '') {
                        throw new \UnexpectedValueException('Upstream verse reference or edition is invalid.');
                    }
                }

                return [
                    'text_ar' => $arabic['text'],
                    'text_en' => $english['text'],
                ];
            });

            return isset($result['text_ar'], $result['text_en']) ? $result : null;
        } catch (Throwable $error) {
            // Briefly back off failures; keep the existing stored text as the fallback.
            // Do not log upstream bodies or a user's situation.
            try {
                Cache::put($key, ['unavailable' => true], now()->addMinute());
            } catch (Throwable $cacheError) {
                // A cache outage must not stop local verse display.
            }

            return null;
        }
    }
}

