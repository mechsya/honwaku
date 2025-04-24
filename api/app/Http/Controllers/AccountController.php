<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function delete()
    {
        $email = request("email");
        $password = request("password");
        $reason = request("reason");

        $user = User::where("email", $email)->first();

        $userAlreadyReported = Report::where("reporter_id", $user->id)->where("type", "delete-account")->first();

        if ($userAlreadyReported) return back()->with("error", "kamu sudah pernah melakukan pengajuan penghapusan akun, jika tidak segera di layani tolong kontak admin di alinia.meysa@gmail.com");

        if (!$user) return back()->with("error", "user tidak di temukam");

        if (!Hash::check($password, $user->password)) return back()->with("error", "password salah");

        $report = Report::create([
            "reporter_id" => $user->id,
            "reported_id" => $user->id,
            "reason" => $reason,
            "type" => "delete-account",
        ]);

        if (!$report) return back()->with("error", "server sedang mengalami gangguan tolong coba lagi  nanti");

        return back()->with("success", "permintaan mu sedang di proses, tolong tunggu hinga kami menyelesaikanya");
    }
}
