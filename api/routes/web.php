<?php

use App\Http\Controllers\AnnouncementController;
use Illuminate\Support\Facades\Route;

Route::view("", "home.index");
Route::view("privacy", "privacy");

Route::view("delete-account", "delete-account");

Route::prefix("announcement")->group(function () {
    Route::get("", [AnnouncementController::class, "get"]);
    Route::get("{slug}", [AnnouncementController::class, "show"]);
});

Route::get("storage:link", function () {
    $target = storage_path('/app/public/');
    $symlink = $_SERVER['DOCUMENT_ROOT'] . '/storage';
    symlink($target, $symlink);
});
