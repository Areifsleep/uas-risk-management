<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Likelihood extends Model
{
    protected $fillable = ['label', 'rating', 'description', 'precentage_range'];

    public function risks()
    {
        return $this->hasMany(Risk::class, 'likelihood_id');
    }
}
