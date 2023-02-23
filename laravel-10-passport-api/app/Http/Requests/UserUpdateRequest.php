<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|' . Rule::unique('users')->ignore(auth()->id()),
            'phone' => 'nullable|min:8|max:15',
            'avatar' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000',
            'current_password' => 'required_with:password|nullable|min:6',
            'password' => 'required_with:current_password|nullable|min:6|confirmed',
        ];
    }
}
