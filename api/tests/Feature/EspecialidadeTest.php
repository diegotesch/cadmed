<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Especialidade;
use Laravel\Passport\Passport;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class EspecialidadeTest extends TestCase
{
    use DatabaseMigrations;

    public function testListarEspecialidades()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        factory(Especialidade::class)->create();

        $this->get('api/especialidades')
            ->assertStatus(200);
    }

}
