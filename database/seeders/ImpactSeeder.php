<?php

namespace Database\Seeders;

use App\Models\Impact;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImpactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $impacts = [
            ['label' => 'Insignificant', 'secondary_label' => 'Sangat Rendah', 'rating' => 1],
            ['label' => 'Minor', 'secondary_label' => 'Rendah', 'rating' => 2],
            ['label' => 'Moderate', 'secondary_label' => 'Sedang', 'rating' => 3],
            ['label' => 'Major', 'secondary_label' => 'Tinggi', 'rating' => 4],
            ['label' => 'Catastrophic', 'secondary_label' => 'Sangat tinggi', 'rating' => 5],
        ];

        foreach ($impacts as $impact) {
            Impact::create($impact);
        }
    }
}
