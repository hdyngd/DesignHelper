<?php
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'admin',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'),
                'role' => 0,
                'remember_token' => null,
                'created_at' => '2019-06-01 14:28:19',
                'updated_at' => '2019-06-01 14:28:19'
            ]
        ]);
    }
}