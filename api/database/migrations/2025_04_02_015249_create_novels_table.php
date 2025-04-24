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
        Schema::create('novels', function (Blueprint $table) {
            $table->id();
            $table->string("slug")->unique();
            $table->string("title")
                ->index("title_index");
            $table->string("author");
            $table->enum("status", ["complete", "ongoing", "new"]);
            $table->string("cover");
            $table->float("ranting")->default(0);
            $table->string("genre");
            $table->text("sinopsis")->nullable();
            $table->bigInteger("view")->default(0);
            $table->boolean("adult")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('novels');
    }
};
