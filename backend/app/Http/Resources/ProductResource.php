<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'category_id'       => $this->category_id,
            'category'          => new CategoryResource($this->whenLoaded('category')),
            'name'              => $this->name,
            'slug'              => $this->slug,
            'price'             => (float) $this->price,
            'original_price'    => $this->original_price ? (float) $this->original_price : null,
            'description'       => $this->description,
            'short_description' => $this->short_description,
            'image'             => $this->formatImages($this->image),
            'tags'              => $this->tags ?? [],
            'details'           => $this->details ?? [],
            'care_instructions' => $this->care_instructions ?? [],
            'badge'             => $this->badge,
            'rating'            => (float) $this->rating,
            'review_count'      => $this->review_count,
            'status'            => $this->status,
            'created_at'        => $this->created_at,
        ];
    }

    private function formatImages($images)
    {
        if (!$images) {
            return [];
        }
        if (is_string($images)) {
            return [asset("storage/{$images}")];
        }
        if (is_array($images)) {
            return array_map(fn($img) => is_string($img) ? asset("storage/{$img}") : $img, $images);
        }
        return [];
    }
}