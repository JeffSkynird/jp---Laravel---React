<?php

namespace App\Http\Controllers\v1\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Transfer;
use App\Models\WarehouseProduct;
use Illuminate\Http\Request;

class TransferController extends Controller
{
    public function index()
    {
        try {
            $data = Transfer::
           join('products as p', 'transfers.product_id', '=', 'p.id')
            ->join('warehouses as w1', 'transfers.warehouse_origin', '=', 'w1.id')
            ->join('warehouses as w2', 'transfers.warehouse_destination', '=', 'w2.id')
            ->selectRaw('p.image,p.bar_code,p.name,w1.name as warehouse_origin,w2.name as warehouse_destination,transfers.created_at')->get();
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

        $data = $request->input('data');
        try {
            foreach ($data as $val) {
                $pro = Product::find($val['product_id']);
                $pro->warehouse_id = $val['warehouse_id'];
                $pro->save();
                Transfer::create([
                    'product_id'=>$val['product_id'],
                    'warehouse_origin'=>$val['warehouse_idO'],
                    'warehouse_destination'=>$val['warehouse_id'],
                    'user_id'=>1

                ]);
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
    public function show($id)
    {
        $data = Transfer::find($id);
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function update(Request $request,$id){
        try {
            $co = Transfer::find($id);
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
        $data = Transfer::find($id);
        $data->delete();
        return response()->json([
            "status" => "200",
            "message" => 'Eliminación exitosa',
            "type" => 'success'
        ]);
    }
}
