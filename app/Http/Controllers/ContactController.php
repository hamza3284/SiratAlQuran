<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactSubmissionMail;

class ContactController extends Controller
{
    public function index()
    {
        return Contact::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|min:10',
        ]);

        $contact = Contact::create($validated);

        // Send email to admin
        try {
            Mail::to('admin@siratalquran.com')->send(new ContactSubmissionMail($contact));
        } catch (\Exception $e) {
            // Log the error but don't fail the request
            \Illuminate\Support\Facades\Log::error("Failed to send contact email: " . $e->getMessage());
        }

        return response()->json([
            'message' => 'Thank you for your message. We will get back to you soon!',
            'contact' => $contact
        ], 201);
    }
}
