<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $guarded = ["id"];

    protected $appends = ['banner_url'];

    public function getBannerUrlAttribute()
    {
        return $this->banner
            ? asset('storage/' . $this->banner)
            : null;
    }
}
