<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AnnouncementController extends Controller
{
    public function get()
    {
        $announcements = [];

        $sortQuery = request()->get("sort");

        if (!$sortQuery || $sortQuery === "semua") {
            $announcements = Announcement::with("user")->get();
        } else {
            $announcements = Announcement::where("status", $sortQuery)->with("user")->get();
        }

        foreach ($announcements as $announcement) {
            $announcement->html = preg_replace('/!\[[^\]]*\]\((.*?)\)/', '', $announcement->content);
        }

        return view("announcement.get", ["announcements" => $announcements, "onScreen" => $sortQuery]);
    }

    public function show(string $slug)
    {
        $announcement = Announcement::where("slug", $slug)->first();

        $announcement->html = Str::markdown($announcement->content);

        return view("announcement.show", ["announcement" => $announcement]);
    }
}
