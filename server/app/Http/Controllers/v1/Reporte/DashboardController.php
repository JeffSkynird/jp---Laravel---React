<?php

namespace App\Http\Controllers\v1\Reporte;

use App\Http\Controllers\Controller;
use App\Models\Adjustment;
use App\Models\Order;
use App\Models\Product;
use App\Models\Solicitude;
use App\Models\Task;
use App\Models\Transfer;
use App\Models\Warehouse;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function kpis(Request $request)
    {
        $fromDate = $request->input('desde');
        $tillDate = $request->input('hasta');
        $tareas = Task::whereBetween('created_at', [$fromDate, $tillDate])->count();
        $ordenes = Order::whereBetween('created_at', [$fromDate, $tillDate])->sum('total');
        $ajustes = Product::whereBetween('created_at', [$fromDate, $tillDate])->count();
        $transfer = Transfer::whereBetween('created_at', [$fromDate, $tillDate])->count();
        return json_encode([
            "status" => "200",
            'data' => [
                'tareas' => $tareas,
                'monto' => floatval($ordenes),
                'ajustes' => $ajustes,
                'transfer' => $transfer
            ],
            "message" => 'Data obtenida con éxito',
            "type" => 'success'
        ]);
    }
    //Total productos por bodega
    //Modelo producto: App\Models\Product
    //Modelo bodega: App\Models\Warehouse
    public function totalProductosPorBodega(Request $request)
    {
        $fromDate = $request->input('desde');
        $tillDate = $request->input('hasta');

        $data = Warehouse::join('products', 'warehouses.id', '=', 'products.warehouse_id')
            ->selectRaw('count(products.id) as total,warehouses.name')
            ->whereBetween('products.created_at', [$fromDate, $tillDate])
            ->groupBy('warehouses.name')
            ->get();
        $cantidad = array();
        $bodegas = array();
        foreach ($data as $value) {
            array_push($cantidad, $value->total);
            array_push($bodegas, $value->name);
        }
        return json_encode([
            "status" => "200",
            'data' => array(
               
                'cantidad' => $cantidad,
                'bodegas' => $bodegas
            ),
            "message" => 'Data obtenida con éxito',
            "type" => 'success'
        ]);
    }
    //Total tareas completadas y sin completar
    //Modelo tarea: App\Models\Task
    public function totalTareasCompletadas(Request $request)
    {
        $fromDate = $request->input('desde');
        $tillDate = $request->input('hasta');
     
        $completadas = Task::whereBetween('created_at', [$fromDate, $tillDate])->where('is_complete', '=', 1)->count();
        $sinCompletadas = Task::whereBetween('created_at', [$fromDate, $tillDate])->where('is_complete', '=',0)->count();

        return json_encode([
            "status" => "200",
            'data' => [
                'completadas' => $completadas,
                'sinCompletar' => $sinCompletadas
            ],
            "message" => 'Data obtenida con éxito',
            "type" => 'success'
        ]);
    }
      //Total tareas completadas y sin completar
    //Modelo tarea: App\Models\Task
    public function pedidosAutorizados(Request $request)
    {
        $fromDate = $request->input('desde');
        $tillDate = $request->input('hasta');
     
        $autorizados = Solicitude::whereBetween('created_at', [$fromDate, $tillDate])->where('authorized_by', '!=', null)->count();
        $noAutorizados = Solicitude::whereBetween('created_at', [$fromDate, $tillDate])->where('authorized_by', '=',null)->count();

        return json_encode([
            "status" => "200",
            'data' => [
                'autorizados' => $autorizados,
                'noAutorizados' => $noAutorizados
            ],
            "message" => 'Data obtenida con éxito',
            "type" => 'success'
        ]);
    }

       //Total ingresos - egresos
    //Modelo tarea: App\Models\Task
    public function incomeByExpense(Request $request)
    {
        $fromDate = $request->input('desde');
        $tillDate = $request->input('hasta');
     
        $orders = Order::whereBetween('created_at', [$fromDate, $tillDate])->count();
        $ajusteI = Adjustment::whereBetween('created_at', [$fromDate, $tillDate])->where('status', '=','I')->count();
        $ajusteE = Adjustment::whereBetween('created_at', [$fromDate, $tillDate])->where('status', '=','E')->count();
        $pedidos = Solicitude::whereBetween('created_at', [$fromDate, $tillDate])->where('authorized_by', '!=', null)->count();

        return json_encode([
            "status" => "200",
            'data' => [
                'ingresos' => ($orders+$ajusteI),
                'egresos' => ($ajusteE+$pedidos)
            ],
            "message" => 'Data obtenida con éxito',
            "type" => 'success'
        ]);
    }
    //Compras de los ultimos 6 meses
    //Modelo order:  App\Models\Order
    public function comprasUltimos6Meses(Request $request)
    {
        $fromDate = $request->input('desde');
        $tillDate = $request->input('hasta');
        //Orders de los ultimos 6 meses
        $data= Order::where("created_at",">", Carbon::now()->subMonths(6))->selectRaw("sum(total),to_char(created_at, 'YYYY-MM') as month")->groupBy('month')->get();
      
        $total = array();
        $mes = array();
        foreach ($data as $value) {
            array_push($total, $value->sum);
            array_push($mes, $value->month);
        }
        
        return json_encode([
            "status" => "200",
            'data' => array(
                'mes' => $mes,
                'total' => $total
            ),
            "message" => 'Data obtenida con éxito',
            "type" => 'success'
        ]);
    }
}
