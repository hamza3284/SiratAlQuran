<?php

namespace App\Services;

use App\Models\Theme;

class ThemeClassifier
{
    protected array $keywords = [
        'Anxiety / Fear' => [
            'anxious', 'fear', 'scared', 'worry', 'panic', 'afraid', 'stress'
        ],

        'Patience in Hardship' => [
            'hardship', 'pain', 'suffering', 'tired', 'exhausted', 'trial'
        ],

        'Repentance' => [
            'sin', 'sinned', 'guilt', 'forgive me', 'repent', 'ashamed'
        ],

        'Gratitude' => [
            'thankful', 'grateful', 'blessing', 'appreciate'
        ],

        'Trust in Allah' => [
            'trust', 'tawakkul', 'rely', 'leave it to allah'
        ],

        'Loss / Grief' => [
            'loss', 'death', 'passed away', 'grief', 'miss'
        ],

        'Guidance / Confusion' => [
            'confused', 'lost', 'direction', 'decision', 'guide me'
        ],

        'Rizq / Provision' => [
            'money', 'job', 'rizq', 'income', 'provision', 'salary'
        ],

        'Family Relations' => [
            'parents', 'mother', 'father', 'husband', 'wife', 'family'
        ],

        'Forgiveness' => [
            'forgive', 'forgiveness', 'resentment', 'anger'
        ],

        'Hypocrisy / Sincerity' => [
            'hypocrite', 'show off', 'riya', 'fake'
        ],

        'Hope' => [
            'hope', 'future', 'better', 'give up', 'despair'
        ],
    ];

    public function classify(string $input): array
    {
        $input = strtolower($input);
        $scores = [];

        foreach ($this->keywords as $theme => $words) {
            $scores[$theme] = 0;

            foreach ($words as $word) {
                if (str_contains($input, $word)) {
                    $scores[$theme]++;
                }
            }
        }

        arsort($scores);

        $matchedThemes = array_keys(
            array_filter($scores, fn ($score) => $score > 0)
        );

        // If no matches found, default to 'Hope'
        if (empty($matchedThemes)) {
            $matchedThemes = ['Hope'];
        }

        return Theme::whereIn('name', array_slice($matchedThemes, 0, 2))
            ->with('ayats') // Eager load ayats
            ->get()
            ->values()
            ->toArray();
    }
}
