<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookmarkController extends Controller
{
    public function get(Request $request)
    {
        try {
            $userId = $request->query('user');

            if (!$userId) {
                return response()->json([
                    "code" => 400,
                    "message" => "Parameter user wajib diisi",
                    "data" => null
                ], 400);
            }

            $bookmarks = Bookmark::with('novel')
                ->where('user_id', $userId)
                ->get();

            return response()->json([
                "code" => 200,
                "message" => "Berhasil mengambil data",
                "data" => $bookmarks
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error get bookmarks: ' . $e->getMessage());
            return response()->json([
                "code" => 500,
                "message" => "Terjadi kesalahan server",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function delete(Request $request)
    {
        try {
            $userId = $request->query('user');
            $novelId = $request->query('novel');

            if (!$userId || !$novelId) {
                return response()->json([
                    "code" => 400,
                    "message" => "Parameter user dan novel wajib diisi",
                    "data" => null
                ], 400);
            }

            $bookmark = Bookmark::where('user_id', $userId)
                ->where('novel_id', $novelId)
                ->first();

            if (!$bookmark) {
                return response()->json([
                    "code" => 404,
                    "message" => "Bookmark tidak ditemukan",
                    "data" => null
                ], 404);
            }

            $bookmark->delete();

            return response()->json([
                "code" => 200,
                "message" => "Berhasil menghapus bookmark",
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

    public function store(Request $request)
    {
        try {
            $userId = $request->input('user');
            $novelId = $request->input('novel');

            if (!$userId || !$novelId) {
                return response()->json([
                    "code" => 400,
                    "message" => "Parameter user dan novel wajib diisi",
                    "data" => null
                ], 400);
            }

            $bookmark = Bookmark::where('user_id', $userId)
                ->where('novel_id', $novelId)
                ->first();

            if ($bookmark) {
                return response()->json([
                    "code" => 400,
                    "message" => "Novel sudah ada di bookmark",
                    "data" => null
                ], 400);
            }

            Bookmark::create([
                "user_id" => $userId,
                "novel_id" => $novelId
            ]);

            return response()->json([
                "code" => 200,
                "message" => "Novel berhasil ditambahkan ke bookmark",
                "data" => null
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error store bookmark: ' . $e->getMessage());
            return response()->json([
                "code" => 500,
                "message" => "Terjadi kesalahan server",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
