<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Proposition extends Model
{
    protected $fillable = [
        'client_id',
        'menu_id',
        'amount'
    ];

    public function client() {
        return $this->hasOne('App\User', 'id', 'client_id');
    }

    public function designer() {
        return $this->hasOne('App\User', 'id', 'designer_id');
    }

    public function menu() {
        return $this->hasOne('App\Menu');
    }

    public function getAll() {
        $users = [];
        foreach (User::query()->cursor() as $user) {
            $users[$user->id] = $user;
        }

        $menus = [];
        foreach (Menu::query()->cursor() as $menu) {
            $menus[$menu->id] = $menu;
        }

        $propositions = [];
        foreach (Proposition::query()->cursor() as $proposition) {
            $progressName = Progress::where('menu_id', $proposition->menu_id)->where('order', $proposition->progress)->first();
            $data = [
                'id' => $proposition->id,
                'client_id' => $proposition->client_id,
                'designer_id' => $proposition->designer_id,
                'menuName' => $menus[$proposition->menu_id]->name,
                'menu' => $menus[$proposition->menu_id],
                'clientName' => $users[$proposition->client_id]->name,
                'designerName' => ($proposition->designer_id  !== null) ? $users[$proposition->designer_id]->name : '',
                'progress' => $proposition->progress,
                'progressName' => $progressName['name'],
                'progressTags' => Menu::find($proposition->menu_id)->progresses()->orderBy('order', 'asc')->get(),
                'amount' => $proposition->amount,
                'created_at' => date('Y/m/d', strtotime($proposition->created_at))
            ];

            $propositions[] = $data;
        }

        return $propositions;
    }

    public function get($user) {
        $propositions = $this->getAll();

        $key = 'client_id';
        if($user->role == 1) $key = 'designer_id';

        $res = [];
        foreach ($propositions as $value) {
            if($value[$key] == $user->id) {
                $res[] = $value;
            }
        }
        return $res;
    }

    public function getOne($id) {
        $propositions = $this->getAll();

        $res = [];
        foreach ($propositions as $value) {
            if($value['id'] == $id) {
                $res = $value;
                break;
            }
        }
        return $res;
    }

    public function messages()
    {
        return $this->hasMany('App\Message');
    }
}
