<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\EditUserPost;
use App\Jobs\MailSender;
use Illuminate\Bus\Dispatcher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
//use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
//use Illuminate\Support\Facades\Log;
//use Illuminate\Support\Facades\Mail;
//use App\Mail\SampleSesMailable;
use App\Jobs\ResetPasswordJob;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'setPassword', 'resetPassword']]);
    }

    public function getAll()
    {
        return response()->json(User::all());
    }

    public function getCreator()
    {
        return response()->json(User::where('role', 1)->get());
    }

    public function edit(EditUserPost $request, Dispatcher $dispatcher)
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

            $to = 'hyanagida.0721@gmail.com';
            $mailSender = new MailSender($to);
            $dispatcher->dispatch($mailSender);
//            $to = 'hyanagida.0721@gmail.com';
//            Mail::to($to)->queue(new SampleSesMailable());

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

    public function setPassword(Request $request)
    {
        $user = User::where('email_verify_token', $request->input('token'))->first();
        
        if($user) {
            $user->email_verify_token = null;
            $user->email_verified = 1;
            $user->password = bcrypt($request->input('password'));
            $user->save();
        } else {
            return abort(422);
        }

        return response()->json();
    }

    public function resetPassword(Request $request, Dispatcher $dispatcher)
    {
        $user = User::where('email', $request->input('email'))->first();

        if($user) {
            $token = str_random(10);
            $user->email_verify_token = $token;
            $user->save();

            $resetPasswordMail = new ResetPasswordJob($user->email, $user->email_verify_token);
            $dispatcher->dispatch($resetPasswordMail);

        }

        return response()->json();
    }
}
