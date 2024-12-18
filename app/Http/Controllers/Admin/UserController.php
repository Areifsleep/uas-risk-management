<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = DB::table('users')
        ->leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
        ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
        ->leftJoin('faculties', 'users.faculties_id', '=', 'faculties.id')
        ->select(
            'users.id', 
            'users.name', 
            'users.email', 
            'roles.name as role',
            'users.created_at',
            'users.updated_at',
            'users.faculties_id',
            'faculties.short_name as faculty'
        )
        ->get();

        $fakultas = Faculty::all()->select('id', 'short_name', 'name');
    

        return Inertia::render('Admin/Users/UserPage',[
            'users' => $users,
            'fakultas' => $fakultas
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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => ['required', Rule::in([ 'rektor', 'admin_fakultas'])],
            'fakultas' => [
                'nullable',
                Rule::requiredIf($request->role === 'admin_fakultas'),
                'exists:faculties,id',
            ],
        ],[
            'name.required' => 'Nama harus diisi',
            'email.required' => 'Email harus diisi',
            'email.email' => 'Email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'password.required' => 'Password harus diisi',
            'password.min' => 'Password minimal 8 karakter',
            'role.required' => 'Role harus diisi atau tidak valid',
        ]);

        $newUser = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'faculties_id' => $request->fakultas
        ]);

    // Assign new role
    $newUser->syncRoles([$request->role]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    // Find user
    $user = User::findOrFail($id);

    // Validate request
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => [
            'required', 
            'string', 
            'email', 
            'max:255', 
            Rule::unique('users')->ignore($user->id),

        ],
        'role' => ['required', Rule::in([ 'rektor', 'admin_fakultas'])],
        'fakultas' => [
                'nullable',
                Rule::requiredIf($request->role === 'admin_fakultas'),
                'exists:faculties,id',
            ],
    ], [
        'name.required' => 'Nama harus diisi',
        'email.required' => 'Email harus diisi',
        'email.email' => 'Email tidak valid',
        'email.unique' => 'Email sudah terdaftar',
        'role.required' => 'Role harus diisi',
    ]);

    // Update user details
    $user->name = $request->name;
    $user->email = $request->email;
    $user->faculties_id = $request->fakultas;
    $user->save();

    // Remove existing roles
    $user->roles()->detach();

    // Assign new role
    $user->syncRoles([$request->role]);

    return back()->with('success', 'User updated successfully');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::destroy($id);
    }
}
