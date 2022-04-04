<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Company;
use App\Models\PasswordReset;

use Auth;
use Illuminate\Support\Str;
use Validator;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\RefreshToken;
use Laravel\Passport\Token;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use App\Notifications\ResetPasswordNotification;
use App\Notifications\PasswordResetSuccess;

class LoginController extends Controller
{
	protected $user;

	public function __construct()
	{
		$this->middleware("auth:api", ["except" => ["login", "forgetPassword", "verifyToken", "resetPassword"]]);
		$this->user = new User;
	}

	public function login(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'email' => 'required|string',
			'password' => 'required',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$credentials = $request->only(["email", "password"]);
		$user = User::where('email', $credentials['email'])->first();


		if ($user) {

			if (!auth()->attempt($credentials)) {
				$responseMessage = "Invalid username or password";
				return response()->json([
					"success" => false,
					"message" => $responseMessage,
					"error" => $responseMessage
				], 422);
			}

			if ($user->role_id == 3) {
				$userInfo = User::select()->where(['id' => $user->user_added_by])->first();
				if ($userInfo) {
					$user_company_info = Company::select()->where(['id' => $userInfo->company_id])->first();

					if ($user_company_info) {

						if ($user_company_info->subscription_status == 'unpaid') {
							return response()->json([
								"success" => false,
								"message" => "Unable to login! Company Account is Unpaid!",
								"error" => "Company Account is Unpaid!"
							], 422);
						}
					}
				}
			} else if ($user->status == 0) {
				$responseMessage = "Unable to Login!";
				return response()->json([
					"success" => false,
					"message" => $responseMessage,
					"error" => $responseMessage
				], 401);
			} else {
			}

			$accessToken = auth()->user()->createToken('authToken')->accessToken;
			$responseMessage = "Login Successfully!";
			return $this->respondWithToken($accessToken, $responseMessage, auth()->user());
		} else {
			$responseMessage = "Sorry, User does not exist!";
			return response()->json([
				"success" => false,
				"message" => $responseMessage,
				"error" => $responseMessage
			], 422);
		}
	}

	public function logout()
	{
		$user = Auth::guard("api")->user()->token();
		$user->revoke();
		$responseMessage = "Successfully logged Out!";

		return response()->json([
			'success' => true,
			'message' => $responseMessage
		], 200);
	}

	public function forgetPassword(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'email' => 'required|email|string',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$user = User::where('email', $request->email)->first();

		if (!$user) {
			return response()->json([
				"success" => false,
				"message" => "We can't find a user with that e-mail address!",
			], 404);
		}
		$token = Str::random(60);
		DB::table('password_resets')->updateOrInsert(
			[
				'email' => $request->email,
				'token' => $token,
				'created_at' => Carbon::now()
			],
			[
				'email' => $request->email
			]
		);
		$url = env("FRONT_END_WEBSITE_URL") . '/reset/' . $token . '';
		$user->notify(
			new ResetPasswordNotification($token, $url)
		);

		if ($user) {
			return response()->json([
				"success" => true,
				"message" => "We have e-mailed your password reset link!",
			], 200);
		} else {
			return response()->json([
				"success" => false,
				"message" => "Unable to send email!",
			], 500);
		}
	}

	public function verifyToken($token)
	{
		$tokenResult = DB::table('password_resets')
			->where('token', '=', $token)
			// ->where('created_at', '>', Carbon::now()->subHours(2))
			->first();

		if ($tokenResult != "") {
			return response()->json([
				"success" => true,
				"message" => "Valid Token!",
			], 200);
		} else {
			return response()->json([
				"success" => false,
				"message" => "Invalid Token!",
			], 500);
		}
	}

	public function resetPassword(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'password' => 'required',
			'token' => 'required',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$updatePassword = DB::table('password_resets')
			->where([
				'token' => $request->token,
			])
			->first();

		if ($updatePassword == "") {
			return response()->json([
				'success' => false,
				'message' => "Invalid Token!"
			], 500);
		}
		$user = User::where('email', $updatePassword->email)->first();

		if ($user == "") {
			return response()->json([
				'success' => false,
				'message' => "We can't find a user with that e-mail address!"
			], 500);
		}

		$updateUser = User::where('email', $updatePassword->email)
			->update(['password' => Hash::make($request->password)]);

		DB::table('password_resets')->where(['token' => $request->token])->delete();

		$user->notify(
			new PasswordResetSuccess()
		);

		return response()->json([
			'success' => true,
			'message' => "Password Reset Successfully!"
		], 200);
	}
}
