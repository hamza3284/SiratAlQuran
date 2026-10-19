<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('ayat_theme')) {
            Schema::create('ayat_theme', function (Blueprint $table) {
                $table->id();
                $table->foreignId('ayat_id')->constrained()->cascadeOnDelete();
                $table->foreignId('theme_id')->constrained()->cascadeOnDelete();
                $table->text('explanation')->nullable();
                $table->timestamps();
            });
        } elseif (!Schema::hasColumn('ayat_theme', 'explanation')) {
            Schema::table('ayat_theme', function (Blueprint $table) {
                $table->text('explanation')->nullable();
            });
        }

        // Copy legacy links and explanations BEFORE dropping their source columns.
        if (Schema::hasColumn('ayats', 'theme_id')) {
            $hasExplanation = Schema::hasColumn('ayats', 'short_explanation');
            $columns = $hasExplanation ? ['id', 'theme_id', 'short_explanation'] : ['id', 'theme_id'];

            DB::table('ayats')->select($columns)->orderBy('id')
                ->chunkById(100, function ($ayats) use ($hasExplanation) {
                    foreach ($ayats as $ayat) {
                        if ($ayat->theme_id === null) {
                            if ($hasExplanation && !empty($ayat->short_explanation)) {
                                throw new RuntimeException('A legacy explanation has no theme; migration stopped to preserve it.');
                            }
                            continue;
                        }

                        $link = DB::table('ayat_theme')
                            ->where('ayat_id', $ayat->id)->where('theme_id', $ayat->theme_id);
                        $existing = $link->first();
                        $explanation = $hasExplanation ? $ayat->short_explanation : null;

                        if ($existing === null) {
                            DB::table('ayat_theme')->insert([
                                'ayat_id' => $ayat->id,
                                'theme_id' => $ayat->theme_id,
                                'explanation' => $explanation,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        } elseif ($existing->explanation === null && $explanation !== null) {
                            $link->update(['explanation' => $explanation, 'updated_at' => now()]);
                        } elseif ($explanation !== null && $existing->explanation !== $explanation) {
                            throw new RuntimeException('Conflicting legacy and pivot explanations require manual review.');
                        }
                    }
                });
        } elseif (Schema::hasColumn('ayats', 'short_explanation')
            && DB::table('ayats')->whereNotNull('short_explanation')->where('short_explanation', '!=', '')->exists()) {
            throw new RuntimeException('Legacy explanations cannot be mapped without theme_id; migration stopped.');
        }

        Schema::table('ayats', function (Blueprint $table) {
            foreach (['surah_number' => 'surah', 'ayah_number' => 'ayah',
                'arabic_text' => 'text_ar', 'translation_text' => 'text_en'] as $from => $to) {
                if (Schema::hasColumn('ayats', $from)) {
                    $table->renameColumn($from, $to);
                }
            }
            if (Schema::hasColumn('ayats', 'theme_id')) {
                $table->dropForeign(['theme_id']);
                $table->dropColumn('theme_id');
            }
            if (Schema::hasColumn('ayats', 'short_explanation')) {
                $table->dropColumn('short_explanation');
            }
        });
    }

    public function down(): void
    {
        // A many-to-many mapping cannot be safely flattened to one theme/explanation.
        throw new RuntimeException('This content migration is not safely reversible. Restore a verified backup instead.');
    }
};

