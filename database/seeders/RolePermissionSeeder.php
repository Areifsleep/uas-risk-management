<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'tambah user']);
        Permission::create(['name' => 'edit user']);
        Permission::create(['name' => 'hapus user']);
        Permission::create(['name' => 'lihat user']);

        Permission::create(['name' => 'tambah tulisan']);
        Permission::create(['name' => 'edit tulisan']);
        Permission::create(['name' => 'hapus tulisan']);
        Permission::create(['name' => 'lihat tulisan']);


        Role::create(['name' => 'admin']);
        Role::create(['name' => 'penulis']);

        $roleAdmin = Role::findByName('admin');
        $roleAdmin->givePermissionTo('tambah user');
        $roleAdmin->givePermissionTo('edit user');
        $roleAdmin->givePermissionTo('hapus user');
        $roleAdmin->givePermissionTo('lihat user');

        $rolePenulis = Role::findByName('penulis');
        $rolePenulis->givePermissionTo('tambah tulisan');
        $rolePenulis->givePermissionTo('edit tulisan');
        $rolePenulis->givePermissionTo('hapus tulisan');
        $rolePenulis->givePermissionTo('lihat tulisan');
    }
}
