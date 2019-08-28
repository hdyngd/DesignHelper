<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'category_id',
        'name',
        'price',
        'description',
        'image'
    ];

    protected $dates = ['deleted_at'];

    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    public function progresses()
    {
        return $this->hasMany('App\Progress');
    }
}
