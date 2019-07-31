<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

Route::post('/login', 'AuthController@login');

Route::group(['middleware' => 'auth:api'], function () {

    Route::post('/logout', 'AuthController@logout');
    Route::get('/me', 'AuthController@me');
    //    Route::post('/refresh', 'AuthController@refresh');

    // TODO: only role === 0
    Route::post('/user/store', 'Auth\RegisterController@register');
    Route::post('/category/store', 'Api\CategoryController@store');
    Route::post('/menu/store', 'Api\MenuController@store');
    Route::post('/proposition/attachCreator', 'Api\PropositionController@attachCreator');

    // authミドルウェアだけでok
    Route::get('/category/get', 'Api\CategoryController@index');
    Route::get('/user/get', 'Api\UserController@getAll');
    Route::get('/user/getCreator', 'Api\UserController@getCreator');
    Route::get('/menu/get', 'Api\MenuController@getAll');
    Route::get('/menu/get/{id}', 'Api\MenuController@get');
    Route::post('/proposition/store', 'Api\PropositionController@store');
    Route::get('/proposition/get', 'Api\PropositionController@get');
    Route::get('/proposition/get/{id}', 'Api\PropositionController@getOne');
    Route::get('/proposition/getAll', 'Api\PropositionController@getAll');
    Route::get('/messages/get/{id}', 'Api\PropositionController@getMessages');
    Route::get('/propositionUsers/get/{id}', 'Api\PropositionController@getUsers');
    Route::post('/message/store', 'Api\PropositionController@storeMessage');
});