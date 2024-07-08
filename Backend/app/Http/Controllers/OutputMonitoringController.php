<?php

namespace App\Http\Controllers;

use App\Models\OutputMonitoring;
use Illuminate\Http\Request;

class OutputMonitoringController extends Controller
{
    public function getSMT()
    {
        // Fetch records where lineName contains "SMT"
        $smtRecords = OutputMonitoring::where('lineName', 'LIKE', '%SMT%')->get();

        return response()->json([
            'data' => $smtRecords,
        ]);
    }

    public function getSMT1to3()
    {
        // Fetch records where lineName is exactly "SMT 1", "SMT 2", or "SMT 3"
        $smtRecords = OutputMonitoring::whereIn('lineName', ['SMT1', 'SMT2', 'SMT3'])->get();

        return response()->json([
            'data' => $smtRecords,
        ]);
    }

    public function getSMT4to6()
    {
        // Fetch records where lineName is exactly "SMT 4", "SMT 5", or "SMT 6"
        $smtRecords = OutputMonitoring::whereIn('lineName', ['SMT4', 'SMT5', 'SMT6'])->get();

        return response()->json([
            'data' => $smtRecords,
        ]);
    }


    public function getDIP()
    {
        // Fetch records where lineName contains "SMT"
        $smtRecords = OutputMonitoring::where('lineName', 'LIKE', '%DIP%')->get();

        return response()->json([
            'data' => $smtRecords,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'output' => 'required|numeric',
                'lineName' => 'required|string',
            ]);
    
            $output = OutputMonitoring::create([
                'output' => $request->input('output'),
                'lineName' => $request->input('lineName'),
                'date' => now(), // Use Laravel's now() helper for current timestamp
            ]);
            
            return response()->json($output, 201); // Return a success response with status code 201
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error'], 500); // Return a generic error message
        }   
        
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     //
    // }

    /**
     * Display the specified resource.
     */
    public function show(OutputMonitoring $outputMonitoring)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OutputMonitoring $outputMonitoring)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OutputMonitoring $outputMonitoring)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OutputMonitoring $outputMonitoring)
    {
        //
    }
}
