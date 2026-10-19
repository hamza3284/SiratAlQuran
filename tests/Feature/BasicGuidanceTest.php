<?php

namespace Tests\Feature;

use App\Models\Ayat;
use App\Models\Theme;
use App\Services\ThemeClassifier;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class BasicGuidanceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
        Http::preventStrayRequests();
    }

    public function test_unknown_text_is_not_presented_as_hope(): void
    {
        Theme::create(['name' => 'Hope', 'slug' => 'hope']);
        $this->postJson('/api/guidance', ['text' => 'business'])
            ->assertStatus(422)->assertJsonStructure(['message']);
        Http::assertNothingSent();
    }

    public function test_classifier_preserves_score_order_instead_of_database_order(): void
    {
        Theme::create(['name' => 'Hope', 'slug' => 'hope']);
        Theme::create(['name' => 'Family Relations', 'slug' => 'family']);
        $themes = app(ThemeClassifier::class)->classify('hope mother father family');
        $this->assertSame(['Family Relations', 'Hope'], array_column($themes, 'name'));
    }

    public function test_all_mobile_presets_have_a_matching_theme(): void
    {
        foreach (['Anxiety / Fear', 'Gratitude', 'Patience in Hardship', 'Loss / Grief', 'Forgiveness', 'Hope'] as $name) {
            Theme::create(['name' => $name, 'slug' => str($name)->slug()->toString()]);
        }

        foreach (['Anxiety', 'Gratitude', 'Patience', 'Loss', 'Anger', 'Hope'] as $preset) {
            $this->assertNotEmpty(app(ThemeClassifier::class)->classify($preset), $preset);
        }
    }

    public function test_guidance_order_and_upstream_cache_are_stable(): void
    {
        $theme = Theme::create(['name' => 'Hope', 'slug' => 'hope']);
        foreach ([[94, 6], [1, 6]] as [$surah, $ayatNumber]) {
            $ayat = Ayat::create([
                'surah' => $surah, 'ayat' => $ayatNumber,
                'text_ar' => 'stored Arabic fixture', 'text_en' => 'stored translation fixture',
            ]);
            $ayat->themes()->attach($theme);
        }

        Http::fake(function ($request) {
            preg_match('~/ayah/(\d+):(\d+)/~', $request->url(), $match);
            return Http::response(['data' => array_map(fn ($edition) => [
                'edition' => ['identifier' => $edition], 'surah' => ['number' => (int) $match[1]],
                'numberInSurah' => (int) $match[2], 'text' => $edition . ' text fixture',
            ], ['quran-uthmani', 'en.sahih'])]);
        });

        for ($attempt = 0; $attempt < 2; $attempt++) {
            $this->postJson('/api/guidance', ['text' => 'Hope'])
                ->assertOk()->assertJsonPath('primary_ayat.surah', 1)
                ->assertJsonPath('primary_ayat.text_ar', 'quran-uthmani text fixture')
                ->assertJsonPath('supporting_ayats.0.surah', 94);
        }
        Http::assertSentCount(2); // One request per reference, none on the second guidance call.
    }

    public function test_guidance_rejects_unbounded_input(): void
    {
        $this->postJson('/api/guidance', ['text' => str_repeat('x', 2001)])
            ->assertStatus(422)->assertJsonValidationErrors('text');
        Http::assertNothingSent();
    }
}

