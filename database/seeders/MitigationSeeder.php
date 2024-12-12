<?php

namespace Database\Seeders;

use App\Models\Risk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MitigationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $risks = Risk::all();

        foreach ($risks as $risk) {
            $risk->mitigations()->createMany([
                ['plan' => 'Mengurangi jumlah mahasiswa yang masuk'],
                ['plan' => 'Mengurangi jumlah dosen yang masuk'],
                ['plan' => 'Mengurangi jumlah pegawai yang masuk'],
            ]);
        }
    }
}
