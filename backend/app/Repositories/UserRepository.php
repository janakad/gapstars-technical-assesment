<?php


namespace App\Repositories;

use App\Models\User;

/**
 * Class UserRepository
 * @package App\Repositories
 */
class UserRepository
{
    /**
     * @param array $query
     * @return mixed
     */
    public function select(array $query = []): User
    {
        return User::where($query)->first();
    }
}
