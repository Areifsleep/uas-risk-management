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
        Schema::create('likelihoods', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->integer('rating');
            $table->string("description");
            $table->string("precentage_range");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('likelihoods');
    }
};
