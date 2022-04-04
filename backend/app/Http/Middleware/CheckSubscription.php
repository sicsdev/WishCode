<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Models\Company;
use Illuminate\Support\Facades\Auth as FacadesAuth;

class CheckSubscription
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
        if (Auth::check() && (auth()->user()->role_id == 2)) {
            $companyData = Company::select('id', 'subscription_status')->where(['id' => Auth::user()->company_id])->first();
            
            if ($companyData->subscription_status == "trial" || $companyData->subscription_status == "paid") {
                return $next($request);
            } else {
                return response()->json([
                    'success' => false,
                    'data' => $companyData,
                    'message' => 'Please subscribe to view the Data!'
                ], 400);
            }
        } else if (Auth::check() && (auth()->user()->role_id == 1)) {
            return $next($request);
        } else {
            return response()->json([
                'success' => false,
                'data' => [],
                'message' => 'User Role do not have permission!'
            ], 400);
        }
    }
}
