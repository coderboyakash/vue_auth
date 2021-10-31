<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LoginResource;
use App\Models\User;
use Illuminate\Http\Request;
use stdClass;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $reponse = new stdClass;
        $user = User::find(auth()->id());
        if($user instanceof User){
            $reponse->_token =  $user->createToken('login_token')->accessToken;
            $reponse->result = new LoginResource($user);
            $reponse->isSuccess = true;
        }else{
            $reponse->code = 400;
            $reponse->isSuccess = false;
        }
        return response()->json($reponse, 200);
    }
}
