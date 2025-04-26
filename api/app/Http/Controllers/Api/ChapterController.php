<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use Illuminate\Support\Facades\Log;

class ChapterController extends Controller
{
    public function showUpdate()
    {
        $chapters = Chapter::with("novel:id,title,genre,slug")
            ->orderBy('id', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => $chapters
        ], 200);
    }

    public function showBySlug($slug)
    {
        $chapter = Chapter::with("novel:id,title,cover")->where("slug", $slug)->first();

        $chapter->next = Chapter::where("id", $chapter->id + 1)->first();

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => $chapter
        ], 200);
    }
}
