<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Risk>
 */
class RiskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $likelihood_id = $this->faker->numberBetween(1, 5);
        $impact_id = $this->faker->numberBetween(1, 5);

        // Menentukan hari dan jumlah risk berdasarkan hari tertentu
        $dayOfWeek = Carbon::now()->dayOfWeek; // Menentukan hari dalam minggu (0 = Minggu, 1 = Senin, dst)
        $createdAt = $this->getCreatedAtForDay($dayOfWeek);

        return [
            'name' => fake()->word(),
            'description' => fake()->sentence(),
            'potential_disadvantages' => strval(fake()->numberBetween(1000000, 100000000)),
            'risk_source' => fake()->randomElement(['Internal', 'External']),
            'faculties_id' => 1,
            'created_by' => 3,
            'updated_by' => 3,
            'likelihood_id' => $likelihood_id,
            'impact_id' => $impact_id,
            'level_risk' => $likelihood_id * $impact_id,
            'created_at' => $createdAt, // Menggunakan tanggal yang disesuaikan
            'updated_at' => $createdAt, // Sesuaikan dengan created_at jika diperlukan
        ];
    }

    /**
     * Fungsi untuk menentukan tanggal created_at berdasarkan hari.
     *
     * @param int $dayOfWeek
     * @return \Carbon\Carbon
     */
    private function getCreatedAtForDay(int $dayOfWeek): Carbon
    {
        $startOfWeek = Carbon::now()->startOfWeek(); // Mendapatkan hari Senin pada minggu ini
        $dateForDay = $startOfWeek->copy()->addDays($dayOfWeek - 1); // Menentukan tanggal sesuai hari dalam minggu (1 = Senin, dst)

        return $dateForDay;
    }
}
