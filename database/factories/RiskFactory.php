<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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

        return [
                'name' => fake()->word(),
                'description' => fake()->sentence(),
                'potential_disadvantages' => strval(fake()->numberBetween(1000, 10000)),
                'risk_source' => fake()->randomElement(['Internal', 'External']),
                'is_approved' => true,
                'faculties_id' => fake()->numberBetween(1, 2),
                'created_by' => 2,
                'updated_by' => 2,
                'approved_by' => 3,
                'likelihood_id' => $likelihood_id,
                'impact_id' => $impact_id,
                'level_risk' => $likelihood_id * $impact_id, 
        ];
    }
}
