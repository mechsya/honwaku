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
            $table
                ->id()
                ->index();
            $table->string("slug")
                ->unique()
                ->index();
            $table->string("title")
                ->index()
                ->index();
            $table->string("author");
            $table->enum("status", ["complete", "ongoing", "new"]);
            $table->string("cover");
            $table->string("ranting")
                ->default("N/A");
            $table->string("genre")
                ->index();
            $table->text("sinopsis")
                ->nullable();
            $table->bigInteger("view")
                ->default(0);
            $table->boolean("adult")
                ->default(false);
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
