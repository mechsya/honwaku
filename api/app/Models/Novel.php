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
        if (filter_var(str_replace(' ', '%20', $this->cover), FILTER_VALIDATE_URL)) {
            return $this->cover;
        } else {
            return asset('storage/' . $this->cover);
        }
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
