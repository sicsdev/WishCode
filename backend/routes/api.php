<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\api\RegisterController;
use App\Http\Controllers\api\admin\CompanyController;
use App\Http\Controllers\api\admin\CompanyRequestController;
use App\Http\Controllers\api\admin\UserController;
use App\Http\Controllers\api\company\CompanyUserController;
use App\Http\Controllers\api\company\PostController;
use App\Http\Controllers\api\CommentController;
use App\Http\Controllers\api\VoteController;
use App\Http\Controllers\api\ReleaseVoteController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\DashboardController;
use App\Http\Controllers\api\StripeController;
use App\Http\Controllers\api\permissions\PermissionController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
	return $request->user();
});

Route::middleware(['CORS'])->group(function ($router) {

	/* START:: Auth Routes */
	Route::post('/company-register', [RegisterController::class, 'company_register'])->name('register.company');
	Route::post('/register', [RegisterController::class, 'register'])->name('register.user');
	Route::post('/login', [LoginController::class, 'login'])->name('login.user');
	Route::get('/logout', [LoginController::class, 'logout'])->name('logout.user');
	Route::post('/forget-password', [LoginController::class, 'forgetPassword'])->name('forget.password');
	Route::get('/verify/{token}', [LoginController::class, 'verifyToken'])->name('verify.token');
	Route::post('/reset', [LoginController::class, 'resetPassword'])->name('password.reset');
	/* END:: Auth Routes */
});

Route::group(['prefix' => 'admin', 'middleware' => ['CORS', 'is_admin']], function ($router) {

	/* START:: Company Routes */
	Route::get('/company/all', [CompanyController::class, 'all'])->name('admin.company.all');
	Route::post('/company/create', [CompanyController::class, 'store'])->name('admin.company.create');
	Route::get('/company/edit/{id}', [CompanyController::class, 'edit'])->name('admin.company.edit');
	Route::delete('/company/delete/{id}', [CompanyController::class, 'destroy'])->name('admin.company.destroy');
	Route::put('/company/update/{id}', [CompanyController::class, 'update'])->name('admin.company.update');
	Route::get('/company-users/{id}', [CompanyController::class, 'getCompanyUsers'])->name('admin.company.getCompanyUsers');
	/* END:: Company Routes */

	/* START:: User Routes */
	Route::get('/user/all', [UserController::class, 'all'])->name('admin.user.all');
	Route::post('/user/create', [UserController::class, 'store'])->name('admin.user.create');
	Route::get('/user/edit/{id}', [UserController::class, 'edit'])->name('admin.user.edit');
	Route::delete('/user/delete/{id}', [UserController::class, 'destroy'])->name('admin.user.destroy');
	Route::put('/user/update/{id}', [UserController::class, 'update'])->name('admin.user.update');
	/* END:: User Routes */
	Route::get('/company/pending-request', [CompanyController::class, 'pendingRequests'])->name('company.pending.requests');
	Route::post('/company/change-status', [CompanyController::class, 'changeStatus'])->name('admin.company.change_status');

	Route::get('/company/claim-requests/{request_type}', [CompanyRequestController::class, 'getClaimRequests'])->name('admin.company.claim_requests');
});

Route::group(['prefix' => 'company-admin', 'middleware' => ['CORS', 'is_company']], function ($router) {
	Route::post('/company-profile/update', [CompanyController::class, 'updateCompanyProfile'])->name('company.update.profile');
	Route::get('/profile', [CompanyController::class, 'getCompanyProfile'])->name('company.get.profile');

	/* START:: Subscription API's */
	Route::post('/subscription/create', [StripeController::class, 'create'])->name('stripe.subscription.create');
	Route::post('/subscription/cancle', [StripeController::class, 'cancleSubscription'])->name('stripe.subscription.cancle');
	/* END:: Subscription API's */
});

