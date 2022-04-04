<?php

namespace App\Http\Controllers\api\permissions;

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

class PermissionController extends Controller
{
    protected $user;

    public function __construct()
    {
		$this->middleware("auth:api");
		$this->user = new User;
	}

	public function index()
	{

	}

	public function allPermissions()
	{
		$permissions = Permission::select()->orderBy('id','DESC')->get();

		return response()->json([
			'success' => true,
			'data' => $permissions,
			'message' => 'All Permission Data!'
		], 200);
	}

	public function getUserPermissions($id)
	{
		$permissions = Permission::select()->orderBy('id','DESC')->get();

		//$user_permissions = UsersPermission::select()->where(['user_id' => Auth::user()->id])->orderBy('id', 'DESC')->get();
		$user_permissions = UsersPermission::select()->where(['user_id' => $id])->get();

		$data = array(
						'all_permissions' => $permissions,
						'user_permissions' => $user_permissions
					);
		return response()->json([
				'success' => true,
				'data' => $data,
				'message' => 'Permission Data!'
			], 200);
	}

	public function addUserPermissions(Request $request)
	{
		$validator = Validator::make($request->all(),[
			'user_permissions' => 'required',
			'id' => 'required'
		]);

		if($validator->fails())
		{
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);
		}

		//$deleteAllPermissions = UsersPermission::where('user_id', Auth::user()->id)->delete();
		$userPermissionArray = $request->user_permissions;

		foreach($userPermissionArray as $permission)
		{
			if($permission['permission'] == 'yes')
			{
				$permission = UsersPermission::create(['user_id' => $request->id, 'permission_id' => $permission['id']]);
			}
			else
			{
				$deleteAllPermissions = UsersPermission::where( [ 'user_id' => $request->id, 'permission_id' => $permission['id'] ] )->delete();
			}
		}

		return response()->json([
			'success' => true,
			"data" => '',
			'message' => 'User Permission Added Successfully!'
		], 200);
	}

	public function UserPermissions()
	{
		$user_permissions = UsersPermission::select([
												'users_permissions.user_id',
												'users_permissions.permission_id',
												'permissions.id',
												'permissions.name',
												'permissions.slug'
											])
											->leftJoin('permissions', function($join) {
			                                    $join->on('users_permissions.permission_id', '=', 'permissions.id');
			                                })
											->where(['user_id' => Auth::user()->id])
											->get();

		
		return response()->json([
				'success' => true,
				'data' => $user_permissions,
				'message' => 'User Permission Data!'
			], 200);
	}

}
