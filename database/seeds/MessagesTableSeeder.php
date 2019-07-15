<?php

use Illuminate\Database\Seeder;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1 ; $i <= 10 ; $i++) {

            \App\Message::create([
                'user_id' => 7,
                'proposition_id' => 4,
                'content' => $i .'番目のテキスト'
            ]);

        }

        for($i = 11 ; $i <= 20 ; $i++) {

            \App\Message::create([
                'user_id' => 8,
                'proposition_id' => 4,
                'content' => $i .'番目のテキスト'
            ]);

        }

    }
}
