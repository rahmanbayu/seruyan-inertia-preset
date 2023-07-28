<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Cog\Contracts\Ban\Bannable as BannableInterface;
use Cog\Laravel\Ban\Traits\Bannable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements BannableInterface
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, LogsActivity, Bannable;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->logOnly(['id', 'name', 'email', 'roles', 'permissions', 'banned_at']);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function scopeFilter($query, $filters){
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%')
                ->orWhere('email', 'like', '%'.$search.'%');
            });
        })->when(!isset($filters['sort']) , function ($query){
            $query->latest();
        })->when($filters['sort'] ?? null, function ($query, $sort){
            if($sort == 'name-asc'){
                $query->orderBy('name', 'asc');
            }else if($sort == 'name-desc'){
                $query->orderBy('name', 'desc');
            }else if($sort == 'email-asc'){
                $query->orderBy('email', 'asc');
            }else if($sort == 'email-desc'){
                $query->orderBy('email', 'desc');
            }else if($sort == 'latest'){
                $query->latest();
            }else if($sort == 'oldest'){
                $query->oldest();
            }
        } );
    }
}
