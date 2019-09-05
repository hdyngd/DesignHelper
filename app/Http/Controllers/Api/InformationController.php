<?php

namespace App\Http\Controllers\Api;

use App\Information;
use App\Information_file;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInformationPost;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class InformationController extends Controller
{
    public function store(StoreInformationPost $request)
    {
        DB::beginTransaction();
        try {
            $information = Information::create([
                'title' => $request->input('title'),
                'content' => htmlspecialchars($request->input('content')),
                'user_id' => auth()->user()->id
            ]);

            $files = json_decode($request->input('files'), true);

            if($request->input('files')){
                foreach ($files as $value) {
                    Information_file::create([
                        'information_id' => $information->id,
                        'name' => $value['name'],
                        'url' => $value['url']
                    ]);
                }
            }

            DB::commit();
            return $information;
        } catch (\Exception $e) {
            DB::rollback();
            abort(500);
        }
    }

    public function fileUpload(Request $request)
    {
        $res = [];
        if($request->hasFile('file')) {
            $filename = Storage::disk('s3')->putFile('information', $request->file('file'), 'public');
            $url = Storage::disk('s3')->url($filename);

            $res = [
              'url' => $url
            ];
        }

        return response()->json($res);
    }

    public function get()
    {
        $informations = Information::all();
        $information_files = Information_file::all();

        $files = [];
        foreach ($information_files as $value) {
            $files[$value->information_id][] = $value;
        }

        foreach ($informations as $key => $value) {
            $informations[$key]['files'] = (array_key_exists($value->id, $files)) ? $files[$value->id] : [];
        }

        return response()->json($informations);

    }
}
