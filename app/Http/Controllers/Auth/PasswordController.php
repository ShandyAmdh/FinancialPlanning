<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{

    public function changePassword()
    {
        return Inertia ('UpdatePasswordForm');
    }

    public function processChangePassword(Request $request)
    {
        // Cek Password Lama
        
        if(!Hash::check($request->current_password, Auth::user()->password)){
            return back()->with('error', 'Password lama tidak sesuai');
        }

        // Cek Password Baru dan Konfirmasi Password Baru
        if($request->password != $request->password_confirmation){
            return back()->with('error', 'Password baru dan konfirmasi password baru tidak sesuai');
    }

    Auth::user()->update([
        'password' => Hash::make($request->password)
    ]);

    return back()->with('status', 'Password berhasil diperbarui.');
}
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }
}
