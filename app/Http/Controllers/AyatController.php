<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use App\Models\Ayat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AyatController extends Controller
{
    public function byTheme($slug)
    {
        return Theme::where('slug', $slug)
            ->with('ayats')
            ->firstOrFail();
    }

    public function searchExternal(Request $request, $slug)
    {
        $theme = Theme::where('slug', $slug)->firstOrFail();
        $query = $theme->name;
        $page = $request->get('page', 1);

        // Search using api.quran.com v4
        // Documentation: https://quran.api-docs.io/v4/search/search
        $response = Http::get("https://api.quran.com/api/v4/search", [
            'q' => $query,
            'size' => 10,
            'page' => $page,
            'language' => 'en'
        ]);

        if (!$response->ok()) {
            return response()->json(['message' => 'External API error'], 502);
        }

        $results = $response->json()['search']['results'] ?? [];
        
        $formattedAyats = array_map(function ($result) {
            // The search API returns verse_key like "2:255"
            $verseKey = $result['verse_key'];
            [$surah, $ayah] = explode(':', $verseKey);

            return [
                'id' => 'ext-' . $verseKey, // Prefix to distinguish from DB IDs
                'surah' => (int)$surah,
                'ayat' => (int)$ayah,
                'text_ar' => strip_tags($result['text']), // Strip HTML tags like <em>
                'text_en' => strip_tags($result['translations'][0]['text'] ?? 'Translation not available'),
                'is_external' => true
            ];
        }, $results);

        return response()->json([
            'ayats' => $formattedAyats,
            'current_page' => $page,
            'total_pages' => $response->json()['search']['total_pages'] ?? 1
        ]);
    }

    public function show($id)
    {
        $ayat = Ayat::with('themes')->findOrFail($id);

        if (auth('sanctum')->check()) {
            $reflection = $ayat->journalEntries()
                ->where('user_id', auth('sanctum')->id())
                ->first();
            
            $ayat->user_reflection = $reflection ? $reflection->reflection_text : null;
        }

        return $ayat;
    }
}
