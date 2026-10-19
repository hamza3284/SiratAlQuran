<?php

namespace Tests\Feature;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class LegacyContentMigrationTest extends TestCase
{
    public function test_legacy_theme_and_explanation_are_copied_before_columns_are_removed(): void
    {
        Schema::create('themes', fn (Blueprint $table) => $table->id());
        Schema::create('ayats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('theme_id')->constrained();
            $table->integer('surah_number');
            $table->integer('ayah_number');
            $table->text('arabic_text');
            $table->text('translation_text');
            $table->text('short_explanation');
        });
        DB::table('themes')->insert(['id' => 7]);
        DB::table('ayats')->insert([
            'id' => 42, 'theme_id' => 7, 'surah_number' => 1, 'ayah_number' => 1,
            'arabic_text' => 'fixture', 'translation_text' => 'fixture',
            'short_explanation' => 'existing explanation fixture',
        ]);

        $migration = require database_path('migrations/2026_02_04_130000_update_ayats_and_create_pivot_table.php');
        $migration->up();
        $this->assertDatabaseHas('ayat_theme', [
            'ayat_id' => 42, 'theme_id' => 7, 'explanation' => 'existing explanation fixture',
        ]);
        $this->assertDatabaseHas('ayats', ['id' => 42, 'surah' => 1, 'ayah' => 1]);
        $this->assertFalse(Schema::hasColumn('ayats', 'theme_id'));

        $next = require database_path('migrations/2026_02_04_152454_add_explanation_to_ayat_theme_table.php');
        $next->up();
        $this->assertDatabaseHas('ayat_theme', ['explanation' => 'existing explanation fixture']);
    }
}

