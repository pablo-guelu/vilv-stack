<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\BugologForm;
use Illuminate\Support\Facades\Mail;
use App\Models\Form;

class SubmitFormController extends Controller
{

    // Handle form submission
    public function submitForm(Request $request, $slug)
    {
        $form = Form::where('slug', $slug)->firstOrFail();
        
        // Validate and process the form data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'issueDescription' => 'required|string',
        ]);

        $name = $validatedData['name'];
        $email = $validatedData['email'];
        $subject = $validatedData['subject'];
        $issueDescription = $validatedData['issueDescription'];
        $files = $request->file('files');

        $mailable = new BugologForm($email, $name, $subject, $issueDescription, $files);

        Mail::to('pablo.guelu@gmail.com')->send($mailable);

        // Handle the form submission logic (e.g., save to database, send email, etc.)

        return response()->json(['message' => 'Form submitted successfully']);
    }
}
