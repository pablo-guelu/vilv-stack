<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFormRequest;
use App\Http\Requests\UpdateFormRequest;
use App\Http\Resources\UserResource;
use App\Models\Form;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Actions\SaveImageAction;
use Illuminate\Http\Request;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('Dashboard/index', [
            'user' => new UserResource($user), 
            'isUserAuth' => Auth::check(),
            'forms' => Form::where('user_id', Auth::id())->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/create', [
            'user' => Auth::user(),
            'isUserAuth' => Auth::check(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            // ... other validation rules ...
        ]);

        try {
            DB::beginTransaction();

            $form = new Form();
            $form->title = $validatedData['title'];
            $form->url = $request->input('url');
            $form->user_id = $request->user()->id;
            $form->form_structure = $request->input('form_structure');
            $form->slug = $request->input('slug');
            $form->save();

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    (new SaveImageAction)->execute($image, $form->id); 
                }
            }

            // Create and link settings to the form
            $settings = new Setting();
            $settings->form_id = $form->id;
            $settings->redirect_url = $request->input('settings.redirect_url');
            $settings->after_submitting_message = $request->input('settings.after_submitting_message');
            $settings->recipients = json_encode($request->input('settings.recipients', []));
            $settings->ccs = json_encode($request->input('settings.ccs', []));
            // Add other setting fields here as needed
            $settings->save();

            DB::commit();

            return redirect()->route('form.index')->with('success', 'Form created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating form: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while creating the form. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form)
    {
        return Inertia::render('ShowForm', [
            'user' => Auth::user(),
            'isUserAuth' => Auth::check(),
            'form' => $form, 
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */ 
    public function edit(Form $form)
    {
        return Inertia::render('Dashboard/edit', [
            'user' => Auth::user(),
            'isUserAuth' => Auth::check(),
            'form' => $form, 
            'settings' => $form->setting,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Form $form)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            // ... other validation rules ...
        ]);

        try {
            DB::beginTransaction();

            $form->title = $validatedData['title'];
            $form->url = $request->input('url');
            $form->form_structure = $request->input('form_structure');
            $form->slug = $request->input('slug');
            $form->save();

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    (new SaveImageAction)->execute($image, $form->id); 
                }
            }

            $settings = Setting::where('form_id', $form->id)->first();
            $settings->redirect_url = $request->input('settings.redirect_url');
            $settings->after_submitting_message = $request->input('settings.after_submitting_message');
            $settings->recipients = json_encode($request->input('settings.recipients', []));
            $settings->ccs = json_encode($request->input('settings.ccs', []));
            $settings->save();

            DB::commit();

            return redirect()->route('form.edit', $form->id)->with('success', 'Form updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating form: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while updating the form. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form)
    {
        $form->delete();

        return redirect()->route('form.index')->with('success', 'Form deleted successfully');
    }
}
