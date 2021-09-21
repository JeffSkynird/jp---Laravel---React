<?php

namespace App\Http\Controllers\v1\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\WarehouseOrder;
use App\Models\WarehouseProduct;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        try {
            $data = Order::all();
            return response()->json([
                "status" => "200",
                'data'=>$data,
                "message" => 'Data obtenida con éxito',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function create(Request $request)
    {
        try {
            Order::create($request->all());
            return response()->json([
                "status" => "200",
                "message" => 'Registro exitoso',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    private function storeProductWarehouse($poduct,$warehouse)
    {
        try {
            WarehouseProduct::create([
                'product_id'=>$poduct,
                'warehouse_id'=>$warehouse,
            ]);
        } catch (\Exception $e) {
        }
    }
    private function storeOrderWarehouse($order,$warehouse,$quantity)
    {
        try {
            WarehouseOrder::create([
                'order_id'=>$order,
                'warehouse_id'=>$warehouse,
                'quantity'=>$quantity
            ]);
        } catch (\Exception $e) {
        }
    }
    public function show($id)
    {
        $data = Order::find($id);
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function update(Request $request,$id){
        try {
            $co = Order::find($id);
            $co->update($request->all());
            return response()->json([
                "status" => "200",
                "message" => 'Modificación exitosa',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
  
    public function delete($id)
    {
        $data = Order::find($id);
        $data->delete();
        return response()->json([
            "status" => "200",
            "message" => 'Eliminación exitosa',
            "type" => 'success'
        ]);
    }
}
