<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function me(Request $request){
        return $request->user();
    }

    public function getAllUsers(): \Illuminate\Http\JsonResponse
    {
        return response()->json(User::all(), 200);
    }
}
