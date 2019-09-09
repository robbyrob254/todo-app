<?php

namespace App\QueryFilters;

use Closure;

class Search
{
    public function handle($request, Closure $next)
    {
        if(!request()->has('q')) {
            return $next($request);
        }

        $builder = $next($request);

        return $builder->where('title', 'like', '%'.request('q').'%');

    }
}
