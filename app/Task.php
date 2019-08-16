<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tasks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'completed'
    ];

     /**
     * Filter by completed/active status
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param string $status
     */
    public function scopeFilter($query, $status) {
        if($status == 'active') {
            return $query->where('completed', false);
        } else if($status == 'completed') {
            return $query->where('completed', true);
        }
    }
}
