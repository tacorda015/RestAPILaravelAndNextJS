<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SampleFoodController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OutputMonitoringController;
use App\Models\OutputMonitoring;

Route::post('/login', [AuthController::class, 'login']);

// Routes for SampleFood CRUD operations using SampleFoodController
Route::get('samplefoods', [SampleFoodController::class, 'index']);
Route::get('samplefoods/{id}', [SampleFoodController::class, 'show']);
Route::post('samplefoods', [SampleFoodController::class, 'store']);
Route::put('samplefoods/{id}', [SampleFoodController::class, 'update']);
Route::delete('samplefoods/{id}', [SampleFoodController::class, 'destroy']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);
Route::post('/books', [BookController::class, 'store']);
Route::put('/books/{id}', [BookController::class, 'update']);
Route::delete('/books/{id}', [BookController::class, 'destroy']);

// Define API resource route for products
Route::apiResource('products', ProductController::class);


// * For OutputMonitoring Sample Data
Route::get('output-monitorings/SMT', [OutputMonitoringController::class, 'getSMT']);
Route::get('output-monitorings/DIP', [OutputMonitoringController::class, 'getDIP']);
