<?php

namespace App\Models;

use App\Http\Controllers\Tools\FormatTime;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $guarded = ["id"];

    public function getUpdatedAtAttribute($value)
    {
        return FormatTime::format($value);
    }

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }
}
