<?php

namespace App\Http\Controllers\api\company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Company;
use App\Models\Permission;
use App\Models\UsersPermission;

use Auth;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendPasswordMail;

class CompanyUserController extends Controller
{
	protected $user;

	public function __construct()
	{
		$this->middleware("auth:api");
		$this->user = new User;
	}

	public function all(Type $var = null)
	{

		$company_users = User::select()
			->where(
				array(
					'user_added_by' => Auth::user()->id,
					'role_id' => 3
				)
			)
			->orderBy('id', 'DESC')
			->get();

		// $company_name = Company::find(Auth::user()->id)->value('company_name');
		$company_name = Company::leftJoin('users', function ($join) {
			$join->on('companies.id', '=', 'users.company_id');
		})
			->where([
				'users.id' => Auth::user()->id
			])
			->first([
				'companies.company_name'
			]);

		if (!empty($company_name)) {
			$company_name = $company_name['company_name'];
		} else {
			$company_name = '';
		}

		if (count($company_users) > 0) {

			return response()->json([
				'success' => true,
				'data' => $company_users,
				'message' => 'Company User List!',
				'company_name' => $company_name
			], 200);
		} else {

			return response()->json([
				'success' => false,
				'data' => [],
				'message' => 'No User found!',
				'company_name' => $company_name
			], 200);
		}
	}

	public function destroy($user_id)
	{
		if (auth()->user()->role_id == 1) {
			$user = User::where(['id' => $user_id, 'role_id' => 3])->first();
		} else {
			$user = User::where(['id' => $user_id, 'role_id' => 3, 'user_added_by' => Auth::user()->id])->first();
		}

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
		if (auth()->user()->role_id == 1) {
			$user_data = User::select()->where(['id' => $user_id])->first();
		} else {
			$user_data = User::select()->where(['id' => $user_id, 'user_added_by' => Auth::user()->id])->first();
		}

		if (is_null($user_data)) {

			return response()->json([
				'success' => false,
				'data' => [],
				'message' => 'No User Found!'
			], 500);
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
			'email' => 'required|email|string|unique:users',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}
		if ($request->companyID != "") {
			$userAddedBy = $request->companyID;
		} else {
			$userAddedBy = Auth::user()->id;
		}
		$password = Str::random(8);
		$dataa = [
			"name" => $request->name,
			"email" => $request->email,
			"password" => Hash::make($password),
			"user_added_by" => $userAddedBy,
			"role_id" => 3
		];

		$user_data = $this->user->create($dataa);

		if (!empty($request->user_permissions)) {
			$userPermissionArray = $request->user_permissions;
			foreach ($userPermissionArray as $permission) {
				if ($permission['permission'] == 'yes') {
					$permission = UsersPermission::create(['user_id' => $user_data->id, 'permission_id' => $permission['id']]);
				} else {
					$deleteAllPermissions = UsersPermission::where(['user_id' => $user_data->id, 'permission_id' => $permission['id']])->delete();
				}
			}
		}

		$data = [
			"name" => $request->name,
			"email" => $request->email,
			"password" => $password
		];
		Mail::to($request->email)->send(new SendPasswordMail($data));

		$responseMessage = "User Created Successfully!";

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

		if (!empty($request->user_permissions)) {
			$userPermissionArray = $request->user_permissions;
			foreach ($userPermissionArray as $permission) {
				if ($permission['permission'] == 'yes') {
					$permission = UsersPermission::create(['user_id' => $id, 'permission_id' => $permission['id']]);
				} else {
					$deleteAllPermissions = UsersPermission::where(['user_id' => $id, 'permission_id' => $permission['id']])->delete();
				}
			}
		}

		return response()->json([
			'success' => true,
			"data" => '',
			'message' => 'User Updated Successfully!'
		], 200);
	}
}
