<?php

namespace App\QueryFilters;

use Closure;

class Auth
{
    public function handle($request, Closure $next)
    {
        return $next($request)->where('user_id', auth()->user()->id);
    }
}
