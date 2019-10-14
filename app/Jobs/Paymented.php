<?php

namespace App\Jobs;

use App\Mail\PaymentedMail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class Paymented implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $to = '';
    private $name = '';

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $to, string $name)
    {
        $this->to = $to;
        $this->name = $name;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->to)->send(new PaymentedMail($this->name));
    }
}
