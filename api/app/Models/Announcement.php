<?php

namespace App\Models;

use App\Http\Controllers\Tools\FormatTime;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $guarded = ["id"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getUpdatedAtAttribute($value)
    {
        return FormatTime::format($value);
    }
}
