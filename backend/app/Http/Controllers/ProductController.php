<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = auth()->user(    )->id;
        $products = Product::where("user_id", $user_id)->get();

        return response()->json(
            [
                'products' => $products,
                'message' => 'Products retrieved successfully',
            ],
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:80',
            'description' => 'nullable|string',
            'banner_image' => 'nullable|image|max:2048',
            'cost' => 'nullable|integer',
        ]);

        if ($request->hasFile('banner_image')) {
            $data['banner_image'] = $request->file('banner_image')->store('products', 'public');
        }

        $data['user_id'] = auth()->user()->id;

        $product = Product::create($data);

        return response()->json(
            [
                'product' => $product,
                'message' => 'Product created successfully',
            ],
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json(
            [
                'product' => $product,
                'message' => 'Product retrieved successfully',
            ],
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'title' => 'required|string|max:80',
            'description' => 'nullable|string',
            'banner_image' => 'nullable|image|max:2048',
            'cost' => 'nullable|integer',
        ]);

        if ($request->hasFile('banner_image')) {
            $data['banner_image'] = $request->file('banner_image')->store('products', 'public');
        }

        $product->update($data);

        return response()->json(
            [
                'product' => $product,
                'message' => 'Product updated successfully',
            ],
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(
            [
                'message' => 'Product deleted successfully',
            ],
            200
        );
    }
}
