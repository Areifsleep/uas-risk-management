<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Risk extends Model
{
    protected $fillable = [
        'name',
        'description',
        'potential_disadvantages',
        'risk_source',
        'is_approved',
        'faculties_id',
        'created_by',
        'updated_by',
        'approved_by',
        'likelihood_id',
        'impact_id',
        'level_risk_id',
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

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
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

}
