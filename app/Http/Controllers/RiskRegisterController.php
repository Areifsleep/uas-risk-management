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

    private function getCurrentUser () {
        $current_auth = Auth::id();
        return User::find($current_auth);
    }

    private function createRisk(Request $request, $userId){
        $risk = new Risk();

        $risk->name = $request->name;
        $risk->description = $request->description;
        $risk->faculties_id = $request->faculty_id;
        $risk->likelihood_id = $request->likelihood_id;
        $risk->impact_id = $request->impact_id;
        $risk->level_risk = $request->level_risk;
        $risk->risk_source = $request->risk_source;
        $risk->potential_disadvantages = $request->potential_disadvantages;
        $risk->created_by = $userId;
        $risk->updated_by = $userId;

        $risk->save();

        return $risk;
    }

    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $curent_user = $this->getCurrentUser();

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
        $curent_user = $this->getCurrentUser();

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

        $risk = $this->createRisk($request, $curent_user->id);

        return redirect()->route('risks.show',$risk->id);
    }
}
