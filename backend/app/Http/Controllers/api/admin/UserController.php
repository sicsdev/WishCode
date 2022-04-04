<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;

use Auth;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendPasswordMail;

class UserController extends Controller
{
	protected $user;

	public function __construct()
	{
		$this->middleware("auth:api");
		$this->user = new User;
	}

	public function all()
	{

		$users = User::select()->where(['role_id' => 4])->orderBy('id', 'DESC')->paginate(100);

		return response()->json([
			'success' => true,
			'data' => $users,
			'message' => 'Users List!'
		], 200);
	}

	public function destroy($user_id)
	{

		$user = User::where(['id' => $user_id, 'role_id' => 4])->first();
		if ($user) {
			$user->delete();
		} else {
			return response()->json([
				'success' => false,
				'data' => '',
				'message' => 'No User Exists!'
			], 500);
		}

		return response()->json([
			'success' => true,
			'data' => '',
			'message' => 'User Deleted successfully!'
		], 200);
	}

	public function edit($user_id)
	{

		$user_data = User::select()->where(['id' => $user_id, 'user_added_by' => Auth::user()->id])->first();


		if (is_null($user_data)) {

			return response()->json([
				'success' => false,
				'data' => [],
				'message' => 'No User Found!'
			], 404);
		} else {

			return response()->json([
				'success' => true,
				'data' => $user_data,
				'message' => 'Success!'
			], 200);
		}
	}

	public function store(Request $request)
	{

		$validator = Validator::make($request->all(), [
			'name' => 'required',
			'email' => 'required|string|unique:users',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}
		$password = Str::random(8);

		$dataa = [
			"name" => $request->name,
			"email" => $request->email,
			"password" => Hash::make($password),
			"user_added_by" => Auth::user()->id,
			"role_id" => 4
		];

		$user_data = $this->user->create($dataa);
		$responseMessage = "User Created Successfully!";

		$data = [
			"name" => $request->name,
			"email" => $request->email,
			"password" => $password
		];
		Mail::to($request->email)->send(new SendPasswordMail($data));

		return response()->json([
			'success' => true,
			"data" => $user_data,
			'message' => $responseMessage
		], 200);
	}

	public function update(Request $request, $id)
	{

		$validator = Validator::make($request->all(), [
			'name' => 'required|string',
			'email' => 'required',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$update_user = User::where('id', $id)->update(['name' => $request->name]);

		return response()->json([
			'success' => true,
			"data" => '',
			'message' => 'User Updated Successfully!'
		], 200);
	}

	public function getProfile()
	{
		$userProfileData = User::select('name', 'profile_pic', 'email')->where('id', Auth::user()->id)->first();

		if ($userProfileData) {
			return response()->json([
				'success' => true,
				"data" => $userProfileData,
				'message' => 'User Profile Data!'
			], 200);
		} else {
			return response()->json([
				'success' => true,
				"data" => array(),
				'message' => 'User not Exists!'
			], 403);
		}
	}

	public function updateProfile(Request $request)
	{
		if ($request->password != "") {
			$validator = Validator::make($request->all(), [
				'user_name' => 'required',
				'password' => 'required',
			]);
		} else {
			$validator = Validator::make($request->all(), [
				'user_name' => 'required',
			]);
		}

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$user = User::where('id', Auth::user()->id)->first();

		if ($user) {
			$user->name = $request->user_name;

			if ($request->password != "") {
				$user->password = Hash::make($request->password);
			}
			if ($request->file('profile_pic') == NULL) {
			} else {
				if ($user->profile_pic != "images/avatar_placeholder_temporary.png") {
					unlink(public_path($user->profile_pic));
				}
				$current_time = date('ymdhis');
				$filename = Str::random(10) . '-' . $current_time . '-' . Auth::user()->id . '.' . $request->file('profile_pic')->getClientOriginalExtension();
				$file_path = 'uploads/users/' . $filename;
				$user->profile_pic = $file_path;
				$request->profile_pic->move(public_path('uploads/users'), $filename);
			}
			$user->save();
			return response()->json([
				'success' => true,
				'message' => 'Profile Updated Successfully!'
			], 200);
		} else {
			return response()->json([
				'success' => false,
				'message' => 'User not Found!'
			], 500);
		}
	}
}
