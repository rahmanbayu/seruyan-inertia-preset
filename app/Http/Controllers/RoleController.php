<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(Request $request){
        $role_query =Role::filter($request->only(['search', 'sort']))->withCount('users');
        $roles =  RoleResource::collection($role_query->latest()->paginate($request->per_page ?? 20)->appends(request()->all()));
        return Inertia::render('UserManagement/Role/index', [
            'roles' => $roles,
            'filters' => request()->all('search', 'sort', 'per_page'),
            'permissions' => Permission::all(),
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|unique:roles,name'
        ]);
        Role::create(['name' => $request->name]);
        return redirect()->back()->with('success', 'Role berhasil ditambahkan!');
    }
    public function delete(Role $role){
        if(count($role->users)){
            return redirect()->back()->with('failed', 'Role digunakan!');
        }else if($role->id == 1){
            return redirect()->back()->with('failed', 'Role tidak dapat dihapus!');
        }
        $role->syncPermissions([]);
        $role->delete();
        return redirect()->back()->with('success', 'Role berhasil dihapus!');
    }
    public function asign_permission(Request $request, Role $role){
        $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'numeric|exists:permissions,id'
        ]);

        $role->syncPermissions($request->permissions);
        return redirect()->back()->with('success', 'Role permissions updated!');
    }
}
