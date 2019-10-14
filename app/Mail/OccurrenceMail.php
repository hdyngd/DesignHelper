<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OccurrenceMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $title = "";

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->title = '[DesignHelper] 案件発生通知';
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.html.email_occurrence')
            ->subject($this->title);
    }
}
