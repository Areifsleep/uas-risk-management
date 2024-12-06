<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RiskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $risks = [
            [
                'name' => 'Risiko 3',
                'description' => 'Deskripsi Risiko 3',
                'potential_disadvantages' => 'Kerugian Risiko 3',
                'risk_source' => 'internal',
                'is_approved' => true,
                'faculties_id' => 3,
                'created_by' => 3,
                'updated_by' => 3,
                'approved_by' => 3,
                'likelihood_id' => 3,
                'impact_id' => 3,
                'level_risk_id' => 3,
            ],
            [
                'name' => 'Risiko 2',
                'description' => 'Deskripsi Risiko 2',
                'potential_disadvantages' => 'Kerugian Risiko 2',
                'risk_source' => 'external',
                'is_approved' => true,
                'faculties_id' => 3,
                'created_by' => 3,
                'updated_by' => 3,
                'approved_by' => 3,
                'likelihood_id' => 2,
                'impact_id' => 2,
                'level_risk_id' => 2,
            ],
            [
                'name' => 'Risiko 3',
                'description' => 'Deskripsi Risiko 3',
                'potential_disadvantages' => 'Kerugian Risiko 3',
                'risk_source' => 'internal',
                'is_approved' => true,
                'faculties_id' => 3,
                'created_by' => 3,
                'updated_by' => 3,
                'approved_by' => 3,
                'likelihood_id' => 3,
                'impact_id' => 3,
                'level_risk_id' => 3,
            ],
        ];

        foreach ($risks as $risk) {
            \App\Models\Risk::create($risk);
        }
    }
}
