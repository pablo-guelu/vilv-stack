<?php

namespace App\Mail;

use CapsulesCodes\InertiaMailable\Mail\Mailable;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use CapsulesCodes\InertiaMailable\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Support\Facades\File;

class InertiaVuetiMail extends Mailable
{
    public $data;
    public $fromName;
    public $fromEmail;
    public $subject;
    public $files;
    public $settings;

    public function __construct($data, $fromName, $fromEmail, $subject, $files, $settings)
    {
        $this->data = $data;
        $this->fromName = $fromName;
        $this->fromEmail = $fromEmail;
        $this->subject = $subject;
        $this->files = $files;
        $this->settings = $settings;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address($this->fromEmail, $this->fromName),
            replyTo: [
                new Address($this->fromEmail, $this->fromName),
            ],
            to: $this->parseAddresses(json_decode($this->settings->recipients)),
            cc: $this->parseAddresses(json_decode($this->settings->ccs)),
            subject: $this->subject
        );
    }

    private function parseAddresses($addresses): array
    {
        if (is_string($addresses)) {
            return [new Address($addresses)];
        }

        return array_map(function ($address) {
            return new Address($address);
        }, $addresses);
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
            view: 'VuetiMail', 
            props: [
                'data' => $this->data,
            ]);
    }

}
