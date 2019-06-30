<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Proposition extends Model
{
    protected $fillable = [
        'client_id',
        'menu_id',
        'amount'
    ];
}
