<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::view("", "home.index");
Route::view("privacy", "privacy");

Route::prefix("announcement")->group(function () {
    Route::get("", [AnnouncementController::class, "get"]);
    Route::get("{slug}", [AnnouncementController::class, "show"]);
});

Route::prefix("report")->group(function () {
    Route::get("", [ReportController::class, "index"]);
    Route::post("", [ReportController::class, "store"])->name("report.post");
});

Route::get("storage:link", function () {
    $target = storage_path('/app/public/');
    $symlink = $_SERVER['DOCUMENT_ROOT'] . '/storage';
    symlink($target, $symlink);
});
