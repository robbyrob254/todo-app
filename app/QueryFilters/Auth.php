<?php

namespace App\QueryFilters;

use Closure;

class Auth
{
    public function handle($request, Closure $next)
    {
        $builder = $next($request);

        return $builder->where('user_id', auth()->user()->id);

    }
}
