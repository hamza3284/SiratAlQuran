<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ayat;

class CleanAyatTagsSeeder extends Seeder
{
    public function run()
    {
        $ayats = Ayat::all();
        $count = 0;

        foreach ($ayats as $ayat) {
            $originalAr = $ayat->text_ar;
            $originalEn = $ayat->text_en;

            $ayat->text_ar = strip_tags($originalAr);
            $ayat->text_en = strip_tags($originalEn);

            if ($originalAr !== $ayat->text_ar || $originalEn !== $ayat->text_en) {
                $ayat->save();
                $count++;
            }
        }

        $this->command->info("Cleaned up HTML tags from {$count} verses.");
    }
}
