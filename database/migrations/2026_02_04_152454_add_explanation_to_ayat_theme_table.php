<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('ayat_theme', 'explanation')) {
            Schema::table('ayat_theme', function (Blueprint $table) {
                $table->text('explanation')->nullable();
            });
        }
    }

    public function down(): void
    {
        // Keep migrated explanations; a rollback must not silently delete content.
    }
};

