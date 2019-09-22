<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\EditProgressPost;
use App\Http\Requests\StorePropositionPost;
use App\Http\Requests\StoreMessagePost;
use App\Http\Requests\AttachCreatorPost;
use App\Events\MessageCreated;
use App\Message;
use App\Proposition;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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

    public function payment(Request $request)
    {
        $token = $request->input('token');
        $amount = 0;
        foreach ($request->input('data') as $value) {
            $amount += $value['amount'] * $value['price'];
        }
        $phoneNumber = '0000000'. str_pad(auth()->user()->id, 4, 0, STR_PAD_LEFT);

        $params = [
            "aid" => env('MIX_ROBOTPAYMENT_AID'),
            "jb" => 'AUTH',
            "rt" => 0,
            "tkn" => $token,
            "pn" => $phoneNumber,
            "Em" => auth()->user()->email,
            "am" => $amount,
            "tx" => 0,
            "sf" => 0
        ];
        var_dump($params);

        $client = new Client(['base_uri' => 'https://credit.j-payment.co.jp/']);
        $path = 'gateway/gateway_token.aspx';
        $options = [
            'http_errors' => false,
            'json' => $params,
        ];
        $response = $client->request('POST', $path, $options);
        $responseBody = $response->getBody()->getContents();

        return response()->json($responseBody);
    }

    public function attachCreator(AttachCreatorPost $request)
    {
        //dd($request->all());
        $proposition = Proposition::find($request->input('proposition_id'));
        $proposition->designer_id = $request->input('designer_id');
//        $proposition->progress = 1;
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
        DB::beginTransaction();
        try {
            $url = null;
            if($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = Storage::disk('s3')->putFile('message', $file, 'public');
                $url = Storage::disk('s3')->url($filename);
            }

            $message = Message::create([
                'user_id' => auth()->user()->id,
                'proposition_id' => $request->proposition_id,
                'content' => $request->content,
                'type' => $request->type,
                'url' => $url
            ]);

            DB::commit();
            broadcast(new MessageCreated($message))->toOthers();
            return response()->json($message);

        } catch(Exception $e) {
            DB::rollback();
            return null;
        }

//        var_dump($request->hasFile('file'));
//        $message = Message::create([
//            'user_id' => auth()->user()->id,
//            'proposition_id' => $request->proposition_id,
//            'content' => $request->content,
//            'type' => $request->type
//        ]);

//        broadcast(new MessageCreated($message))->toOthers();

        //return response()->json();
    }

    public function editProgress(EditProgressPost $request)
    {
        $proposition = Proposition::find($request->input('proposition_id'));
        $proposition->progress = $request->input('progress');
        $proposition->save();

        return response()->json();
    }

}
