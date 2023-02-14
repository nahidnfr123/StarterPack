<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request)
    {
        $v = Validator::make($request->all(), [
            // $validated = $request->validate([
            'name' => 'required|string|min:3|max:30',
            'username' => 'required|string|min:3|max:30|unique:users',
            'email' => ['required', 'email', 'unique:users'],
            'password' => 'required|string|min:8|confirmed',
        ]);
        if ($v->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }
        $user = new User();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        //$this->login();
        return response()->json(["message" => "User account created."], 200);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->username)
            ->orWhere('username', $request->username)
            ->first();
        //return $user;
        if ($user && Hash::check($request->password, $user->password)) {
            if ($token = Auth::login($user)) {
                //if ($token = Auth::attempt(['email' => $user->email, 'username' => $user->username, 'password' => $user->password])) {
                //if ($token = Auth::attempt($request->only('username', 'password'))) {
                $cookie = cookie('jwt', $token, 60 * 24 * 7); // 7 day
                if (Auth::check()) {
                    return response()->json([
                        'user' => Auth::user(),
                        "access_token" => $token
                    ], 200)->header('Authorization', $token)->withCookie($cookie);
                }
            }
            return response()->json(['error' => 'password not matching'], 401);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
        // return response()->json(["user" => "", "access_token" => $this->respondWithToken($token)], 200);
    }


    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $cookie = Cookie::forget('jwt');
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    protected function emailNotification(Request $request)
    {
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Email Sent.'], 200);
    }
}
