<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'price',
        'description'
    ];

    public function category()
    {
        return $this->belongsTo('App\Category');
    }
}
