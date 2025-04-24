<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Identity extends Model
{
    protected $guarded = ["id"];

    protected $appends = ['picture_url'];

    public function getPictureUrlAttribute()
    {
        return $this->picture
            ? asset('storage/picture/' . $this->picture)
            : null;
    }

    public function user()
    {
        $this->belongsTo(User::class);
    }
}
