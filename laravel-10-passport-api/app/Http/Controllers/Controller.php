<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function uploadPhoto($request, $paremente): ?string
    {
        if ($request->hasFile($paremente)) {
            $file = $request->file($paremente);
            $file_name = 'Profile-' . time() . '.' . $file->getClientOriginalExtension();
            $path = '/images/user/';
            $file->move(public_path($path), $file_name);

            return $path . $file_name;
        }
        return null;
    }
}
