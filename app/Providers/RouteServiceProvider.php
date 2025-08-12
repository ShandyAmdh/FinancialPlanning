<?php

namespace App\Providers;

use App\Models\Payment;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Route Model Binding: hanya ambil Payment milik user yang login
        Route::bind('payment', function ($value) {
            return Payment::where('id', $value)
                ->where('user_id', Auth::id())
                ->firstOrFail();
        });

        parent::boot();
    }
}
