<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Especialidade;
use App\Models\Medico;
use Faker\Generator as Faker;

$factory->define(Medico::class, function (Faker $faker) {
    return [
        'nome'              => $faker->firstName . ' ' . $faker->lastName,
        'crm'             =>   '11111'. $faker->randomDigit . '/ES',
        'telefone'          => '2277112277',
    ];
});
