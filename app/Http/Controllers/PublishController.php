<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class PublishController extends Controller
{
    public function publish(Request $request)
    {
        $formId = $request->input('form_id');
        $form = Form::with('setting')->findOrFail($formId);

        $validator = Validator::make(array_merge($form->toArray(), ['setting' => $form->setting->toArray()]), [
            'title' => 'required|string',
            'form_structure' => 'required|json',
            'slug' => 'required|string',
            'setting.recipients' => 'required|json',
        ]);

        if ($validator->fails()) {
            return Inertia::render('Dashboard/edit', [
                'error' => 'Missing information',
                'missingFields' => $validator->errors()
            ]);
        }

        // If validation passes, proceed with publishing logic here
        // ...

        return Inertia::render('Dashboard/edit', [
            'success' => 'Form published successfully'
        ]);
    }
}
