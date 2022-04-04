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
use Illuminate\Support\Facades\Mail;
use App\Mail\SendPasswordMail;
use App\Mail\CompanyRequestMail;
use Stripe;

class CompanyController extends Controller
{
	protected $user;

	public function __construct()
	{
		$this->middleware("auth:api");
		$this->user = new User;
	}

	public function all(Type $var = null)
	{

		$companies = User::select('companies.*', 'users.name', 'users.email')
			->leftJoin('companies', 'users.company_id', '=', 'companies.id')
			->where(
				array(
					// 'role_id' => 2,
					"companies.company_status" => 'approved'
				)
			)
			->orderBy('id', 'DESC')
			->get();
		if (count($companies) > 0) {

			return response()->json([
				'success' => true,
				'data' => $companies,
				'message' => 'Companies List!'
			], 200);
		} else {

			return response()->json([
				'success' => false,
				'data' => [],
				'message' => 'No Company found!'
			], 200);
		}
	}

	public function destroy($company_id)
	{

		$company = Company::find($company_id);
		$user = User::where('company_id', $company_id)->first();
		if ($company) {
			$company->delete();
			$user->delete();
		} else {
			return response()->json([
				'success' => false,
				'data' => '',
				'message' => 'No Company Exists!'
			], 500);
		}

		return response()->json([
			'success' => true,
			'data' => '',
			'message' => 'Company Deleted successfully!'
		], 200);
	}

	public function edit($company_id)
	{

		$company_data = Company::leftJoin('users', function ($join) {
			$join->on('companies.id', '=', 'users.company_id');
		})
			->where([
				'companies.id' => $company_id
			])
			->first([
				'companies.id as company_id',
				'companies.company_name',
				'companies.company_logo',
				'companies.company_phone_number',
				'companies.subscription_status',
				'companies.company_status',
				'users.id as company_user_id',
				'users.name',
				'users.email',
				'companies.created_at',
			]);


		if (is_null($company_data)) {

			return response()->json([
				'success' => false,
				'data' => [],
				'message' => 'No Company Found!'
			], 404);
		} else {

			$company_users = User::select()->where(['user_added_by' => $company_data->company_user_id])->take(5)->get();

			$data = array('company_data' => $company_data, 'company_users' => $company_users);

			return response()->json([
				'success' => true,
				'data' => $data,
				'message' => 'Success!'
			], 200);
		}
	}

