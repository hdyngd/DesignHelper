<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //
    protected $fillable = [
        'user_id',
        'proposition_id',
        'content',
        'type',
        'url'
    ];
}
