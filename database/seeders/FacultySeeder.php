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
        $user = User::find(3);

        if (!$user) {
            // Jika tidak ada user, seeder akan berhenti dengan pesan error
            $this->command->error('Tidak ada user ditemukan. Buat user terlebih dahulu.');
            return;
        }

    $faculties = [
            ['name' => 'Sains Dan Teknologi', 'short_name' => 'FST', 'created_by' => $user->id],
            ['name' => 'Adab dan Ilmu Budaya', 'short_name' => 'ADAB', 'created_by' => $user->id],
            ['name' => 'Dakwah dan Komunikasi', 'short_name' => 'DAKOM', 'created_by' => $user->id],
            ['name' => 'Tarbiyah dan Keguruan', 'short_name' => 'TARBIYAH', 'created_by' => $user->id],
            ['name' => 'Ilmu Sosial dan Humaniora', 'short_name' => 'SOSHUM', 'created_by' => $user->id],
            ['name' => 'Ekonomi dan Bisnis Islam', 'short_name' => 'FEBI', 'created_by' => $user->id],
        ];

        foreach ($faculties as $faculty) {
            Faculty::create($faculty);
        }

        $this->command->info('Data faculties berhasil disimpan dengan created_by.');
    }
}
