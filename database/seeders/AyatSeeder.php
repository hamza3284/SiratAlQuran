<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Theme;
use App\Models\Ayat;
use Illuminate\Support\Facades\DB;

////////////////////////////////////////
/// *** OLD STATIC IMPLEMENTATION *** //
////////////////////////////////////////

// class AyatSeeder extends Seeder
// {
//     public function run()
//     {
//         // Clear existing data to avoid duplicates and ensure clean state
//         DB::statement('SET FOREIGN_KEY_CHECKS=0;');
//         Ayat::truncate();
//         DB::table('ayat_theme')->truncate();
//         DB::statement('SET FOREIGN_KEY_CHECKS=1;');

//         $themes = Theme::pluck('id', 'name');

//         $ayats = [
//             [
//                 'theme' => 'Anxiety / Fear',
//                 'surah' => 13,
//                 'ayat' => 28,
//                 'text_ar' => 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
//                 'text_en' => 'Unquestionably, by the remembrance of Allah hearts are assured.',
//                 'explanation' => 'This ayah reminds that inner peace is not found in control, but in remembrance of Allah.',
//             ],
//             [
//                 'theme' => 'Anxiety / Fear',
//                 'surah' => 2,
//                 'ayat' => 286,
//                 'text_ar' => 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
//                 'text_en' => 'Allah does not burden a soul beyond that it can bear.',
//                 'explanation' => 'Your anxiety does not mean failure. Allah knows your limits better than you do.',
//             ],
//             [
//                 'theme' => 'Patience in Hardship',
//                 'surah' => 94,
//                 'ayat' => 5,
//                 'text_ar' => 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
//                 'text_en' => 'Indeed, with hardship comes ease.',
//                 'explanation' => 'Hardship is never permanent. Ease is already written alongside it.',
//             ],
//             [
//                 'theme' => 'Patience in Hardship',
//                 'surah' => 2,
//                 'ayat' => 153,
//                 'text_ar' => 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
//                 'text_en' => 'Indeed, Allah is with the patient.',
//                 'explanation' => 'Patience is not passive suffering; it is active trust in Allah’s presence.',
//             ],
//             [
//                 'theme' => 'Repentance',
//                 'surah' => 39,
//                 'ayat' => 53,
//                 'text_ar' => 'لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
//                 'text_en' => 'Do not despair of the mercy of Allah.',
//                 'explanation' => 'No sin is greater than Allah’s mercy if repentance is sincere.',
//             ],
//             [
//                 'theme' => 'Gratitude',
//                 'surah' => 14,
//                 'ayat' => 7,
//                 'text_ar' => 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
//                 'text_en' => 'If you are grateful, I will surely increase you.',
//                 'explanation' => 'Gratitude is not just appreciation; it is a means of increase.',
//             ],
//             [
//                 'theme' => 'Trust in Allah',
//                 'surah' => 65,
//                 'ayat' => 3,
//                 'text_ar' => 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
//                 'text_en' => 'Whoever relies upon Allah – He is sufficient for him.',
//                 'explanation' => 'Tawakkul means doing your part, then trusting Allah with the outcome.',
//             ],
//             [
//                 'theme' => 'Loss / Grief',
//                 'surah' => 2,
//                 'ayat' => 156,
//                 'text_ar' => 'إِنَّ لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
//                 'text_en' => 'Indeed we belong to Allah, and to Him we will return.',
//                 'explanation' => 'Loss is painful, but it reminds us of our ultimate return to Allah.',
//             ],
//             [
//                 'theme' => 'Guidance / Confusion',
//                 'surah' => 1,
//                 'ayat' => 6,
//                 'text_ar' => 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
//                 'text_en' => 'Guide us to the straight path.',
//                 'explanation' => 'Even believers ask for guidance daily — confusion is human.',
//             ],
//             [
//                 'theme' => 'Rizq / Provision',
//                 'surah' => 11,
//                 'ayat' => 6,
//                 'text_ar' => 'وَمَا مِن دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَى اللَّهِ رِزْقُهَا',
//                 'text_en' => 'There is no creature on earth except that Allah provides for it.',
//                 'explanation' => 'Provision is not random; it is guaranteed by Allah.',
//             ],
//             [
//                 'theme' => 'Family Relations',
//                 'surah' => 17,
//                 'ayat' => 23,
//                 'text_ar' => 'وَبِالْوَالِدَيْنِ إِحْسَانًا',
//                 'text_en' => 'And be good to parents.',
//                 'explanation' => 'Family ties are a form of worship, not just social duty.',
//             ],
//             [
//                 'theme' => 'Forgiveness',
//                 'surah' => 24,
//                 'ayat' => 22,
//                 'text_ar' => 'وَلْيَعْفُوا وَلْيَصْفَحُوا',
//                 'text_en' => 'Let them pardon and overlook.',
//                 'explanation' => 'Forgiveness frees the heart before it frees others.',
//             ],
//             [
//                 'theme' => 'Hypocrisy / Sincerity',
//                 'surah' => 4,
//                 'ayat' => 142,
//                 'text_ar' => 'إِنَّ الْمُنَافِقِينَ يُخَادِعُونَ اللَّهَ',
//                 'text_en' => 'Indeed, the hypocrites think to deceive Allah.',
//                 'explanation' => 'Sincerity begins when actions align with inner belief.',
//             ],
//             [
//                 'theme' => 'Hope',
//                 'surah' => 94,
//                 'ayat' => 6,
//                 'text_ar' => 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
//                 'text_en' => 'Indeed, with hardship comes ease.',
//                 'explanation' => 'Hope in Islam is certainty, not wishful thinking.',
//             ],
//         ];

