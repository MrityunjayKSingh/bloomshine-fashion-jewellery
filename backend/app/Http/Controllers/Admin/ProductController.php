<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')
            ->orderBy('created_at', 'desc')
            ->get();

        return ProductResource::collection($products);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id'       => 'required|exists:categories,id',
            'name'              => 'required|string|max:255',
            'price'             => 'required|numeric|min:0',
            'original_price'    => 'nullable|numeric|min:0',
            'description'       => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'tags'              => 'nullable|array',
            'details'           => 'nullable|json',
            'care_instructions' => 'nullable|json',
            'badge'             => 'nullable|in:bestseller,new,sale',
            'rating'            => 'nullable|numeric|between:0,5',
            'review_count'      => 'nullable|integer|min:0',
            'status'            => 'in:active,inactive',
            'images.*'          => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $originalSlug = $validated['slug'];
        $counter = 1;
        while (Product::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $counter++;
        }

        // Handle multiple image uploads
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $imagePaths[] = $path;
            }
        }
        $validated['image'] = $imagePaths;

        if (isset($validated['tags'])) {
            $validated['tags'] = array_values(array_filter($validated['tags']));
        }

        // Decode JSON fields
        if (isset($validated['details']) && is_string($validated['details'])) {
            $validated['details'] = json_decode($validated['details'], true);
        }
        if (isset($validated['care_instructions']) && is_string($validated['care_instructions'])) {
            $validated['care_instructions'] = json_decode($validated['care_instructions'], true);
        }

        $product = Product::create($validated);

        return (new ProductResource($product->load('category')))->response()->setStatusCode(201);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id'       => 'sometimes|exists:categories,id',
            'name'              => 'sometimes|required|string|max:255',
            'price'             => 'sometimes|required|numeric|min:0',
            'original_price'    => 'nullable|numeric|min:0',
            'description'       => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'tags'              => 'nullable|array',
            'details'           => 'nullable|json',
            'care_instructions' => 'nullable|json',
            'badge'             => 'nullable|in:bestseller,new,sale',
            'rating'            => 'nullable|numeric|between:0,5',
            'review_count'      => 'nullable|integer|min:0',
            'status'            => 'in:active,inactive',
            'images.*'          => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
            'existing_images.*' => 'nullable|string',
        ]);

        if (isset($validated['name'])) {
            $newSlug = Str::slug($validated['name']);
            if ($newSlug !== $product->slug) {
                $originalSlug = $newSlug;
                $counter = 1;
                while (Product::where('slug', $newSlug)->where('id', '!=', $product->id)->exists()) {
                    $newSlug = $originalSlug . '-' . $counter++;
                }
                $validated['slug'] = $newSlug;
            }
        }

        // Handle image uploads
        $imagePaths = [];
        
        // Keep existing images that weren't deleted
        $existingImages = $request->input('existing_images', []);
        if (is_array($existingImages)) {
            // Extract just the file paths from URLs
            foreach ($existingImages as $imgUrl) {
                if ($imgUrl && is_string($imgUrl)) {
                    // If it's a full URL, extract the path
                    if (strpos($imgUrl, '/storage/') !== false) {
                        $path = substr($imgUrl, strpos($imgUrl, '/storage/') + 9); // Remove '/storage/' prefix
                        $imagePaths[] = $path;
                    } else {
                        // It's already a path
                        $imagePaths[] = $imgUrl;
                    }
                }
            }
        }
        
        // Add new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $imagePaths[] = $path;
            }
        }
        
        // Only update images if there were changes
        if (!empty($imagePaths) || $request->hasFile('images') || !empty($existingImages)) {
            // Delete old images that are no longer in the list
            if (is_array($product->image)) {
                foreach ($product->image as $oldPath) {
                    if (!in_array($oldPath, $imagePaths)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }
            }
            $validated['image'] = $imagePaths;
        }

        // Decode JSON fields
        if (isset($validated['details']) && is_string($validated['details'])) {
            $validated['details'] = json_decode($validated['details'], true);
        }
        if (isset($validated['care_instructions']) && is_string($validated['care_instructions'])) {
            $validated['care_instructions'] = json_decode($validated['care_instructions'], true);
        }

        $product->update($validated);

        return new ProductResource($product->fresh()->load('category'));
    }

    public function destroy(Product $product)
    {
        // Delete all images
        if (is_array($product->image)) {
            foreach ($product->image as $imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
