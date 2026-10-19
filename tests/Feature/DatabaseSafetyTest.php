<?php

namespace Tests\Feature;

use App\Models\Ayat;
use Database\Seeders\AyatSeeder;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use RuntimeException;
use Tests\TestCase;

class DatabaseSafetyTest extends TestCase
{
    use RefreshDatabase;

    public function test_fresh_migrations_keep_the_canonical_journal_column(): void
    {
        $this->assertTrue(Schema::hasColumn('journal_entries', 'ayat_id'));
        $this->assertFalse(Schema::hasColumn('journal_entries', 'ayah_id'));
        $migration = require database_path('migrations/2026_02_05_171838_rename_ayah_id_to_ayat_id_in_journal_entries_table.php');
        $migration->up(); // Normalization must also be safe to repeat.
        $migration->down();
        $this->assertTrue(Schema::hasColumn('journal_entries', 'ayat_id'));
    }

    public function test_demo_seeder_does_not_erase_existing_verses(): void
    {
        $ayat = Ayat::create(['surah' => 1, 'ayat' => 1, 'text_ar' => 'fixture', 'text_en' => 'fixture']);
        try {
            app(AyatSeeder::class)->run();
            $this->fail('Seeder should reject populated tables.');
        } catch (RuntimeException $error) {
            $this->assertStringContainsString('empty', $error->getMessage());
        }
        $this->assertDatabaseHas('ayats', ['id' => $ayat->id, 'text_ar' => 'fixture']);
    }

    public function test_demo_database_seeder_is_blocked_in_production(): void
    {
        app()->detectEnvironment(fn () => 'production');
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('disabled in production');
        app(DatabaseSeeder::class)->run();
    }
}

