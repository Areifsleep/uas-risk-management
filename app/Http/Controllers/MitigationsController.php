<?php

namespace App\Http\Controllers;

use App\Models\Mitigation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MitigationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Mitigations/Index');
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

        $request->validate([
            'plan' => 'required|string|max:255',
            'risk_id' => 'required|integer'
        ]);
        
        $mitigation = new Mitigation();
        $mitigation->plan = $request->input('plan');
        $mitigation->risk_id = $request->input('risk_id');

        $mitigation->save();

        return ;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'plan' => 'required',
        ]);

        $mitigation = Mitigation::find($id);
        $mitigation->plan = $request->input('plan');
        $mitigation->save();

        return ;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        if(!$id){
            return response()->json([
                'message' => 'ID is required'
            ], 400);
        }

        $result = Mitigation::destroy($id);

        if(!$result){
            return response()->json([
                'message' => 'Failed to delete'
            ], 400);
        }

        return ;
    }
}
