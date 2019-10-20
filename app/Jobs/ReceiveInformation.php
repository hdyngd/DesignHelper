<?php

namespace App\Jobs;

use App\Mail\ReceiveInformationMail;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ReceiveInformation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $users = [];
    private $informationId = '';

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $informationId)
    {
        $users = User::whereIn('role', ['1', '2'])->get();
        $this->users = $users->toArray();
        $this->informationId = $informationId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->users as $value) {
                Mail::to($value['email'])->send(new ReceiveInformationMail($value['name'], $this->informationId));
        }
    }
}
