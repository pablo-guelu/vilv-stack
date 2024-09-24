<?php

namespace App\Actions;

use App\Models\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SaveImageAction
{
    public function execute(UploadedFile $image, string $formId, ?string $altText = null): Image
    {
        $imageId = Str::uuid()->toString();
        $filename = $image->getClientOriginalName();

        // Check if an image with the same filename already exists
        $existingImage = Image::where('form_id', $formId)
                              ->where('filename', $filename)
                              ->first();

        if ($existingImage) {
            // Delete the old file
            Storage::disk('public')->delete($existingImage->path);
            
            // Update the existing image record
            $path = Storage::disk('public')->putFileAs("forms/{$formId}/images", $image, $filename);
            $existingImage->update([
                'path' => $path,
                'mimetype' => $image->getMimeType() ?? 'application/octet-stream',
                'size' => $image->getSize(),
                'alt_text' => $altText,
            ]);

            return $existingImage;
        } else {
            // Store the new image
            $path = Storage::disk('public')->putFileAs("forms/{$formId}/images", $image, $filename);

            // Save the new image information to the database
            return Image::create([
                'id' => $imageId,
                'form_id' => $formId,
                'path' => $path,
                'filename' => $filename,
                'mimetype' => $image->getMimeType() ?? 'application/octet-stream',
                'size' => $image->getSize(),
                'alt_text' => $altText,
            ]);
        }
    }
}