Route::group(['middleware' => ['CORS']], function ($router) {

	Route::get('/products/{keyword?}', [ProductController::class, 'index'])->name('product.all');
	Route::get('/products/company/{id}/{limit?}', [ProductController::class, 'productFeatures'])->name('product.feature');
	Route::get('/post/{id}', [PostController::class, 'getPost'])->name('post.get');

	/* START:: Comment Routes */
	Route::get('/comments/all', [CommentController::class, 'index'])->name('company.comment.all');
	Route::post('/comment/store', [CommentController::class, 'store'])->name('company.comment.store');
	Route::get('/comment/show/{id}', [CommentController::class, 'show'])->name('company.comment.show');
	Route::post('/comment/update/{id}', [CommentController::class, 'update'])->name('company.comment.update');
	Route::delete('/comment/delete/{id}', [CommentController::class, 'remove'])->name('company.comment.remove');

	Route::post('/comment/reply/store', [CommentController::class, 'commentReply'])->name('comment.reply.store');

	Route::post('/vote/store', [VoteController::class, 'store'])->name('vote.store');
	Route::post('/release-vote/store', [ReleaseVoteController::class, 'store'])->name('release.vote.store');
	Route::get('/features', [ProductController::class, 'allFeatures'])->name('product.all.features');
	Route::get('/user-permissions', [PermissionController::class, 'UserPermissions'])->name('permissions.user.all');

	Route::post('/company/apply', [CompanyController::class, 'CompanyApply'])->name('compnay.user.apply');

	Route::post('/company-admin/post/store', [PostController::class, 'store'])->name('company.post.create');

	Route::get('/company/get/{id}', [CompanyController::class, 'getCompany'])->name('company.get.details');
	Route::post('/company/claim_company', [CompanyController::class, 'claimCompany'])->name('company.claim.details');

	Route::get('/dashboard-data', [DashboardController::class, 'index'])->name('dashboard.data');

	Route::post('/feature/update/internal_priority', [PostController::class, 'updateInternalPriority'])->name('feature.update.internalPriority');
	Route::post('/feature/update/development_url', [PostController::class, 'updateDevelopmentURL'])->name('feature.update.updateDevelopmentURL');

	Route::get("/search/{keyword?}", [DashboardController::class, 'searchCompanyFeatures'])->name("search.company.feature");
	Route::get("/user-profile", [UserController::class, 'getProfile'])->name("user.get.profile");
	Route::post("/profile/update", [UserController::class, 'updateProfile'])->name("user.update.profile");
	/* END:: Comment Routes */
});

Route::group(['middleware' => ['CORS', 'is_admin_or_company']], function ($router) {
	Route::get('/permissions/{user_id}', [PermissionController::class, 'getUserPermissions'])->name('permissions.user.get');
	Route::get('/permissions/get/all', [PermissionController::class, 'allPermissions'])->name('permissions.user.all');
	Route::post('/permissions/addUserPermissions', [PermissionController::class, 'addUserPermissions'])->name('user.permissions.store');

	/* START:: Post Routes */
	Route::get('/company-admin/post/all', [PostController::class, 'index'])->name('company.post.all');

	Route::get('/company-admin/post/show/{id}', [PostController::class, 'show'])->name('company.post.show');
	Route::post('/company-admin/post/update', [PostController::class, 'update'])->name('company.post.update');
	Route::delete('/company-admin/post/delete/{id}', [PostController::class, 'delete'])->name('company.post.delete');
	Route::get('/company-admin/post/search/{keyword}', [PostController::class, 'searchPost'])->name('company.post.search');
	Route::get('/company-admin/post/{id}/comments', [PostController::class, 'comments'])->name('company.post.comments');
	/* END:: Post Routes */

	/* START:: Company Users */
	Route::get('/company-admin/user/all', [CompanyUserController::class, 'all'])->name('company.user.all');
	Route::post('/company-admin/user/create', [CompanyUserController::class, 'store'])->name('company.user.create');
	Route::get('/company-admin/user/edit/{id}', [CompanyUserController::class, 'edit'])->name('company.user.edit');
	Route::delete('/company-admin/user/delete/{id}', [CompanyUserController::class, 'destroy'])->name('company.user.destroy');
	Route::put('/company-admin/user/update/{id}', [CompanyUserController::class, 'update'])->name('company.user.update');
	/* END:: Company Users */

	Route::get('/admin/company/pending-posts', [PostController::class, 'pendingRequests'])->name('admin.pending.posts');
	Route::post('/admin/post/change-status', [PostController::class, 'changeStatus'])->name('admin.post.change_status');
});

Route::group(['middleware' => ['CORS', 'check_subscription']], function ($router) {
	Route::get('/feature/filter/all', [PostController::class, 'getAllFeaturesFilter'])->name('feature.filter.all');
	Route::get('/feature/report-data/{id}', [VoteController::class, 'featureReportData'])->name('feature.report.data');
});

/* START:: Vote Count Permission */
Route::group(['prefix' => 'company', 'middleware' => ['CORS', 'is_permission:vote-count']], function ($router) {
	Route::get('/vote/vote-type-count/{type}/{id}/{filter_type}', [VoteController::class, 'countVoteType'])->name('vote.type.count');
	Route::get('/release-vote/vote-type-count/{type}/{id}/{filter_type}', [ReleaseVoteController::class, 'countVoteType'])->name('release.vote.type.count');
});

Route::group(['prefix' => 'company', 'middleware' => ['CORS', 'is_permission:approve-feedback']], function ($router) {
	Route::post('/comment/is_approved', [CommentController::class, 'isApproved'])->name('company.comment.is_approved');
});

Route::group(['prefix' => 'company', 'middleware' => ['CORS', 'is_permission:complete-feedback']], function ($router) {
	Route::post('/comment/is_completed', [CommentController::class, 'isCompleted'])->name('company.comment.is_completed');
});
