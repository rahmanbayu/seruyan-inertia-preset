<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\UserWithPermissionAndRoleResource;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function index(Request $request){
        $user_query = User::filter($request->only(['search', 'sort']));
        $users =  UserWithPermissionAndRoleResource::collection($user_query->paginate($request->per_page ?? 20)->appends(request()->all()));
        return Inertia::render('UserManagement/User/index', [
            'users' => $users,
            'filters' => request()->all('search', 'sort', 'per_page'),
            'roles' => Role::where('name', '!=', 'super admin')->get(),
            'permissions' => Permission::get(),
        ]);
    }
    public function store(Request $request){
          $request->validate([
            'name' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Password::min(8)->letters()->mixedCase()->numbers()->symbols()->uncompromised() ],
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,id'
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

         $user->assignRole($request->roles);

        return redirect()->route('users.index')->with('success', 'Data user berhasil di tambahkan!');
    }

    public function update(Request $request, User $user){
          $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => ['nullable', 'confirmed', Password::min(8)->letters()->mixedCase()->numbers()->symbols()->uncompromised()],
        ]);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
        ]);

        return redirect()->route('users.index')->with('success', 'Data user berhasil di ubah!');
    }

    public function assign_role(User $user, Request $request){
        $exist_rule = Rule::exists('roles', 'id');
        if(!$user->hasRole('super admin') ){
            $exist_rule->whereNot('id', '1');
        }

        $request->validate([
            'roles' => 'nullable|array',
            'roles.*' => [ 'numeric', $exist_rule ]
        ]);
        if($user->id == 1 && !in_array(1, $request->roles)){
            return redirect()->route('users.index')->with('failed', 'User ini sudah diset menjadi super admin!');
        }
        $user->syncRoles($request->roles);

        return redirect()->route('users.index')->with('success', 'Role berhasil disesuaikan!');
    }

    public function assign_direct_permission(User $user, Request $request){
        $request->validate([
            'permissions' => 'nullable|array',
            'permissions.*' => [ 'numeric', 'exists:permissions,id' ]
        ]);
        if($user->id == 1){
            return redirect()->route('users.index')->with('failed', 'User ini sudah diset menjadi super admin!');
        }
        $user->syncPermissions($request->permissions);

        return redirect()->route('users.index')->with('success', 'Permission berhasil disesuaikan!');
    }
}
