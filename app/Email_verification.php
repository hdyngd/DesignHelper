<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Email_verification extends Model
{
    protected $fillable = [
        'token',
        'email',
        'user_id',
    ];

}
