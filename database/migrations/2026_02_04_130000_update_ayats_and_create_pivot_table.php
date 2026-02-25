<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update ayats table
        Schema::table('ayats', function (Blueprint $table) {
            if (Schema::hasColumn('ayats', 'surah_number')) {
                $table->renameColumn('surah_number', 'surah');
            }
            if (Schema::hasColumn('ayats', 'ayah_number')) {
                $table->renameColumn('ayah_number', 'ayah');
            }
            if (Schema::hasColumn('ayats', 'arabic_text')) {
                $table->renameColumn('arabic_text', 'text_ar');
            }
            if (Schema::hasColumn('ayats', 'translation_text')) {
                $table->renameColumn('translation_text', 'text_en');
            }
            if (Schema::hasColumn('ayats', 'theme_id')) {
                $table->dropForeign(['theme_id']);
                $table->dropColumn('theme_id');
            }
            if (Schema::hasColumn('ayats', 'short_explanation')) {
                $table->dropColumn('short_explanation');
            }
        });

        // Create pivot table
        if (!Schema::hasTable('ayat_theme')) {
            Schema::create('ayat_theme', function (Blueprint $table) {
                $table->id();
                $table->foreignId('ayat_id')->constrained()->cascadeOnDelete();
                $table->foreignId('theme_id')->constrained()->cascadeOnDelete();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ayat_theme');

        Schema::table('ayats', function (Blueprint $table) {
            if (!Schema::hasColumn('ayats', 'theme_id')) {
                $table->foreignId('theme_id')->nullable()->constrained()->nullOnDelete();
            }
            if (!Schema::hasColumn('ayats', 'short_explanation')) {
                $table->text('short_explanation')->nullable();
            }
            if (Schema::hasColumn('ayats', 'surah')) {
                $table->renameColumn('surah', 'surah_number');
            }
            if (Schema::hasColumn('ayats', 'ayah')) {
                $table->renameColumn('ayah', 'ayah_number');
            }
            if (Schema::hasColumn('ayats', 'text_ar')) {
                $table->renameColumn('text_ar', 'arabic_text');
            }
            if (Schema::hasColumn('ayats', 'text_en')) {
                $table->renameColumn('text_en', 'translation_text');
            }
        });
    }
};
