<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionCategoryRequest;
use App\Http\Requests\UpdateTransactionCategoryRequest;
use App\Http\Resources\TransactionCategoryResource;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use Illuminate\Http\JsonResponse;

class TransactionCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $transactionCategory = TransactionCategory::all();
        return (TransactionCategoryResource::collection($transactionCategory))->response();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreTransactionCategoryRequest $request
     * @return JsonResponse
     */
    public function store(StoreTransactionCategoryRequest $request): JsonResponse
    {
        $transactionCategory = TransactionCategory::create($request->validated());
        return (new TransactionCategoryResource($transactionCategory))->response();
    }

    /**
     * Display the specified resource.
     *
     * @param TransactionCategory $transactionCategory
     * @return JsonResponse
     */
    public function show(TransactionCategory $transactionCategory): JsonResponse
    {
        return (new TransactionCategoryResource($transactionCategory))->response();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param TransactionCategory $transactionCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(TransactionCategory $transactionCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateTransactionCategoryRequest $request
     * @param TransactionCategory $transactionCategory
     * @return JsonResponse
     */
    public function update(UpdateTransactionCategoryRequest $request, TransactionCategory $transactionCategory): JsonResponse
    {
        $transactionCategory->update($request->validated());
        return (new TransactionCategoryResource($transactionCategory))->response();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param TransactionCategory $transactionCategory
     * @return JsonResponse
     */
    public function destroy(TransactionCategory $transactionCategory): JsonResponse
    {
        $transactionCategory->delete();
        return (new TransactionCategoryResource($transactionCategory))->response();
    }
}
