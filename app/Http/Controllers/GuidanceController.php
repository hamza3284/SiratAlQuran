<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ThemeClassifier;
use App\Models\Ayat;
use Illuminate\Support\Facades\Http;

class GuidanceController extends Controller
{
    public function getGuidance(Request $request, ThemeClassifier $classifier)
    {
        $request->validate([
            'text' => 'required|string|min:5',
        ]);

        $themes = collect($classifier->classify($request->text));

        if ($themes->isEmpty()) {
            return response()->json([
                'message' => 'No matching theme found'
            ], 422);
        }

        $primaryTheme = $themes->first();

        $ayats = Ayat::whereHas('themes', function ($query) use ($primaryTheme) {
                $query->where('themes.id', $primaryTheme['id']);
            })
            ->inRandomOrder()
            ->limit(5)
            ->get();

        $ayats = $ayats->map(function (Ayat $ayat) {
            $key = $ayat->surah . ':' . $ayat->ayat;

            try {
                $ar = Http::timeout(10)->get("https://api.alquran.cloud/v1/ayah/{$key}/quran-uthmani");
                $en = Http::timeout(10)->get("https://api.alquran.cloud/v1/ayah/{$key}/en.sahih");

                if ($ar->ok()) {
                    $arText = data_get($ar->json(), 'data.text');
                    if ($arText) {
                        $ayat->text_ar = $arText;
                    }
                }

                if ($en->ok()) {
                    $enText = data_get($en->json(), 'data.text');
                    if ($enText) {
                        $ayat->text_en = $enText;
                    }
                }
            } catch (\Throwable $e) {
            }

            return $ayat;
        });

        return response()->json([
            'themes' => $themes,
            'primary_ayat' => $ayats->first(),
            'supporting_ayats' => $ayats->skip(1)->values(),
        ]);
    }
}
