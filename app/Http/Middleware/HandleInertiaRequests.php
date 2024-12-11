<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;


class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = null;

        if ($request->user()) {
            $user = $request->user()->load('faculty')->only('id', 'name', 'email', 'faculty');
        }

        // Amankan data fakultas untuk menghindari error jika tidak ada
        $facultyData = $user['faculty'] ?? null;

        $user['faculty'] = $facultyData
            ? [
                'id' => $facultyData['id'] ?? null,
                'name' => $facultyData['name'] ?? null,
                'short_name' => $facultyData['short_name'] ?? null,
            ]
            : null;

        return [
            ...parent::share($request),
            'auth.user' => fn() => $request->user()
                ? $user
                : null,

            "auth.roles" => fn() => $request->user()
                ? $request->user()->getRoleNames()
                : null, 

            "auth.permissions" => fn() => $request->user()
                ? $request->user()->getPermissionsViaRoles()->pluck('name')
                : null
        ];
    }
}
