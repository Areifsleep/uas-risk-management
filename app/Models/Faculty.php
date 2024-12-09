<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $fillable = ['name', 'short_name'];

    public function risks()
    {
        return $this->hasMany(Risk::class, 'faculties_id');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'faculties_id');
    }
}
