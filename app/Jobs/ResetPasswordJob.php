<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;

class ResetPasswordJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $to = '';
    private $token = '';

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $to, string $token)
    {
        $this->to = $to;
        $this->token = $token;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->to)->send(new ResetPasswordMail($this->token));
    }
}
