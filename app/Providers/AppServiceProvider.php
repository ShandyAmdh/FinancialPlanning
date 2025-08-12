<?php

namespace App\Providers;

use App\Models\Goal;
use App\Observers\GoalObserver;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        JsonResource::withoutWrapping();

        Goal::observe(GoalObserver::class);

        // Share auth user data to all Inertia responses
        if (class_exists('Inertia\Inertia')) {
            \Inertia\Inertia::share('auth', function () {
                $user = Auth::user();
                return $user ? [
                    'name' => $user->name,
                    'avatar' => $user->avatar ?? null,
                    // tambahkan field lain jika perlu
                ] : null;
            });
        }

       
    }
}
