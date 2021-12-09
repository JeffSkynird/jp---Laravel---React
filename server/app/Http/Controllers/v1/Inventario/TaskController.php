<?php

namespace App\Http\Controllers\v1\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Solicitude;
use App\Models\SolicitudeProduct;
use App\Models\SubTask;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        try {
            $data = Task::orderBy('id', 'desc')->get();
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
    //OBTIENE LAS SUBTAREAS DE UNA TAREA
    public function subtasks($id)
    {
        try {
            $data = SubTask::where('task_id', $id)->get();
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
    //OBTIENE LAS SOLICITUDES DE UNA TAREA
    public function solicitudes($id)
    {
        try {
            $data = Solicitude::where('task_id', $id)->first();
            if ($data != null) {
                $solicitudes = SolicitudeProduct::join('products', 'solicitude_products.product_id', 'products.id')->where('solicitude_id', $data->id)->select('products.id', 'products.name', 'solicitude_products.quantity')->get();
                return response()->json([
                    "status" => "200",
                    'data' => $solicitudes,
                    "message" => 'Data obtenida con éxito',
                    "type" => 'success'
                ]);
            } else {
                return response()->json([
                    "status" => "400",
                    'data' => [],
                    "message" => 'No se ha encontrado datos',
                    "type" => 'error'
                ]);
            }
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
            $task = Task::create($request->all());

            //CREA SUBTAREA 
            $subtask = $request->input('subtask');

            if (count($subtask) != 0) {
                foreach ($subtask as $sub) {
                    SubTask::create([
                        'task_id' => $task->id,
                        'description' => $sub['description'],
                        'is_complete' => $sub['is_complete'],
                        'user_id' => 1
                    ]);
                }
            }
            //CREO MATERIALES
            $products = $request->input('products');
            if (count($products) != 0) {
                $soli = Solicitude::create([
                    'task_id' => $task->id,
                    'warehouse_id' => $request->input('warehouse_id'),
                    'user_id' => 1,
                    'status' => 'P'
                ]);
                foreach ($products as $sub) {
                    SolicitudeProduct::create([
                        'solicitude_id' => $soli->id,
                        'product_id' => $sub['id'],
                        'quantity' => $sub['quantity']
                    ]);
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
    public function show($id)
    {
        $data = Task::find($id);
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function update(Request $request, $id)
    {
        try {
            $co = Task::find($id);
            $co->update($request->all());


            //CREA SUBTAREA 
            $subtask = $request->input('subtask');

            if (count($subtask) != 0) {
                foreach ($subtask as $sub) {
                    if (!empty($sub['id'])) {
                        SubTask::find($sub['id'])->update([
                            'description' => $sub['description'],
                            'is_complete' => $sub['is_complete'],
                            'user_id' => 1
                        ]);
                    } else {
                        SubTask::create([
                            'task_id' => $id,
                            'description' => $sub['description'],
                            'is_complete' => $sub['is_complete'],
                            'user_id' => 1
                        ]);
                    }
                }
            }
            //CREO MATERIALES
            $products = $request->input('products');
            if (count($products) != 0) {
                $data = Solicitude::where('task_id', $id)->first();
                if ($data != null) {
                    foreach ($products as $sub) {
                        $sol = SolicitudeProduct::where('solicitude_id', $data->id)->where('product_id', $sub['id'])->first();
                        if($sol!=null){
                           $sol->update([
                            'quantity' => $sub['quantity']
                           ]);
                        }else{
                            SolicitudeProduct::create([
                                'solicitude_id' => $id,
                                'product_id' => $sub['id'],
                                'quantity' => $sub['quantity']
                            ]);
                        }
                       
                    }
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
        $data = Task::find($id);
        $data->delete();
        return response()->json([
            "status" => "200",
            "message" => 'Eliminación exitosa',
            "type" => 'success'
        ]);
    }
}
