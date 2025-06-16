<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\Novel;
use Illuminate\Http\Request;

class NovelController extends Controller
{
    public function showRecomendation()
    {
        $novels = Novel::orderByDesc('view')
            ->limit(5)
            ->get();

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => $novels
        ]);
    }

    public function showNewRelease()
    {
        $novels = Novel::orderByDesc('id')
            ->limit(5)
            ->get();

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => $novels
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->get("q");
        $genre = $request->get("genre");

        $novels = Novel::when($query, fn($q) => $q->where("title", "LIKE", "%$query%"))
            ->when($genre, fn($q) => $q->where("genre", "LIKE", "%$genre%"))
            ->paginate(5);

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => $novels
        ]);
    }

    public function showBySlug(Request $request, $slug)
    {
        $novel = Novel::select('id', 'title', 'slug', 'view', 'genre', 'sinopsis', 'ranting', 'author', 'cover')
            ->where('slug', $slug)
            ->firstOrFail();

        $novel->increment('view');

        $marked = Bookmark::where("user_id", $request->get("user"))
            ->where("novel_id", $novel->id)
            ->exists();

        $novel->marked = $marked;

        return response()->json([
            "code" => 200,
            "message" => "Berhasil mengambil data",
            "data" => $novel
        ]);
    }
}
