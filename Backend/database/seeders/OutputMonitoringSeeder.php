<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Faker\Factory as Faker;

class OutputMonitoringSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        $lineNames = ['SMT1', 'SMT2', 'SMT3', 'DIP1', 'DIP2', 'DIP3'];
        // $startDate = Carbon::create(2024, 7, 3, 0, 0, 0); // June 15, 2024
        // $endDate = Carbon::now();
        $startDate = Carbon::create(2024, 7, 5, 6, 0, 0); // June 15, 2024
        $endDate = Carbon::create(2024, 7, 5, 13, 30, 0);
        $recordsToGenerate = 50;
        $recordsGenerated = 0;

        while ($recordsGenerated < $recordsToGenerate) {
            // Generate a random datetime between $startDate and $endDate
            $randomDateTime = $faker->dateTimeBetween($startDate, $endDate);

            DB::table('output_monitorings')->insert([
                'date' => $randomDateTime->format('Y-m-d H:i:s'),
                'output' => $faker->numberBetween(0, 9),
                'lineName' => $faker->randomElement($lineNames),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Increment the generated records count
            $recordsGenerated++;
        }
    }
}
