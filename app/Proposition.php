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
        return $this->hasOne('App\User', 'client_id');
    }

    public function designer() {
        return $this->hasOne('App\User', 'designer_id');
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
            $data = [
                'id' => $proposition->id,
                'menuName' => $menus[$proposition->menu_id]->name,
                'clientName' => $users[$proposition->client_id]->name,
                'designerName' => ($proposition->designer_id  !== null) ? $users[$proposition->designer_id]->name : '',
                'progress' => $proposition->progress,
                'amount' => $proposition->amount,
                'created_at' => date('Y/m/d', strtotime($proposition->created_at))
            ];

            $propositions[] = $data;
        }

        return $propositions;
    }
}
