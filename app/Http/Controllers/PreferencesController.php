<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PreferencesController extends Controller
{
    public function savePreferences(Request $request, User $user)
    {

        $preferences = json_encode($request->input('preferences', []));
        $user->preferences()->updateOrCreate(
            ['user_id' => $user->id], // Use user_id as the unique identifier
            ['preferences' => $preferences]
        );
        $user->save();
        return redirect()->route('form.index')->with('success', 'Preferences updated successfully');
    }
}
