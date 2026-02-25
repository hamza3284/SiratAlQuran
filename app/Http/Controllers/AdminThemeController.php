<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Theme;
use Illuminate\Support\Str;

class AdminThemeController extends Controller
{
    public function index()
    {
        return Theme::withCount('ayats')->get();
    }

    public function show(Theme $theme)
    {
        return $theme;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:themes'
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        return Theme::create($validated);
    }

    public function update(Request $request, Theme $theme)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:themes,name,' . $theme->id
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $theme->update($validated);
        return $theme;
    }

    public function destroy(Theme $theme)
    {
        $theme->delete();
        return response()->noContent();
    }
}
