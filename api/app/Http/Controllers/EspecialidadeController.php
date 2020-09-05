<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EspecialidadeService;

class EspecialidadeController extends Controller
{
    protected $especialidadeService;

    public function __construct(EspecialidadeService $especialidadeService)
    {
        $this->especialidadeService = $especialidadeService;
    }

    public function index()
    {
        return $this->especialidadeService->index();
    }
}
