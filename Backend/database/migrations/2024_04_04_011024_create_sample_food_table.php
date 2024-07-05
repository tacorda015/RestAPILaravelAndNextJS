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
        Schema::create('sample_food', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('calories');
            $table->float('fat');
            $table->float('carbs');
            $table->float('protein');
            $table->string('type');
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sample_food');
    }
};
