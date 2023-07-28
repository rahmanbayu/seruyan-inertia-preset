<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityLogResource extends JsonResource
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
            'description' => $this->description,
            'causer' => $this->causer,
            'event' => $this->event,
            'subject_type' => $this->subject_type,
            'properties' => $this->properties,
            'created_at' => $this->created_at,
            'formatted_created_at' => $this->created_at->format('d/m/Y h:i'),
        ];
    }
}
