<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;

class CommentController extends Controller
{
    public  function get()
    {
        $comment = Comment::with("user:id,name")->orderby("id", "desc")->where("novel_id", request()->get("id"))->get();

        return response()->json($comment);
    }

    public function create()
    {
        Comment::create([
            "user_id" => request("user"),
            "novel_id" => request("novel"),
            "content" => request("content"),
            "like" => 0
        ]);

        return response()->json(["code" => 200]);
    }
}
