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
        Schema::table('ayats', function (Blueprint $table) {
            $table->renameColumn('ayah', 'ayat');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ayats', function (Blueprint $table) {
            $table->renameColumn('ayat', 'ayah');
        });
    }
};
