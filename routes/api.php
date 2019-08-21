<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'AuthController@login');
Route::post('register', 'AuthController@register');

Route::middleware('auth:api')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('logout', 'AuthController@logout');
    Route::get('tasks', 'TaskController@index');
    Route::post('task', 'TaskController@store');
    Route::put('task/{task}', 'TaskController@update');
    Route::delete('task/{task}', 'TaskController@destroy');
});

