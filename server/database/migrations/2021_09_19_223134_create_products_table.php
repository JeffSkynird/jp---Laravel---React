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
            $table->string('jp_code');
            $table->string('name');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->text('stock');
            $table->integer('min_stock')->nullable();
            $table->integer('max_stock')->nullable();
            $table->foreignId('unity_id')->constrained('unities');
            $table->foreignId('category_id')->constrained('categories');
            $table->boolean('status')->default(1);
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
