<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function report()
    {
        $reporter_id = request("reporter");
        $comment_id =  request("comment");

        $comment = Comment::with("user")->find($comment_id);

        if (!$comment) return response()
            ->json(["code" => 404, "message" => "komentar yang anda laporkan sudah tidak ada", "data" => null]);

        $reportAlreadyExist = Report::where("reporter_id", $reporter_id)
            ->where("target_id", $comment->id)
            ->first();

        if ($reportAlreadyExist) return response()->json([
            "code" => 400,
            "message" => "anda sudah pernah melaporkan kasus yang sama, jika tidak segera di tangani admin, tolong kontak admin secara pribadi di alinia.meysa@gmail.com",
            "data" => null
        ]);

        $response = Report::create([
            "reporter_id" => $reporter_id,
            "reported_id" => $comment->user->id,
            "target_id" => $comment->id,
            "type" => "comment",
            "reason" => request("reason"),
            "status" => "pending"
        ]);

        if (!$response)
            return response()->json([
                "code" => 500,
                "message" => "server sedang mengalami gangguan tolong coba lagi  nanti",
                "data" => null
            ], 500);

        return response()->json([
            "code" => 200,
            "message" => "permintaan mu sedang di proses, tolong tunggu hinga kami menyelesaikanya",
            "data" => null
        ]);
    }
}
