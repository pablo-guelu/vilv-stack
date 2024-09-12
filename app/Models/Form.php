<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Form extends Model
{
    use HasFactory;

    // Disable auto-incrementing
    public $incrementing = false;

    // Set the primary key type to string
    protected $keyType = 'string';

    // Automatically generate UUIDs for new models
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function setting(): HasOne
    {
        return $this->hasOne(Setting::class);
    }
}
