<?php

namespace App\Jobs;

use App\Mail\AssignedPropositionMail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class AssignedProposition implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $creator = null;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($creator)
    {
        $this->creator = $creator;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->creator->email)->send(new AssignedPropositionMail($this->creator->name));
    }
}
