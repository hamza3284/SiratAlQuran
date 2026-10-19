<?php

namespace Tests\Feature;

use App\Services\VerseText;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class VerseTextTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
        Http::preventStrayRequests();
    }

    public function test_an_outage_backs_off_without_returning_partial_editions(): void
    {
        Http::fake(['*' => Http::response([], 503)]);
        $service = app(VerseText::class);
        $this->assertNull($service->forReference(1, 1));
        $this->assertNull($service->forReference(1, 1));
        Http::assertSentCount(1);
    }

    public function test_reference_mismatch_rejects_the_entire_pair(): void
    {
        Http::fake(['*' => Http::response(['data' => [
            ['edition' => ['identifier' => 'quran-uthmani'], 'surah' => ['number' => 1],
                'numberInSurah' => 1, 'text' => 'Arabic fixture'],
            ['edition' => ['identifier' => 'en.sahih'], 'surah' => ['number' => 2],
                'numberInSurah' => 1, 'text' => 'wrong reference fixture'],
        ]])]);
        $this->assertNull(app(VerseText::class)->forReference(1, 1));
    }

    public function test_invalid_reference_does_not_call_upstream(): void
    {
        $this->assertNull(app(VerseText::class)->forReference(115, 1));
        Http::assertNothingSent();
    }
}

