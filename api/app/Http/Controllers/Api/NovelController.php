<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\Chapter;
use App\Models\Novel;
use Carbon\Carbon;
use Illuminate\Http\Request;

class NovelController extends Controller
{
    public function showRecomendation()
    {
        $novels = Novel::with("chapter")->orderBy('view', 'desc')->limit(10)->get();
        return response()->json($novels, 200);
    }
    public function search()
    {
        $query = request()->get("q");
        $genre = request()->get("genre");

        $novels = Novel::with("chapter")
            ->when($query, function ($q) use ($query) {
                $q->where("title", "LIKE", "%" . $query . "%");
            })
            ->when($genre, function ($q) use ($genre) {
                $q->where("genre", "LIKE", "%" . $genre . "%");
            })
            ->get();

        return response()->json($novels, 200);
    }

    public function showBySlug($slug)
    {
        $novel = Novel::with(["chapter" => function ($query) {
            $query->orderBy('chapter', 'desc');
        }, "comment"])->where("slug", $slug)->first();

        $marked = Bookmark::where("user_id", request()->get("user"))->where("novel_id", $novel->id)->first();

        $novel->view = $novel->view + 1;
        $novel->save();

        $novel->marked = $marked ? true : false;

        return response()->json($novel, 200);
    }
}