	public function store(Request $request)
	{

		$validator = Validator::make($request->all(), [
			'company_name' => 'required',
			'company_slug' => 'required|unique:companies',
			'name' => 'required|string',
			'email' => 'required|string|unique:users',
			'trial_period' => 'required',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		if ($request->trial_period == 'on') {
			$subscription_status = 'trial';
		} else {
			$subscription_status = 'unpaid';
		}

		$company_data = Company::create(['company_name' => $request->company_name, 'company_status' => 'approved', 'subscription_status' => $subscription_status, 'company_slug' => $request->company_slug]);
		$company_id = $company_data->id;
		$password = Str::random(8);
		$dataa = [
			"name" => $request->name,
			"email" => $request->email,
			"password" => Hash::make($password),
			"company_id" => $company_id,
			"role_id" => 2
		];

		$user_data = $this->user->create($dataa);

		$responseMessage = "Company Created Successfully!";

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
			'company_name' => 'required|string',
			'name' => 'required',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$update = Company::where('id', $id)->update(['company_name' => $request->company_name]);

		$update_user = User::where('company_id', $id)->update(['name' => $request->name]);

		return response()->json([
			'success' => true,
			"data" => '',
			'message' => 'Company Update Successfully!'
		], 200);
	}
	public function getCompanyUsers($company_id)
	{
		$company_data = Company::leftJoin('users', function ($join) {
			$join->on('companies.id', '=', 'users.company_id');
		})
			->where([
				'companies.id' => $company_id
			])
			->first([
				'companies.id as company_id',
				'companies.company_name',
				'companies.company_logo',
				'companies.company_phone_number',
				'companies.subscription_status',
				'companies.company_status',
				'users.id as company_user_id',
				'users.name',
				'users.email',
				'companies.created_at',
			]);


		if (is_null($company_data)) {

			return response()->json([
				'success' => false,
				'data' => [],
				'message' => 'No Company Found!'
			], 404);
		} else {

			$company_users = User::select()->where(['user_added_by' => $company_data->company_user_id])->get();

			return response()->json([
				'success' => true,
				'data' => $company_users,
				'message' => 'Company User List!',
				'companyData' => $company_data
			], 200);
		}
	}

	public function CompanyApply(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'company_name' => 'required',
			'company_url' => 'required',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$insertData = Company::create([
			'company_name' => $request->company_name,
			'subscription_status' => "unpaid",
			'company_status' => 'pending',
			'company_url' => $request->company_url,
			'requested_by' => Auth::user()->id
		]);

		if (!empty($insertData)) {
			// $update_user = User::where('id', Auth::user()->id)->update(['company_id' => $insertData->id]);

			return response()->json([
				'success' => true,
				'data' => $insertData,
				'message' => 'Company Added Successfully!'
			], 200);
		} else {
		}
	}

	public function pendingRequests()
	{
		$companies = User::select('companies.*', 'users.name', 'users.email')
			->leftJoin('companies', 'users.id', '=', 'companies.requested_by')
			->where(
				array(
					// 'role_id' => 2,
					"companies.company_status" => 'pending'
				)
			)
			->orderBy('id', 'DESC')
			->get();

		$pendingCompanyRequest = User::select('companies.*', 'users.name', 'users.email')
			->leftJoin('companies', 'users.company_id', '=', 'companies.id')
			->where(
				array(
					"companies.company_status" => 'pending'
				)
			)
			->orderBy('id', 'DESC')
			->get();

		$data = array(
			"pendingCompanyRequest" => $pendingCompanyRequest,
			"companies" => $companies
		);

		return response()->json([
			'success' => true,
			'data' => $data,
			'message' => 'Pending Companies List!'
		], 200);
	}

	public function changeStatus(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'status' => 'required',
			'companyID' => 'required',
			'request_type' => 'required'
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}
		if ($request->request_type == "new") {
			$status = $request->status;
			$updateStatus = Company::where('id', $request->companyID)->update(['company_status' => $status]);

			if ($updateStatus) {
				return response()->json([
					'success' => true,
					'data' => $updateStatus,
					'message' => 'Company Status Updated Successfully!'
				], 200);
			} else {
				return response()->json([
					'success' => false,
					'data' => array($request),
					'message' => 'Unable to Update Company Status!'
				], 500);
			}
		} else if ($request->request_type == "newFront") {
			$status = $request->status;
			$updateStatus = Company::where('id', $request->companyID)->update(['company_status' => $status]);
			$userStatus = User::where('company_id', $request->companyID)->update(['status' => 1]);

			$userDetails = User::select('name', 'email')->where(['company_id' => $request->companyID])->first();

			if ($updateStatus) {
				$mailData = array(
					'name' => $userDetails->name,
					'status' => $status,
				);
				Mail::to($userDetails->email)->send(new CompanyRequestMail($mailData));
				return response()->json([
					'success' => true,
					'data' => $updateStatus,
					'message' => 'Company Status Updated Successfully!'
				], 200);
			} else {
				return response()->json([
					'success' => false,
					'data' => array($request),
					'message' => 'Unable to Update Company Status!'
				], 500);
			}
		} else {
			$status = $request->status;
			$getRecord = CompanyRequest::find($request->companyID);
			if ($getRecord) {
				$upadateRequest = CompanyRequest::where(['id' => $request->companyID])->update(['status' => $status]);
				if ($status == "rejected") {
					return response()->json([
						'success' => true,
						'data' => [],
						'message' => 'Company Status Updated Successfully!'
					], 200);
				} else {
					if ($upadateRequest) {
						$updateCompanyData = Company::where(['id' => $getRecord->company_id])->update(['is_claimed' => '1', 'claimed_by' => $getRecord->user_id]);
						if ($updateCompanyData) {
							$updateUserRole = User::where(['id' => $getRecord->user_id])->update(['role_id' => 2, "company_id" => $getRecord->company_id]);

							return response()->json([
								'success' => true,
								'data' => [],
								'message' => 'Company Status Updated Successfully!'
							], 200);
						}
					}
				}
			}
			return response()->json([
				'success' => false,
				'data' => [],
				'message' => 'Unable to Update Company Status!'
			], 500);
		}
	}

	public function getCompany($company_id)
	{
		$company = Company::where('id', $company_id)->first();
		return response()->json([
			'success' => true,
			'data' => $company
		], 200);
	}

	public function claimCompany(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'company_id' => 'required',
			'claim_email' => 'required',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$updateData = CompanyRequest::updateOrCreate(
			[
				"company_id" => $request->company_id,
				"request_type" => $request->request_type,
				"user_id" => Auth::user()->id
			],
			[
				"company_id" => $request->company_id,
				"email" => $request->claim_email,
				"request_type" => $request->request_type,
				"user_id" => Auth::user()->id
			]
		);

		if ($updateData) {
			return response()->json([
				'success' => true,
				'data' => $updateData,
				'message' => 'Company Claim Request Sent Successfully!'
			], 200);
		} else {
			return response()->json([
				'success' => false,
				'data' => array($request),
				'message' => 'Unable to Send Company Claim Request!'
			], 500);
		}
	}

	public function updateCompanyProfile(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'company_name' => 'required',
		]);

		if ($validator->fails()) {
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$company = Company::where('id', Auth::user()->company_id)->first();

		if ($company) {
			$company->company_name = $request->company_name;

			if ($request->file('company_profile_pic') == NULL) {
			} else {
				if ($company->company_logo != "images/default-company-logo.png") {
					unlink(public_path($company->company_logo));
				}
				$current_time = date('ymdhis');
				$filename = Str::random(10) . '-' . $current_time . '-' . Auth::user()->company_id . '.' . $request->file('company_profile_pic')->getClientOriginalExtension();
				$file_path = 'uploads/company/' . $filename;
				$company->company_logo = $file_path;
				$request->company_profile_pic->move(public_path('uploads/company'), $filename);
			}
			$company->save();
			return response()->json([
				'success' => true,
				'data' => [],
				'message' => 'Company Profile Updated Successfully!'
			], 200);
		} else {
			return response()->json([
				'success' => false,
				'message' => 'Company Not Found!'
			], 500);
		}
	}

	public function getCompanyProfile()
	{
		$cardDetails = [];
		$companyProfileData = Company::where('id', Auth::user()->company_id)->first();
		if ($companyProfileData && $companyProfileData->subscription_status == "paid" && $companyProfileData->subscription_id != "") {

			$companyProfileData = Company::where('companies.id', Auth::user()->company_id)
				->leftJoin('subscriptions', function ($join) {
					$join->on('companies.subscription_id', '=', 'subscriptions.subscription_id');
				})
				->first(['companies.*', 'subscriptions.start_date', 'subscriptions.end_date', 'subscriptions.status']);

			$stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));
			$cardDetails = $stripe->customers->allSources(
				$companyProfileData->customer_id,
				['object' => 'card', 'limit' => 3]
			);
		}

		return response()->json([
			'success' => true,
			'data' => $companyProfileData,
			'cardDetails' => $cardDetails,
		], 200);
	}
}
