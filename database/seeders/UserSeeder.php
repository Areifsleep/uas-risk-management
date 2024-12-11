<?php

namespace Database\Seeders;

use App\Models\User;
use App\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Contracts\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),

        ]);

        $admin->assignRole(RoleEnum::SuperAdmin);

        $rektor = User::create([
            'name' => 'Prayogo Latupono',
            'email' => "rektor@gmail.com",
            "password" => bcrypt('12345678')
        ]);

        $rektor->assignRole(RoleEnum::Rektor);

        $admin_fakultas = User::create([
            'name' => 'fst',
            'email' => "fst@gmail.com",
            "password" => bcrypt('12345678'),
            'faculties_id' => 1
        ]);

        $admin_fakultas->assignRole(RoleEnum::AdminFakultas);

    }
}
