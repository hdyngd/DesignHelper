<?php

namespace App\Http\Requests;

use App\Rules\CheckId;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class EditUserPost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => ['required', new CheckId],
            'name' => 'required',
            'email' => 'required',
            'role' =>  'required|numeric',
        ];
    }
}
