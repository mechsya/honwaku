<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;

class AnnouncementController extends Controller
{
    public function update()
    {
        $announcement = Announcement::orderBy("id", "desc")->limit(10)->get();
        return response()->json($announcement);
    }
}
