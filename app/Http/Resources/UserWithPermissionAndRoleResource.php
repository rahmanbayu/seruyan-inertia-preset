<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserWithPermissionAndRoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
           return [
            'id' => $this->id,
            'name' =>$this->name,
            'email' => $this->email,
            'roles' => $this->roles,
            'permissions' => $this->permissions,
            'direct_permissions' => $this->getDirectPermissions(),
            'is_banned' => $this->isBanned(),
        ];
    }
}
