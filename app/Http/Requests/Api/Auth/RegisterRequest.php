<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use stdClass;

class RegisterRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed|min:8',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $reponse = new stdClass;
        $reponse->code = 422;
        $reponse->errors = $validator->errors();
        $reponse->isSuccess = false;
        throw new HttpResponseException(response()->json($reponse, 200));
    }
}
