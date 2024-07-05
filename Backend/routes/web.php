<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\OutputMonitoringController;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    $users = DB::table('users')->select('id','name','email')->get();
    return view('welcome', compact('users'));
});
Route::get('output-monitorings/smt', [OutputMonitoringController::class, 'getSMT']);
Route::get('output-monitorings/dip', [OutputMonitoringController::class, 'getDIP']);