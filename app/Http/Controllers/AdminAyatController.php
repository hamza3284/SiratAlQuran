<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ayat;

class AdminAyatController extends Controller
{
    public function index()
    {
        return Ayat::with('themes')->paginate(20);
    }

    public function show(Ayat $ayat)
    {
        return $ayat->load('themes');
    }

    public function store(Request $request)
    {
        $ayat = Ayat::create($request->validate([
            'surah' => 'required|integer',
            'ayat' => 'required|integer',
            'text_ar' => 'required',
            'text_en' => 'required'
        ]));

        $syncData = [];
        if ($request->has('themes')) {
            foreach ($request->themes as $theme) {
                // Handle both simple ID array (legacy) and object array with explanation
                if (is_array($theme)) {
                    $syncData[$theme['id']] = ['explanation' => $theme['explanation'] ?? null];
                } else {
                    $syncData[$theme] = ['explanation' => null];
                }
            }
        } elseif ($request->has('theme_ids')) {
            // Fallback for legacy theme_ids support
            $syncData = $request->theme_ids;
        }

        $ayat->themes()->sync($syncData);
        return $ayat;
    }

    public function update(Request $request, Ayat $ayat)
    {
        $ayat->update($request->except('themes', 'theme_ids'));
        
        $syncData = [];
        if ($request->has('themes')) {
            foreach ($request->themes as $theme) {
                if (is_array($theme)) {
                    $syncData[$theme['id']] = ['explanation' => $theme['explanation'] ?? null];
                } else {
                    $syncData[$theme] = ['explanation' => null];
                }
            }
        } elseif ($request->has('theme_ids')) {
            $syncData = $request->theme_ids;
        }

        $ayat->themes()->sync($syncData);
        return $ayat;
    }

    public function destroy(Ayat $ayat)
    {
        $ayat->delete();
        return response()->noContent();
    }
}
