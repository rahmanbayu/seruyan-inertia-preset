<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthenticatedUserPermissionResponse;
use App\Http\Resources\AuthenticatedUserResource;
use App\Http\Resources\AuthenticatedUserRoleResponse;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => new UserResource($request->user() ?? new User()),
                'roles' => Auth::check() ? AuthenticatedUserRoleResponse::collection(Auth::user()->roles)->pluck('name') : [],
                'permissions' =>  Auth::check() ? AuthenticatedUserPermissionResponse::collection(Auth::user()->permissions)->pluck('name') : [],
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'flash' => [
                'failed' => $request->session()->get('failed'),
                'success' => $request->session()->get('success'),
                'error_flash' => $request->session()->get('error_flash'),
            ],
        ]);
    }
}
