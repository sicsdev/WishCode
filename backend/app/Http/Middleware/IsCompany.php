<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class IsCompany
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    
    public function handle($request, Closure $next)
    {
        if( Auth::check() && auth()->user()->role_id == 2)
        {
            return $next($request);
        }
        else
        {
            return response()->json([
                'success' => false,
                'data' => [],
                'message' => 'User Role do not have permission!'
            ], 403);
        }
   
    }

}