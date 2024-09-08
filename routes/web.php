<?php

use App\Http\Controllers\FormController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubmitFormController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
    
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'user' => Auth::user(),
        'isUserAuth' => Auth::check(),
    ]);
})->name('landing');

Route::resource('/form', FormController::class)->middleware(['auth']);

Route::post('/send', [SubmitFormController::class, 'submitForm']);

Route::post('/user/settings', [UserController::class, 'updateSettings'])->middleware(['auth']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
