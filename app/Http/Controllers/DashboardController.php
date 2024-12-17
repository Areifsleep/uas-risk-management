<?php

namespace App\Http\Controllers;

use App\Http\Resources\RiskResource;
use App\Models\Risk;
use App\Models\User;
use App\RoleEnum;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $current_auth_id = Auth::id();
        $current_user = User::find($current_auth_id);

        $risks_query = Risk::with([
            'creator', 'updater', 'faculty', 'likelihood', 'impact'
        ]);

        if ($current_user->hasRole(RoleEnum::SuperAdmin) || $current_user->hasRole(RoleEnum::Rektor)) {
            $risks_query = $risks_query->latest()->take(5)->get();
        } else {
            $risks_query = $risks_query->where('faculties_id',$current_user->faculties_id)->latest()->take(5)->get();
        }

        $risks = RiskResource::collection($risks_query)->toArray(request());
        
        return Inertia::render('Dashboard',[
            'count' => [
                'overall_score' => 10,
                'high_risk_issue' => 20,
                'total_risk' => 30,
                'total_fakultas' => 39
            ],
            'recently_risks' => $risks,
        ]);
    }
}
