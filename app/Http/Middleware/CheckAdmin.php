<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = auth()->user();
        if($user && $user->role === 0) {
            return $next($request);
        }

        return redirect('/');
    }
}
