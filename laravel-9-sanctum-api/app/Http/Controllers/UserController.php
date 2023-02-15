<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            $currentPassword = $data['current_password'];
            if ($currentPassword && !Hash::check($currentPassword, $user->password)) {
                $user->password = Hash::make($data['password']);
            } else {
                throw ValidationException::withMessages([
                    'current_password' => ['Incorrect credentials.'],
                ]);
            }
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->save();
            return (new UserResource($user))->response();
        }
    }
}
