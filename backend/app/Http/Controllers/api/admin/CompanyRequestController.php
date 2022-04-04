<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Company;
use App\Models\CompanyRequest;

use Auth;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;

class CompanyRequestController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->middleware("auth:api");
        $this->user = new User;
    }

    public function getClaimRequests($request_type)
    {
        $claimRequests = CompanyRequest::select(
            [
                "companies.*",
                "company_requests.request_type",
                "company_requests.user_id",
                "company_requests.id as request_id",
                "users.name",
                "users.email",
                "company_requests.created_at as created_date"
            ]
        )
            ->leftJoin('companies', 'companies.id', '=', 'company_requests.company_id')
            ->leftJoin('users', 'users.id', '=', 'company_requests.user_id')
            ->where(
                array(
                    "company_requests.request_type" => $request_type,
                    "companies.is_claimed" => "0",
                    "company_requests.status" => "pending",
                )
            )
            ->orderBy('company_requests.id', 'DESC')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $claimRequests
        ], 200);
    }
}
