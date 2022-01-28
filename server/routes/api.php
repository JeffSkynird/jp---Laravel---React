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
    
    Route::get('warehouses/inventory/{id}', 'App\Http\Controllers\v1\Inventario\WarehouseController@showProducts');

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

    //Route::post('products/upload_image/{id}', 'App\Http\Controllers\v1\Inventario\ProductController@subirFoto');
    Route::put('products/{id}', 'App\Http\Controllers\v1\Inventario\ProductController@update');
    Route::get('products/{id}', 'App\Http\Controllers\v1\Inventario\ProductController@show');
    Route::get('products', 'App\Http\Controllers\v1\Inventario\ProductController@index');
    Route::delete('products/{id}', 'App\Http\Controllers\v1\Inventario\ProductController@delete');
    Route::get('inventories', 'App\Http\Controllers\v1\Inventario\InventoryController@index');

    Route::post('suppliers/upload_image/{id}', 'App\Http\Controllers\v1\Inventario\SupplierController@subirFoto');

    Route::post('suppliers', 'App\Http\Controllers\v1\Inventario\SupplierController@create');
    Route::put('suppliers/{id}', 'App\Http\Controllers\v1\Inventario\SupplierController@update');
    Route::get('suppliers/{id}', 'App\Http\Controllers\v1\Inventario\SupplierController@show');
    Route::get('suppliers', 'App\Http\Controllers\v1\Inventario\SupplierController@index');
    Route::delete('suppliers/{id}', 'App\Http\Controllers\v1\Inventario\SupplierController@delete');

    Route::get('orders/{id}', 'App\Http\Controllers\v1\Inventario\OrderController@show');
    Route::get('orders', 'App\Http\Controllers\v1\Inventario\OrderController@index');
    Route::delete('orders/{id}', 'App\Http\Controllers\v1\Inventario\OrderController@delete');
    
    Route::post('change_order_status', 'App\Http\Controllers\v1\Inventario\OrderController@storeInventory');
    Route::get('order_inventory/{id}', 'App\Http\Controllers\v1\Inventario\OrderController@viewOrderInventory');
    Route::post('order/warehouse/{id}', 'App\Http\Controllers\v1\Inventario\OrderController@distribuirPedido');

    
    Route::get('orders_status', 'App\Http\Controllers\v1\Inventario\OrderController@viewStatusOrder');

    Route::get('order_detail/{id}', 'App\Http\Controllers\v1\Inventario\OrderController@obtenerDetallePedido');

    Route::post('features', 'App\Http\Controllers\v1\Inventario\FeatureController@create');
    Route::put('features/{id}', 'App\Http\Controllers\v1\Inventario\FeatureController@update');
    Route::get('features/{id}', 'App\Http\Controllers\v1\Inventario\FeatureController@show');
    Route::get('features', 'App\Http\Controllers\v1\Inventario\FeatureController@index');
    Route::delete('features/{id}', 'App\Http\Controllers\v1\Inventario\FeatureController@delete');

    Route::post('categories', 'App\Http\Controllers\v1\Inventario\CategoryController@create');
    Route::put('categories/{id}', 'App\Http\Controllers\v1\Inventario\CategoryController@update');
    Route::get('categories/{id}', 'App\Http\Controllers\v1\Inventario\CategoryController@show');
    Route::get('categories', 'App\Http\Controllers\v1\Inventario\CategoryController@index');
    Route::delete('categories/{id}', 'App\Http\Controllers\v1\Inventario\CategoryController@delete');

    Route::post('reasons', 'App\Http\Controllers\v1\Inventario\ReasonController@create');
    Route::put('reasons/{id}', 'App\Http\Controllers\v1\Inventario\ReasonController@update');
    Route::get('reasons/{id}', 'App\Http\Controllers\v1\Inventario\ReasonController@show');
    Route::get('reasons', 'App\Http\Controllers\v1\Inventario\ReasonController@index');
    Route::delete('reasons/{id}', 'App\Http\Controllers\v1\Inventario\ReasonController@delete');

    Route::post('transfers', 'App\Http\Controllers\v1\Inventario\TransferController@create');
    Route::put('transfers/{id}', 'App\Http\Controllers\v1\Inventario\TransferController@update');
    Route::get('transfers/{id}', 'App\Http\Controllers\v1\Inventario\TransferController@show');
    Route::get('transfers', 'App\Http\Controllers\v1\Inventario\TransferController@index');
    Route::delete('transfers/{id}', 'App\Http\Controllers\v1\Inventario\TransferController@delete');



    Route::post('tasks', 'App\Http\Controllers\v1\Inventario\TaskController@create');
    Route::put('tasks/{id}', 'App\Http\Controllers\v1\Inventario\TaskController@update');
    Route::get('tasks/{id}', 'App\Http\Controllers\v1\Inventario\TaskController@show');
    Route::get('tasks', 'App\Http\Controllers\v1\Inventario\TaskController@index');
    Route::delete('tasks/{id}', 'App\Http\Controllers\v1\Inventario\TaskController@delete');

    Route::get('sub_tasks/{id}', 'App\Http\Controllers\v1\Inventario\TaskController@subtasks');
    Route::get('solicitudes/{id}', 'App\Http\Controllers\v1\Inventario\TaskController@solicitudes');
    Route::put('solicitudes/{id}', 'App\Http\Controllers\v1\Inventario\SolicitudeController@update');

    Route::get('solicitudes', 'App\Http\Controllers\v1\Inventario\SolicitudeController@index');
    Route::post('solicitudes/authorize/{id}', 'App\Http\Controllers\v1\Inventario\SolicitudeController@autorization');
    Route::get('products_by_warehouse/{id}', 'App\Http\Controllers\v1\Inventario\ProductController@showByWarehouse');
    Route::get('products_by_client/{id}', 'App\Http\Controllers\v1\Inventario\ProductController@showByClient');
    Route::get('products_own', 'App\Http\Controllers\v1\Inventario\ProductController@showByOwn');
    Route::get('voucher', 'App\Http\Controllers\v1\Reporte\VoucherController@reporte');

    Route::put('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@updateAuth');
    Route::get('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@showAuth');
    Route::post('users', 'App\Http\Controllers\v1\Seguridad\UsuarioController@create');
    Route::put('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@update');
    Route::get('users', 'App\Http\Controllers\v1\Seguridad\UsuarioController@index');
    Route::get('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@show');
    Route::delete('users/{id}', 'App\Http\Controllers\v1\Seguridad\UsuarioController@delete'); 

    Route::get('income_type', 'App\Http\Controllers\v1\Inventario\ReasonController@incomeType');
    Route::get('notification/menu', 'App\Http\Controllers\v1\Reporte\NotificationController@index');

    
    
    Route::get('kpis', 'App\Http\Controllers\v1\Reporte\DashboardController@kpis');
    Route::get('warehouse_by_products', 'App\Http\Controllers\v1\Reporte\DashboardController@totalProductosPorBodega');
    Route::get('tasks_status', 'App\Http\Controllers\v1\Reporte\DashboardController@totalTareasCompletadas');
    Route::get('solicitudes_status', 'App\Http\Controllers\v1\Reporte\DashboardController@pedidosAutorizados');

    Route::get('income_expense', 'App\Http\Controllers\v1\Reporte\DashboardController@incomeByExpense');
    Route::get('last_total_orders', 'App\Http\Controllers\v1\Reporte\DashboardController@comprasUltimos6Meses');

    Route::get('tasks/users/{id}', 'App\Http\Controllers\v1\Inventario\TaskController@showUsersAsiggned');
    Route::post('solicitude', 'App\Http\Controllers\v1\Inventario\SolicitudeController@create');

    //Modulos
    Route::post('modules', 'App\Http\Controllers\v1\Gestion\ModuleController@create');
    Route::put('modules/{id}', 'App\Http\Controllers\v1\Gestion\ModuleController@update');
    Route::get('modules/{id}', 'App\Http\Controllers\v1\Gestion\ModuleController@show');
    Route::get('modules', 'App\Http\Controllers\v1\Gestion\ModuleController@index');
    Route::delete('modules/{id}', 'App\Http\Controllers\v1\Gestion\ModuleController@delete');
    //Items
    Route::post('items', 'App\Http\Controllers\v1\Inventario\ItemController@create');
    Route::put('items/{id}', 'App\Http\Controllers\v1\Inventario\ItemController@update');
    Route::get('items/{id}', 'App\Http\Controllers\v1\Inventario\ItemController@show');
    Route::get('items', 'App\Http\Controllers\v1\Inventario\ItemController@index');
    Route::delete('items/{id}', 'App\Http\Controllers\v1\Inventario\ItemController@delete');
    Route::post('items/upload_image/{id}', 'App\Http\Controllers\v1\Inventario\ItemController@subirFoto');

    Route::middleware('auth:api')->group(function () {
      
        //Expense
        Route::post('expenses', 'App\Http\Controllers\v1\Inventario\ExpenseController@create');
        Route::put('expenses/{id}', 'App\Http\Controllers\v1\Inventario\ExpenseController@update');
        Route::get('expenses/{id}', 'App\Http\Controllers\v1\Inventario\ExpenseController@show');
        Route::get('expenses', 'App\Http\Controllers\v1\Inventario\ExpenseController@index');
        Route::delete('expenses/{id}', 'App\Http\Controllers\v1\Inventario\ExpenseController@delete');

        Route::post('autorize_order/{id}', 'App\Http\Controllers\v1\Inventario\OrderController@autorize');
        Route::put('orders/{id}', 'App\Http\Controllers\v1\Inventario\OrderController@update');

        Route::post('orders', 'App\Http\Controllers\v1\Inventario\OrderController@create');
        Route::put('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@updateAuth');
        Route::get('user', 'App\Http\Controllers\v1\Seguridad\UsuarioController@showAuth');
  
        
    Route::post('adjustments', 'App\Http\Controllers\v1\Inventario\AdjustmentController@create');
    Route::put('adjustments/{id}', 'App\Http\Controllers\v1\Inventario\AdjustmentController@update');
    Route::get('adjustments/{id}', 'App\Http\Controllers\v1\Inventario\AdjustmentController@show');
    Route::get('adjustments', 'App\Http\Controllers\v1\Inventario\AdjustmentController@index');
    Route::delete('adjustments/{id}', 'App\Http\Controllers\v1\Inventario\AdjustmentController@delete');
    });
   
});