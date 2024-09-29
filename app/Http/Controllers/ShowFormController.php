<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShowFormController extends Controller
{
    public function show($slug)
    {
        if (Form::where('slug', $slug)->exists()) {

            $form = Form::where('slug', $slug)->firstOrFail();
            return Inertia::render('ShowForm', [
                'user' => Auth::user(),
                'isUserAuth' => Auth::check(),
                'form' => $form,
                'settings' => $form->setting,
            ]);
        } else {
            return Inertia::render('FormNotFound');
        }
    }
}
