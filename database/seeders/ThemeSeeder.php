<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Theme;

class ThemeSeeder extends Seeder
{
    public function run()
    {
        $themes = [
            'Anxiety / Fear',
            'Patience in Hardship',
            'Repentance',
            'Gratitude',
            'Trust in Allah',
            'Loss / Grief',
            'Guidance / Confusion',
            'Rizq / Provision',
            'Family Relations',
            'Forgiveness',
            'Hypocrisy / Sincerity',
            'Hope',
        ];


        foreach ($themes as $name) {
            Theme::create([
                'name' => $name,
                'slug' => str()->slug($name),
            ]);
        }
    }
}