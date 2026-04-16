<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FormSubmissionController extends Controller
{
    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        try {
            // Send email to admin
            Mail::raw(
                "Name: {$validated['name']}\n" .
                "Email: {$validated['email']}\n" .
                "Subject: {$validated['subject']}\n\n" .
                "Message:\n{$validated['message']}",
                function ($message) use ($validated) {
                    $message->to(env('MAIL_TO_ADDRESS', 'admin@bloomshine.com'))
                            ->subject('New Contact Form Submission: ' . ($validated['subject'] ?? 'Inquiry'));
                }
            );

            // Optionally send confirmation to user
            Mail::raw(
                "Thank you for reaching out! We have received your message and will get back to you soon.\n\n" .
                "Your Message:\n" .
                "Subject: {$validated['subject']}\n" .
                "{$validated['message']}",
                function ($message) use ($validated) {
                    $message->to($validated['email'])
                            ->subject('We received your message - BloomShine');
                }
            );

            return response()->json([
                'message' => 'Your message has been sent successfully! We will get back to you soon.',
                'success' => true
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to send message. Please try again later.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function submitBulkOrder(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'products' => 'nullable|string|max:1000',
            'quantity' => 'nullable|string|max:255',
            'message' => 'nullable|string|max:5000',
        ]);

        try {
            // Send email to admin
            $bulkEmailContent = "New Bulk Order Inquiry\n" .
                "===================\n\n" .
                "Company: {$validated['company']}\n" .
                "Contact Person: {$validated['name']}\n" .
                "Email: {$validated['email']}\n" .
                "Phone: {$validated['phone']}\n\n" .
                "Products Interested In:\n{$validated['products']}\n\n" .
                "Quantity Needed: {$validated['quantity']}\n\n" .
                "Additional Requirements:\n{$validated['message']}";

            Mail::raw(
                $bulkEmailContent,
                function ($message) use ($validated) {
                    $message->to(env('MAIL_TO_ADDRESS', 'admin@bloomshine.com'))
                            ->subject('New Bulk Order Inquiry from ' . $validated['company']);
                }
            );

            // Send confirmation to user
            Mail::raw(
                "Thank you for your bulk order inquiry!\n\n" .
                "We have received your requirements and our bulk sales team will contact you within 1 business day.\n\n" .
                "Inquiry Details:\n" .
                "Company: {$validated['company']}\n" .
                "Products: {$validated['products']}\n" .
                "Quantity: {$validated['quantity']}\n\n" .
                "Best regards,\n" .
                "BloomShine Team",
                function ($message) use ($validated) {
                    $message->to($validated['email'])
                            ->subject('Bulk Order Inquiry Received - BloomShine');
                }
            );

            return response()->json([
                'message' => 'Your bulk order inquiry has been submitted successfully! Our team will contact you within 1 business day.',
                'success' => true
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to submit inquiry. Please try again later.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
