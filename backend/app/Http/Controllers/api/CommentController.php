<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Company;
use App\Models\Post;
use App\Models\Comment;

use Auth;
use Validator;
use Response;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CommentController extends Controller
{
    protected $user;

    public function __construct()
    {
		$this->middleware( "auth:api" );
		// $this->user = new User;
	}

	public function index()
	{
		
		$comments = Comment::where('user_id',Auth::user()->id)->orderBy('id','DESC')->paginate(10);

		return response()->json([
				'success' => true,
				'data' => $comments
			], 200);

	}

	public function store(Request $request)
	{

        $validator = Validator::make($request->all(),[
			'comment' => 'required',
			'post_id' => 'required'
		]);

		if($validator->fails())
		{
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);

			// return Response::json(['errors'=>$validators->getMessageBag()->toArray()]);
		}

        $comment = new Comment();
        $comment->comment = $request->comment;
        $comment->user_id = Auth::user()->id;
        $comment->commentable_id = $request->post_id;

        
        if( $request->parent_id )
        {
        	$comment->parent_id = $request->parent_id;	
        }

        if($request->file('image')==NULL)
        {
            
        }
        else
        {
        	
        	$current_time = date('ymdhis');
            $filename = Str::random(10) . '-' . $current_time . '-' . Auth::user()->id . '.' . $request->file('image')->getClientOriginalExtension();
            $file_path = 'uploads/comments/'. $filename;
            
            $comment->comment_image = $file_path;
            $request->image->move( public_path('uploads/comments'), $filename );
        
        }

        if(isset($request->comment_status) && $request->comment_status == 'on')
        {
            $comment->comment_status = 'private';
        }

        $comment->save();
        return Response::json(['success'=>'Comment created successfully!']);
        
    }

    public function show($id)
    {

        if(Comment::where('id',$id)->first())
        {
            $comment_data = Comment::findOrFail($id);

            return response()->json([
				'success' => true,
				'data' => $comment_data,
				'message' => 'Success!'
			], 200);
        }
        else
        {
            return response()->json([
				'success' => false,
				'data' => '',
				'message' => 'Comment not found!'
			], 500);
        }        
    
    }

    public function remove(Request $request)
    {

        try{

            $comment = Comment::where('id',$request->id)->where( 'user_id', Auth::user()->id )->first();

            if($comment)
            {
                $comment->delete();
                return Response::json(['success'=>'Comment removed successfully!']);
            }
            else
            {
                return Response::json(['error'=>'Comment not found!']);
            }
        
        }catch(\Illuminate\Database\QueryException $exception){
            return Response::json(['error'=>'Comment belongs to author/article.So you cann\'t delete this comment!']);
        }

    }

    public function update(Request $request)
    {

        $validator = Validator::make($request->all(),[
			'comment' => 'required',
			'post_id' => 'required'
		]);

		if($validator->fails())
		{
			return response()->json([
				'success' => false,
				'message' => $validator->messages()->toArray()
			], 500);

		}

		$comment = Comment::where('id',$request->id)->where('user_id',Auth::user()->id)->first();
        
        if($comment)
        {
            $comment->comment = $request->comment;
            $comment->user_id = Auth::user()->id;
            $comment->commentable_id = $request->post_id;

            if( $request->parent_id )
	        {
	        	$comment->parent_id = $request->parent_id;	
	        }

	        if($request->file('image')==NULL)
	        {
	         	   
	        }
	        else
	        {
	        	
	        	$current_time = date('ymdhis');
	            $filename = Str::random(10) . '-' . $current_time . '-' . Auth::user()->id . '.' . $request->file('image')->getClientOriginalExtension();
	            $file_path = 'uploads/comments/'. $filename;
	            
	            $comment->comment_image = $file_path;
	            $request->image->move( public_path('uploads/comments'), $filename );
	        
	        }

            $comment->save();

            return response()->json([
				'success' => true,
				'data' => $comment,
				'message' => 'Comment updated successfully!'
			], 200);
           
        }
        else
        {
        	return response()->json([
				'success' => false,
				'message' => 'Comment not found!'
			], 500);
        }

    }

    public function commentReply(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'comment' => 'required',
            'post_id' => 'required',
            'comment_id' => 'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 500);
        }

        $comment = new Comment();
        $comment->comment = $request->comment;
        $comment->user_id = Auth::user()->id;
        $comment->commentable_id = $request->post_id;
        $comment->parent_id = $request->comment_id;

        if($request->file('image')==NULL)
        {
            
        }
        else
        {
            
            $current_time = date('ymdhis');
            $filename = Str::random(10) . '-' . $current_time . '-' . Auth::user()->id . '.' . $request->file('image')->getClientOriginalExtension();
            $file_path = 'uploads/comments/'. $filename;
            
            $comment->comment_image = $file_path;
            $request->image->move( public_path('uploads/comments'), $filename );
        
        }

        $comment->save();
        return Response::json(['success'=>'Reply created successfully!']);

    }

    public function isApproved(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'comment_approved' => 'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 500);
        }

        $comment = Comment::where('id',$request->id)->first();

        if($comment)
        {

            $update = Comment::where('id', $comment->id)->update(['comment_approved' => $request->comment_approved]);

            return response()->json([
                    'success' => true,
                    'message' => 'Comment Approve/Disapproved Successfully!'
                ], 200);

        }
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'You have not access to approve/disapprove this commet!'
            ], 500);
        }

    }

    public function isCompleted(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'is_complete' => 'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 500);
        }

        $comment = Comment::where('id',$request->id)->first();

        if($comment)
        {

            $update = Comment::where('id', $comment->id)->update(['is_completed' => $request->is_complete]);

            return response()->json([
                    'success' => true,
                    'message' => 'Comment Complete/Uncomplete Successfully!'
                ], 200);

        }
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'You have not access to Complete/Uncomplete this commet!'
            ], 500);
        }
    }

}
