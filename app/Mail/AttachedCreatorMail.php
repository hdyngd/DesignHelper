<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class AttachedCreatorMail extends Mailable
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
        $this->title = '[DesignHelper] 発注した案件の担当者が決定しました';
        $this->name = $name;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.html.attached_creator')
            ->with([
                'name' => $this->name,
            ])
            ->subject($this->title);
    }
}
