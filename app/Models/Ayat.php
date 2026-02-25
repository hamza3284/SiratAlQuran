<?php
namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Ayat extends Model {
    use HasFactory;


    protected $fillable = ['surah', 'ayat', 'text_ar', 'text_en'];

    public function themes() {
        return $this->belongsToMany(Theme::class)->withPivot('explanation');
    }

    public function journalEntries() {
        return $this->hasMany(JournalEntry::class);
    }
}
?>