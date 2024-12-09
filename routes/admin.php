<?php

use App\Http\Controllers\Admin\FakultasController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth","role:super_admin"])->group(function () {
    Route::redirect("/admin", "/admin/users");
    Route::resource("/admin/users", UserController::class);
    Route::get("/admin/fakultas", [FakultasController::class, 'index'])->name('fakultas.index');
});
