<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    /**
     * モデルと関連しているテーブル
     *
     * @var string
     */
    protected $table = 'categories';

    protected $fillable = [
        'name',
        'description',
        'image'
    ];

    protected $dates = ['deleted_at'];

    public function menus()
    {
        return $this->hasMany('App\Menu');
    }
}
