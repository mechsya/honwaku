<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chapters', function (Blueprint $table) {
            $table->id()
                ->index();
            $table->foreignId("novel_id")
                ->index()
                ->references("id")
                ->on("novels")
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->string("slug")
                ->index()
                ->unique();
            $table->string("title")
                ->index();
            $table->integer("content_length")
                ->default(0);
            $table->string("volume", 10);
            $table->string("chapter", 10);
            $table->longText("content");
            $table->bigInteger("view")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chapters');
    }
};
