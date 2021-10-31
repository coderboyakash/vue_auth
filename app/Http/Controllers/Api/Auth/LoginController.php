<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\LoginRequest;
use App\Http\Resources\LoginResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use stdClass;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $reponse = new stdClass;
        $user = User::where('email', $request->email)->first();
        if($user instanceof User){
            if((Hash::check($request->password, $user->password))){
                $reponse->code = 200;
                $reponse->_token =  $user->createToken('auth_token')->accessToken;
                $reponse->result = new LoginResource($user);
                $reponse->isSuccess = true;
            }else{
                $reponse->code = 400;
                $reponse->errors = ['Invalid Email Or Password'];
                $reponse->isSuccess = false;
            }
        }else{
            $reponse->code = 400;
            $reponse->errors = ['Invalid Email Or Password'];
            $reponse->isSuccess = false;            
        }
        return response()->json($reponse, 200);
    }
}
