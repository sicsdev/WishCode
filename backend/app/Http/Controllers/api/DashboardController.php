<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Company;
use App\Models\CompanyRequest;
use App\Models\Post;
use App\Models\Vote;
use App\Models\ReleaseVote;

use Auth;
use Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;
use DB;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:api");
    }

    public function index()
    {
        if (Auth::user()->role_id == 1) {

            $totalComapanies = Company::where(['company_status' => 'approved'])->count();
            $totalEndUsers = User::where(['role_id' => 4])->count();
            $totalPendindRequests = Company::where(['company_status' => 'pending'])->count();

            $totalClaimRequests = CompanyRequest::select()
                ->leftJoin('companies', 'companies.id', '=', 'company_requests.company_id')
                ->leftJoin('users', 'users.id', '=', 'company_requests.user_id')
                ->where(
                    array(
                        "company_requests.request_type" => 'claim',
                        "companies.is_claimed" => "0",
                        "company_requests.status" => "pending"
                    )
                )
                ->orderBy('company_requests.id', 'DESC')
                ->count();

            $MonthlyVote = Vote::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
                ->whereMonth('created_at', date('m'))
                ->whereYear('created_at', date('Y'))
                ->groupBy('date')
                ->orderBy('date', 'ASC')
                ->get();

            $data = array(
                'total_company' => $totalComapanies,
                'total_users' => $totalEndUsers,
                'total_pending_request' => $totalPendindRequests,
                'total_claim_request' => $totalClaimRequests,
                'MonthlyVoteData' => $MonthlyVote,
                'data_type' => 'admin'
            );
        } else if (Auth::user()->role_id == 2) {

            $totalCompanyUsers = User::where(['role_id' => 3, 'user_added_by' => Auth::user()->id])->count();
            $totalPendingFeatures = Post::where(['company_id' => Auth::user()->company_id, 'status' => 'pending'])->count();

            $MonthlyVote = Vote::select(
                DB::raw('DATE(votes.created_at) as date'),
                DB::raw('count(*) as total')
            )
                ->leftJoin('comments', function ($join) {
                    $join->on('votes.voteable_id', '=', 'comments.id');
                })
                ->leftJoin('posts', function ($join) {
                    $join->on('comments.commentable_id', '=', 'posts.id');
                })
                ->where(['votes.voteable_type' => 'App\Models\Comment', 'posts.company_id' =>  Auth::user()->company_id])
                ->whereMonth('votes.created_at', date('m'))
                ->whereYear('votes.created_at', date('Y'))
                ->groupBy('date')
                ->orderBy('date', 'ASC')
                ->get();

            $data = array(
                'total_company_users' => $totalCompanyUsers,
                'total_pending_features' => $totalPendingFeatures,
                'MonthlyVoteData' => $MonthlyVote,
                'data_type' => 'company_admin'
            );
        } else if (Auth::user()->role_id == 3) {
            $data = [];
        } else {
            $data = [];
        }

        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'Dashboard Data!'
        ], 200);
    }

    public function searchCompanyFeatures($keyword = "all")
    {
        if (Auth::user()->role_id == 1 || Auth::user()->role_id == 4) {
            if ($keyword != "" && $keyword != "all") {
                $companyList = Company::where('company_name', 'LIKE', '%' . $keyword . '%')->where(['company_status' => 'approved'])->orderBy('id', 'desc')->paginate(25);
                $featureList = Post::where('title', 'LIKE', '%' . $keyword . '%')->withCount(['comments', 'post_votes'])->where(['status' => 'publish'])->orderBy('id', 'desc')->paginate(25);
            } else {
                $companyList = Company::where(['company_status' => 'approved'])->orderBy('id', 'desc')->paginate(25);
                $featureList = Post::where(['status' => 'publish'])->withCount(['comments', 'post_votes'])->orderBy('id', 'desc')->paginate(25);
            }
        } else {
            $companyList = [];
            $featureList = [];
        }


        $data = array(
            'company_list' => $companyList,
            'feature_list' => $featureList
        );

        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'Search Result Data!'
        ], 200);
    }
}