//         foreach ($ayats as $data) {
//             $themeName = $data['theme'];
//             $explanation = $data['explanation'] ?? null;
            
//             unset($data['theme']);
//             unset($data['explanation']);
            
//             $ayat = Ayat::create($data);
            
//             if (isset($themes[$themeName])) {
//                 $ayat->themes()->attach($themes[$themeName], ['explanation' => $explanation]);
//             }
//         }
//     }
// }


class AyatSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Ayat::truncate();
        DB::table('ayat_theme')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $themes = Theme::pluck('id', 'name');

        $ayats = [
            [
                'theme' => 'Anxiety / Fear',
                'surah' => 13,
                'ayat' => 28,
                'text_ar' => 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
                'text_en' => 'Unquestionably, by the remembrance of Allah hearts are assured.',
                'explanation' => 'This ayah reminds that inner peace is not found in control, but in remembrance of Allah.',
            ],
            [
                'theme' => 'Anxiety / Fear',
                'surah' => 2,
                'ayat' => 286,
                'text_ar' => 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
                'text_en' => 'Allah does not burden a soul beyond that it can bear.',
                'explanation' => 'Your anxiety does not mean failure. Allah knows your limits better than you do.',
            ],
            [
                'theme' => 'Patience in Hardship',
                'surah' => 94,
                'ayat' => 5,
                'text_ar' => 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
                'text_en' => 'Indeed, with hardship comes ease.',
                'explanation' => 'Hardship is never permanent. Ease is already written alongside it.',
            ],
            [
                'theme' => 'Patience in Hardship',
                'surah' => 2,
                'ayat' => 153,
                'text_ar' => 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
                'text_en' => 'Indeed, Allah is with the patient.',
                'explanation' => 'Patience is not passive suffering; it is active trust in Allah’s presence.',
            ],
            [
                'theme' => 'Repentance',
                'surah' => 39,
                'ayat' => 53,
                'text_ar' => 'لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
                'text_en' => 'Do not despair of the mercy of Allah.',
                'explanation' => 'No sin is greater than Allah’s mercy if repentance is sincere.',
            ],
            [
                'theme' => 'Gratitude',
                'surah' => 14,
                'ayat' => 7,
                'text_ar' => 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
                'text_en' => 'If you are grateful, I will surely increase you.',
                'explanation' => 'Gratitude is not just appreciation; it is a means of increase.',
            ],
            [
                'theme' => 'Trust in Allah',
                'surah' => 65,
                'ayat' => 3,
                'text_ar' => 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
                'text_en' => 'Whoever relies upon Allah – He is sufficient for him.',
                'explanation' => 'Tawakkul means doing your part, then trusting Allah with the outcome.',
            ],
            [
                'theme' => 'Loss / Grief',
                'surah' => 2,
                'ayat' => 156,
                'text_ar' => 'إِنَّ لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
                'text_en' => 'Indeed we belong to Allah, and to Him we will return.',
                'explanation' => 'Loss is painful, but it reminds us of our ultimate return to Allah.',
            ],
            [
                'theme' => 'Guidance / Confusion',
                'surah' => 1,
                'ayat' => 6,
                'text_ar' => 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
                'text_en' => 'Guide us to the straight path.',
                'explanation' => 'Even believers ask for guidance daily — confusion is human.',
            ],
            [
                'theme' => 'Rizq / Provision',
                'surah' => 11,
                'ayat' => 6,
                'text_ar' => 'وَمَا مِن دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَى اللَّهِ رِزْقُهَا',
                'text_en' => 'There is no creature on earth except that Allah provides for it.',
                'explanation' => 'Provision is not random; it is guaranteed by Allah.',
            ],
            [
                'theme' => 'Family Relations',
                'surah' => 17,
                'ayat' => 23,
                'text_ar' => 'وَبِالْوَالِدَيْنِ إِحْسَانًا',
                'text_en' => 'And be good to parents.',
                'explanation' => 'Family ties are a form of worship, not just social duty.',
            ],
            [
                'theme' => 'Forgiveness',
                'surah' => 24,
                'ayat' => 22,
                'text_ar' => 'وَلْيَعْفُوا وَلْيَصْفَحُوا',
                'text_en' => 'Let them pardon and overlook.',
                'explanation' => 'Forgiveness frees the heart before it frees others.',
            ],
            [
                'theme' => 'Hypocrisy / Sincerity',
                'surah' => 4,
                'ayat' => 142,
                'text_ar' => 'إِنَّ الْمُنَافِقِينَ يُخَادِعُونَ اللَّهَ',
                'text_en' => 'Indeed, the hypocrites think to deceive Allah.',
                'explanation' => 'Sincerity begins when actions align with inner belief.',
            ],
            [
                'theme' => 'Hope',
                'surah' => 94,
                'ayat' => 6,
                'text_ar' => 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
                'text_en' => 'Indeed, with hardship comes ease.',
                'explanation' => 'Hope in Islam is certainty, not wishful thinking.',
            ],
        ];

        foreach ($ayats as $data) {
            $themeName = $data['theme'];
            $explanation = $data['explanation'] ?? null;

            unset($data['theme']);
            unset($data['explanation']);

            $ayat = Ayat::create($data);

            if (isset($themes[$themeName])) {
                $ayat->themes()->attach($themes[$themeName], ['explanation' => $explanation]);
            }
        }
    }
}
