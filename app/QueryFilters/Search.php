<?php

namespace App\QueryFilters;

class Search extends Filter
{
    protected function applyFilter($builder)
    {
        return $builder->where('title', 'like', '%'.request('q').'%');
    }
}
