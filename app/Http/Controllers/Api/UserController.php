<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\EditUserPost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function getAll()
    {
        return response()->json(User::all());
    }

    public function getCreator()
    {
        return response()->json(User::where('role', 1)->get());
    }

    public function edit(EditUserPost $request)
    {

        DB::beginTransaction();
        try {
            $user = User::find($request->input('id'));
            //プロフィール画像変更があった場合
            if($request->hasFile('thumbnail')){
                $thumbnail = $request->file('thumbnail');
                $filename = Storage::disk('s3')->putFile('profile', $thumbnail, 'public');
                $url = Storage::disk('s3')->url($filename);

                $user->thumbnail = $url;
            }
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->role = $request->input('role');

            $user->save();
            DB::commit();
            return response()->json();

        } catch(Exception $e) {
            DB::rollback();
            return null;
        }
    }

    public function get($id)
    {
        $user = User::find($id);
        $res = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ];
        return response()->json($res);
    }

    public function delete($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json();
    }
}
