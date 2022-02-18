<?php

namespace App\Http\Controllers\v1\Inventario;

use App\Http\Controllers\Controller;
use App\Imports\ProductsImport;
use App\Models\Product;
use Illuminate\Http\Request;
use File;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    public function save($file)
    {
        if ($file != null) {
            $extension = $file->getClientOriginalExtension(); // getting image extension
            $filename = time() . '.' . $extension;
            $file->storeAs('public/photos', $filename);
            return  'photos/' . $filename;
        } else {
            return null;
        }
    }
    function incrementalHash($len = 5, $type)
    {
        $charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $charsetNumber = "0123456789";

        $final = $type == 'number' ? $charsetNumber : $charset;
        $base = strlen($final);
        $result = '';

        $now = explode(' ', microtime())[1];
        while ($now >= $base) {
            $i = $now % $base;
            $result = $final[$i] . $result;
            $now /= $base;
        }
        return substr($result, -$len);
    }
    public function generateSerialCode(Request $request)
    {
        try {
            $id = $request->input('id');
            $data = $this->incrementalHash(4, 'letter') . $this->incrementalHash(9, 'number') . $id;
            return response([
                'data' => $data,
                'message' => "Código generado correctamente",
                'type' => "success",
            ]);
        } catch (\Exception $exception) {
            return response([
                'message' =>  $exception->getMessage(),
                'type' => 'error',
            ]);
        }
    }
    public function import(Request $request)
    {

        try {
            $warehouseId=$request->input('warehouse_id');
            $import = new ProductsImport(intval($warehouseId));
            Excel::import($import, $request->file('file'));
            return response([
                'errors' => $import->data,
                'error_data' => $import->errors,
                'message' => "Productos importados: " . $import->data['exito'] . ". Fallidos: " . $import->data['fallo'],
                'type' => $import->data['fallo']==0?"success":"warning",
            ]);
        } catch (\Exception $exception) {
            return response([
                'message' =>  $exception->getMessage(),
                'type' => 'error',
            ]);
        }
    }
    public function index(Request $request)
    {
        try {
            $w = $request->input('warehouse_id');
            if (is_null($w)) {
                $data = Product::leftjoin('unities', 'products.unity_id', '=', 'unities.id')
                    ->join('items', 'products.item_id', '=', 'items.id')
                    ->join('categories', 'items.category_id', '=', 'categories.id')
                    ->select('products.*', 'items.name', 'unities.name as unity', 'categories.name as category', 'items.image as image')->orderBy('id', 'desc')->get();
            } else {

                $data = Product::leftjoin('unities', 'products.unity_id', '=', 'unities.id')
                    ->join('items', 'products.item_id', '=', 'items.id')
                    ->join('warehouse_products', 'products.id', '=', 'warehouse_products.product_id')
                    ->join('categories', 'items.category_id', '=', 'categories.id')
                    ->where('warehouse_products.warehouse_id', $w)
                    ->select('products.*', 'items.name', 'unities.name as unity', 'categories.name as category', 'items.image as image')->orderBy('id', 'desc')->get();
            }

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
            $url = $this->save($request->file('url'));
            $request['jp_code'] = "N/A";
            $request['image'] = $url;

            Product::create($request->all());

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
            $data = Product::where('warehouse_id', '=', $id)->where('stock', '>', '0')->orderBy('id', 'desc')->get();
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
    public function showByClient($id)
    {
        try {
            $data = Product::join('warehouses', 'products.warehouse_id', '=', 'warehouses.id')
                ->join('suppliers', 'warehouses.supplier_id', '=', 'suppliers.id')
                ->where('suppliers.id', '=', $id)
                ->select('products.*')->orderBy('id', 'desc')->get();
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
    public function showByOwn()
    {
        try {
            $data = Product::join('warehouses', 'products.warehouse_id', '=', 'warehouses.id')

                ->where('warehouses.supplier_id', '=', null)
                ->select('products.*')->orderBy('id', 'desc')->get();
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

    public function show($id)
    {
        $data = Product::find($id);
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function deleteImage($file_path)
    {
        if ($file_path != null) {
            File::delete(public_path() . '/storage/' . $file_path);
        }
    }

    public function subirFoto(Request $request, $id)
    {
        $url = $this->save($request->file('url'));
        $pr = Product::find($id);
        if ($request->file('url') != null) {
            $this->deleteImage($pr->image);
        }
        $pr->image = $url;
        $pr->save();
    }
    public function update(Request $request, $id)
    {
        try {


            $co = Product::find($id);
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
        $data = Product::find($id);
        $data->delete();
        return response()->json([
            "status" => "200",
            "message" => 'Eliminación exitosa',
            "type" => 'success'
        ]);
    }
}
