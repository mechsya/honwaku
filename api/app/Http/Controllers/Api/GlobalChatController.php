<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GlobalChat;

class GlobalChatController extends Controller
{
    public function get()
    {
        $globalChats = GlobalChat::with("user")->orderBy("id", "DESC")->get();

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil comment",
            "data" => $globalChats
        ], 200);
    }
    public function store()
    {
        $globalChat = GlobalChat::create(["user_id" => request("user"), "content" => request("content")]);

        if (!$globalChat) {
            return response()->json([
                "code" => 500,
                "message" => "Gagal menambahkan comment",
                "data" => null
            ], 500);
        }

        return response()->json([
            "code" => 200,
            "message" => "Berhasil menambah comment",
            "data" => null
        ], 200);
    }
}
