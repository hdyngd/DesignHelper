<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SignUpEmailVerifyMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $title = "";
    protected $name = "";
    protected $token = "";

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $token)
    {
        $this->title = '[DesignHelper] 登録Emailアドレス変更の確認';
        $this->name = $name;
        $this->token = $token;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.html.signup_email_verify')
            ->with([
                'name' => $this->name,
                'token' => $this->token
            ])
            ->subject($this->title);
    }
}
