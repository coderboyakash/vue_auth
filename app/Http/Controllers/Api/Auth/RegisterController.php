<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Http\Resources\LoginResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use stdClass;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $reponse = new stdClass;
        try {
            //code...
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            if($user instanceof User){
                $reponse->code = 200;
                $reponse->_token =  $user->createToken('auth_token')->accessToken;
                $reponse->result = new LoginResource($user);
                $reponse->isSuccess = true;
                
            }else{
                $reponse->code = 400;
                $reponse->errors = ['Something Went Wrong!'];
                $reponse->isSuccess = false;            
            }
        } catch (\Throwable $th) {
            $reponse->code = 400;
            $reponse->errors[] = $th->getMessage();
            $reponse->isSuccess = false;         
        }
        return response()->json($reponse, 200);
    }
}
