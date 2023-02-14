<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        //$validation = Validator::make($request->all(), [
        $this->validate(request(), [
            'name' => 'required|min:3|max:30',
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => 'required|min:8|max:60|confirmed',
            'password_confirmation' => 'required|same:password',
        ]);
        /*if ($validation->fails()) {
            return response()->json($validation->errors(), 422);
        }*/
        $userData = $request->all();
        $userData['password'] = Hash::make($userData['password']);
        $user = User::create($userData);
        if ($user) {
            Auth::login($user);
        }
        return $this->generateTokenAndReturnResponse($user);
    }

    public function login(Request $request)
    {
        //$validation = Validator::make($request->all(), [
        $this->validate(request(), [
            'email' => 'required|email|max:40',
            'password' => 'required|min:8|max:60',
        ]);
        /*if ($validation->fails()) {
            return response()->json($validation->errors(), 422);
        }*/

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            return $this->generateTokenAndReturnResponse($user);
        }
        return response()->json(['error' => 'Unauthorized Access'], 403);
    }

    public function generateTokenAndReturnResponse($user): \Illuminate\Http\JsonResponse
    {
        $responseArray = [];
        $responseArray['user'] = $user;
        $responseArray['token'] = $user->createToken('api-authentication')->accessToken;
        return response()->json($responseArray, 200);
    }

    public function logout(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();
        return response()->json(['message' => 'Logout successful!'], 200);
    }


    public function sendEmailVerificationNotification(Request $request){

    }
}
