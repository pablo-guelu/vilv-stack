<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PublishController extends Controller
{
    public function publish(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string',
                'url' => 'required|string',
                'form_structure' => 'required|json',
                'slug' => 'required|string',
                'settings.redirect_url' => 'nullable|string',
                'settings.after_submitting_message' => 'nullable|string',
                'settings.recipients' => 'required|array',
                'settings.ccs' => 'nullable|array',
            ]);

            DB::beginTransaction();

            $form = Form::updateOrCreate(
                ['id' => $request->input('form_id')],
                [
                    'title' => $request->input('title'),
                    'url' => $request->input('url'),
                    'user_id' => $request->user()->id,
                    'form_structure' => $request->input('form_structure'),
                    'slug' => $request->input('slug'),
                ]
            );

            $form->setting()->updateOrCreate(
                ['form_id' => $form->id],
                [
                    'redirect_url' => $request->input('settings.redirect_url'),
                    'after_submitting_message' => $request->input('settings.after_submitting_message'),
                    'recipients' => json_encode($request->input('settings.recipients')),
                    'ccs' => json_encode($request->input('settings.ccs')),
                ]
            );

            DB::commit();

            return Inertia::render('Dashboard/edit', [
                'success' => 'Form published successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return Inertia::render('Dashboard/edit', [
                'error' => 'Missing information',
                'missingFields' => $e->errors()
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error publishing form: ' . $e->getMessage());
            return Inertia::render('Dashboard/edit', [
                'error' => 'An error occurred while publishing the form. Please try again.'
            ]);
        }
    }
}
