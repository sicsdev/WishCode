<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller
{
    protected $user;

    public function __construct()
    {
		$this->middleware("auth:api");
		$this->user = new User;
	}

	/*
	
	*/

	public function index()
	{
		$user = User::all();
        $responseMessage = "Users List!";
        return response()->json([
									'success' => true,
									'data' => $user,
									'message' => $responseMessage
								], 200);
	}

	public function viewProfile()
	{
		$responseMessage = "user profile";
		$data = Auth::guard("api")->user();
		return response()->json([
									"success" => true,
									"message" => $responseMessage,
									"data" => $data
								], 200);
	}

    public function all( Type $var = null )
    {
    	$users = User::all();
    	if( count($users) > 0 )
    	{

    		return response()->json([
				'success' => true,
				'data' => $users,
				'message' => 'User List!'
			], 200);

    	}
    	else
    	{

    		return response()->json([
				'success' => false,
				'data' => '',
				'message' => 'No user found!'
			], 200);

    	}
        
    }

	public function destroy( $user_id )
	{
		$user = User::findOrFail($user_id);
		
		if( $user ) {
			$user->delete();
		} else {
			return response()->json([
				'success' => false,
				'data' => '',
				'message' => 'Error!'
			], 500);
		}

		return response()->json([
			'success' => true,
			'data' => '',
			'message' => 'User deleted successfully!'
		], 200);
	}

	public function edit( $user_id )
	{
		$data = User::find($user_id);

		if ( is_null($data) ) {

			return response()->json([
				'success' => false,
				'data' => '',
				'message' => 'No user found!'
			], 500);

		} else {

			return response()->json([
				'success' => true,
				'data' => $data,
				'message' => 'Success!'
			], 200);
		
		}
	}

	public function store( Request $request )
	{
		
		$validator = Validator::make($request->all(),[
			'name' => 'required|string',
			'email' => 'required|string|unique:users',
			'password' => 'required|min:6',
		]);

		if($validator->fails())
		{
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		$data = [
					"name" => $request->name,
					"email" => $request->email,
					"password" => Hash::make($request->password)
				];
		
		$this->user->create($data);

		return response()->json([
			'success' => true,
			"data" => "",
			'message' => 'User Created Successfully!'
		], 200);

	}

	public function update( Request $request, $id )
	{

	}

}
