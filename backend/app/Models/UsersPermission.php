<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\HasApiTokens;

class UsersPermission extends Model
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'user_id',
        'permission_id',
    ];

    public function users() {
        return $this->belongsToMany(User::class,'users_permissions'); 
    }
}
