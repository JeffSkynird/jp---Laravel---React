<?php

namespace App\Http\Controllers\v1\Reporte;

use App\Http\Controllers\Controller;
use App\Models\Adjustment;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Solicitude;
use App\Models\SolicitudeProduct;
use App\Models\Transfer;
use Illuminate\Http\Request;
use PDF;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class VoucherController extends Controller
{
    public function reporte(Request $request)
    {
        $module = $request->input('module');
        $type = $request->input('type');
        $id = $request->input('id');


        $filtros = [
            "module" => $module,
            "type" => $type,
            'id' => $id

        ];
        $data = $this->obtenerData($filtros);
        if ($data != null) {
            return $data->stream('reporte.pdf');
        } else {
            return json_encode(['error' => 'No se encontraron datos'], 404);
        }
    }

    public function obtenerData($filtro)
    {
        $module = $filtro['module'];

        switch ($module) {
            case 'compra':
                $data = Order::find($filtro['id']);
                $dataBody = OrderProduct::join('products', 'products.id', 'order_products.product_id')->select('order_products.*', 'products.name as product','products.bar_code as bar_code','products.serial_code as serial_code')->where('order_id', $filtro['id'])->get();

                return PDF::loadView('compra', ['data' => $data, 'body' => $dataBody]);
                break;
            case 'pedido':
                $data  = Solicitude::join('warehouses', 'warehouses.id', 'solicitudes.warehouse_id')->leftjoin('users', 'users.id', 'solicitudes.authorized_by')->where('solicitudes.id', $filtro['id'])->select('solicitudes.id', 'warehouses.name as warehouse', 'users.names as user','users.names as username')->first();
                $dataBody = SolicitudeProduct::join('products', 'products.id', 'solicitude_products.product_id')->select('solicitude_products.*', 'products.name as product','products.bar_code as bar_code','products.serial_code as serial_code')->where('solicitude_id', $filtro['id'])->get();
                return PDF::loadView('pedido', ['data' => $data, 'body' => $dataBody]);
                break;
            case 'ajuste':
                $data  = Adjustment::join('products', 'products.id', 'adjustments.product_id')->join('reasons', 'reasons.id', 'adjustments.reason_id')->select('adjustments.*', 'products.name as product', 'reasons.name as reason')->get();
                return PDF::loadView('ajuste', ['data' => $data]);
                break;
            case 'transferencia':
                $data  = Transfer::join('products', 'products.id', 'transfers.product_id')->join('warehouses as w1', 'w1.id', 'transfers.warehouse_origin')->join('warehouses as w2', 'w2.id', 'transfers.warehouse_destination')->select('transfers.*', 'products.name as product', 'w1.name as warehouse_origin','w2.name as warehouse_destination')->get();
                return PDF::loadView('transferencias', ['data' => $data]);
                break;
        }
    }
}
