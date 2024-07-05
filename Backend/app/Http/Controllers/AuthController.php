<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            $user = Auth::user();
             /** @var \App\Models\User $user **/
            // return response()->json(['user' => $user, 'token' => $user->createToken('AuthToken')->plainTextToken]);
            $token = $user->createToken('MyApp')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
