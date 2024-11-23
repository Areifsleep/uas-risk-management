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
        Role::create(['name' => 'kaprodi']);

        Permission::create(['name' => 'tambah_user']);
        Permission::create(['name' => 'edit_user']);
        Permission::create(['name' => 'hapus_user']);

        Permission::create(['name' => 'tambah_fakultas']);
        Permission::create(['name' => 'edit_fakultas']);
        Permission::create(['name' => 'hapus_fakultas']);
        
        Permission::create(['name' => 'tambah_prodi']);
        Permission::create(['name' => 'edit_prodi']);
        Permission::create(['name' => 'hapus_prodi']);

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
        $roleAdmin->givePermissionTo('tambah_prodi');
        $roleAdmin->givePermissionTo('edit_prodi');
        $roleAdmin->givePermissionTo('hapus_prodi');
        $roleAdmin->givePermissionTo('tambah_resiko');
        $roleAdmin->givePermissionTo('edit_resiko');
        $roleAdmin->givePermissionTo('hapus_resiko');
        $roleAdmin->givePermissionTo('setujui_resiko');

        $roleDekan = Role::findByName('dekan');
        $roleDekan->givePermissionTo('tambah_resiko');
        $roleDekan->givePermissionTo('edit_resiko');
        $roleDekan->givePermissionTo('hapus_resiko');
        $roleDekan->givePermissionTo('setujui_resiko');

        $roleKaprodi = Role::findByName('kaprodi');
        $roleKaprodi->givePermissionTo('tambah_resiko');
        $roleKaprodi->givePermissionTo('edit_resiko');
        $roleKaprodi->givePermissionTo('hapus_resiko');
        

        // Role::create(['name' => 'admin']);
        // Role::create(['name' => 'penulis']);

        // $roleAdmin = Role::findByName('admin');
        // $roleAdmin->givePermissionTo('tambah user');
        // $roleAdmin->givePermissionTo('edit user');
        // $roleAdmin->givePermissionTo('hapus user');
        // $roleAdmin->givePermissionTo('lihat user');

        // $rolePenulis = Role::findByName('penulis');
        // $rolePenulis->givePermissionTo('tambah tulisan');
        // $rolePenulis->givePermissionTo('edit tulisan');
        // $rolePenulis->givePermissionTo('hapus tulisan');
        // $rolePenulis->givePermissionTo('lihat tulisan');
    }
}
