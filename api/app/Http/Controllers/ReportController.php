<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index()
    {
        return view("report.index");
    }

    public function store()
    {
        $user = request()->get("user");
        $comment = request()->get("comment");

        logger([
            'user' => $user,
            'comment' => $comment,
        ]);

        $report = Report::where("user_id", $user)->where("comment_id", $comment)->first();

        logger([
            'found_report' => $report
        ]);

        if ($report) {
            return back()->with("error", "Kamu sudah pernah melaporkan kasus ini");
        }

        Report::create([
            "user_id" => $user,
            "comment_id" => $comment,
            "type" => request("type")
        ]);

        return back()->with("success", "laporan kamu telah di terima, sedang menunggu persetujuan admin");
    }
}
