<?php
namespace App\Services;

use App\Models\Medico;

interface MedicoService
{
    public function __construct(Medico $medico);
    public function index();
    public function show($id);
    public function save(Array $dados);
    public function exclude($id);
}
