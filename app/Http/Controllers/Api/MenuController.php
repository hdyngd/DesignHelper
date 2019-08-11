<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreMenuPost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Menu;
use App\Category;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    public function getAll()
    {
        $menus = Menu::select('menus.id', 'menus.name', 'price', 'menus.description', 'category_id', 'categories.name as categoryName')
            ->join('categories', 'categories.id', '=', 'menus.category_id')
            ->get();
        return response()->json($menus);
    }

    public function get($id)
    {
        $category = Category::find($id);
        $menus = $category->menus;

        $response = [
            'category' => $category,
            'menus' => $menus
        ];
        return response()->json($response);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMenuPost $request)
    {
        $menu = Menu::create($request->all());
        return $menu;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}