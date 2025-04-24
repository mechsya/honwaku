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
            $table->id();
            $table->foreignId("novel_id")
                ->references("id")
                ->on("novels")
                ->cascadeOnUpdate();
            $table->string("slug")->unique();
            $table->string("title");
            $table->string("volume", 10);
            $table->string("chapter", 10);
            $table->text("content");
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
