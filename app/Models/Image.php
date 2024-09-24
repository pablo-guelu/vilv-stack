<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Image extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'form_id',
        'alt_text',
        'src',
        'filename',
        'mimetype',
        'size',
        'path',
        // Add any other fields that should be fillable
    ];

    /**
     * Get the form that owns the image.
     */
    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }
}
