<?php

namespace Database\Seeders;

use App\Models\Faculty;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

    $faculties = [
            ['name' => 'Sains Dan Teknologi', 'short_name' => 'FST', ],
            ['name' => 'Adab dan Ilmu Budaya', 'short_name' => 'ADAB', ],
            ['name' => 'Dakwah dan Komunikasi', 'short_name' => 'DAKOM', ],
            ['name' => 'Tarbiyah dan Keguruan', 'short_name' => 'FTIK', ],
            ['name' => 'Ilmu Sosial dan Humaniora', 'short_name' => 'SOSHUM', ],
            ['name' => 'Ekonomi dan Bisnis Islam', 'short_name' => 'FEBI', ],
        ];

        foreach ($faculties as $faculty) {
            Faculty::create($faculty);
        }

        $this->command->info('Data faculties berhasil disimpan dengan created_by.');
    }
}
