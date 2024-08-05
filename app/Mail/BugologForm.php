<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use MailerSend\Helpers\Builder\Personalization;
use MailerSend\Helpers\Builder\Variable;
use MailerSend\LaravelDriver\MailerSendTrait;

class BugologForm extends Mailable
{
    use Queueable, SerializesModels, MailerSendTrait;

    public $fromEmail;
    public $fromName;
    // protected $data;

    /**
     * Create a new message instance.
     * 
     * @param string $fromEmail
     * 
     * @param string $fromName
     */
    public function __construct($fromEmail, $fromName)
    {
        $this->fromEmail = $fromEmail;
        $this->fromName = $fromName;
        // $this->data = $data;
    }

    // dd($this->fromEmail);

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('support@bugolog.com', $this->fromName),
            replyTo: [
                new Address($this->fromEmail, $this->fromName),
            ],
            subject: 'Test Email'
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.bugolog',
            // with: ['data' => $this->data]
        );
    }

}