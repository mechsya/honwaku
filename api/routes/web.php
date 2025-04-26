<?php

use App\Http\Controllers\AccountController;
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
    Route::view("/comment", "report.comment.index");
    Route::post("/comment", [ReportController::class, "storeComment"])->name("report.comment.post");
});

Route::prefix("account")->group(function () {
    Route::view("", "account.index");

    Route::view("delete", "account.delete");
    Route::post("delete", [AccountController::class, "delete"])->name("account.delete");

    Route::view("edit", "account.edit");
    Route::put("edit", [AccountController::class, "edit"]);
});

Route::get("storage:link", function () {
    $target = storage_path('/app/public/');
    $symlink = $_SERVER['DOCUMENT_ROOT'] . '/storage';
    symlink($target, $symlink);
});
