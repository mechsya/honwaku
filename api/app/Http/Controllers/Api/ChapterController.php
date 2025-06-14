<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    public function showUpdate()
    {
        $chapters = Chapter::select(
            'id',
            'title',
            'slug',
            'content_length',
            'novel_id',
            'volume',
            'chapter',
            'updated_at'
        )
            ->with('novel:id,title,genre,slug')
            ->orderByDesc('id')
            ->limit(5)
            ->get();

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => $chapters
        ]);
    }

    public function showByNovel(Request $request)
    {
        $novelId = $request->get("novel_id");

        $chapters = Chapter::select(
            'id',
            'title',
            'slug',
            "volume",
            "chapter",
            'updated_at'
        )
            ->where("novel_id", $novelId)
            ->orderBy('id', 'ASC')
            ->paginate(20);

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => $chapters,
        ]);
    }

    public function showBySlug($slug)
    {
        $chapter = Chapter::with('novel:id,title,cover')
            ->select(
                'id',
                'title',
                'slug',
                'volume',
                'chapter',
                'content',
                'novel_id'
            )
            ->where('slug', $slug)
            ->first();

        if (!$chapter) {
            return response()->json([
                "code" => 404,
                "message" => "Chapter tidak ditemukan",
                "data" => null
            ], 404);
        }

        $nextChapterID = intval($chapter->chapter) + 1;

        $next = Chapter::select(['id', 'slug'])->where("novel_id", $chapter->novel->id)->where('chapter', $nextChapterID)->first();

        $chapter->next = $next;

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => $chapter
        ]);
    }
}
