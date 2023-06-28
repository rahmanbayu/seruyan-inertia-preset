<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'manage users']);
        Permission::create(['name' => 'manage post']);
        Permission::create(['name' => 'manage reports']);
        Permission::create(['name' => 'direct login']);

        $user = User::find(3);
        $user->givePermissionTo(['manage users', 'manage post', 'manage reports']);
    }
}
