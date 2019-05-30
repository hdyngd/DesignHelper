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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['middleware' => 'api'], function() {
    Route::get('articles',  function() {
//        $articles = Article::all()->take(5);
        $articles = [
            ['id' => 1, 'title' => 'taro', 'content' => 'aaa'],
            ['id' => 2, 'title' => 'jiro', 'content' => 'bbb'],
            ['id' => 3, 'title' => 'sabro', 'content' => 'ccc'],
            ['id' => 4, 'title' => 'shiro', 'content' => 'ddd'],
            ['id' => 5, 'title' => 'goro', 'content' => 'eee'],
        ];
        return $articles;
    });

//    Route::post('admin/create_user', ''function() {
//
//    });

    Route::resource('user', 'UserController');
});

//Route::group(['middleware' => 'api'], function() {
//    Route::get('articles',  'ArticleController@index');
//});