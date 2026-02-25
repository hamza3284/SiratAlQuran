<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JournalEntry;

class JournalController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'ayat_id' => 'required|exists:ayats,id',
            'reflection_text' => 'required|string',
        ]);

        return JournalEntry::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'ayat_id' => $request->ayat_id,
            ],
            [
                'reflection_text' => $request->reflection_text,
            ]
        );
    }

    public function index(Request $request)
    {
        return JournalEntry::with('ayat.themes')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();
    }
}
