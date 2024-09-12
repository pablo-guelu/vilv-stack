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
        Schema::create('settings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('form_id');
            $table->foreign('form_id')->references('id')->on('forms')->onDelete('cascade');
            $table->string('redirect_url')->nullable();
            $table->text('message_after_submitting')->nullable();
            $table->json('recipients')->nullable();
            $table->json('ccs')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
