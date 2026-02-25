<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Hamza',
            'email' => 'hamza@siratalquran.com',
            'password' => Hash::make('hamza@3284'),
            'role' => 'user',
        ]);
    }
}

