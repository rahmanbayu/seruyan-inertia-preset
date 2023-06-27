<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([ 'name' => 'super admin']);
        $role = Role::create([ 'name' => 'admin']);
        Role::create([ 'name' => 'user']);

        $role->givePermissionTo([1,2,3]);

        $user = User::find(1);
        $user->assignRole('super admin');        
        $user = User::find(2);
        $user->assignRole('admin');
    }
}
