<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ThemeClassifier;
use App\Services\VerseText;
use App\Models\Ayat;

class GuidanceController extends Controller
{
    public function getGuidance(Request $request, ThemeClassifier $classifier, VerseText $verseText)
    {
        $validated = $request->validate([
            'text' => 'required|string|min:3|max:2000',
        ]);

        $themes = collect($classifier->classify($validated['text']));

        if ($themes->isEmpty()) {
            return response()->json([
                'message' => 'No matching theme found. Please choose a theme or describe your situation differently.',
            ], 422);
        }

        $primaryTheme = $themes->first();

        $ayats = Ayat::whereHas('themes', function ($query) use ($primaryTheme) {
                $query->where('themes.id', $primaryTheme['id']);
            })
            ->orderBy('surah')
            ->orderBy('ayat')
            ->orderBy('id')
            ->limit(5)
            ->get();

        if ($ayats->isEmpty()) {
            return response()->json([
                'message' => 'No stored verses are available for the matched theme.',
            ], 422);
        }

        $ayats->each(function (Ayat $ayat) use ($verseText) {
            $text = $verseText->forReference($ayat->surah, $ayat->ayat);
            if ($text !== null) {
                $ayat->text_ar = $text['text_ar'];
                $ayat->text_en = $text['text_en'];
            }
        });

        return response()->json([
            'themes' => $themes,
            'primary_ayat' => $ayats->first(),
            'supporting_ayats' => $ayats->skip(1)->values(),
        ]);
    }
}

