<?php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use App\Services\ThemeClassifier;

class ClassifierController extends Controller
{
    public function classify(Request $request, ThemeClassifier $classifier)
    {
        $validated = $request->validate([
            'text' => 'required|string|min:3',
        ]);

        $themes = $classifier->classify($validated['text']);

        return response()->json([
            'themes' => $themes
        ]);
    }
}
