<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'password' => $this->password ?? '',
            'remember_token' => $this->remember_token ?? '',
            'company_name' => $this->company_name ?? '',
            'company_website' => $this->company_website ?? '',
            'company_logo' => $this->company_logo ? asset('storage/' . $this->company_logo) : '',
            'redirect_url' => $this->redirect_url ?? '',
            'plan_type' => $this->plan_type ?? '',
            'after_submit_message' => $this->after_submit_message ?? '',
            'recipients' => $this->recipients ?? [],
            'ccs' => $this->ccs ?? [],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
