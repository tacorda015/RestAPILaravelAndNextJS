<?php

namespace Database\Seeders;

use App\Models\SampleFood;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SampleFoodsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SampleFood::truncate(); // Clear existing records if any

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 50; $i++) {
            SampleFood::create([
                'name' => $faker->name,
                'calories' => $faker->numberBetween(100, 1000),
                'fat' => number_format($faker->randomFloat(2, 0, 20), 2),
                'carbs' => number_format($faker->randomFloat(2, 0, 100), 2),
                'protein' => number_format($faker->randomFloat(2, 0, 50), 2),
                'type' => $faker->randomElement(['Dessert', 'Main Course', 'Starter', 'Soup'])
            ]);
        }
    }

}
