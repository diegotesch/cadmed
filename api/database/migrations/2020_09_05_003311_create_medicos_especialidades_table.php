<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicosEspecialidadesTable extends Migration
{
    public function up()
    {
        Schema::create('especialidade_medico', function (Blueprint $table) {
            $table->bigInteger('medico_id')->unsigned();
            $table->bigInteger('especialidade_id')->unsigned();
            $table->primary(['medico_id', 'especialidade_id']);
            $table->foreign('medico_id')
                ->references('id')
                ->on('medicos');
            $table->foreign('especialidade_id')
                ->references('id')
                ->on('especialidades');
        });
    }

    public function down()
    {
        Schema::dropIfExists('especialidade_medico');
    }
}
