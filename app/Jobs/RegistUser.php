<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Mail\RegistUserMail;
use Illuminate\Support\Facades\Mail;

class RegistUser implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $to = '';
    private $name = '';
    private $token = '';

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user)
    {
         $this->to = $user->email;
         $this->name = $user->name;
         $this->token = $user->email_verify_token;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->to)->send(new RegistUserMail($this->name, $this->token));
    }
}
