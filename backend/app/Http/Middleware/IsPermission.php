<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class IsPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    
    public function handle($request, Closure $next, $permission = null)
    {
        if((Auth::check() && auth()->user()->role_id == 2) || (Auth::check() && auth()->user()->role_id == 1))
        {
            return $next($request);
        }
        elseif($permission !== null)
        {
            $user = $request->user();
            if($user->hasPermissionTo($permission) == true)
            {
                return $next($request);
            }
            else
            {
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'message' => 'User do not have permission!'
                ], 403);
            }
        }
        else
        {

            return response()->json([
                'success' => false,
                'data' => [],
                'message' => 'User Role do not have permission!'
            ], 403);
            //return response()->json(['error' => 'User Role do not have permission!'], 401);      
        }
   
    }

}