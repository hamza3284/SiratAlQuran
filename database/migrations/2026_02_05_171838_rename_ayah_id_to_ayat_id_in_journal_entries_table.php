<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Fresh installations already use ayat_id. Only legacy databases need a rename.
        if (Schema::hasColumn('journal_entries', 'ayat_id')) {
            return;
        }

        if (!Schema::hasColumn('journal_entries', 'ayah_id')) {
            throw new RuntimeException('journal_entries has neither ayat_id nor legacy ayah_id.');
        }

        Schema::table('journal_entries', function (Blueprint $table) {
            $table->renameColumn('ayah_id', 'ayat_id');
        });
    }

    public function down(): void
    {
        // Keep the canonical name: the original create migration also uses ayat_id.
        // Renaming it on rollback would corrupt a fresh installation's schema.
    }
};

