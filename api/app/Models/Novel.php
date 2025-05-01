<?php

namespace App\Models;

use App\Http\Controllers\Tools\FormatTime;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Novel extends Model
{
    protected $guarded = ["id"];

    protected $appends = ['cover_url'];

    protected $casts = [
        'tags' => 'array',
    ];

    public function getCoverUrlAttribute()
    {
        return $this->cover
            ? asset('storage/' . $this->cover)
            : null;
    }

    public function getCreatedAtAttribute($value)
    {
        return FormatTime::format($value);
    }

    public function chapter()
    {
        return $this->hasMany(Chapter::class);
    }

    public function comment()
    {
        return $this->hasMany(Comment::class);
    }

    public function bookmark()
    {
        return $this->hasMany(Bookmark::class);
    }

    public function history()
    {
        return $this->hasMany(History::class);
    }
}
