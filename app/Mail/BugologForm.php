<?php

namespace App\Mail;

use App\Actions\ReplaceBase64byEmbeddedPath;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\File;

class BugologForm extends Mailable
{
    use Queueable, SerializesModels;

    public $fromEmail;
    public $fromName;
    public $subject;
    public $data;
    public $files;
    public $imagePathsAttached;

    public function __construct($fromEmail, $fromName, $subject, $data, $files)
    {
        $this->fromEmail = $fromEmail;
        $this->fromName = $fromName;
        $this->subject = $subject;
        $this->data = $data;
        $this->files = $files;
        $this->imagePathsAttached = [];
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('support@bugolog.com', $this->fromName),
            replyTo: [
                new Address($this->fromEmail, $this->fromName),
            ],
            subject: $this->subject
        );
    }

    public function attachments(): array
    {
        $attachments = [];

        if ($this->files) {
            foreach ($this->files as $file) {
                $attachments[] = Attachment::fromData(fn () => file_get_contents($file), basename($file))
                    ->withMime(File::mimeType($file));
            }
        }

        return $attachments;
    }

    public function content(): Content
    {

        return new Content(
            view: 'emails.bugolog',
            with: [
                'name' => $this->fromName,
                'issueDescription' => $this->data
            ]
        );
    }


}
