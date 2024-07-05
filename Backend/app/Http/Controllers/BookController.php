<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Books;

class BookController extends Controller
{
    public function index()
    {
        $books = Books::all();
        return response()->json($books);
    }

    public function store(Request $request)
    {
        $book = new Books;
        $book->name = $request->name;
        $book->author = $request->author;
        $book->publish_date = $request->publish_date; // Added missing assignment operator
        $book->save();
        
        return response()->json([
            "message" => "Book Added."
        ], 201);
    }

    public function show($id)
    {
        $book = Books::find($id);
        if (!empty($book)) {
            return response()->json($book);
        } else {
            return response()->json([
                "message" => "Book not found"
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        if (Books::where('id', $id)->exists()) {
            $book = Books::find($id);
            $book->name = is_null($request->name) ? $book->name : $request->name;
            $book->author = is_null($request->author) ? $book->author : $request->author;
            $book->publish_date = is_null($request->publish_date) ? $book->publish_date : $request->publish_date;
            $book->save();
            return response()->json([
                "message" => "Book Updated."
            ], 200); // Changed status code to 200 for successful update
        } else {
            return response()->json([
                "message" => "Book Not Found."
            ], 404);
        }
    }

    public function destroy($id)
    {
        if (Books::where('id', $id)->exists()) {
            $book = Books::find($id);
            $book->delete();
            return response()->json([
                "message" => "Record deleted."
            ], 202);
        } else {
            return response()->json([
                "message" => "Book not found."
            ], 404);
        }
    }
}
