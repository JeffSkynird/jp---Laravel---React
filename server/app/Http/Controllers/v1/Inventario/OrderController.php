<?php

namespace App\Http\Controllers\v1\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\WarehouseOrder;
use App\Models\WarehouseProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        try {

            $data = Order::join('suppliers', 'orders.supplier_id', '=', 'suppliers.id')
                ->leftjoin('users as u1', 'orders.requested_by', '=', 'u1.id')
                ->leftjoin('users as u2', 'orders.created_by', '=', 'u2.id')
                ->leftjoin('users as u3', 'orders.authorized_by', '=', 'u3.id')
                ->selectRaw('orders.*,suppliers.business_name as supplier,u1.names as requested,u2.names as created,u3.names as authorized')->groupBy('orders.id', 'suppliers.business_name', 'u1.names', 'u2.names', 'u3.names')->get();
            return response()->json([
                "status" => "200",
                'data' => $data,
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
    public function createDetailOrder($product, $quantity, $order)
    {
        OrderProduct::create([
            'order_id' => $order,
            'quantity' => $quantity,
            'product_id' => $product
        ]);
    }
    public function obtenerDetallePedido($id)
    {
        try {
            $data = OrderProduct::join('products as pro', 'order_products.product_id', '=', 'pro.id')
            ->join('orders as or', 'order_products.order_id', '=', 'or.id')
            ->join('suppliers as su', 'or.supplier_id', '=', 'su.id')
            ->where('or.id',$id)
            ->selectRaw('order_products.id as id_detalle,su.business_name as supplier,su.id as supplier_id,pro.id as product_id,pro.name as product,order_products.quantity')->groupBy('order_products.id','su.id','pro.id','order_products.quantity')->get();
            return response()->json([
                "status" => "200",
                'data' => $data,
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
            $idUser = Auth::id();
            $data = $request->all();
            foreach ($data['suppliers'] as $val) {
                $order = Order::create([
                    'supplier_id' => $val['supplier_id'],
                    'created_by' => $idUser,
                    'requested_by' => $idUser,
                    'authorized_by' => !is_null($data['authorize']) ? ($data['authorize'] == 1 ? $idUser : null ): null
                ]);
                foreach ($val['products'] as $val2) {
                    $this->createDetailOrder($val2['product_id'], $val2['quantity'], $order->id);
                }
            }
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
    private function storeProductWarehouse($poduct, $warehouse)
    {
        try {
            WarehouseProduct::create([
                'product_id' => $poduct,
                'warehouse_id' => $warehouse,
            ]);
        } catch (\Exception $e) {
        }
    }
    private function storeOrderWarehouse($order, $warehouse, $quantity)
    {
        try {
            WarehouseOrder::create([
                'order_id' => $order,
                'warehouse_id' => $warehouse,
                'quantity' => $quantity
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
    public function autorize($id)
    {
        $idUser = Auth::id();

        $data = Order::find($id);
        $data->authorized_by=$idUser;
        $data->save();
        return response()->json([
            "status" => "200",
            "message" => 'Autorización exitosa',
            "type" => 'success'
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $idUser = Auth::id();
            $data = $request->all();
            $ord = Order::find($id);
            $ord->delete();
            foreach ($data['suppliers'] as $val) {
                $order = Order::create([
                    'supplier_id' => $val['supplier_id'],
                    'created_by' => $idUser,
                    'requested_by' => $idUser,
                    'authorized_by' => !is_null($data['authorize']) ? ($data['authorize'] == 1 ? $idUser : null ): null
                ]);
                foreach ($val['products'] as $val2) {
                    $this->createDetailOrder($val2['product_id'], $val2['quantity'], $order->id);
                }
            }
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
        try {
        $data = Order::find($id);
        
        $data->delete();
        return response()->json([
            "status" => "200",
            "message" => 'Eliminación exitosa',
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
}
