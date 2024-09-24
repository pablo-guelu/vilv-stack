<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Image; // Assuming Image model is defined in App\Models

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048', // 2MB Max
            'form_id' => 'required|string',
            'alt_text' => 'nullable|string',
        ]);

        $image = $request->file('image');
        $formId = $request->input('form_id');
        $imageId = Str::uuid()->toString();
        $filename = $image->getClientOriginalName();
        $path = Storage::disk('public')->putFileAs("forms/{$formId}/images", $image, $filename);

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
                'alt_text' => $request->input('alt_text'),
            ]);

            $savedImage = $existingImage;
        } else {
            // Store the new image
            $path = Storage::disk('public')->putFileAs("forms/{$formId}/images", $image, $filename);

            // Save the new image information to the database
            $savedImage = Image::create([
                'id' => $imageId,
                'form_id' => $formId,
                'path' => $path,  // Make sure this line is included
                'filename' => $filename,
                'mimetype' => $image->getMimeType() ?? 'application/octet-stream',
                'size' => $image->getSize(),
                'alt_text' => $request->input('alt_text'),
            ]);
        }

        return redirect()->route('form.edit', $formId)->with([
            'src' => $path,
            'alt' => $request->input('alt_text'),   
        ]);
    }

    // public function getImage($id)
    // {
    //     $path = "private/images/{$id}";

    //     if (!Storage::disk('local')->exists($path)) {
    //         abort(404);
    //     }

    //     $file = Storage::disk('local')->get($path);
    //     $type = Storage::disk('local')->mimeType($path);

    //     return response($file, 200)->header('Content-Type', $type);
    // }
}
