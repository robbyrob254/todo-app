<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Pipeline\Pipeline;

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
        'user_id', 'title', 'completed'
    ];

    /**
     * Get the user for the task.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public static function allTasks($view = 5) {
        return app(Pipeline::class)
        ->send(Task::query())
        ->through([
            \App\QueryFilters\Auth::class,
            \App\QueryFilters\Active::class,
            \App\QueryFilters\Search::class,
            \App\QueryFilters\Sort::class,
        ])
        ->thenReturn()
        ->paginate($view);
    }
}
