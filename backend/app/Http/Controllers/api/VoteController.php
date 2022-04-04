<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Company;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Vote;
use App\Models\VoteHistory;

use Auth;
use Validator;
use Response;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class VoteController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->middleware("auth:api");
        // $this->user = new User;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'voteable_id' => 'required',
            'type' => 'required',
            'voteable_type' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 500);
        }

        if ($request->voteable_type == 'comment') {
            $is_exists = Vote::where(['user_id' => Auth::user()->id, 'voteable_id' => $request->voteable_id, 'voteable_type' => 'App\Models\Comment'])->first();

            if (empty($is_exists)) {

                $checkIPForVote = VoteHistory::where(['voteable_id' => $request->voteable_id, 'voteble_type' => 'App\Models\Comment', 'ip_address' => $request->ipAddress, 'vote_type' => 'unreleased'])->first();

                if (empty($checkIPForVote)) {
                    $vote = new Vote();
                    $vote->user_id = Auth::user()->id;
                    $vote->voteable_id = $request->voteable_id;
                    $vote->voteable_type = 'App\Models\Comment';
                    $vote->type = $request->type;
                    $vote->save();

                    VoteHistory::create(array(
                        'user_id' => Auth::user()->id,
                        'voteable_id' => $request->voteable_id,
                        'voteble_type' => 'App\Models\Comment',
                        'vote_type' => 'unreleased',
                        'ip_address' => $request->ipAddress,
                    ));
                    return response()->json([
                        'success' => true,
                        'data' => '',
                        'message' => 'Vote Added Successfully!'
                    ], 200);
                } else {
                    return response()->json([
                        'success' => true,
                        'data' => '',
                        'message' => 'Already added Vote from Same IP Address from diffrent account!'
                    ], 500);
                }
            } else {
                $update = Vote::where('id', $is_exists->id)->update(['type' => $request->type]);
                return response()->json([
                    'success' => false,
                    'message' => 'Vote Updated Successfully!'
                ], 200);
            }
        } elseif ($request->voteable_type == 'post') {
            $is_exists = Vote::where(['user_id' => Auth::user()->id, 'voteable_id' => $request->voteable_id, 'voteable_type' => 'App\Models\Post'])->first();

            if (empty($is_exists)) {

                $checkIPForVote = VoteHistory::where(['voteable_id' => $request->voteable_id, 'voteble_type' => 'App\Models\Post', 'ip_address' => $request->ipAddress, 'vote_type' => 'unreleased'])->first();

                if (empty($checkIPForVote)) {
                    $vote = new Vote();
                    $vote->user_id = Auth::user()->id;
                    $vote->voteable_id = $request->voteable_id;
                    $vote->voteable_type = 'App\Models\Post';
                    $vote->type = $request->type;
                    $vote->save();

                    VoteHistory::create(array(
                        'user_id' => Auth::user()->id,
                        'voteable_id' => $request->voteable_id,
                        'voteble_type' => 'App\Models\Post',
                        'vote_type' => 'unreleased',
                        'ip_address' => $request->ipAddress,
                    ));

                    return response()->json([
                        'success' => true,
                        'data' => '',
                        'message' => 'Vote Added Successfully!'
                    ], 200);
                } else {
                    return response()->json([
                        'success' => true,
                        'data' => '',
                        'message' => 'Already added Vote from Same IP Address from diffrent account!'
                    ], 500);
                }
            } else {
                $update = Vote::where('id', $is_exists->id)->update(['type' => $request->type]);
                return response()->json([
                    'success' => false,
                    'message' => 'Vote Updated Successfully!'
                ], 200);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Not Found!'
            ], 500);
        }
    }

    public function countVoteType($type, $id, $filter_type)
    {
        if ($type == 'comment') {
            if ($filter_type == 'company_user') {
                $count_yes = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Comment',
                        'votes.type' => 'yes',
                        'users.role_id' => 3
                    ])
                    ->count();

                $count_no = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Comment',
                        'votes.type' => 'no',
                        'users.role_id' => 3
                    ])
                    ->count();

                $count_optional = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Comment',
                        'votes.type' => 'optional',
                        'users.role_id' => 3
                    ])
                    ->count();
            } elseif ($filter_type == 'end_user') {
                $count_yes = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Comment',
                        'votes.type' => 'yes',
                        'users.role_id' => 4
                    ])
                    ->count();

                $count_no = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Comment',
                        'votes.type' => 'no',
                        'users.role_id' => 4
                    ])
                    ->count();

                $count_optional = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Comment',
                        'votes.type' => 'optional',
                        'users.role_id' => 4
                    ])
                    ->count();
            } else {
                $count_yes = Vote::where(['voteable_id' => $id, 'voteable_type' => 'App\Models\Comment', 'type' => 'yes'])->count();
                $count_no = Vote::where(['voteable_id' => $id, 'voteable_type' => 'App\Models\Comment', 'type' => 'no'])->count();
                $count_optional = Vote::where(['voteable_id' => $id, 'voteable_type' => 'App\Models\Comment', 'type' => 'optional'])->count();
            }

            $data = array(
                'yes' => $count_yes,
                'no' => $count_no,
                'optional' => $count_optional
            );

            return response()->json([
                'success' => true,
                'message' => "Vote Count!",
                'data' => $data
            ], 200);
        } else {
            if ($filter_type == 'company_user') {
                $count_yes = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Post',
                        'votes.type' => 'yes',
                        'users.role_id' => 3
                    ])
                    ->count();

                $count_no = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Post',
                        'votes.type' => 'no',
                        'users.role_id' => 3
                    ])
                    ->count();

                $count_optional = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Post',
                        'votes.type' => 'optional',
                        'users.role_id' => 3
                    ])
                    ->count();
            } elseif ($filter_type == 'end_user') {
                $count_yes = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Post',
                        'votes.type' => 'yes',
                        'users.role_id' => 4
                    ])
                    ->count();

                $count_no = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Post',
                        'votes.type' => 'no',
                        'users.role_id' => 4
                    ])
                    ->count();

                $count_optional = Vote::leftJoin('users', function ($join) {
                    $join->on('votes.user_id', '=', 'users.id');
                })
                    ->where([
                        'votes.voteable_id' => $id,
                        'votes.voteable_type' => 'App\Models\Post',
                        'votes.type' => 'optional',
                        'users.role_id' => 4
                    ])
                    ->count();
            } else {
                $count_yes = Vote::where(['voteable_id' => $id, 'voteable_type' => 'App\Models\Post', 'type' => 'yes'])->count();
                $count_no = Vote::where(['voteable_id' => $id, 'voteable_type' => 'App\Models\Post', 'type' => 'no'])->count();
                $count_optional = Vote::where(['voteable_id' => $id, 'voteable_type' => 'App\Models\Post', 'type' => 'optional'])->count();
            }

            $data = array(
                'yes' => $count_yes,
                'no' => $count_no,
                'optional' => $count_optional
            );

            return response()->json([
                'success' => true,
                'message' => "Vote Count!",
                'data' => $data
            ], 200);
        }
    }

    public function featureReportData($id)
    {
        $PublicVotes = voteCountByType($id, 4);
        $privateVotes = voteCountByType($id, 3);

        $data = array(
            'publicVotes' => $PublicVotes,
            'privateVotes' => $privateVotes
        );

        return response()->json([
            'success' => true,
            'data' => $data,
            "message" => "Feature Report!"
        ], 200);
    }
}
