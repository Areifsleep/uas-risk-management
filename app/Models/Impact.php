<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Impact extends Model
{
    protected $fillable = ['label', 'secondary_label', 'rating'];

    public function risks()
    {
        return $this->hasMany(Risk::class, 'impact_id');
    }
}
