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

        Role::create(['name' => 'admin']);
        Role::create(['name' => 'rektor']);
        Role::create(['name' => 'dekan']);

        Permission::create(['name' => 'tambah_user']);
        Permission::create(['name' => 'edit_user']);
        Permission::create(['name' => 'hapus_user']);

        Permission::create(['name' => 'tambah_fakultas']);
        Permission::create(['name' => 'edit_fakultas']);
        Permission::create(['name' => 'hapus_fakultas']);
        
        Permission::create(['name' => 'tambah_resiko']);
        Permission::create(['name' => 'edit_resiko']);
        Permission::create(['name' => 'hapus_resiko']);
        Permission::create(['name' => 'setujui_resiko']);

        $roleAdmin = Role::findByName('admin');
        $roleAdmin->givePermissionTo('tambah_user');
        $roleAdmin->givePermissionTo('edit_user');
        $roleAdmin->givePermissionTo('hapus_user');
        $roleAdmin->givePermissionTo('tambah_fakultas');
        $roleAdmin->givePermissionTo('edit_fakultas');
        $roleAdmin->givePermissionTo('hapus_fakultas');
        $roleAdmin->givePermissionTo('tambah_resiko');
        $roleAdmin->givePermissionTo('edit_resiko');
        $roleAdmin->givePermissionTo('hapus_resiko');
        $roleAdmin->givePermissionTo('setujui_resiko');

        $roleDekan = Role::findByName('dekan');
        $roleDekan->givePermissionTo('tambah_resiko');
        $roleDekan->givePermissionTo('edit_resiko');
        $roleDekan->givePermissionTo('hapus_resiko');
        $roleDekan->givePermissionTo('setujui_resiko');
    }
}
