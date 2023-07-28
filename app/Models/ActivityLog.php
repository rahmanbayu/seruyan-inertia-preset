<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ActivityLog extends Activity
{
    use HasFactory;

    public function scopeFilter($query, $filters){
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('description', 'like', '%'.$search.'%');
                $query->orWhere('event', 'like', '%'.$search.'%');
                $query->orWhere('subject_type', 'like', '%'.$search.'%');
                $query->orWhere('causer_type', 'like', '%'.$search.'%');
                $query->orWhere('properties', 'like', '%'.$search.'%');
            });
        })->when(!isset($filters['sort']) , function ($query){
            $query->latest();
        })->when($filters['sort'] ?? null, function ($query, $sort){
            if($sort == 'created-at-latest'){
                $query->latest();
            }else if($sort == 'created-at-oldest'){
                $query->oldest();
            }
        })->when($filters['user'] ?? null , function ($query, $user){
            $query->where('causer_id', $user);
        })->when($filters['event'] ?? null , function ($query, $event){
            $query->where('event', $event);
        })->when($filters['model'] ?? null , function ($query, $model){
            $str = "App\Models\\" . $model;
            $query->where('subject_type', $str);
        });
        if(isset($filters['start_date']) && isset($filters['end_date'])){
             $query->whereBetween('created_at', [Carbon::parse($filters['start_date'])->format('Y-m-d H:i:s'), Carbon::parse($filters['end_date'])->format('Y-m-d H:i:s')]);
        }
    }
}
