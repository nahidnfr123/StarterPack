<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(['middleware' => ['throttle:5,1', 'api']], function () {
    Route::post('/register', [AuthenticationController::class, 'register']);
    Route::post('/login', [AuthenticationController::class, 'login']);
    Route::post('/send-password-reset-link', [UserController::class, 'sendPasswordResetLink']);
    Route::put('/reset-password', [UserController::class, 'resetPassword']);
    Route::post('/refresh', [AuthenticationController::class, 'refresh']);
});

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/user', [UserController::class, 'update']);
    Route::post('/logout', [AuthenticationController::class, 'logout']);
});

