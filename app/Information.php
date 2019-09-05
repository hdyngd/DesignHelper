<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    protected $table = 'informations';

    protected $fillable = [
        'title',
        'user_id',
        'content',
    ];

    public function information_files()
    {
        return $this->hasMany('App\Information_file');
    }
}
