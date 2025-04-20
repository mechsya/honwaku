<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chapter;

class ChapterController extends Controller
{
    public function showUpdate()
    {
        $chapters = Chapter::with("novel:id,title,genre,slug")->orderBy('id', 'desc')->limit(10)->get();
        return response()->json($chapters, 200);
    }

    public function showBySlug($slug)
    {
        $chapter = Chapter::with("novel:id,title,cover")->where("slug", $slug)->first();

        $chapter->next = Chapter::where("id", $chapter->id + 1)->first();

        return response()->json($chapter, 200);
    }
}
