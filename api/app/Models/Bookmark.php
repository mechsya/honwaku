<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    protected $guarded = ["id"];

    public function novel()
    {
        return $this->belongsTo(Novel::class);
    }
}
