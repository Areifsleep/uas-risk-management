<?php

namespace App\Http\Controllers;

use App\Http\Resources\RiskResource;
use App\Models\Risk;
use App\Models\User;
use App\RoleEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RiskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $current_auth = Auth::user();

        $current_user = User::find($current_auth->id);

        $risks_query = Risk::with([
            'creator', 'updater', 'approver', 'faculty', 'likelihood', 'impact'
        ]);
        
        // ->where('is_approved',true)->whereHas('faculty', function($query) use ($current_user) {
        //         $query->where('id', $current_user->faculties_id);
        //     })->get();

        // ->where('is_approved',true) ->whereHas('faculty', function($query) {
        //     $query->where('id', 1);
        // })

        if ($current_user->hasRole(RoleEnum::SuperAdmin) || $current_user->hasRole(RoleEnum::Rektor)) {
            $risks_query = $risks_query->where('is_approved', true)->get();
        } else {
            $risks_query = $risks_query->where('is_approved', true)->where('faculties_id',$current_user->faculties_id)->get();
                // ->whereHas('faculty', function ($query) use ($current_user) {
                //     $query->where('faculties_id',2)->get();
                // });
        }

        $risks = RiskResource::collection($risks_query)->toArray(request());

        return Inertia::render('Risks/Index',[
            'risks' => $risks,
        ]);
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
    public function show(string $id)
    {

        $risk = Risk::with([
            'creator', 'updater', 'approver', 'faculty', 'likelihood', 'impact'
        ])->find($id);

        if(!$risk){
            abort(404);
        }

        return Inertia::render('Risks/Show', [
            'risk' =>$risk,
        ]);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
