<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RegistUserMail extends Mailable
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
        $this->title = '[DesignHelper]アカウント仮登録完了';
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
        return $this->view('mail.html.regist_user')
            ->with([
                'name' => $this->name,
                'token' => $this->token
            ])
            ->subject($this->title);
    }
}
