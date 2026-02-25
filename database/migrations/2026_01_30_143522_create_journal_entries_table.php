<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up() {
        Schema::create('journal_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('ayat_id')->constrained()->onDelete('cascade');
            $table->text('reflection_text')->nullable();
            $table->timestamps();
        });
    }


    public function down() {
        Schema::dropIfExists('journal_entries');
    }
};
