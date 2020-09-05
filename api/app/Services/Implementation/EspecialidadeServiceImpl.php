<?php

namespace App\Services\Implementation;

use App\Services\EspecialidadeService;
use App\Models\Especialidade;
use App\Http\Resources\EspecialidadeDTO;

use phpDocumentor\Reflection\Types\Boolean;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class EspecialidadeServiceImpl implements EspecialidadeService
{
    protected $especialidade;

    public function __construct(Especialidade $especialidade)
    {
        $this->especialidade = $especialidade;
    }

    public function index()
    {
        return EspecialidadeDTO::collection(Especialidade::all());
    }
}
