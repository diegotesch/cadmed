<?php

namespace App\Services\Implementation;

use App\Services\MedicoService;
use App\Models\Medico;
use App\Http\Resources\MedicoDTO;

use phpDocumentor\Reflection\Types\Boolean;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class MedicoServiceImpl implements MedicoService
{
    protected $medico;

    public function __construct(Medico $medico)
    {
        $this->medico = $medico;
    }

    public function index()
    {
        return MedicoDTO::collection(Medico::all());
    }

    public function show($id)
    {
        return new MedicoDTO(Medico::findOrFail($id));
    }

    public function save(Array $dados)
    {
        if (!isset($dados['id'])) {
            return $this->store($dados);
        }
        return $this->update($dados);
    }

    public function exclude($id)
    {
        try {
            $medico = Medico::findOrFail($id);
            $medico->especialidades()->sync([]);
            return $medico->delete();
        } catch (QueryException $e) {
            throw new \Exception('Medico não pode ser deletado.');
        }

    }

    private function store(Array $dados)
    {
        $medico = Medico::create($dados);
        if (isset($dados['especialidades'])) {
            $medico->especialidades()->sync($dados['especialidades']);
        }
        return new MedicoDTO($medico);
    }

    private function update(Array $dados)
    {
        $medico = Medico::findOrFail($dados['id']);
        if (isset($dados['especialidades'])){
            $medico->especialidades()->sync($dados['especialidades']);
        }
        $medico->update($dados);
        return new MedicoDTO($medico);
    }

}
