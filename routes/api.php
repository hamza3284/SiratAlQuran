<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\AyatController;
use App\Http\Controllers\ClassifierController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminThemeController;
use App\Http\Controllers\AdminAyatController;
use App\Http\Controllers\GuidanceController;
use App\Http\Controllers\ContactController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;


Route::get('/themes', [ThemeController::class, 'index']);
Route::get('/themes/{slug}/ayats', [AyatController::class, 'byTheme']);
Route::get('/themes/{slug}/external-ayats', [AyatController::class, 'searchExternal']);
Route::get('/ayats/{id}', [AyatController::class, 'show']);
Route::post('/classify', [ClassifierController::class, 'classify']);
Route::post('/guidance', [GuidanceController::class, 'getGuidance']);
Route::post('/contact', [ContactController::class, 'store']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

Route::get('/login', function () {
    return response()->json(['message' => 'Unauthenticated.'], 401);
})->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/journal', [JournalController::class, 'store']);
    Route::get('/journals', [JournalController::class, 'index']);
});


Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

    // Themes
    Route::get('/themes', [AdminThemeController::class, 'index']);
    Route::post('/themes', [AdminThemeController::class, 'store']);
    Route::get('/themes/{theme}', [AdminThemeController::class, 'show']); // Add show method
    Route::put('/themes/{theme}', [AdminThemeController::class, 'update']);
    Route::delete('/themes/{theme}', [AdminThemeController::class, 'destroy']);

    // Ayats
    Route::get('/ayats', [AdminAyatController::class, 'index']);
    Route::post('/ayats', [AdminAyatController::class, 'store']);
    Route::get('/ayats/{ayat}', [AdminAyatController::class, 'show']); // Add show method
    Route::put('/ayats/{ayat}', [AdminAyatController::class, 'update']);
    Route::delete('/ayats/{ayat}', [AdminAyatController::class, 'destroy']);

    // Contacts
    Route::get('/contacts', [ContactController::class, 'index']);
});
