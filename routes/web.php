<?php

use App\Http\Controllers\IdentificationsController;
use App\Http\Controllers\MitigationsController;
use App\Http\Controllers\MonitoringController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RiskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(["auth","role:admin|rektor|dekan|kaprodi"])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/risks', [RiskController::class, 'index'])->name('risks.index');
    Route::get('/identifications', [IdentificationsController::class, 'index'])->name('identifications.index');
    Route::get('/mitigations', [MitigationsController::class, 'index'])->name('mitigations.index');
    Route::get('/monitoring', [MonitoringController::class, 'index'])->name('monitoring.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
