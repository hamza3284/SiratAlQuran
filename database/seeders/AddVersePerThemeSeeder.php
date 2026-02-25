<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Theme;
use App\Models\Ayat;
use Illuminate\Support\Facades\Http;

class AddVersePerThemeSeeder extends Seeder
{
    public function run()
    {
        $themes = Theme::all();

        foreach ($themes as $theme) {
            // Check if theme already has ayats to avoid duplicates if that's preferred, 
            // but user asked to insert 1 new verse per theme.
            
            // Search for a verse related to the theme name
            $response = Http::get("https://api.quran.com/api/v4/search", [
                'q' => $theme->name,
                'size' => 1,
                'language' => 'en'
            ]);

            if ($response->ok()) {
                $results = $response->json()['search']['results'] ?? [];
                if (!empty($results)) {
                    $result = $results[0];
                    $verseKey = $result['verse_key'];
                    [$surah, $ayah] = explode(':', $verseKey);

                    // Create the Ayat
                    $ayat = Ayat::firstOrCreate(
                        ['surah' => (int)$surah, 'ayat' => (int)$ayah],
                        [
                            'text_ar' => strip_tags($result['text']),
                            'text_en' => strip_tags($result['translations'][0]['text'] ?? 'Translation not available'),
                        ]
                    );

                    // Link to the theme if not already linked
                    if (!$ayat->themes()->where('theme_id', $theme->id)->exists()) {
                        $ayat->themes()->attach($theme->id, [
                            'explanation' => "Automatically added verse for topic: " . $theme->name
                        ]);
                        $this->command->info("Added verse {$verseKey} to theme: {$theme->name}");
                    } else {
                        $this->command->warn("Verse {$verseKey} already linked to theme: {$theme->name}");
                    }
                } else {
                    $this->command->error("No verses found for theme: {$theme->name}");
                }
            } else {
                $this->command->error("Failed to fetch from API for theme: {$theme->name}");
            }
            
            // Small sleep to be nice to the API
            usleep(200000); 
        }
    }
}
