<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'email' => 'superadmin@gmail.com',
            'name' => 'superadmin',
        ]);        
        \App\Models\User::factory()->create([
            'email' => 'admin@gmail.com',
            'name' => 'admin',
        ]);
        \App\Models\User::factory()->create([
            'email' => 'permission@gmail.com',
            'name' => 'permission',
        ]);        
        \App\Models\User::factory()->create([
            'email' => 'norolenopermission@gmail.com',
            'name' => 'norolenopermission',
        ]);

        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
        ]);

    }
}
