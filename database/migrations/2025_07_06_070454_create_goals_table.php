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
        Schema::create('goals', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();//di constrained no param tidak apa karna dia sudah tahu mau relasi ke tabel user, kecuali nama foreignUuid itu bukan user, maka harus tulis ulang param constrained dengan tabel Users
            $table->string('name');
            $table->decimal('percentage',5,2)->default(0);
            $table->unsignedInteger('nominal');
            $table->unsignedInteger('monthly_saving')->default(0);
            $table->date('deadline');
            $table->unsignedInteger('beginning_balance')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goals');
    }
};
