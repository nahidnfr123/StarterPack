<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->nullable()->constrained('accounts')->onDelete('CASCADE');
            $table->foreignId('transaction_category_id')->nullable()->constrained('transaction_categories')->onDelete('set null');
            $table->string('name');
            $table->enum('account', ['cash', 'account', 'card']);
            $table->enum('type', ['income', 'expense']);
            $table->double('amount');
            $table->text('note')->nullable();
            $table->string('photo')->nullable();
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};
