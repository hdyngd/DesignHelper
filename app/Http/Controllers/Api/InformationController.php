<?php

namespace App\Http\Controllers\Api;

use App\Information;
use App\Information_file;
use App\Jobs\ReceiveInformation;
use Illuminate\Bus\Dispatcher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInformationPost;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class InformationController extends Controller
{
    public function store(StoreInformationPost $request, Dispatcher $dispatcher)
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

            $mail = new ReceiveInformation($information->id);
            $dispatcher->dispatch($mail);

            DB::commit();
            return $information;
        } catch (\Exception $e) {
            DB::rollback();
            abort(500);
        }
    }

    public function edit(StoreInformationPost $request, Dispatcher $dispatcher)
    {
        DB::beginTransaction();
        try {
            $information = Information::find($request->input('id'));

            $information->title = $request->input('title');
            $information->content = htmlspecialchars($request->input('content'));
            $information->save();

            // 一旦全部けしてから再挿入
            Information_file::where('information_id', $information->id)->delete();

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

            $mail = new ReceiveInformation($information->id);
            $dispatcher->dispatch($mail);

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

        $updated_at = [];
        foreach ($informations as $key => $value) {
            $informations[$key]['files'] = (array_key_exists($value->id, $files)) ? $files[$value->id] : [];

            // sort用
            $updated_at[$key] = (new Carbon($value->updated_at))->toDateTimeString();
        }

        $informations = $informations->toArray();
        array_multisort($updated_at, SORT_DESC, $informations);
        return response()->json($informations);

    }

    public function getOne($id){
        $information = Information::find($id);
        $files  = Information_file::where('information_id', $id)->get();

        $information['files'] = $files;
        return response()->json($information);
    }

    public function delete($id)
    {
        $information = Information::find($id);
        $information->delete();
        Information_file::where('information_id', $id)->delete();
        return response()->json();
    }
}
