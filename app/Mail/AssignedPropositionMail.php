<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class AssignedPropositionMail extends Mailable
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
        $this->title = '[DesignHelper] 案件にアサインされました';
        $this->name = $name;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.html.assigned_proposition')
            ->with([
                'name' => $this->name,
            ])
            ->subject($this->title);
    }
}
