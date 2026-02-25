<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
public function up() {
    Schema::create('ayats', function (Blueprint $table) {
        $table->id();
        $table->foreignId('theme_id')->constrained()->onDelete('cascade');
        $table->integer('surah_number');
        $table->integer('ayah_number');
        $table->text('arabic_text');
        $table->text('translation_text');
        $table->text('short_explanation');
        $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('ayats');
    }
};
