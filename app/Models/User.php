<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids; //tambahkan HasUuids karna tadi mnggunakan type datanya di migration
    //hasfactory memudahakan buat factory, 
    //notifable agar memungkinkan model menerima notif email atau sistem notif lain
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        // fillable didalam ini adalah kolom yang dapat diinput
        'name',
        'email',
        'password',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        //hidden menyembunyikan kolom tertentu ketika model diserialis keformat json atau array disembunyikan dalam api respon ga bakal ada kolom ini
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array //casts conversi mengkonversi ke dalam type data yang diinginkan saat field diakses dari model
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    //baru ditambahkan
    public function payments()
    {
    return $this->hasMany(Payment::class);
    }

}
