<?php

namespace App\Http\Controllers;

use App\Http\Resources\RiskResource;
use App\Models\Risk;
use App\Models\User;
use App\RoleEnum;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        Carbon::setLocale('id');

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
    
    // Data Chart
    $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    $data = DB::table('risks')
        ->select(DB::raw("DAYNAME(created_at) as day"), DB::raw("COUNT(*) as total"))
        ->whereRaw("YEARWEEK(created_at, 1) = YEARWEEK(NOW(), 1)")
        ->groupBy(DB::raw("DAYNAME(created_at)"))
        ->get()
        ->map(function ($item) {
            // Konversi nama hari ke bahasa Indonesia
            $carbonDate = Carbon::createFromFormat('l', $item->day); // 'l' untuk nama hari
            $item->day = $carbonDate->translatedFormat('l');
            return $item;
        });

    // Masukkan data ke dalam template hari dengan fallback total = 0
    $chartData = collect($days)->map(function ($day) use ($data) {
        $dayData = $data->firstWhere('day', $day);
        return [
            'day' => $day,
            'total' => $dayData ? $dayData->total : 0
        ];
    })->toArray();

    $where = [];

    if(!$current_user->hasRole(RoleEnum::SuperAdmin) && !$current_user->hasRole(RoleEnum::Rektor)){
        $where['faculties_id'] = $current_user->faculties_id;
    }


    // Statistik Count
    // 1. Jumlah risiko yang memiliki level tinggi
    $jumlahRisikoTinggi = DB::table('risks')->where($where)->whereBetween('level_risk', [20,25])->count();

    // 2. Rata-rata likelihood
    $rataRataLikelihood = DB::table('risks')
    ->where($where)
    ->join('likelihoods', 'risks.likelihood_id', '=', 'likelihoods.id')
    ->avg('likelihoods.rating');

    // 3. Total risiko
    $totalRisiko = DB::table('risks')
    ->where($where)
    ->count();

    // 4. Rata-rata impact
    $rataRataImpact = DB::table('risks')
    ->where($where)
    ->join('impacts', 'risks.impact_id', '=', 'impacts.id')
    ->avg('impacts.rating');
    

        
        return Inertia::render('Dashboard',[
            'count' => [
                'jumlah_risiko_tinggi' => $jumlahRisikoTinggi,
                'rata_rata_likelihood' => $rataRataLikelihood,
                'total_risiko' => $totalRisiko,
                'rata_rata_impact' => $rataRataImpact
            ],
            'recently_risks' => $risks,
            'data_chart' => $chartData
        ]);
    }
}
