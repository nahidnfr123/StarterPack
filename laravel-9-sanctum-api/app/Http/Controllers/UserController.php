<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgetPasswordRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $users = User::all();
        return (UserResource::collection($users))->response();
    }


    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return JsonResponse
     */
    public function show(User $user): JsonResponse
    {
        return (new UserResource($user))->response();
    }

    public function authUser(User $user): JsonResponse
    {
        return (new UserResource(auth('sanctum')->user()))->response();
    }

    /**
     * @throws ValidationException
     */
    public function update(UserUpdateRequest $request)
    {
        $userId = auth()->id();
        $data = $request->validated();
        if ($userId) {
            $user = User::findOrFail($userId);
            $currentPassword = $data['current_password'] ?? null;
            if ($currentPassword) {
                if (!Hash::check($currentPassword, $user->password)) {
                    $user->password = Hash::make($data['password']);
                } else {
                    throw ValidationException::withMessages([
                        'current_password' => ['Incorrect credentials.'],
                    ]);
                }
            }
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->save();
            return (new UserResource($user))->response();
        }
    }

    /**
     * @throws ValidationException
     */
    public function resetPassword(ForgetPasswordRequest $request)
    {
        $data = $request->validated();
        $reset_password_status = Password::reset($data, function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });

        if ($reset_password_status == Password::INVALID_TOKEN) {
            return response()->json(["msg" => "Invalid token provided"], 400);
        }

        return response()->json(["msg" => "Password has been successfully changed"]);

    }

    public function sendOtp(Request $request)
    {
        $request->validate(
            ['email' => 'required|email|exists:users,email'],
            ['password_reset_link' => 'required|string']
        );

        $status = Password::sendResetLink($request->only('email'), function ($user, $token) use ($request) {
            $data['password_reset_link'] = $request->password_reset_link . '?token=' . $token . '&email=' . $request['email'];
            $data['token'] = $token;
            $user->sendPasswordResetNotification($data);
        });

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['status' => __($status)])
            : response()->json(['email' => __($status)]);
    }

}
