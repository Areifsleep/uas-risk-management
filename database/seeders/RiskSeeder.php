<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Risk;
use Carbon\Carbon;

class RiskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Menentukan jumlah risk yang akan dibuat per hari
        $this->createRisksForDay(1, 10); // 20 risk untuk hari Senin
        $this->createRisksForDay(2, 5); // 30 risk untuk hari Selasa
        $this->createRisksForDay(3, 15); // 40 risk untuk hari Rabu
        $this->createRisksForDay(4, 22); // 50 risk untuk hari Kamis
        $this->createRisksForDay(5, 1); // 60 risk untuk hari Jumat
        $this->createRisksForDay(6, 0); // 70 risk untuk hari Sabtu
        $this->createRisksForDay(7, 45); // 80 risk untuk hari Minggu
    }

    /**
     * Fungsi untuk membuat risk berdasarkan hari dalam minggu
     *
     * @param int $dayOfWeek
     * @param int $count
     * @return void
     */
    private function createRisksForDay(int $dayOfWeek, int $count)
    {
        // Membuat sejumlah risk untuk hari tersebut dengan factory
        Risk::factory()->count($count)->create([
            'created_at' => $this->getCreatedAtForDay($dayOfWeek), // Set tanggal berdasarkan hari
            'updated_at' => $this->getCreatedAtForDay($dayOfWeek),
        ]);
    }

    /**
     * Fungsi untuk menentukan tanggal berdasarkan hari dalam minggu
     *
     * @param int $dayOfWeek
     * @return \Carbon\Carbon
     */
    private function getCreatedAtForDay(int $dayOfWeek): Carbon
    {
        $startOfWeek = Carbon::now()->startOfWeek(); // Mendapatkan hari Senin pada minggu ini
        return $startOfWeek->copy()->addDays($dayOfWeek - 1); // Mengatur tanggal untuk hari yang sesuai
    }
}
