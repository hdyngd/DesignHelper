<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Information_file extends Model
{
    protected $fillable = [
        'name',
        'url',
        'information_id',
    ];

    public function information() {
        return $this->belongsTo('App\Information');
    }
}
