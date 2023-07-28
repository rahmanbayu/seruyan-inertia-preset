<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityLogResource;
use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index(Request $request){
        $query = ActivityLog::filter($request->only(['search', 'sort', 'user', 'event', 'model', 'start_date', 'end_date']))->with('causer');
        $logs =  ActivityLogResource::collection($query->latest()->paginate($request->per_page ? ($request->per_page > 100 ? 100 : $request->per_page) : 20)->appends(request()->all()));
        return Inertia::render('ActivityLog/index', [
            'logs' => $logs,
            'users' => User::all(),
            'filters' => request()->all('search', 'sort', 'per_page', 'user', 'event', 'model', 'start_date', 'end_date', 'status'),
        ]);
    }
}
