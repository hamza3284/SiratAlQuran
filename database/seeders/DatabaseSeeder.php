<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (app()->environment('production')) {
            throw new \RuntimeException('Demo database seeding is disabled in production.');
        }

        foreach (['users', 'themes', 'ayats', 'journal_entries'] as $table) {
            if (\Illuminate\Support\Facades\DB::table($table)->exists()) {
                throw new \RuntimeException('Demo database seeding requires an empty database.');
            }
        }

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            UserSeeder::class,
            ThemeSeeder::class,
            AyatSeeder::class,
        ]);
    }
}

