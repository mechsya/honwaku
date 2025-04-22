<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\History;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function get()
    {
        $histories = History::with([
            'chapter.novel',
        ])
            ->where('user_id', request()->get('user'))
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => $histories
        ],  200);
    }

    public function first()
    {
        $history = History::with([
            'chapter.novel',
        ])
            ->where('user_id', request()->get('user'))
            ->orderBy('updated_at', 'desc')
            ->first();

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => $history
        ],  200);
    }

    public function store()
    {
        $user = request("user");
        $chapter = request("chapter");

        $history = History::where("user_id", $user)->where("chapter_id", $chapter)->first();

        if ($history) {
            $history->updated_at = Carbon::now();
            $history->save();
            return response()->json(["code" => 200, "message" => "Berhasil update data"], 200);
        }

        History::create(["user_id" => $user, "chapter_id" => $chapter]);


        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => null
        ],  200);
    }
}
