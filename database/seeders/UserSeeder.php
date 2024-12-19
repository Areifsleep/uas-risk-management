<?php

namespace Database\Seeders;

use App\Models\Faculty;
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
            'name' => 'Agus',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),

        ]);

        $admin->assignRole(RoleEnum::SuperAdmin);

        $rektor = User::create([
            'name' => 'Rektor',
            'email' => "rektor@gmail.com",
            "password" => bcrypt('12345678')
        ]);

        $rektor->assignRole(RoleEnum::Rektor);

        $list_admin_fakultass = [
            [
                'name' => 'Asep',
                'email' => "fst@gmail.com",
                'faculties_id' => 'FST'
            ],
            [
                'name' => 'Septi',
                'email' => 'adab@gmail.com',
                'faculties_id' => 'ADAB'
            ],
            [
                'name' => 'Dewi',
                'email' => 'dakwah@gmail.com',
                'faculties_id' => 'DAKOM',
            ],
            [
                'name' => 'Rudi',
                'email' => 'ftik@gmail.com',
                'faculties_id' => 'FTIK'
            ],
            [
                'name' => 'Siti',
                'email' => 'soshum@gmail.com',
                'faculties_id' => 'SOSHUM'
            ],
            [
                'name' => 'Budi',
                'email' => "febi@gmail.com",
                'faculties_id' => 'FEBI'
            ]
        ];

        foreach ($list_admin_fakultass as $list_admin_fakultas) {
            $faculty = isset($list_admin_fakultas['faculties_id'])
            ? Faculty::where('short_name', $list_admin_fakultas['faculties_id'])->first()
            : null;
            $admin_fakultas = User::create([
                'name' => $list_admin_fakultas['name'],
                'email' => $list_admin_fakultas['email'],
                'password' => bcrypt('12345678'),
                'faculties_id' => $faculty ? $faculty->id : null
            ]);
            $admin_fakultas->assignRole(RoleEnum::AdminFakultas);
        }

    }
}
