<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Company;
use App\Models\Post;

use Auth;
use Validator;
use Response;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->middleware("auth:api");
        // $this->user = new User;
    }

    public function index(Request $request)
    {
        //$products = Company::where('company_name','LIKE','%'.$request->keyword.'%')->get();
        if ($request->keyword == 'all') {
            $keword = '';
        } else {
            $keword = $request->keyword;
        }
        $products = Company::where('company_name', 'LIKE', $keword . '%')->where(['company_status' => 'approved'])->get();

        return response()->json([
            'success' => true,
            'data' => $products,
            'message' => 'Companies List!'
        ], 200);
    }

    public function productFeatures($company_id, $limit = "")
    {
        if (!empty($limit)) {
            $posts = Post::where('company_id', $company_id)->where(['status' => "publish"])->withCount(['comments', 'post_votes'])->orderBy('id', 'DESC')->take($limit)->get();
        } else {
            $posts = Post::where('company_id', $company_id)->where(['status' => "publish"])->withCount(['comments', 'post_votes'])->orderBy('id', 'DESC')->get();
        }

        return response()->json([
            'success' => true,
            'data' => $posts
        ], 200);
    }

    public function allFeatures()
    {
        if (Auth::user()->role_id == 3) {
            $posts = Post::where('user_id', Auth::user()->user_added_by)->withCount(['comments', 'post_votes'])->orderBy('id', 'DESC')->paginate(10);
        } else if (Auth::user()->role_id == 2) {
            $posts = Post::where('company_id', Auth::user()->company_id)->withCount(['comments', 'post_votes'])->orderBy('id', 'DESC')->paginate(10);
        } else {
            $posts = Post::withCount(['comments', 'post_votes'])->orderBy('id', 'DESC')->paginate(10);
        }

        return response()->json([
            'success' => true,
            'data' => $posts,
            'message' => "Features List!"
        ], 200);
    }
}
