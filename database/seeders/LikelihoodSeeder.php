<?php

namespace Database\Seeders;

use App\Models\Likelihood;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikelihoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $likelihoods = [
            ['label' => 'Rare', 'rating' => 1, 'description' => 'Hampir tidak pernah terjadi', 'precentage_range' => '0-20%'],
            ['label' => 'Unlikely', 'rating' => 2, 'description' => 'Bisa/mungkin terjadi', 'precentage_range' => '21-50%'],
            ['label' => 'Moderate', 'rating' => 3, 'description' => 'Jarang terjadi', 'precentage_range' => '51-70%'],
            ['label' => 'Likely', 'rating' => 4, 'description' => 'Sering terjadi', 'precentage_range' => '71-90%'],
            ['label' => 'Almost Certain', 'rating' => 5, 'description' => 'Hampir pasti selalu terjadi', 'precentage_range' => '91-100%'],
        ];

        foreach ($likelihoods as $likelihood) {
            Likelihood::create($likelihood);
        }
    }
}
