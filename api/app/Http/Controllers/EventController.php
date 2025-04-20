<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    public function get()
    {
        try {
            $events = Event::limit(10)->orderBy("id", "desc")->get();
            return response()->json([
                "code" => 200,
                "message" => "Berhasil mengambil data",
                "data" => $events
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
}
