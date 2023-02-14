<?php

use App\Http\Controllers\AuthController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('user', [AuthController::class, 'me']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('email/verification-notification', [AuthController::class, 'emailNotification'])
        ->middleware(['auth:api', 'throttle:6,1']);
});

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect(env('SPA_URL'));
    // return response()->json(['message' => 'Email Verified.'], 200);
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::middleware('auth:api')->get('/user', function () {
    return Auth::user();
});

Route::middleware('auth:api')->get('/users', function () {
    return \App\Models\User::all();
});
