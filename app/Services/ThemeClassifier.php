<?php

namespace App\Services;

use App\Models\Theme;

class ThemeClassifier
{
    protected array $keywords = [
        'Anxiety / Fear' => [
            'anxiety', 'anxious', 'fear', 'scared', 'worry', 'panic', 'afraid', 'stress'
        ],

        'Patience in Hardship' => [
            'patience', 'hardship', 'pain', 'suffering', 'tired', 'exhausted', 'trial'
        ],

        'Repentance' => [
            'sin', 'sinned', 'guilt', 'forgive me', 'repent', 'ashamed'
        ],

        'Gratitude' => [
            'gratitude', 'thankful', 'grateful', 'blessing', 'appreciate'
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
                if (preg_match('/(?<![\\p{L}\\p{N}])' . preg_quote($word, '/') . '(?![\\p{L}\\p{N}])/iu', $input) === 1) {
                    $scores[$theme]++;
                }
            }
        }

        arsort($scores);

        $matchedThemes = array_keys(
            array_filter($scores, fn ($score) => $score > 0)
        );

        if (empty($matchedThemes)) {
            return [];
        }

        $matchedThemes = array_slice($matchedThemes, 0, 2);
        $themes = Theme::whereIn('name', $matchedThemes)
            ->with('ayats')
            ->get()
            ->keyBy('name');

        // WHERE IN does not preserve classifier relevance order.
        return collect($matchedThemes)
            ->map(fn ($name) => $themes->get($name))
            ->filter()
            ->values()
            ->toArray();
    }
}

