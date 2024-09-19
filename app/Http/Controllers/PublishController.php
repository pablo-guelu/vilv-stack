<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PublishController extends Controller
{
    public function publish(Request $request)
    {
        $formId = $request->input('form_id');
        $form = Form::findOrFail($formId);

        $validatedData = $request->validate([
            'title' => 'required|string',
            'form_structure' => 'required|json',
            'settings.redirect_url' => 'nullable|string',
            'settings.after_submitting_message' => 'nullable|string',
            'settings.recipients' => 'required|array',
            'settings.ccs' => 'nullable|array',
        ]);

        // Only validate and update slug if it has changed
        if ($request->input('slug') !== $form->slug) {
            $validatedSlug = $request->validate([
                'slug' => [
                    'required',
                    'string',
                    Rule::unique('forms')->ignore($form->id),
                ],
            ]);
            $form->slug = $validatedSlug['slug'];
        }

        $form->title = $validatedData['title'];
        $form->form_structure = $validatedData['form_structure'];
        $form->save();

        $form->setting()->updateOrCreate(
            ['form_id' => $form->id],
            [
                'redirect_url' => $request->input('settings.redirect_url'),
                'after_submitting_message' => $request->input('settings.after_submitting_message'),
                'recipients' => json_encode($request->input('settings.recipients')),
                'ccs' => json_encode($request->input('settings.ccs')),
            ]
        );

        return redirect()->route('form.edit', $form->id)->with('success', 'Form updated successfully');
    }
}
