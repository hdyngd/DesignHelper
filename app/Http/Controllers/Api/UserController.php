<?php

namespace App\Http\Controllers\Api;

use App\Email_verification;
use App\Http\Requests\EditUserPost;
use App\Jobs\EmailVerify;
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
use App\Jobs\ResetPasswordJob;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'setPassword', 'resetPassword', 'emailVerify']]);
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

            $message = false;
            //emailを変更しようとしている時
            if($user->email !== $request->input('email')) {

                //emailの重複チェック
                $isDuplicate = User::where('email', $request->input('email'))->first();
                if($isDuplicate) {
                    return response()->json([
                        'errors' => ['email' => ["email duplicate!!"]],
                        'status' => 422,
                    ], 422);
                }

                //DB登録
                $emailVerification = Email_verification::create([
                    'user_id' => $user->id,
                    'email' => $request->input('email'),
                    'token' => str_random(10),
                ]);

                $message = true;

                //email送信
                $mail = new EmailVerify($emailVerification->email, $emailVerification->token, $user->name);
                $dispatcher->dispatch($mail);
            }


            //プロフィール画像変更があった場合
            if($request->hasFile('thumbnail')){
                $thumbnail = $request->file('thumbnail');
                $filename = Storage::disk('s3')->putFile('profile', $thumbnail, 'public');
                $url = Storage::disk('s3')->url($filename);

                $user->thumbnail = $url;
            }
            $user->name = $request->input('name');
            $user->role = $request->input('role');
            $user->email = $user->email;

            $user->save();
            DB::commit();

            return response()->json($message);

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

    public function emailVerify($token)
    {
        $token = Email_verification::where('token', $token)->first();

        if($token) {
            $user = User::find($token->user_id);
            $user->email = $token->email;
            $user->save();

            $token->delete();

            return response()->json();
        }
        return abort(404);
    }
}
