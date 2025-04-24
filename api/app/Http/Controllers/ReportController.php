<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function storeComment()
    {
        $reporter_id = request()->get("reporter");
        $comment_id =  request()->get("comment");

        $comment = Comment::with("user")->find($comment_id);

        if (!$comment) return back()->with("error", "comment yang anda laporkan tidak ada");

        $reportAlreadyExist = Report::where("reporter_id", $reporter_id)->where("target_id", $comment->id)->first();

        if ($reportAlreadyExist) return back()->with("error", "anda sudah pernah melaporkan kasus yang sama, jika tidak segera di tangani admin, tolong kontak admin secara pribadi di alinia.meysa@gmail.com");

        $response = Report::create([
            "reporter_id" => $reporter_id,
            "reported_id" => $comment->user->id,
            "target_id" => $comment->id,
            "type" => "comment",
            "reason" => request("reason"),
            "status" => "pending"
        ]);

        if (!$response) {
            return back()->with("error", "sistem sedang mengalami error tunggu beberapa saat lagi");
        }

        return back()->with("success", "terima kasih telah berhasil melapor, tunggu sebantar admin akan menangani secepatnya");
    }
}
