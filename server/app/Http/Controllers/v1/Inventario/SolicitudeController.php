<?php

namespace App\Http\Controllers\v1\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Solicitude;
use App\Models\SolicitudeProduct;
use Illuminate\Http\Request;

class SolicitudeController extends Controller
{
    public function index()
    {
        try {
            $data = Solicitude::join('warehouses','solicitudes.warehouse_id','warehouses.id')->join('tasks','solicitudes.task_id','tasks.id')->join('users as u1','solicitudes.user_id','u1.id')->leftjoin('users as u2','solicitudes.authorized_by','u2.id')->select('u1.names as solicited','tasks.is_complete as is_complete','tasks.description as description','u2.names as authorized','solicitudes.*','warehouses.name as warehouse_name','tasks.description as task_name')->get();
           $autorizadas = Solicitude::where('authorized_by','!=',null)->count();
              $pendientes = Solicitude::where('authorized_by',null)->count();
            return response()->json([
                "status" => "200",
                'data'=>$data,
                'autorizadas'=>$autorizadas,
                'pendientes'=>$pendientes,

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
    public function autorization($id)
    {
        try {
            $data = Solicitude::find($id);
            $data->authorized_by = 1;
            $data->save();
            //RESTAR DE INVENTARIO
            $soli  = SolicitudeProduct::where('solicitude_id',$id)->get();
            foreach ($soli as $value) {
                $pro = Product::find($value->product_id);
                if(!is_null($pro)){
                    $pro->stock = $pro->stock - $value->quantity;
                    $pro->save();
                }
            }
            return response()->json([
                "status" => "200",
                "message" => 'Solicitud autorizada con éxito',
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
            Solicitude::create($request->all());
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
        $data = Solicitude::find($id);
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function update(Request $request,$id){
        try {
            $co = Solicitude::find($id);
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
        $data = Solicitude::find($id);
        $data->delete();
        return response()->json([
            "status" => "200",
            "message" => 'Eliminación exitosa',
            "type" => 'success'
        ]);
    }
}
