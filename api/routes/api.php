<?php

use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\ChapterController;
use App\Http\Controllers\Api\NovelController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BookmarkController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\GlobalChatController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ReportController;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;

Route::prefix("user")->group(function () {
    Route::post("signup", [UserController::class, "signup"]);
    Route::post("signin", [UserController::class, "signin"]);

    Route::middleware("api")->group(function () {
        Route::post("logout", [UserController::class, "logout"]);
        Route::post("refresh", [UserController::class, "refresh"]);
    });
});

Route::prefix("account")->group(function () {
    Route::post("delete", [AccountController::class, "delete"])->middleware("auth:api");
});

Route::prefix("novel")->group(function () {
    Route::get('recomendation', [NovelController::class, "showRecomendation"]);
    Route::get('search', [NovelController::class, "search"]);
    Route::get('{slug}', [NovelController::class, "showBySlug"]);
});

Route::prefix("chapter")->group(function () {
    Route::get("", [ChapterController::class, "showByNovel"]);
    Route::get("update", [ChapterController::class, "showUpdate"]);
    Route::get("{slug}", [ChapterController::class, "showBySlug"]);
});

Route::prefix("announcement")->group(function () {
    Route::get("update", [AnnouncementController::class, "update"]);
});

Route::prefix("bookmark")->middleware("auth:api")->group(function () {
    Route::post("", [BookmarkController::class, "store"]);
    Route::get("", [BookmarkController::class, "get"]);
    Route::delete("", [BookmarkController::class, "delete"]);
});

Route::prefix("history")->middleware("auth:api")->group(function () {
    Route::post("", [HistoryController::class, "store"]);
    Route::get("", [HistoryController::class, "get"]);
    Route::get("first", [HistoryController::class, "first"]);
});

Route::prefix("global-chat")->group(function () {
    Route::post("", [GlobalChatController::class, "store"])->middleware("auth:api");
    Route::get("", [GlobalChatController::class, "get"]);
});

Route::prefix("event")->group(function () {
    Route::get("", [EventController::class, "get"]);
});

Route::prefix("comment")->group(function () {
    Route::get("", [CommentController::class, "get"]);
    Route::get("show", [CommentController::class, "show"]);

    Route::post("report", [ReportController::class, 'report']);

    Route::middleware("auth:api")->post("like", [CommentController::class, "updateLike"]);
    Route::middleware("auth:api")->post("", [CommentController::class, "create"]);
});
