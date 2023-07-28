<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\UserWithPermissionAndRoleResource;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        // ini secure super admin biar role super admin tidak bisa diubah kalo bukan dirinya sendiri
        if($user->id == 1 && Auth::id() != $user->id){
            return redirect()->route('users.index')->with('failed', 'User tidak dapat diedit [super admin]!');
        }
        // walupun super admin bisa merubah dirinya sendiri kita prevent dia untuk demot dirinya sendiri
        //jaga jaga kalo user change id lewai inpect element
        if($user->id == 1 && Auth::id() == $user->id && !in_array(1, $request->roles)){
            return redirect()->route('users.index')->with('failed', 'User sudah disetup menjadi super admin!');
        }


        // secure admin tidak bisa demot dirinya sendiri
        // jika user merubah data dirina sendiri di request roles tidak ada nilai 2/id dari role "admin" return back dengan warning
        if(Auth::id() == $user->id && Auth::user()->hasRole('admin') && !in_array(2, $request->roles)){
            return redirect()->route('users.index')->with('failed', 'User ini sudah setup menjadi admin!');
        }
        //secure admin tidak bisa demot sesama admin / merubah role & permision
        if(Auth::id() != $user->id && $user->hasRole('admin')){
            return redirect()->route('users.index')->with('failed', 'Tidak dapat merubah role & permission sesama admin!');
        }




        $user->syncRoles($request->roles);

        return redirect()->route('users.index')->with('success', 'Role berhasil disesuaikan!');
    }

    public function assign_direct_permission(User $user, Request $request){
        $request->validate([
            'permissions' => 'nullable|array',
            'permissions.*' => [ 'numeric', 'exists:permissions,id' ]
        ]);
        
        // if($user->id == 1 && Auth::id() != $user->id){
        //     return redirect()->route('users.index')->with('failed', 'User tidak dapat diedit [super admin]!');
        // }

        // handle permission permission yang rawan atau 
        //atau kita atasi saja ang bisa memasukn direct permission ini hana super admin

        // if(Auth::id() != $user->id && !$user->hasRole('super admin')){
        //     return redirect()->route('users.index')->with('failed', 'Tidak dapat merubah role & permission sesama admin!');
        // }

        $user->syncPermissions($request->permissions);

        return redirect()->route('users.index')->with('success', 'Permission berhasil disesuaikan!');
    }

    // bbanned user here

    public function banned(User $user, Request $request){
        if($user->isBanned() || $user->hasRole(['admin', 'super admin'])){
            return redirect()->back()->with('failed', 'User tidak dapat di banned!');
        }
        $request->validate([
            'comment' => 'required|max:100',
        ]);
        $user->ban([
            'comment' => $request->comment,
        ]);
        return redirect()->back()->with('success', 'User berhasil di banned!');
    }

    public function unbanned(User $user){
        $user->unban();
        $user->bans()->forceDelete();
        return redirect()->back()->with('success', 'User berhasil di unbanned!');
    }
}
