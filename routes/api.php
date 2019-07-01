<?php

use Illuminate\Support\Facades\Log;
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

Route::post('/login', 'AuthController@login');

Route::group(['middleware' => 'auth:api'], function () {


    Route::get('/me', 'AuthController@me');
    Route::post('/logout', 'AuthController@logout');

    Route::post('/user/store', 'Auth\RegisterController@register');
    Route::post('/category/store', 'Api\CategoryController@store');
    Route::get('/category/get', 'Api\CategoryController@index');
    Route::post('/menu/store', 'Api\MenuController@store');
    Route::get('/user/get', 'Api\UserController@getAll');
    Route::get('/user/getCreator', 'Api\UserController@getCreator');
    Route::get('/menu/get', 'Api\MenuController@getAll');
    Route::get('/menu/get/{id}', 'Api\MenuController@get');
    Route::post('/proposition/store', 'Api\PropositionController@store');
    Route::get('/proposition/get', 'Api\PropositionController@get');
    Route::get('/proposition/getAll', 'Api\PropositionController@getAll');
    Route::post('/proposition/attachCreator', 'Api\PropositionController@attachCreator');
});

//Route::group([
//
//    'middleware' => 'api',
//    'prefix' => 'auth'
//
//], function ($router) {
//    \Log::Debug('api root');
//    Route::post('login', 'AuthController@login');
//    Route::post('logout', 'AuthController@logout');
//    Route::post('refresh', 'AuthController@refresh');
//    Route::post('me', 'AuthController@me');
//
//});

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

//Route::group(['middleware' => 'api'], function() {
//    Route::get('articles',  function() {
////        $articles = Article::all()->take(5);
//        $articles = [
//            ['id' => 1, 'title' => 'taro', 'content' => 'aaa'],
//            ['id' => 2, 'title' => 'jiro', 'content' => 'bbb'],
//            ['id' => 3, 'title' => 'sabro', 'content' => 'ccc'],
//            ['id' => 4, 'title' => 'shiro', 'content' => 'ddd'],
//            ['id' => 5, 'title' => 'goro', 'content' => 'eee'],
//        ];
//        return $articles;
//    });
//
////    Route::post('admin/create_user', ''function() {
////
////    });
//
//    Route::resource('user', 'UserController');
//});

//Route::group(['middleware' => 'api'], function() {
//    Route::get('articles',  'ArticleController@index');
//});