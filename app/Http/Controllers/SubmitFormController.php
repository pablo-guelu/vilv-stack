<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\BugologForm;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Support\Facades\Mail;

class SubmitFormController extends Controller
{

    // Handle form submission
    public function submitForm(Request $request)
    {
        // Validate and process the form data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        $name = $validatedData['name'];
        $email = $validatedData['email'];

        // dd($validatedData);

        $mailable = new BugologForm($email, $name);

        // dd($mailable);

        Mail::to('pablo.guelu@gmail.com')
            ->cc('cc@domain.com')
            ->bcc('bcc@domain.com')
            ->send($mailable);

        // Handle the form submission logic (e.g., save to database, send email, etc.)

        return response()->json(['message' => 'Form submitted successfully']);
    }
}
