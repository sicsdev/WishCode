<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Company;

use Auth;
use Validator;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
	protected $user;

	public function __construct()
	{
		// $this->middleware( "auth:api", [ "except" => [ "register" ] ]);
		$this->user = new User;
	}

	/*
		#To Register Company
	*/

	public function company_register(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'company_name' => 'required|string',
			'name' => 'required|string',
			'email' => 'required|string|unique:users',
			'password' => 'required|min:6|confirmed',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$company_data = Company::create(['company_name' => $request->company_name]);
		$company_id = $company_data->id;

		$data = [
			"name" => $request->name,
			"email" => $request->email,
			"password" => Hash::make($request->password),
			"company_id" => $company_id,
			"role_id" => 2
		];

		$user_data = $this->user->create($data);

		$responseMessage = "Company Registered Successfully!";

		return response()->json([
			'success' => true,
			'message' => $responseMessage
		], 200);
	}

	public function register(Request $request)
	{
		if ($request->user_type == "company") {
			$validator = Validator::make($request->all(), [
				'user_name' => 'required|string',
				'email' => 'required|string|unique:users',
				'user_password' => 'required',
				'company_name' => 'required',
				'company_slug' => 'required|unique:companies'
			]);
		} else {
			$validator = Validator::make($request->all(), [
				'user_name' => 'required|string',
				'email' => 'required|string|unique:users',
				'user_password' => 'required|min:6'
			]);
		}

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		if ($request->user_type == "company") {
			$company_data = Company::create(['company_name' => $request->company_name, 'company_slug' => $request->company_slug]);
			$company_id = $company_data->id;

			$data = [
				"name" => $request->user_name,
				"email" => $request->email,
				"password" => Hash::make($request->user_password),
				"company_id" => $company_id,
				"role_id" => 2,
				'status' => 0
			];

			$user_data = $this->user->create($data);
			$responseMessage = "Company Registered Successfully!";
		} else {
			$data = [
				"name" => $request->user_name,
				"email" => $request->email,
				"password" => Hash::make($request->user_password),
				"role_id" => 4,
				'status' => 1
			];
			$this->user->create($data);
			$responseMessage = "User Register Successfully!";
		}

		return response()->json([
			'success' => true,
			'message' => $responseMessage
		], 200);
	}
}
