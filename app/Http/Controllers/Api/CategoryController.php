<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\EditCategoryPost;
use App\Http\Requests\StoreCategoryPost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Category::all());
//        dd(Category::all());
//        //return Category::all();
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
    public function store(StoreCategoryPost $request)
    {
        $category = Category::create($request->all());
        return $category;
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
    public function edit(EditCategoryPost $request)
    {
        $category = Category::find($request->input('id'));
        $category->name = $request->input('name');
        $category->description = $request->input('description');

        $category->save();
        return response()->json();
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
    public function delete($id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json();
    }

    public function get($id)
    {
        $category = Category::find($id);
        $res = [
            'id' => $category->id,
            'name' => $category->name,
            'description' => $category->description,
        ];
        return response()->json($res);
    }
}
