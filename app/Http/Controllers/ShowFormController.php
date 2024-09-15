<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;
use Inertia\Inertia;

class ShowFormController extends Controller
{
    public function show($slug)
    {
        $form = Form::where('slug', $slug)->firstOrFail();
        return Inertia::render('Form/Show', [
            'form' => $form
        ]);
    }
}