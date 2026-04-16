<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $email    = env('ADMIN_EMAIL', 'admin@innateheal.com');
        $password = env('ADMIN_PASSWORD', 'admin123');
        $expected = base64_encode($email . ':' . hash('sha256', $password));

        if ($token !== $expected) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
