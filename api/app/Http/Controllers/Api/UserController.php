<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function signin()
    {
        $credentials = request(['email', 'password']);

        $user = User::select(["id", "name", "email", "password"])->where("email", request("email"))->first();
        if (!$user) {
            return response()->json(["code" => 404, "message" => "User belum pernah mendaftar"], 404);
        }

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(["code" => 401, 'message' => 'Password salah'], 401);
        }

        return $this->respondWithToken($token, $user);
    }

    public function signup()
    {
        $existUser = User::where("name", request("name"))
            ->orWhere("email", request("email"))
            ->first();

        if ($existUser) {
            if ($existUser->name === request("name")) {
                return response()->json(["code" => 400, "message" => "username sudah digunakan"], 400);
            }
            if ($existUser->email === request("email")) {
                return response()->json(["code" => 400, "message" => "pengguna sudah pernah mendaftar"], 400);
            }
        }

        $user = User::create([
            "name" => request("name"),
            "email" => request("email"),
            "password" => Hash::make(request("password")),
        ]);

        return response()->json(["code" => 200, "message" => "Berhasil mendaftar", "user" => $user], 200);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(["code" => 200, 'message' => 'berhasil keluar']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token, $user = null)
    {
        return response()->json([
            "code" => 200,
            "user" => $user,
            "message" => "Berhasil login",
            'token' => $token,
            'expires_in' => auth()->factory()->getTTL()
        ]);
    }
}
