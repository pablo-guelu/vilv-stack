<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function updateSettings(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $validatedData = $request->validate([
            'redirect_url' => 'nullable|url',
            'after_submitting_message' => 'nullable|string',
            'recipients' => 'nullable|array',
            'recipients.*' => 'email',
        ]);

        // Convert recipients array to JSON if it exists
        if (isset($validatedData['recipients'])) {
            $validatedData['recipients'] = json_encode($validatedData['recipients']);
        }

        // Update user using DB facade
        DB::table('users')
            ->where('id', $user->id)
            ->update($validatedData);

        // Fetch updated user data
        $updatedUser = DB::table('users')->where('id', $user->id)->first();

        return redirect()->route('form.index')->with('success', 'Settings updated successfully');
    }

    public function updateProjectInfo(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'company_name' => 'required|string|max:255',
            'company_website' => 'nullable|url',
            'company_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        DB::table('users')
            ->where('id', $user->id)
            ->update($validatedData);

        return redirect()->route('form.index')->with('success', 'Project info updated successfully');
    }
}