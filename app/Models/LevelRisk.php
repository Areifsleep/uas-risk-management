<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LevelRisk extends Model
{
    protected $fillable = ['label', 'secondary_label', 'rating'];
}
