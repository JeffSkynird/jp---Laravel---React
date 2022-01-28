<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('client_code')->nullable();
            $table->string('serial_code')->nullable();
            $table->text('description')->nullable();
            $table->integer('stock')->default(0);
            $table->double('price', 15, 8)->default(0);
            $table->foreignId('item_id')->constrained('items');
            $table->foreignId('unity_id')->nullable()->constrained('unities');
            $table->string('ip')->nullable();
            $table->string('terminal')->nullable();
            $table->foreignId('user_id')->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
