<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mitigation extends Model
{
    protected $table = 'mitigations';
    protected $fillable = ['risks_id', 'plan'];

    public function risk()
    {
        return $this->belongsTo(Risk::class, 'risks_id');
    }
}
