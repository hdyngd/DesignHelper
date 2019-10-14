<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PaymentedMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $title = "";
    protected $name = "";

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name)
    {
        $this->title = '[DesignHelper] 発注・支払処理完了通知';
        $this->name = $name;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.html.email_paymented')
            ->with([
                'name' => $this->name
            ])
            ->subject($this->title);
    }
}
