<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\HasApiTokens;

class Comment extends Model
{
    use HasApiTokens, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    
    //protected $table='comments';

    // protected $fillable = [
    //     'commentable_id',
    //     'commentable_type',
    //     'user_id',
    //     'parent_id',
    //     'comment',
    //     'comment_approved',
    //     'comment_status',
    //     'comment_image',
    // ];

    public function commentable()
    {
       return $this->morphTo();
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class)->select(['id', 'name', 'profile_pic', 'role_id']);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class, 'voteable_id' )->where(['voteable_type' => 'App\Models\Comment']);
    }

    public function release_votes()
    {
        return $this->hasMany(ReleaseVote::class, 'voteable_id' )->where(['voteable_type' => 'App\Models\Comment']);
    }

}
