<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;

Route::get('/', function () {
    View::addExtension('html', 'php');
    return View::make('index');
});
