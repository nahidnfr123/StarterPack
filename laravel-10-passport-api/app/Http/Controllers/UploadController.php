<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function uploadPhoto($photo): ?string
    {
        if ($photo && is_file($photo)) {
            $file = file($photo);
            $file_name = 'Profile-' . time() . '.' . $file->getClientOriginalExtension();
            $path = '/images/user/';
            $file->move(public_path($path), $file_name);

            return $path . $file_name;
        }
        return null;
    }
}
