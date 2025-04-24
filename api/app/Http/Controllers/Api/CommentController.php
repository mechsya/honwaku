<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\LikeHistory;

class CommentController extends Controller
{

    public  function get()
    {
        $comments = Comment::with("user:id,name")->orderby("id", "desc")->where("novel_id", request()->get("novel"))->get();

        foreach ($comments as $comment) {
            $liked = LikeHistory::where("user_id", $comment->user_id)->where("comment_id", $comment->id)->first();
            $comment->isLiked = $liked ? true : false;
        }

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil comment",
            "data" => $comments
        ], 200);
    }

    public function create()
    {
        Comment::create([
            "user_id" => request("user"),
            "novel_id" => request("novel"),
            "content" => request("content"),
            "like" => 0
        ]);

        return response()->json([
            "code" => 200,
            "message" => "Berhasil menambah comment",
            "data" => null
        ], 200);
    }

    public function show()
    {
        $comment = Comment::with("user:id,name")->orderby("id", "desc")->where("id", request()->get("novel"))->first();

        if (!$comment) {
            return response()->json([
                "code" => 404,
                "message" => "data tidak berhasil di temukan",
                "data" => null
            ], 404);
        }

        $liked = LikeHistory::where("user_id", request()->get("user"))->where("comment_id", $comment->id)->first();
        $comment->isLiked = $liked ? true : false;

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil comment",
            "data" => $comment
        ], 200);
    }

    public function updateLike()
    {
        $comment = Comment::where("id", request("comment"))->first();

        $userAlreadyLiked =  LikeHistory::where("user_id", request("user"))->where("comment_id", $comment->id)->first();

        if (!$userAlreadyLiked) {
            LikeHistory::create([
                "user_id" => request("user"),
                "comment_id" => $comment->id
            ]);

            $comment->like = $comment->like + 1;
            $comment->save();

            return response()->json([
                "code" => 200,
                "message" => "Berhasil menambah komentar",
                "data" => [
                    "isLiked" => !$userAlreadyLiked ? true : false,
                    "like" => $comment->like
                ]
            ], 200);
        } else {
            LikeHistory::where([
                "user_id" => request("user"),
                "comment_id" => $comment->id
            ])->delete();

            $comment->like = $comment->like - 1;
            $comment->save();

            return response()->json([
                "code" => 200,
                "message" => "Berhasil menghapus komentar",
                "data" => [
                    "isLiked" => !$userAlreadyLiked ? true : false,
                    "like" => $comment->like
                ]
            ], 200);
        }
    }
}
