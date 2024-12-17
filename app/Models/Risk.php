<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Risk extends Model
{

    use HasFactory;
    
    protected $fillable = [
        'name',
        'description',
        'faculties_id',
        'likelihood_id',
        'impact_id',
        'level_risk',
        'risk_source',
        'potential_disadvantages',
        'created_by',
        'updated_by',
    ];

    // Menghubungkan ke user yang membuat (created_by)
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Menghubungkan ke user yang mengupdate (updated_by)
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class, 'faculties_id');
    }

    public function likelihood()
    {
        return $this->belongsTo(Likelihood::class, 'likelihood_id');
    }

    public function impact()
    {
        return $this->belongsTo(Impact::class, 'impact_id');
    }

    public function mitigations()
    {
        return $this->hasMany(Mitigation::class, 'risk_id');
    }

}
