<?php

namespace App\Models;

use App\Http\Controllers\Tools\FormatTime;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{

    protected $guarded = ["id"];

    public function getCreatedAtAttribute($value)
    {
        return FormatTime::format($value);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likeHistory()
    {
        return $this->hasMany(LikeHistory::class);
    }

    public function novel()
    {
        return $this->belongsTo(novel::class);
    }

    public function report()
    {
        return $this->hasMany(Report::class);
    }
}
