<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SampleFood;

class SampleFoodController extends Controller
{
    // Method to fetch all sample foods
    public function index()
    {
        // $sampleFoods = SampleFood::all();
        // $sampleFoods = SampleFood::orderBy('id')->get();
        $sampleFoods = SampleFood::orderByDesc('id')->get();
        return response()->json($sampleFoods);
    }

    // Method to fetch a single sample food by ID
    public function show($id)
    {
        $sampleFood = SampleFood::find($id);
        if (!$sampleFood) {
            return response()->json(['error' => 'Sample food not found'], 404);
        }
        return response()->json($sampleFood);
    }

    // Method to create a new sample food
    public function store(Request $request)
    {
        // return $request->all();

        
        $request->validate([
            'name' => 'required|string',
            'calories' => 'required|numeric',
            'fat' => 'required|numeric',
            'carbs' => 'required|numeric',
            'protein' => 'required|numeric',
            'type' => 'required|string'
        ]);

        
        $sampleFood = SampleFood::create($request->all());
        return response()->json($sampleFood);
        
    }

    // Method to update an existing sample food
    public function update(Request $request, $id)
    {
        $sampleFood = SampleFood::findOrFail($id);

        $request->validate([
            'name' => 'required|string',
            'calories' => 'required|numeric',
            'fat' => 'required|numeric',
            'carbs' => 'required|numeric',
            'protein' => 'required|numeric',
            'type' => 'required|string'
        ]);

        $sampleFood->update($request->all());
        return response()->json($sampleFood);
    }

    // Method to delete a sample food
    public function destroy($id)
    {
        $sampleFood = SampleFood::findOrFail($id);
        $sampleFood->delete();
        return response()->json(null, 204);
    }
}
