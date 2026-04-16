<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Earrings', 'emoji' => '💎'],
            ['name' => 'Necklaces', 'emoji' => '👑'],
            ['name' => 'Bracelets', 'emoji' => '✨'],
            ['name' => 'Rings', 'emoji' => '💍'],
            ['name' => 'Bangles', 'emoji' => '🌟'],
            ['name' => 'Anklets', 'emoji' => '🦶'],
            ['name' => 'Sets', 'emoji' => '🎁'],
            ['name' => 'Brooches', 'emoji' => '🌹'],
        ];

        foreach ($categories as $cat) {
            Category::create([
                'name' => $cat['name'],
                'slug' => Str::slug($cat['name']),
                'image' => $cat['emoji'],
                'status' => 'active',
            ]);
        }
    }
}
