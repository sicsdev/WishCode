<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\HasApiTokens;

class Permission extends Model
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

    public function users() {
        return $this->belongsToMany(User::class,'users_permissions'); 
    }
}
