<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
use App\Models\Account;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $accounts = Account::where('user_id', auth('sanctum')->id())->get();
        return (AccountResource::collection($accounts))->response();
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
     * @param StoreAccountRequest $request
     * @return JsonResponse
     */
    public function store(StoreAccountRequest $request): JsonResponse
    {
        $account = Account::create($request->validated());
        return (new AccountResource($account))->response();
    }

    /**
     * Display the specified resource.
     *
     * @param Account $account
     * @return JsonResponse
     */
    public function show(Account $account): JsonResponse
    {
        return (new AccountResource($account))->response();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Account $account
     * @return \Illuminate\Http\Response
     */
    public function edit(Account $account)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateAccountRequest $request
     * @param Account $account
     * @return JsonResponse
     */
    public function update(UpdateAccountRequest $request, Account $account): JsonResponse
    {
        $account->update($request->validated());
        return (new AccountResource($account))->response();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Account $account
     * @return JsonResponse
     */
    public function destroy(Account $account): JsonResponse
    {
        $account->delete();
        return (new AccountResource($account))->response();
    }
}
