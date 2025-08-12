<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // users nama tabel
        Schema::create('users', function (Blueprint $table) {
            //didalam ini atribut tabel
            $table->uuid('id')->primary(); 
            $table->string('name');
            $table->string('email')->unique(); //unique artinya harus unik email tidak boleh sama
            $table->timestamp('email_verified_at')->nullable(); //nullable artinya boleh kosong
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->rememberToken(); //ini untuk menyimpan token agar terlogin ketika menggunakan remember me
            $table->timestamps(); //tu adalah perintah di Laravel migration buat otomatis nambahin dua kolom penting ke tabel lo: 1. kapan data dibuat dan kapan data terakir diubah
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUuid('user_id')->nullable()->index(); //Bikin kolom user_id bertipe UUID dan nanti akan jadi foreign key
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
