<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('crime');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('crime', function () {
        return Inertia::render('crime');
    })->name('crime');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
