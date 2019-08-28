<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Progress extends Model
{
    /**
     * モデルと関連しているテーブル
     *
     * @var string
     */
    protected $table = 'progresses';

    protected $fillable = [
        'menu_id',
        'name',
        'order',
    ];

    public function store($menu_id, $tags) {

        Progress::where('menu_id', $menu_id)->delete();
        foreach (json_decode($tags) as $key => $value) {
            $params = [
                'menu_id' => $menu_id,
                'name' => $value,
                'order' => $key
            ];

            Progress::create($params);
        }

    }

}
