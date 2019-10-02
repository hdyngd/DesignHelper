<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditMenuPost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->role === 0;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'category_id' => 'required',
            // TODO:
//            'name' => 'required|unique:menus',
            'name' => 'required',
            'price' =>  'required|numeric',
            'display' => 'required',
        ];
    }
}
