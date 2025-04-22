<?php

use App\Http\Controllers\AnnouncementController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::view("", "home.index");

Route::prefix("announcement")->group(function () {
    Route::get("", [AnnouncementController::class, "get"]);
    Route::get("{slug}", [AnnouncementController::class, "show"]);
});

Route::get("storage:link", function () {
    Artisan::call("storage:link");
});
