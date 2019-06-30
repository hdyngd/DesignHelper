<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StorePropositionPost;
use App\Http\Requests\AttachCreatorPost;
use App\Proposition;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PropositionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function getAll()
    {
        $proposition = new Proposition();
        return response()->json($proposition->getAll());
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
    public function store(StorePropositionPost $request)
    {
        foreach ($request->all()['data'] as $value) {
            Proposition::create(
                [
                    'client_id' => auth()->user()->id,
                    'menu_id' => $value['id'],
                    'amount' => $value['amount']
                ]
            );
        }

        return response()->json();
    }

    public function attachCreator(AttachCreatorPost $request)
    {
        //dd($request->all());
        $proposition = Proposition::find($request->input('proposition_id'));
        $proposition->designer_id = $request->input('designer_id');
        $proposition->progress = 1;
        $proposition->save();

        return response()->json();
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
