<?php

namespace App\Jobs;

use App\Mail\IssueOccurrenceMail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class IssueOccurrence implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $managers = null;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($managers)
    {
        $this->managers = $managers;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->managers as $value) {
            Mail::to($value['email'])->send(new IssueOccurrenceMail());
        }
    }
}
