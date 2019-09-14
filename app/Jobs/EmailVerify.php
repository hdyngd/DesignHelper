<?php

namespace App\Jobs;

use App\Mail\EmailVerifyMail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Mail\SampleSesMailable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class EmailVerify implements ShouldQueue
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
    public function __construct(string $to, string $token, string $name)
    {
        $this->to = $to;
        $this->name = $name;
        $this->token = $token;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->to)->send(new EmailVerifyMail($this->name, $this->token));
    }
}
