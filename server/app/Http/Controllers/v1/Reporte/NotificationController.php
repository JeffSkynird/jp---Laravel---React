<?php

namespace App\Http\Controllers\v1\Reporte;

use App\Http\Controllers\Controller;
use App\Models\Adjustment;
use App\Models\Order;
use App\Models\Solicitude;
use App\Models\Task;
use App\Models\Transfer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
   public function index()
   {
      //SOLICITUDES
      $pedidos = Solicitude::where('created_at', '>=', Carbon::now()->subMinutes(5)->toDateTimeString())->selectRaw('count(*) as total')->first();

      //TAREAS
      $tareas= Task::where('created_at', '>=', Carbon::now()->subMinutes(5)->toDateTimeString())->selectRaw('count(*) as total')->first();

      //COMPRAS
      $compras = Order::where('created_at', '>=', Carbon::now()->subMinutes(5)->toDateTimeString())->selectRaw('count(*) as total')->first();

      //AJUSTES
      $ajustes = Adjustment::where('created_at', '>=', Carbon::now()->subMinutes(5)->toDateTimeString())->selectRaw('count(*) as total')->first();

      //TRANSFERENCIAS
      $transferencias = Transfer::where('created_at', '>=', Carbon::now()->subMinutes(5)->toDateTimeString())->selectRaw('count(*) as total')->first();

      return response()->json([
        "status" => "200",
        'data'=>[
            'pedidos'=>$pedidos->total,
            'tareas'=>$tareas->total,
            'compras'=>$compras->total,
            'ajustes'=>$ajustes->total,
            'transferencias'=>$transferencias->total
        ],
        "message" => 'Data obtenida con éxito',
        "type" => 'success'
    ]);
   }
}
