<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Identity extends Model
{
    protected $guarded = ["id"];

    protected $appends = ['picture_url'];

    public function getPictureUrlAttribute()
    {
        return $this->profile_picture
            ? asset('storage/picture/' . $this->profile_picture)
            : null;
    }

    public function user()
    {
        $this->belongsTo(User::class);
    }
}
