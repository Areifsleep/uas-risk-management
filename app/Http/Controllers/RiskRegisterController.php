<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\Impact;
use App\Models\Likelihood;
use App\Models\Risk;
use App\Models\User;
use App\RoleEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RiskRegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    
    public function index()
    {
        $curent_user_id = Auth::id();

        $curent_user = User::find($curent_user_id);

        if(!$curent_user){
            return redirect()->route('login');
        }

        $likelihood = Likelihood::all();
        $impact = Impact::all();

        $where = [];

        if(!$curent_user->hasRole(RoleEnum::SuperAdmin) && !$curent_user->hasRole(RoleEnum::Rektor)){
            
            $where['id'] = $curent_user->faculties_id;
        }

        $faculties = Faculty::where($where)->get();
        
        return Inertia::render('RiskRegister/Index',[
            'options' => [
                'likelihoods' => $likelihood,
                'impacts' => $impact,
                'faculties' => $faculties,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $curent_user_id = Auth::id();
        $curent_user = User::find($curent_user_id);

        if(!$curent_user){
            return redirect()->route('login');
        }

        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'faculty_id'    => 'required',
            'likelihood_id' => 'required',
            'impact_id' => 'required',
            'level_risk' => 'required',
            'risk_source' => 'required',
            'potential_disadvantages' => 'required',
        ],[
            'name.required' => 'Nama Risiko harus diisi',
            'description.required' => 'Deskripsi Risiko harus diisi',
            'faculty_id.required' => 'Fakultas harus diisi',
            'likelihood_id.required' => 'Likelihood harus diisi',
            'impact_id.required' => 'Impact harus diisi',
            'level_risk.required' => 'Tingkat Risiko harus diisi',
            'risk_source.required' => 'Sumber Risiko harus diisi',
            'potential_disadvantages.required' => 'Potensi kerugian harus diisi',
        ]);

        $risk = new Risk();

        $risk->name = $request->name;
        $risk->description = $request->description;
        $risk->faculties_id = $request->faculty_id;
        $risk->likelihood_id = $request->likelihood_id;
        $risk->impact_id = $request->impact_id;
        $risk->level_risk = $request->level_risk;
        $risk->risk_source = $request->risk_source;
        $risk->potential_disadvantages = $request->potential_disadvantages;
        $risk->created_by = $curent_user_id;
        $risk->updated_by = $curent_user_id;

        $risk->save();

        return redirect()->route('risks.show',$risk->id);
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
