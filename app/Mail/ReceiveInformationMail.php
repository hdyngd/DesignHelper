<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ReceiveInformationMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $title = "";
    protected $name = "";
    protected $informationId = "";

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $informationId)
    {
        $this->title = '[DesignHelper] ニュースが更新されました';
        $this->name = $name;
        $this->informationId = $informationId;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.html.email_receive_information')
            ->with([
                'name' => $this->name,
                'informationId' => $this->informationId
            ])
            ->subject($this->title);
    }
}
