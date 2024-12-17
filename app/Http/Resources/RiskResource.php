<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RiskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'potential_disadvantages' => $this->potential_disadvantages,
            'risk_source' => $this->risk_source,
            'is_approved' => $this->is_approved,
            'faculties' =>[
                'id' => $this->faculty->id,
                'name' => $this->faculty->name,
                'short_name' => $this->faculty->short_name,
            ],
            'creator' => [
                'id' => $this->creator->id,
                'name' => $this->creator->name,
                'email' => $this->creator->email,
            ],
            'updater' => [
                'id' => $this->updater->id ?? null,
                'name' => $this->updater->name ?? null,
                'email' => $this->updater->email ?? null,
            ],
            'likelihood' => $this->likelihood,
            'impact' => $this->impact,
            'level_risk' => $this->level_risk,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}
