<?php

namespace App\Http\Controllers\v1\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use File;
class SupplierController extends Controller
{
    public function save($file)
    {
        if($file!=null){
            $extension = $file->getClientOriginalExtension(); // getting image extension
            $filename =time().'.'.$extension;
            $file->storeAs('public/proveedores', $filename);
            return  'proveedores/'.$filename;
        }else{
            return null;
        }

    }
    public function deleteImage($file_path)
    {
        if($file_path!=null){
            File::delete(public_path() . '/storage/'.$file_path);
        
        }
    }

    public function index()
    {
        try {
            $data = Supplier::leftjoin('orders', 'orders.supplier_id', '=', 'suppliers.id')
            ->selectRaw('suppliers.*,count(orders.*) as products')->groupBy('suppliers.id')->orderBy('id','desc')->get();
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
    public function subirFoto(Request $request,$id){
        $url = $this->save($request->file('url'));
        $pr = Supplier::find($id);
        if($request->file('url')!=null){
            $this->deleteImage($pr->logo);
        }
        $pr->logo=$url;
        $pr->save();
    }
    public function create(Request $request)
    {
        try {
            $url = $this->save($request->file('url'));
            $request['logo']=$url;
            Supplier::create($request->all());
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
        $data = Supplier::find($id);
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function update(Request $request,$id){
        try {
            $co = Supplier::find($id);

           

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
        $data = Supplier::find($id);
        $data->delete();
        return response()->json([
            "status" => "200",
            "message" => 'Eliminación exitosa',
            "type" => 'success'
        ]);
    }
}
