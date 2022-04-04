<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\HasApiTokens;
use Auth;

class Post extends Model
{
    use HasApiTokens, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */

    //protected $table='posts';

    // protected $fillable = [
    //     'title',
    //     'content',
    //     'image',
    //     'user_id',
    //     'status',
    // ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        if (Auth::user()->role_id == 4) {
            return $this->morphMany(Comment::class, 'commentable')->whereNull('parent_id')->where(['comment_status' => 'public']);
        } else {
            return $this->morphMany(Comment::class, 'commentable')->whereNull('parent_id');
        }
    }

    public function post_votes()
    {
        return $this->hasMany(Vote::class, 'voteable_id')->where(['voteable_type' => 'App\Models\Post']);
    }

    public function postPublicVote()
    {
        return $this->hasMany(Vote::class, 'voteable_id')->join('users', 'users.id', '=', 'votes.user_id')->where(['votes.voteable_type' => 'App\Models\Post']);
    }

    public function postPrivateVote()
    {
        return $this->hasMany(Vote::class, 'voteable_id')->join('users', 'users.id', '=', 'votes.user_id')->where(['votes.voteable_type' => 'App\Models\Post']);
    }
}
