<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\InertiaVuetiMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Form;
use Illuminate\Support\Facades\Log;

class SubmitFormController extends Controller
{

    // Handle form submission
    public function submitForm(Request $request)
    {
        $data = $request->data;
        $form = Form::find($request->form_id);
        // Validate and process the form data
        // $validatedData = $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|email|max:255',
        //     'subject' => 'required|string|max:255',
        //     'issueDescription' => 'required|string',
        // ]);

        $name = $data['name'] ?? 'Anonimous';
        $email = $data['email'] ?? $form->user->email;
        $subject = $data['subject'] ?? $form->title;
        $files = $data['files'] ?? [];
        // $email = $validatedData['email'];
        // $subject = $validatedData['subject'];
        // $issueDescription = $validatedData['issueDescription'];
        // $files = $request->file('files');



        $mailable = new InertiaVuetiMail($data, $name, $email, $subject, $files, $form->setting);

        try {
            Mail::to('pablo.guelu@gmail.com')->send($mailable);
        } catch (\Exception $e) {
            Log::error('Email sending failed: ' . $e->getMessage());
            dd($e->getMessage());
            return response()->json(['message' => 'Failed to send email. Please try again later.'], 500);
        }

        // Handle the form submission logic (e.g., save to database, send email, etc.)

        return response()->json(['message' => 'Form submitted successfully']);
    }
}
