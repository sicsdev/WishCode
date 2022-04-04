<?php

namespace App\Http\Controllers\api\company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Company;
use App\Models\Post;
use App\Models\Comment;

use Auth;
use Validator;
use Response;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PostController extends Controller
{
	protected $user;

	public function __construct()
	{
		$this->middleware("auth:api");
		// $this->user = new User;
	}

	public function index()
	{

		$posts = Post::where('company_id', Auth::user()->company_id)->where(['status' => "publish"])->withCount(['comments', 'post_votes'])->orderBy('id', 'DESC')->paginate(10);

		return response()->json([
			'success' => true,
			'data' => $posts
		], 200);
	}

	public function store(Request $request)
	{

		$validator = Validator::make($request->all(), [
			'title' => 'required',
			'content' => 'required'
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		if (!empty($request->companyID)) {
			$companyID = $request->companyID;
		} else {
			$companyID = Auth::user()->company_id;
		}

		if (Auth::user()->role_id == 1 || Auth::user()->role_id == 2) {
			$status = "publish";
		} else {
			$status = "pending";
		}

		$internal_priority = null;
		$development_url = null;

		if (!empty($request->internal_priority)) {
			$internal_priority = $request->internal_priority;
		}

		if (!empty($request->development_url)) {
			$development_url = $request->development_url;
		}

		$post = new Post();
		$post->title = $request->title;
		$post->user_id = Auth::user()->id;
		$post->company_id = $companyID;
		$post->content = $request->content;
		$post->status = $status;
		$post->internal_priority = $internal_priority;
		$post->development_url = $development_url;

		if ($request->file('image') == NULL) {
			// $post->image = 'images/placeholder.png';
		} else {
			$current_time = date('ymdhis');
			$filename = Str::random(10) . '-' . $current_time . '-' . Auth::user()->id . '.' . $request->file('image')->getClientOriginalExtension();
			$file_path = 'uploads/posts/' . $filename;
			$post->image = $file_path;
			$request->image->move(public_path('uploads/posts'), $filename);
		}

		$post->save();
		return Response::json(['success' => 'Post Created Successfully!']);
	}

	public function show($id)
	{

		if (Post::where('id', $id)->first()) {

			$post_data = Post::with('comments.replies')->find($id);


			return response()->json([
				'success' => true,
				'data' => $post_data,
				'message' => 'Success!'
			], 200);
		} else {
			return response()->json([
				'success' => false,
				'data' => '',
				'message' => 'No Post Found!'
			], 500);
		}
	}

	public function update(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'title' => 'required',
			'content' => 'required'
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);

			// return Response::json(['errors'=>$validators->getMessageBag()->toArray()]);
		}
		if (Auth::user()->role_id == 1) {
			$post = Post::where('id', $request->id)->first();
		} else {
			$post = Post::where('id', $request->id)->where('company_id', Auth::user()->company_id)->first();
		}

		if ($post) {
			$post->title = $request->title;
			$post->user_id = Auth::user()->id;
			$post->content = $request->content;

			if ($request->file('image') == NULL) {
				// $post->image ='images/placeholder.png';
			} else {

				$current_time = date('ymdhis');
				$filename = Str::random(10) . '-' . $current_time . '-' . Auth::user()->id . '.' . $request->file('image')->getClientOriginalExtension();
				$file_path = 'uploads/posts/' . $filename;
				$post->image = $file_path;
				$request->image->move(public_path('uploads/posts'), $filename);
			}

			$post->save();

			return response()->json([
				'success' => true,
				'data' => $post,
				'message' => 'Post updated successfully!'
			], 200);
		} else {
			return response()->json([
				'success' => false,
				'message' => 'Post not found!'
			], 500);
		}
	}

	public function delete($id)
	{

		try {


			if (Auth::user()->role_id == 1) {
				$post = Post::where('id', $id)->first();
			} else {
				$post = Post::where('id', $id)->where('company_id', Auth::user()->company_id)->first();
			}
			if ($post) {
				$post->delete();
				return Response::json(['success' => 'Post deleted successfully!']);
			} else {
				return Response::json(['error' => 'Post not found!']);
			}
		} catch (\Illuminate\Database\QueryException $exception) {

			return Response::json(['error' => 'Post belongs to comment.So you cann\'t delete this post!']);
		}
	}

	public function searchPost(Request $request)
	{

		$post = Post::where('title', 'LIKE', '%' . $request->keyword . '%')->get();

		if (count($post) == 0) {
			return Response::json(['message' => 'No post match found!']);
		} else {
			return Response::json($post);
		}
	}

	public function comments($id)
	{
		if (Post::where('id', $id)->first()) {
			$comments = Comment::where('commentable_id', $id)->get();
			//$comments = Comment::with('replies')->find($id);

			return response()->json([
				'success' => true,
				'data' => $comments
			], 200);
		} else {
			return Response::json(['error' => 'Post not found!']);
		}
	}

	public function getPost($post_id)
	{
		if (Post::where('id', $post_id)->first()) {
			if (Auth::user()->role_id == 4) {
				$post_data = Post::with(['post_votes', 'comments.user', 'comments.replies.user', 'comments.votes', 'comments.release_votes'])->find($post_id);
			} else {
				$post_data = Post::with(['post_votes', 'comments.user', 'comments.replies.user', 'comments.votes', 'comments.release_votes'])->find($post_id);
			}


			return response()->json([
				'success' => true,
				'data' => $post_data,
				'message' => 'Success!',
				'current_id' => Auth::user()->id
			], 200);
		} else {
			return response()->json([
				'success' => false,
				'data' => '',
				'message' => 'No Post Found!',
				'current_id' => Auth::user()->id
			], 500);
		}
	}

	public function pendingRequests()
	{
		if (Auth::user()->role_id == 1) {
			$posts = Post::where(['status' => "pending"])->orderBy('id', 'DESC')->get();
		} else {
			$posts = Post::where(['status' => "pending", "company_id" => Auth::user()->company_id])->orderBy('id', 'DESC')->get();
		}

		return response()->json([
			'success' => true,
			'data' => $posts
		], 200);
	}

	public function changeStatus(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'status' => 'required',
			'post_id' => 'required',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}
		$status = $request->status;
		$updateStatus = Post::where('id', $request->post_id)->update(['status' => $status]);

		if ($updateStatus) {
			return response()->json([
				'success' => true,
				'data' => $updateStatus,
				'message' => 'Feature Status Updated Successfully!'
			], 200);
		} else {
			return response()->json([
				'success' => false,
				'data' => array($request),
				'message' => 'Unable to Update Feature Status!'
			], 500);
		}
	}

	public function updateInternalPriority(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'id' => 'required',
			'internal_priority' => 'required'
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$updatePriority = Post::where('id', $request->id)->update(['internal_priority' => $request->internal_priority]);

		if ($updatePriority) {
			return response()->json([
				'success' => true,
				'data' => $updatePriority,
				'message' => 'Internal Priority Updated Successfully!'
			], 200);
		} else {
			return response()->json([
				'success' => false,
				'data' => [],
				'message' => 'Unable to update Internal Priority!'
			], 500);
		}
	}

	public function updateDevelopmentURL(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'id' => 'required',
			'development_url' => 'required'
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$updateDevelopmentUrl = Post::where('id', $request->id)->update(['development_url' => $request->development_url]);

		if ($updateDevelopmentUrl) {
			return response()->json([
				'success' => true,
				'data' => $updateDevelopmentUrl,
				'message' => 'Development URL Updated Successfully!'
			], 200);
		} else {
			return response()->json([
				'success' => false,
				'data' => [],
				'message' => 'Unable to update Development URL!'
			], 500);
		}
	}

	public function getAllFeaturesFilter()
	{
		if (Auth::user()->role_id == 1) {
			$posts = Post::where(['status' => "publish"])->withCount([
				'post_votes', 'postPublicVote' => function ($q) {
					$q
						->join('users', 'users.id', '=', 'votes.user_id')
						->where('users.role_id', '=', 4);
				}, 'postPrivateVote' => function ($q) {
					$q
						->join('users', 'users.id', '=', 'votes.user_id')
						->where('users.role_id', '=', 3);
				}
			])->orderBy('id', 'DESC')->get();
		} else if (Auth::user()->role_id == 2) {
			$posts = Post::where(['status' => "publish", "company_id" => Auth::user()->company_id])->withCount([
				'post_votes', 'postPublicVote' => function ($q) {
					$q
						->join('users', 'users.id', '=', 'votes.user_id')
						->where('users.role_id', '=', 4);
				}, 'postPrivateVote' => function ($q) {
					$q
						->join('users', 'users.id', '=', 'votes.user_id')
						->where('users.role_id', '=', 3);
				}
			])->orderBy('id', 'DESC')->get();
		} else {
			$posts = [];
		}

		return response()->json([
			'success' => true,
			'data' => $posts,
			"message" => "All Features Data!"
		], 200);
	}
}
