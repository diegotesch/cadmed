<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{

    public function run()
    {
        User::create([
            'name' => 'Usuário Teste',
            'email' => 'usuario@teste.com.br',
            'password' => bcrypt(123456)
        ]);
    }
}
