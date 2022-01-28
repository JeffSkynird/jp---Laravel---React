<?php

namespace App\Http\Controllers\v1\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use File;
class ItemController extends Controller
{
    public function save($file)
    {
        if($file!=null){
            $extension = $file->getClientOriginalExtension(); // getting image extension
            $filename =time().'.'.$extension;
            $file->storeAs('public/photos', $filename);
            return  'photos/'.$filename;
        }else{
            return null;
        }

    }
    public function index()
    {
        try {
  
            $data = Item::join('categories', 'items.category_id', '=', 'categories.id')
            ->select('items.*','categories.name as category')->orderBy('id','desc')->get();
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
            $url = $this->save($request->file('url'));
            $request['image']=$url;
            Item::create($request->all());
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
    public function showByWarehouse($id)
    {
        try {
            $data = Item::where('warehouse_id','=',$id)->where('stock','>','0')->orderBy('id','desc')->get();
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
    public function showByClient($id)
    {
        try {
            $data = Item::join('warehouses', 'products.warehouse_id', '=', 'warehouses.id')
            ->join('suppliers','warehouses.supplier_id','=','suppliers.id')
            ->where('suppliers.id','=',$id)
            ->select('products.*')->orderBy('id','desc')->get();
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
    public function showByOwn()
    {
        try {
            $data = Item::join('warehouses', 'products.warehouse_id', '=', 'warehouses.id')
            ->where('warehouses.supplier_id','=',null)
            ->select('products.*')->orderBy('id','desc')->get();
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

    public function show($id)
    {
        $data = Item::find($id);
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function deleteImage($file_path)
    {
        if($file_path!=null){
            File::delete(public_path() . '/storage/'.$file_path);
        
        }
    }

    public function subirFoto(Request $request,$id){
        $url = $this->save($request->file('url'));
        $pr = Item::find($id);
        if($request->file('url')!=null){
            $this->deleteImage($pr->image);
        }
        $pr->image=$url;
        $pr->save();
    }
    public function update(Request $request,$id){
        try {
            $co = Item::find($id);
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
        $data = Item::find($id);
        $data->delete();
        return response()->json([
            "status" => "200",
            "message" => 'Eliminación exitosa',
            "type" => 'success'
        ]);
    }
}
