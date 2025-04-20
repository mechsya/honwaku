<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GlobalChat;
use Illuminate\Support\Facades\Log;

class GlobalChatController extends Controller
{
    public function get()
    {
        try {
            $globalChats = GlobalChat::with("user")->orderBy("id", "DESC")->get();

            return response()->json([
                "code" => 200,
                "message" => "Berhasil mengambil comment",
                "data" => $globalChats
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error delete bookmark: ' . $e->getMessage());
            return response()->json([
                "code" => 500,
                "message" => "Terjadi kesalahan server",
                "error" => $e->getMessage()
            ], 500);
        }
    }
    public function store()
    {
        try {
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
        } catch (\Exception $e) {
            Log::error('Error delete bookmark: ' . $e->getMessage());
            return response()->json([
                "code" => 500,
                "message" => "Terjadi kesalahan server",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
