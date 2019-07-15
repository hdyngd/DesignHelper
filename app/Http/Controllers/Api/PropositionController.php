<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StorePropositionPost;
use App\Http\Requests\StoreMessagePost;
use App\Http\Requests\AttachCreatorPost;
use App\Events\MessageCreated;
use App\Message;
use App\Proposition;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

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

    public function get()
    {
        $user = auth()->user();
        $proposition = new Proposition();
        return response()->json($proposition->get($user));
    }

    public function getOne($id)
    {
        $proposition = new Proposition();
        return response()->json($proposition->getOne($id));
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

    public function getMessages($id)
    {
        $messages = DB::table('messages')
            ->where('messages.proposition_id', '=', $id)
            ->join('users', 'users.id', '=', 'messages.user_id')
            ->select('messages.*', 'users.name')
            ->orderBy('messages.created_at', 'asc')
            ->get();

        foreach ($messages as $key => $value) {
            $messages[$key]->author = ($value->user_id === auth()->user()->id) ? 'me' : $value->user_id;
        }

        return response()->json($messages);
    }

    public function getUsers($id)
    {
        $proposition = Proposition::find($id);

        $users[] = $proposition->client;
        $users[] = $proposition->designer;

        $res = [];
        foreach ($users as $key => $value) {
            if($value->id !== auth()->user()->id) $res[] = $value;
        }

        return response()->json($res);
    }

    public function storeMessage(StoreMessagePost $request)
    {
//        $message = new Message;
//
//        $message->user_id = auth()->user()->id;
//        $message->proposition_id = $request->proposition_id;
//        $message->content = $request->content;
//        $message->type = $request->type;
//        $message->save();

        $message = Message::create([
            'user_id' => auth()->user()->id,
            'proposition_id' => $request->proposition_id,
            'content' => $request->content,
            'type' => $request->type
        ]);

//        $pusher = [
//            'user_id' => $message->user_id,
//            'proposition_id' => $message->proposition_id,
//            'content' => $message->content,
//            'type' => $message->type
//        ];
//        dd($message);
        broadcast(new MessageCreated($message))->toOthers();

        //return response()->json();
    }

}
