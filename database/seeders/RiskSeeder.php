<?php

namespace Database\Seeders;

use App\Models\Risk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RiskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Menggunakan factory
        Risk::factory()->count(5)->create();
    }
}
