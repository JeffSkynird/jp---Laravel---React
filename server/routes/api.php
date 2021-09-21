<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['prefix' => 'v1'], function () {
    Route::group([
        'prefix' => 'auth',
    ], function() {
        Route::post('login', 'App\Http\Controllers\v1\Seguridad\AuthController@login');
        Route::post('logout', 'App\Http\Controllers\v1\Seguridad\AuthController@logout')->middleware('auth:api');

    });

    Route::post('users', 'App\Http\Controllers\v1\Seguridad\UsuarioController@create');
    Route::put('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@update');
    Route::get('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@show');
    Route::delete('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@delete');

    Route::post('countries', 'App\Http\Controllers\v1\Ubicacion\CountryController@create');
    Route::put('countries/{id}', 'App\Http\Controllers\v1\Ubicacion\CountryController@update');
    Route::get('countries/{id}', 'App\Http\Controllers\v1\Ubicacion\CountryController@show');
    Route::get('countries', 'App\Http\Controllers\v1\Ubicacion\CountryController@index');
    Route::delete('countries/{id}', 'App\Http\Controllers\v1\Ubicacion\CountryController@delete');

    Route::post('provinces', 'App\Http\Controllers\v1\Ubicacion\ProvinceController@create');
    Route::put('provinces/{id}', 'App\Http\Controllers\v1\Ubicacion\ProvinceController@update');
    Route::get('provinces/{id}', 'App\Http\Controllers\v1\Ubicacion\ProvinceController@show');
    Route::get('provinces', 'App\Http\Controllers\v1\Ubicacion\ProvinceController@index');
    Route::delete('provinces/{id}', 'App\Http\Controllers\v1\Ubicacion\ProvinceController@delete');

    Route::post('cities', 'App\Http\Controllers\v1\Ubicacion\CityController@create');
    Route::put('cities/{id}', 'App\Http\Controllers\v1\Ubicacion\CityController@update');
    Route::get('cities/{id}', 'App\Http\Controllers\v1\Ubicacion\CityController@show');
    Route::get('cities', 'App\Http\Controllers\v1\Ubicacion\CityController@index');
    Route::delete('cities/{id}', 'App\Http\Controllers\v1\Ubicacion\CityController@delete');

    Route::post('zones', 'App\Http\Controllers\v1\Ubicacion\ZoneController@create');
    Route::put('zones/{id}', 'App\Http\Controllers\v1\Ubicacion\ZoneController@update');
    Route::get('zones/{id}', 'App\Http\Controllers\v1\Ubicacion\ZoneController@show');
    Route::get('zones', 'App\Http\Controllers\v1\Ubicacion\ZoneController@index');
    Route::delete('zones/{id}', 'App\Http\Controllers\v1\Ubicacion\ZoneController@delete');

    Route::post('warehouses', 'App\Http\Controllers\v1\Inventario\WarehouseController@create');
    Route::put('warehouses/{id}', 'App\Http\Controllers\v1\Inventario\WarehouseController@update');
    Route::get('warehouses/{id}', 'App\Http\Controllers\v1\Inventario\WarehouseController@show');
    Route::get('warehouses', 'App\Http\Controllers\v1\Inventario\WarehouseController@index');
    Route::delete('warehouses/{id}', 'App\Http\Controllers\v1\Inventario\WarehouseController@delete');

    Route::post('unities', 'App\Http\Controllers\v1\Inventario\UnityController@create');
    Route::put('unities/{id}', 'App\Http\Controllers\v1\Inventario\UnityController@update');
    Route::get('unities/{id}', 'App\Http\Controllers\v1\Inventario\UnityController@show');
    Route::get('unities', 'App\Http\Controllers\v1\Inventario\UnityController@index');
    Route::delete('unities/{id}', 'App\Http\Controllers\v1\Inventario\UnityController@delete');

    Route::post('products', 'App\Http\Controllers\v1\Inventario\ProductController@create');
    Route::put('products/{id}', 'App\Http\Controllers\v1\Inventario\ProductController@update');
    Route::get('products/{id}', 'App\Http\Controllers\v1\Inventario\ProductController@show');
    Route::get('products', 'App\Http\Controllers\v1\Inventario\ProductController@index');
    Route::delete('products/{id}', 'App\Http\Controllers\v1\Inventario\ProductController@delete');

    Route::middleware('auth:api')->group(function () {
       
        Route::put('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@updateAuth');
        Route::get('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@showAuth');
  
        
    });
   
});