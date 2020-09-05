<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Cliente;
use Laravel\Passport\Passport;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ClientTest extends TestCase
{
    use DatabaseMigrations;

    public function testListarClientes()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        factory(Cliente::class)->create();

        $this->get('api/cliente')
            ->assertStatus(200);
    }

    public function testListarClientePeloId()
    {
        $cliente = factory(Cliente::class)->create();
        Passport::actingAs(
            factory(User::class)->create()
        );

        $response = $this->get('api/cliente/' . $cliente->id);
        $response->assertStatus(200);
    }

    public function testListarClienteIdInexistente()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $response = $this->get('api/cliente/1');
        $response->assertNotFound();
    }

    public function testCadastrarCliente()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $cliente = [
            'nome' => 'cliente',
            'email' => 'cliente@teste.com.br',
            'telefone' => '1233221212',
            'data_nascimento' => '1988-10-10'
        ];
        $response = $this->post('api/cliente', $cliente);
        $response->assertStatus(201)
            ->assertJson([
                'data' => [
                    'id' => 1
                ]
            ]);

    }

    public function testCadastrarClienteSemTelefoneEDataNascimento()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $cliente = [
            'nome' => 'cliente',
            'email' => 'cliente@teste.com.br',
            'telefone' => null,
            'data_nascimento' => null
        ];
        $response = $this->post('api/cliente', $cliente);
        $response->assertStatus(201)
            ->assertJson([
                'data' => [
                    'id' => 1
                ]
            ]);
    }

    public function testCadastrarClienteSemNome()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $cliente = [
            'nome' => null,
            'email' => 'cliente@teste.com.br',
            'telefone' => null,
            'data_nascimento' => null
        ];
        $response = $this->post('api/cliente', $cliente);
        $response->assertStatus(404)
            ->assertJson([
                'data' => [
                    'nome' => ['The nome field is required.']
                ]
            ]);
    }

    public function testCadastrarClienteSemEmail()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $cliente = [
            'nome' => 'cliente',
            'email' => null,
            'telefone' => null,
            'data_nascimento' => null
        ];
        $response = $this->post('api/cliente', $cliente);
        $response->assertStatus(404)
            ->assertJson([
                'data' => [
                    'email' => ['The email field is required.']
                ]
            ]);
    }

    // ATUALIZAR
    public function testAtualizarCliente()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $cliente = factory(Cliente::class)->create();
        $update = [
            'id'    => $cliente->id,
            'nome' => 'cliente update',
            'email' => $cliente->email,
            'telefone' => $cliente->telefone,
            'data_nascimento' => $cliente->data_nascimento
        ];
        $response = $this->put('api/cliente/' . $cliente->id, $update);
        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'nome' => 'cliente update'
                ]
            ]);

    }

    public function testAtualizarClienteSemTelefoneEDataNascimento()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $cliente = factory(Cliente::class)->create();
        $update = [
            'id'                => $cliente->id,
            'nome'              => $cliente->nome,
            'email'             => $cliente->email,
            'telefone'          => null,
            'data_nascimento'   => null
        ];
        $response = $this->put('api/cliente/' . $cliente->id, $update);
        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id'                => 1,
                    'telefone'          => null,
                    'data_nascimento'   => null
                ]
            ]);
    }

    public function testAtualizarClienteSemNome()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $cliente = factory(Cliente::class)->create();
        $update = [
            'id'                => $cliente->id,
            'nome'              => null,
            'email'             => $cliente->email,
            'telefone'          => null,
            'data_nascimento'   => null
        ];
        $response = $this->put('api/cliente/' . $cliente->id, $update);
        $response->assertStatus(404)
            ->assertJson([
                'data' => [
                    'nome' => ['The nome field is required.']
                ]
            ]);
    }

    public function testAtualizarClienteSemEmail()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $cliente = factory(Cliente::class)->create();
        $update = [
            'id'                => $cliente->id,
            'nome'              => $cliente->nome,
            'email'             => null,
            'telefone'          => $cliente->telefone,
            'data_nascimento'   => $cliente->data_nascimento
        ];
        $response = $this->put('api/cliente/' . $cliente->id, $update);
        $response->assertStatus(404)
            ->assertJson([
                'data' => [
                    'email' => ['The email field is required.']
                ]
            ]);
    }

    public function testAtualizarClienteInexistente()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $cliente = factory(Cliente::class)->create();
        $update = [
            'id'    => 0,
            'nome' => 'cliente update',
            'email' => $cliente->email,
            'telefone' => $cliente->telefone,
            'data_nascimento' => $cliente->data_nascimento
        ];
        $response = $this->put('api/cliente/0', $update);
        $response->assertStatus(404)
            ->assertJson([
                'error' => 'Página não encontrada'
            ]);

    }

    public function testExcluirCliente()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $cliente = factory(Cliente::class)->create();
        $response = $this->delete('api/cliente/' . $cliente->id)
            ->assertNoContent();
    }

    public function testExcluirClienteInexistente()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );
        $response = $this->delete('api/cliente/100')
            ->assertStatus(404)
            ->assertJson([
                'error' => 'Página não encontrada'
            ]);
    }
}
