<?php

use App\Http\Controllers\DirectLoginController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', WelcomeController::class)->middleware(['guest'])->name('welcome');

Route::middleware('auth')->group(function () {
    Route::middleware(['permission:manage users'])->group(function (){
        Route::get('users', [UserController::class, 'index'])->name('users.index');
        Route::post('users', [UserController::class, 'store'])->name('users.store');
        Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('users/{user}', [UserController::class, 'delete'])->name('users.delete');
        Route::post('users/{user}', [UserController::class, 'assign_role'])->name('users.assign_role');
        Route::post('users/{user}/permissions', [UserController::class, 'assign_direct_permission'])->name('users.assign_direct_permission');
        Route::post('users/{user}/login', DirectLoginController::class)->name('users.direct_login')->middleware(['permission:direct login']);
    });

    Route::middleware(['role:super admin'])->group(function (){
        Route::get('roles', [RoleController::class, 'index'])->name('roles.index');
        Route::post('roles', [RoleController::class, 'store'])->name('roles.store');
        Route::put('roles/{role}', [RoleController::class, 'update'])->name('roles.update');
        Route::delete('roles/{role}', [RoleController::class, 'delete'])->name('roles.delete');
        Route::post('roles/{role}', [RoleController::class, 'asign_permission'])->name('roles.asign_permission');

        Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index');
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
