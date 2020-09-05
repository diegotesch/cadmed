<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

 $authMiddleware = 'auth:api';
 $medicoEndPoint = '/medicos';

Route::post('/cadastrar', 'AuthController@cadastro');
Route::post('/entrar', 'AuthController@login');

Route::get('/especialidades', 'EspecialidadeController@index')->middleware($authMiddleware);

Route::get($medicoEndPoint, 'MedicoController@index')->middleware($authMiddleware);
Route::get($medicoEndPoint . '/{id}', 'MedicoController@show')->middleware($authMiddleware);
Route::post($medicoEndPoint, 'MedicoController@store')->middleware($authMiddleware);
Route::put($medicoEndPoint, 'MedicoController@update')->middleware($authMiddleware);
Route::delete($medicoEndPoint . '/{id}', 'MedicoController@delete')->middleware($authMiddleware);

Route::apiResource('/cliente', 'ClienteController')->middleware($authMiddleware);
