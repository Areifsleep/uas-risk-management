<?php

namespace App\Http\Controllers;

use App\Http\Resources\RiskResource;
use App\Models\Faculty;
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

        if ($current_user->hasRole(RoleEnum::SuperAdmin) || $current_user->hasRole(RoleEnum::Rektor)) {
            $risks_query = $risks_query->where('is_approved', true)->get();
        } else {
            $risks_query = $risks_query->where('is_approved', true)->where('faculties_id',$current_user->faculties_id)->get();
        }

        $risks = RiskResource::collection($risks_query)->toArray(request());

        $faculties = null;
        
        if($current_user->hasRole(RoleEnum::SuperAdmin) || $current_user->hasRole(RoleEnum::Rektor)){
            $faculties = Faculty::withCount('risks')->get();
        }

        return Inertia::render('Risks/Index',[
            'risks' => $risks,
            'faculties' => $faculties,
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

        $userId = Auth::id(); 
        
        $user = User::find($userId);

        if (!$user) {
            abort(403, 'Kamu tidak memiliki akses untuk mengakses sumber daya ini');
        }


        // Periksa apakah user bukan super admin atau rektor dan mencoba mengakses data dari fakultas lain
        if (!$user->hasRole('super_admin') && !$user->hasRole('rektor')) {
            // Periksa apakah pengguna hanya memiliki akses ke fakultas yang sama dengan data
            if ($user->faculties_id !== $risk->faculties_id) {
                abort(403, 'Kamu tidak memiliki akses untuk mengakses sumber daya ini');
            }
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

    public function showByFaculty(string $fakultas_id)
    {

        $current_id = Auth::id();
        $current_user = User::find($current_id);

        if (!$current_user->hasRole('super_admin') && !$current_user->hasRole('rektor')) {
            abort(403, 'Kamu tidak memiliki akses untuk mengakses sumber daya ini');
        }

        $fakultas = Faculty::query()->where('id',$fakultas_id)->select('id', 'name')->first();

        if (!$fakultas) {
            abort(404);
        }

        $risks = Risk::with([
            'creator', 'updater', 'approver', 'faculty', 'likelihood', 'impact'
        ])->where('faculties_id', $fakultas_id)->get();



        return Inertia::render('Risks/ShowByFakultas', [
            'risks' => $risks,
            'fakultas' => $fakultas,
        ]);
    }
}
