<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MedicoService;

class MedicoController extends Controller
{
    protected $medicoService;

    public function __construct(MedicoService $medicoService)
    {
        $this->medicoService = $medicoService;
    }

    public function index()
    {
        return $this->medicoService->index();
    }

    public function show($id)
    {
        return $this->medicoService->show($id);
    }

    public function store(Request $request)
    {
        $medico = $this->medicoService->save($request->all());
        return response()->json($medico, 201);
    }

    public function update(Request $request)
    {
        $medico = $this->medicoService->save($request->all());
        return response()->json($medico, 200);
    }

    public function delete($id)
    {
        $this->medicoService->exclude($id);
        return response()->json(null, 204);
    }
}
