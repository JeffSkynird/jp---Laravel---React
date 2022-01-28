<?php

namespace App\Http\Controllers\v1\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    public function index()
    {
        try {
            $data = Expense::join('products', 'expenses.product_id', '=', 'products.id')
            ->join('items', 'products.item_id', '=', 'items.id')
            ->join('reasons', 'expenses.reason_id', '=', 'reasons.id')
            ->selectRaw('items.name,products.serial_code,products.client_code,products.stock,expenses.quantity as quantity,reasons.name as reason,expenses.created_at')->get();
            return json_encode([
                "status" => "200",
                'data'=>$data,
                "message" => 'Data obtenida con éxito',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return json_encode([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function create(Request $request)
    {
        try {
            $data = $request->input('data');
            foreach ($data as $val) {
         
                Expense::create([
                    'product_id' => $val['product_id'],
                    'reason_id' => $val['reason_id'],
                    'quantity'=> $val['quantity'],
                    'user_id'=> Auth::id()
                ]);
               $ord = Product::find($val['product_id']);
               if($ord->stock!=0){
                $ord->stock = doubleval($ord->stock) - doubleval($val['quantity']);
                $ord->save();
           }
            }
            return json_encode([
                "status" => "200",
                "message" => 'Registro exitoso',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return json_encode([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function show($id)
    {
        $data = Expense::find($id);
        return json_encode([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function update(Request $request,$id){
        try {
            $co = Expense::find($id);
            $co->update($request->all());
            return json_encode([
                "status" => "200",
                "message" => 'Modificación exitosa',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return json_encode([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
  
    public function delete($id)
    {
        $data = Expense::find($id);
        $data->delete();
        return json_encode([
            "status" => "200",
            "message" => 'Eliminación exitosa',
            "type" => 'success'
        ]);
    }
}
