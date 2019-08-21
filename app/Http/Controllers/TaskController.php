<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
use App\Http\Resources\Task as TaskResource;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $q = Task::query();

        $q->where('user_id', auth()->user()->id);

        if($request->q) {
            $q->where('title', 'like', '%'.$request->q.'%');
        }

        if($request->filter) {
            $q->filter($request->filter);
        }

        if($request->sort) {
            $q->sort($request->sort);
        }

        if($request->view) {
            $tasks = $q->paginate($request->view);
        } else {
            $tasks = $q->paginate(5);
        }

        return TaskResource::collection($tasks);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $task = new Task;
        $task->title = $request->title;
        $task->user_id = auth()->user()->id;

        if($task->save()){
            return new TaskResource($task);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        if($task->user_id !== auth()->user()->id) {
            return response()->json('Unauthoirzed', 401);
        }

        $data = $request->validate([
            'title' => 'required|string',
            'completed' => 'required|boolean'
        ]);

        $task->completed = !$task->completed;

        if($task->save()) {
            return response($task, 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        if($task->user_id !== auth()->user()->id) {
            return response()->json('Unauthoirzed', 401);
        }

        $task->delete();

        return response()->json('Deleted task.', 200);
    }
}
