<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Especialidade extends Model
{
    public function medicos()
    {
        return $this->belongsToMany('App\Models\Medicos');
    }
}
