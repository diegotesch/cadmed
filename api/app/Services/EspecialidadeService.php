<?php
namespace App\Services;

use App\Models\Especialidade;

interface EspecialidadeService
{
    public function __construct(Especialidade $especialidade);
    public function index();
}
