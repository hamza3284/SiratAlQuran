<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class JournalEntry extends Model {
    use HasFactory;


    protected $fillable = ['user_id','ayat_id','reflection_text'];


    public function ayat() {
        return $this->belongsTo(Ayat::class);
    }


    public function user() {
        return $this->belongsTo(User::class);
    }
}
?>
