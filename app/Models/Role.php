<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Permission\Models\Role as SpatieRoleModel;

class Role extends SpatieRoleModel
{
    use HasFactory, LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->logOnly(['id', 'name']);
    }
    
    public function scopeFilter($query, $filters){
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%');
            });
        })->when(!isset($filters['sort']) , function ($query){
            $query->oldest();
        })->when($filters['sort'] ?? null, function ($query, $sort){
            if($sort == 'name-asc'){
                $query->orderBy('name', 'asc');
            }else if($sort == 'name-desc'){
                $query->orderBy('name', 'desc');
            }else if($sort == 'latest'){
                $query->latest();
            }else if($sort == 'oldest'){
                $query->oldest();
            }
        } );
    }
}
