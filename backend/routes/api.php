<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/
Route::prefix('v1')->group(function () {

    // Categories
    Route::get('/categories',                  [CategoryController::class, 'index']);
    Route::get('/categories/{slug}',           [CategoryController::class, 'show']);
    Route::get('/categories/{slug}/products',  [ProductController::class,  'byCategory']);

    // Products
    Route::get('/products',                    [ProductController::class, 'index']);
    Route::get('/products/{slug}',             [ProductController::class, 'show']);
    Route::get('/products/{slug}/related',     [ProductController::class, 'related']);

    // Form Submissions
    Route::post('/contact',                    [\App\Http\Controllers\Api\FormSubmissionController::class, 'submitContact']);
    Route::post('/bulk-order',                 [\App\Http\Controllers\Api\FormSubmissionController::class, 'submitBulkOrder']);
});

/*
|--------------------------------------------------------------------------
| Admin Auth
|--------------------------------------------------------------------------
*/
Route::post('/v1/admin/login', function (Request $request) {
    $email    = env('ADMIN_EMAIL',    'admin@innateheal.com');
    $password = env('ADMIN_PASSWORD', 'admin123');

    if ($request->email === $email && $request->password === $password) {
        $token = base64_encode($email . ':' . hash('sha256', $password));
        return response()->json(['token' => $token, 'message' => 'Login successful']);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
});

/*
|--------------------------------------------------------------------------
| Admin Protected Routes
|--------------------------------------------------------------------------
*/
Route::prefix('v1/admin')->middleware('admin.auth')->group(function () {

    // Categories CRUD
    Route::get('/categories',           [AdminCategoryController::class, 'index']);
    Route::post('/categories',          [AdminCategoryController::class, 'store']);
    Route::put('/categories/{category}', [AdminCategoryController::class, 'update']);
    Route::delete('/categories/{category}', [AdminCategoryController::class, 'destroy']);

    // Products CRUD
    Route::get('/products',             [AdminProductController::class, 'index']);
    Route::post('/products',            [AdminProductController::class, 'store']);
    Route::put('/products/{product}',   [AdminProductController::class, 'update']);
    Route::delete('/products/{product}',[AdminProductController::class, 'destroy']);
});
