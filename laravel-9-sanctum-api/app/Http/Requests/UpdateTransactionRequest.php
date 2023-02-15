<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'account_id' => 'required',
            'income_category_id' => 'required',
            'name' => 'required',
            'account' => 'required,in:cash,account,card',
            'type' => 'required,in:income,expense',
            'amount' => 'required',
            'note' => 'required',
            'photo' => 'required',
            'date' => 'required',
        ];
    }
}
