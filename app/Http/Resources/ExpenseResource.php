<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
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
            'date' => $this->date,
            'description' => $this->description,
            'nominal' => $this->nominal,
            'type' => $this->type,
            'notes' => $this->notes,
            'file_path' => $this->file_path,
            'file_url' => $this->file_path ? asset('storage/' . $this->file_path) : null,
            'month' => $this->month,
            'year' => $this->year,
            'created_at' => $this->created_at,
            'payment' => $this->whenLoaded('payment', [
                'id' => $this->payment?->id,
                'name' => $this->payment?->name,
            ]),
            'typeDetail' => $this->whenLoaded('typeDetail', [
                'id' => $this->typeDetail?->id,
                'detail' => $this->typeDetail?->detail,
            ]),
        ];
    }
}
