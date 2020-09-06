<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Medico;
use Laravel\Passport\Passport;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class MedicoTest extends TestCase
{
    use DatabaseMigrations;

    public function testListarMedicos()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        factory(Medico::class)->create();

        $this->get('api/medicos')
            ->assertStatus(200);
    }

    public function testListarMedicoPeloId()
    {
        $medico = factory(Medico::class)->create();
        Passport::actingAs(
            factory(User::class)->create()
        );

        $response = $this->get('api/medicos/' . $medico->id);
        $response->assertStatus(200);
    }

    public function testListarMedicoIdInexistente()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $response = $this->get('api/medicos/1');
        $response->assertNotFound();
    }

    public function testCadastrarMedico()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $medico = [
            'nome' => 'John Doe',
            'crm' => '111111/ES',
            'telefone' => '22776615441',
            'especialidades' => [1, 2]
        ];
        $response = $this->post('api/medicos', $medico);
        $response->assertStatus(201)
            ->assertJson([
                'id' => 1
            ]);

    }

    public function testCadastrarMedicoSemCrm()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $medico = [
            'nome' => 'john Doe',
            'telefone' => '22776615441',
        ];
        $response = $this->post('api/medicos', $medico);
        $response->assertStatus(500);
    }

    // ATUALIZAR
    public function testAtualizarMedico()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $medico = factory(Medico::class)->create();
        $update = [
            'id' => $medico->id,
            'nome' => 'john doe',
            'crm' => $medico->crm,
            'telefone' => $medico->telefone,
            'especialidades' => [1, 2]
        ];

        $response = $this->put('api/medicos', $update);
        $response->assertStatus(200)
            ->assertJson([
                'id' => 1,
                'nome' => 'john doe'
            ]);

    }

    public function testExcluirMedico()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $medico = factory(Medico::class)->create();
        $response = $this->delete('api/medicos/' . $medico->id)
            ->assertNoContent();
    }

    public function testExcluirMedicoInexistente()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $response = $this->delete('api/medicos/100')
            ->assertStatus(404)
            ->assertJson([
                'error' => 'Página não encontrada'
            ]);
    }
}
