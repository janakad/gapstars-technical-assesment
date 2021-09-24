<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

/**
 * Class AuthController
 * @package App\Http\Controllers
 */
class AuthController extends Controller
{
    protected $user;

    /**
     * AuthController constructor.
     * @param UserRepository $userRepository
     */
    function __construct(UserRepository $userRepository)
    {
        $this->user = $userRepository;
    }

    /**
     * @param Request $request
     * @return Application|ResponseFactory|Response|string
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        $user = $this->user->select(['email' => $request->email]);

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response('Login invalid', 503);
        }

        return response($user->createToken($request->device_name)->plainTextToken, 201);
    }
}
