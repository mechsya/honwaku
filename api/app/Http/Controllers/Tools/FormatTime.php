<?php

namespace App\Http\Controllers\Tools;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FormatTime extends Controller
{
    public static function format($value)
    {
        $createdAt = Carbon::parse($value);

        $elapsedTime  = $createdAt->diffInDays(Carbon::now());

        if ($elapsedTime >= 1 & $elapsedTime <= 2) return "Kemarin";

        if ($elapsedTime >= 2) return $createdAt->translatedFormat('d F Y');

        return $createdAt->locale('id')->diffForHumans();
    }
}
