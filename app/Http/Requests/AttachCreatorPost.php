<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AttachCreatorPost extends FormRequest
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
            'proposition_id' => 'required',
            'designer_id' => 'required'
        ];
    }
}
