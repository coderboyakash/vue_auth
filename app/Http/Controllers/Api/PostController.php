<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreatePostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use stdClass;

class PostController extends Controller
{
    public function getMyPosts()
    {
        $response = new stdClass;
        try {
            $posts = Post::where('user_id', auth()->id())->orderBy('created_at', 'desc')->get();
            $response->code = 200;
            $response->result = $posts;
        } catch (\Throwable $th) {
            $response->errors = $th->getMessage();
            $response->code = 401;
        }
        return response()->json($response, 200);
    }

    public function createNewPost(CreatePostRequest $request)
    {
        $response = new stdClass;
        try {
            $post = Post::create([
                'user_id' => auth()->id(),
                'title' => $request->title,
                'content' => $request->content,
            ]);
            $response->code = 200;
            $response->result = $post;
        } catch (\Throwable $th) {
            $response->errors = $th->getMessage();
            $response->code = 401;
        }
        return response()->json($response, 200);
    }
}
