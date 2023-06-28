<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DirectLoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'authenticate_' => 'required|exists:users,id',
        ]);
        if($validator->fails()){
            abort(403);
        }
        if($request->authenticate_ == Auth::id()){
            return redirect()->back()->with('failed', 'You already logedin!');
        }
        $user = User::findOrFail($request->authenticate_);
        Auth::loginUsingId($user->id);
        return redirect()->route('dashboard')->with('success', 'You are loged in as ' . $user->name . '.');
    }
}
