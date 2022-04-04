<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Company;
use App\Models\Subscription;
use App\Models\Transection;

use Auth;
use Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;
use DB;
use Stripe;

class StripeController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:api");
    }

    public function index()
    {
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 500);
        }
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));
        $companyData = Company::select('company_name', 'id')->where(['id' => Auth::user()->company_id])->first();
        if ($companyData) {
            try {
                /* START:: Create Customer */
                $customer_data = $stripe->customers->create(
                    [
                        'name' => $companyData->company_name,
                        'email' => Auth::user()->email,
                        'source' => $request['token_id']
                    ]
                );

                if ($customer_data && $customer_data->id) {
                    $customer_id = $customer_data->id;

                    /* START:: Create Subscription */
                    $subscription_data =  $stripe->subscriptions->create([
                        'customer' => $customer_id,
                        'items' => [
                            ['price' => env('MONTHLY_PRICE_ID')],
                        ],
                    ]);

                    if ($subscription_data && $subscription_data->id) {

                        $current_period_start = date("Y-m-d H:i:s", $subscription_data->current_period_start);
                        $current_period_end = date("Y-m-d H:i:s", $subscription_data->current_period_end);

                        $updateCustomer = Company::where('id', $companyData->id)->update(['customer_id' => $customer_id, 'subscription_id' => $subscription_data->id, 'subscription_status' => 'paid']);

                        $updateSubscription = Subscription::create([
                            'customer_id' => $customer_id,
                            'company_id' => $companyData->id,
                            'subscription_id' => $subscription_data->id,
                            'status' => 'active',
                            'start_date' => $current_period_start,
                            'end_date' => $current_period_end,
                            'price_id' => $subscription_data->plan->id,
                        ]);

                        $createTransection = Transection::create([
                            'subscription_id' => $subscription_data->id,
                            'invoice_id' => $subscription_data->latest_invoice,
                            'price_id' => $subscription_data->plan->id,
                            'start_date' => $current_period_start,
                            'end_date' => $current_period_end,
                            'status' => 'success',
                        ]);


                        return response()->json([
                            'success' => true,
                            "data" => $subscription_data,
                            'message' => "Subscription Created Successfully!"
                        ], 200);
                    }
                } else {
                    return response()->json([
                        'success' => true,
                        "data" => [],
                        'message' => "Unable to create Customer!"
                    ], 500);
                }
            } catch (\Throwable $e) {
                return response()->json([
                    'success' => true,
                    "data" => [],
                    'message' => $e->getMessage()
                ], 500);
            }
        } else {
            return response()->json([
                "success" => false,
                "message" => "Company does not exists!",
            ]);
        }
    }

    public function cancleSubscription(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subscription_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 500);
        }

        $companyData = Company::where(['id' => Auth::user()->company_id])->first();
        if ($companyData && $companyData->subscription_id != "") {

            try {
                $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));
                $response = $stripe->subscriptions->update(
                    $request->subscription_id,
                    ['cancel_at_period_end' => 'true']
                );
                if ($response) {
                    Company::where(['id' => $companyData->id])->update(['subscription_status' => 'canceled']);
                    Subscription::where(['subscription_id' => $request->subscription_id])->update(['status' => 'cancelled']);
                }
                return response()->json([
                    'success' => true,
                    "data" => $response,
                    'message' => "Subscription Cancelled Successfully!"
                ], 200);
            } catch (\Throwable $e) {
                return response()->json([
                    'success' => true,
                    "data" => [],
                    'message' => $e->getMessage()
                ], 500);
            }
        } else {
            return response()->json([
                'success' => true,
                "data" => [],
                'message' => "Company Does not Exists!"
            ], 500);
        }
    }
}
