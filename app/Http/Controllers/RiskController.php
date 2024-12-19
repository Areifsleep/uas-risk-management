<?php

namespace App\Http\Controllers;

use App\Http\Resources\RiskResource;
use App\Models\Faculty;
use App\Models\Risk;
use App\Models\Impact;
use App\Models\Likelihood;
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
            'creator', 'updater', 'faculty', 'likelihood', 'impact'
        ]);

        if ($current_user->hasRole(RoleEnum::SuperAdmin) || $current_user->hasRole(RoleEnum::Rektor)) {
            $risks_query = $risks_query->get();
        } else {
            $risks_query = $risks_query->where('faculties_id',$current_user->faculties_id)->get();
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
            'creator', 'faculty', 'likelihood', 'impact'
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
    //Cari risk berdasarkan ID, termasuk relasi yang dibutuhkan
    $risk = Risk::with([
        'creator', 'faculty', 'updater', 'likelihood', 'impact'
    ])->find($id);

    // Jika risk tidak ditemukan, kembalikan 404
    if (!$risk) {
        abort(404);
    }

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
    
    return Inertia::render('Risks/Edit',[
        'risks' => $risk,
        'options' => [
            'likelihoods' => $likelihood,
            'impacts' => $impact,
            'faculties' => $faculties,
        ],
    ]);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $current_user_id = Auth::id();
        $current_user = User::find($current_user_id);
    
        if (!$current_user) {
            return redirect()->route('login');
        }
    
        // Validate the request input
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'faculty_id' => 'required',
            'likelihood_id' => 'required',
            'impact_id' => 'required',
            'level_risk' => 'required',
            'risk_source' => 'required',
            'potential_disadvantages' => 'required',
        ], [
            'name.required' => 'Nama Risiko harus diisi',
            'description.required' => 'Deskripsi Risiko harus diisi',
            'faculty_id.required' => 'Fakultas harus diisi',
            'likelihood_id.required' => 'Likelihood harus diisi',
            'impact_id.required' => 'Impact harus diisi',
            'level_risk.required' => 'Tingkat Risiko harus diisi',
            'risk_source.required' => 'Sumber Risiko harus diisi',
            'potential_disadvantages.required' => 'Potensi kerugian harus diisi',
        ]);
    
        // Find the risk to be updated
        $risk = Risk::find($id);
    
        if (!$risk) {
            abort(404);
        }
    
        // Ensure the user has access to edit the risk (role check)
        if (!$current_user->hasRole(RoleEnum::SuperAdmin) && !$current_user->hasRole(RoleEnum::Rektor)) {
            if ($current_user->faculties_id !== $risk->faculties_id) {
                abort(403, 'Kamu tidak memiliki akses untuk mengakses sumber daya ini');
            }
        }
    
        // Update the risk with new values
        $risk->name = $request->name;
        $risk->description = $request->description;
        $risk->faculties_id = $request->faculty_id;
        $risk->likelihood_id = $request->likelihood_id;
        $risk->impact_id = $request->impact_id;
        $risk->level_risk = $request->level_risk;
        $risk->risk_source = $request->risk_source;
        $risk->potential_disadvantages = $request->potential_disadvantages;
        $risk->updated_by = $current_user_id;
    
        // Save the updated risk
        $risk->save();
    
        // Redirect to the updated risk page
        return redirect()->route('risks.show', $risk->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(!$id){
            return redirect()->route('login');
        }
        Risk::destroy($id);
        return redirect()->route('risks.index');
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
            'creator', 'updater', 'faculty', 'likelihood', 'impact'
        ])->where('faculties_id', $fakultas_id)->get();



        return Inertia::render('Risks/ShowByFakultas', [
            'risks' => $risks,
            'fakultas' => $fakultas,
        ]);
    }
}
