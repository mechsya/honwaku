<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function delete()
    {
        $email = request("email");
        $password = request("password");
        $reason = request("reason");

        $user = User::where("email", $email)->first();

        if (!$user) return response()->json([
            "code" => 404,
            "message" => "Pengguna tidak ditemukan",
            "data" => null
        ], 404);

        $userAlreadyReported = Report::where("reporter_id", $user->id)->where("type", "delete-account")->first();

        if ($userAlreadyReported) return response()->json([
            "code" => 400,
            "message" => "kamu sudah pernah melakukan pengajuan penghapusan akun, jika tidak segera di layani tolong kontak admin di alinia.meysa@gmail.com",
            "data" => null
        ], 400);

        if (!Hash::check($password, $user->password))
            return response()->json([
                "code" => 400,
                "message" => "Password salah",
                "data" => null
            ], 400);

        $report = Report::create([
            "reporter_id" => $user->id,
            "reported_id" => $user->id,
            "reason" => $reason,
            "type" => "delete-account",
        ]);

        if (!$report) return response()->json([
            "code" => 500,
            "message" => "server sedang mengalami gangguan tolong coba lagi  nanti",
            "data" => null
        ], 500);

        return response()->json([
            "code" => 200,
            "message" => "permintaan mu sedang di proses, tolong tunggu hingga kami menyelesaikanya",
            "data" => null
        ]);
    }

    public function edit() {}
}
