<?php

use App\Models\User;
use App\Models\Company;
use App\Models\Vote;

use Laravel\Passport\RefreshToken;
use Laravel\Passport\Token;

function checkUserCompanySubscription($user_id)
{

    $user_company_info = getCompanyData($user_id);

    if ($user_company_info) {
        return $user_company_info->subscription_status;
    } else {
        return false;
    }
}

function getCompanyData($user_id)
{
    $company = Company::select()->where(['id' => $user_id])->first();

    if ($company) {
        return $company;
    } else {
        return false;
    }
}

function voteCountByType($voteble_id, $type, $voteable_type = "App\Models\Post")
{
    $voteCount = Vote::select('votes.id', 'votes.type')->where(['votes.voteable_id' => $voteble_id, 'votes.voteable_type' => $voteable_type, 'users.role_id' => $type])
        ->leftJoin('users', function ($join) {
            $join->on('votes.user_id', '=', 'users.id');
        })->get();

    return $voteCount;
}
