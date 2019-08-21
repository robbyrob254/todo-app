<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $http = new \GuzzleHttp\Client;

        try {
            $response = $http->post(config('services.passport.login_endpoint'), [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => config('services.passport.client_id'),
                    'client_secret' => config('services.passport.client_secret'),
                    'username' => $request->username,
                    'password' => $request->password
                ]
            ]);

            return $response->getBody();
        } catch(\GuzzleHttp\Exception\BadResponseException $e) {
            if($e->getCode() === 400) {
                return response()->json([
                    'status' => $e->getCode(),
                    'message' => 'Invalid Request. Please enter a username or a password.'
                ]);
            } else if($e->getCode() === 401) {
                return response()->json([
                    'status' => $e->getCode(),
                    'message' => 'Your credentials are incorrect. Please try again.'
                ]);
            }

            return response()->json([
                'status' => $e->getCode(),
                'message' => 'Something went wrong on the server.'
            ]);
        }
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json('Registration complete', 200);
    }

    public function logout()
    {
        auth()->user()->tokens->each(function($token, $key){
            $token->delete();
        });

        return response()->json('Logged out successfully.', 200);
    }
}
