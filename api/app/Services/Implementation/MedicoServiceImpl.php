<?php

namespace App\Services\Implementation;

use App\Services\MedicoService;
use App\Models\Medico;
use App\Http\Resources\MedicoDTO;

use Illuminate\Database\QueryException;
use Validator;


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
        $validator = Validator::make($dados, [
            'nome' => 'required|min:3',
            'crm' => 'required|max:9|unique:medicos',
            'telefone' => 'max:17',
            'especialidades' => 'required|array|min:2',
            'especialidades.*' => 'required|integer|distinct'
        ], $this->getErrorMessages());

        if ($validator->fails()) {
            $errors = $validator->errors();
            foreach ($errors->all() as $error) {
                throw new \Exception($error);
            }
        }

        $medico = Medico::create($dados);

        $medico->especialidades()->sync($dados['especialidades']);

        return new MedicoDTO($medico);
    }

    private function update(Array $dados)
    {
        $medico = Medico::findOrFail($dados['id']);

        $validator = Validator::make($dados, [
            'nome' => 'required|min:3',
            'crm' => 'required|max:9|unique:medicos,id,'.$dados['id'],
            'telefone' => 'max:17',
            'especialidades' => 'required|array|min:2',
            'especialidades.*' => 'required|integer|distinct'
        ], $this->getErrorMessages());

        $errors = $validator->errors();
        foreach ($errors->all() as $error) {
            throw new \Exception($error);
        }

        $medico->especialidades()->sync($dados['especialidades']);
        $medico->update($dados);
        return new MedicoDTO($medico);
    }

    private function getErrorMessages() {
        return [
            'nome.required' => 'Preenchimento do campo nome é obrigatório.',
            'nome.min' => 'No mínimo três caracteres devem ser fornecidos para o nome.',
            'crm.required' => 'Preenchimento do campo CRM é obrigatório.',
            'crm.max' => 'Somente 9 caracteres são permitidos para o campo CRM.',
            'crm.unique' => 'CRM já cadastrado. Verifique se digitou o número correto e tente novamente.',
            'telefone.max' => 'Somente 17 caracteres são permitidos para telefone.',
            'especialidades.required' => 'Preenchimento do campo especialidades é obrigatório.',
            'especialidades.min' => 'No mínimo duas especialidades devem ser selecionadas.',
            'especialidades.*.distinct' => 'Selecione especialidades diferentes.'
        ];
    }

}
