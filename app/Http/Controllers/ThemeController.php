<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Theme;

class ThemeController extends Controller
{
    public function index()
    {
        return Theme::withCount('ayats')->get();
    }
}
