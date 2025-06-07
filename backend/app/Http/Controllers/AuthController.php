<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Register API (Name, Email, Password, Confirm Password)

    // Register API (Name, Email, Password, Confirm Password)

    public function register(Request $request){
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        User::create($data + [
            'password' => bcrypt($data['password']),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
        ], 201);
    }

    // Login API (Email, Password)

    public function login(Request $request){
        $request->validate([
            "email" => 'required|string|email',
            "password" => 'required|string',
        ]);

        if(!Auth::attempt($request->only("email", "password"))){
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $user = Auth::user();

        return response()->json([
            'message' => 'Login successful',
            'token' => $user->createToken('auth_token')->plainTextToken,
        ], 200);
    }

    // Profile API

    public function profile(){
        $user = Auth::user();

        return response()->json([
            'user' => $user,
            'meessage' => 'User profile data retrieved successfully',
        ], 200);
    }

    // Logout API
    public function logout(Request $request){
    // Menghapus token yang sedang digunakan
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'User logged out successfully',
    ], 200);
}

}
