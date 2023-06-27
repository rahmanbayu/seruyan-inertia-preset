<?php

namespace App\Http\Controllers;

use App\Http\Resources\PermissionResource;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index(Request $request){
        $permission_query = Permission::filter($request->only(['search', 'sort']))->withCount('users');
        $permissions =  PermissionResource::collection($permission_query->paginate($request->per_page ?? 20)->appends(request()->all()));
        return Inertia::render('UserManagement/Permission/index', [
            'permissions' => $permissions,
            'filters' => request()->all('search', 'sort', 'per_page'),
        ]);
    }
}
