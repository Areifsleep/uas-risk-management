<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IdentificationsController;
use App\Http\Controllers\MitigationsController;
use App\Http\Controllers\MonitoringController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RiskController;
use App\Models\Mitigation;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
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

Route::middleware(["auth"])->group(function () {
    Route::get('/dashboard', [DashboardController::class,"index"])->name('dashboard');

    Route::get('/risks', [RiskController::class, 'index'])->name('risks.index');
    Route::get('/risks/{id}', [RiskController::class, 'show'])->name('risks.show');

    Route::get('/identifications', [IdentificationsController::class, 'index'])->name('identifications.index');
    Route::get('/monitoring', [MonitoringController::class, 'index'])->name('monitoring.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth','role:super_admin|rektor'])->group(function(){
    Route::get('/risks/fakultas/{fakultas_id}',[RiskController::class,'showByFaculty'])->name('risks.show_by_fakultas');
});

// Api Routes

Route::middleware('auth')->group(function () {
   Route::get('/mitigations', function (Request $request) {
    $risk_id = $request->query('risk_id');

    if(!$risk_id){
        return response()->json([
            'message' => 'Risk ID is required'
        ], 400);
    }

    $mitigations = Mitigation::query()->where('risk_id', $risk_id)->select(['id','plan','created_at','updated_at'])->get();
    
    return response()->json($mitigations);
   })->name('loadMitigationsByRisk');

   Route::post('/mitigations', [MitigationsController::class, 'store'])->name('mitigations.store');
   Route::delete('/mitigations/{id}', [MitigationsController::class, 'destroy'])->name('mitigations.destroy');
   Route::patch('/mitigations/{id}', [MitigationsController::class, 'update'])->name('mitigations.update');
});

require __DIR__ . '/admin.php';

require __DIR__ . '/auth.php';
