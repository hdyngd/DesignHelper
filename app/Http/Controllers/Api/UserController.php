<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\EditUserPost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Http\Controllers\Auth;

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
        $user = User::find($request->input('id'));
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->role = $request->input('role');

        $user->save();
        return response()->json();
    }
}
