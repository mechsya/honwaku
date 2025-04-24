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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId("reporter_id")
                ->nullable()
                ->references("id")
                ->on("users")
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId("reported_id")
                ->nullable()
                ->references("id")
                ->on("users")
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->integer("target_id")->nullable();
            $table->string("reason")->nullable();
            $table->string("type");
            $table->enum("status", ["finished", "pending", "reject"])->default("pending");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
