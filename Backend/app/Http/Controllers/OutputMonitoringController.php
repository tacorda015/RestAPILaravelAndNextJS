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

    public function getDIP()
    {
        // Fetch records where lineName contains "SMT"
        $smtRecords = OutputMonitoring::where('lineName', 'LIKE', '%DIP%')->get();

        return response()->json([
            'data' => $smtRecords,
        ]);
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
    public function store(Request $request)
    {
        //
    }

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
