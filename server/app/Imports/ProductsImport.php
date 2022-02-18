<?php

namespace App\Imports;

use App\Models\Item;
use App\Models\Product;
use App\Models\Unity;
use App\Models\WarehouseProduct;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToCollection;

class ProductsImport implements ToCollection
{
    private $warehouse_id;

    public function __construct(int $warehouse_id)
    {
        $this->warehouse_id = $warehouse_id;
    }
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public $data;
    public $errors = array();
    public function validar($serialCode, $barCode, $clientCode)
    {
        $val1 = Product::where('serial_code', $serialCode)->first();
        $val2 = Product::where('bar_code', $barCode)->first();
        $val3 = Product::where('client_code', $clientCode)->first();

        if (!is_null($val1)) {
            return false;
        }
        if (!is_null($val2)) {
            return false;
        }
        if (!is_null($val3)) {
            return false;
        }
        return true;
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
    public function agregarError($row, $error)
    {
        array_push($this->errors, [
            'row' => $row,
            'error' => $error
        ]);
    }
    public function mapear($row){
        return [
            'item' =>$row[0],
            'client_code' => $row[1],
            'serial_code' => $row[2],
            'bar_code' => $row[3],
            'description' => $row[4],
            'stock' => intval($row[5]),
            'price' => floatval($row[6]),
            'unity' => $row[7],
        ];
    }
    public function collection(Collection $rows)
    {
        set_time_limit(500);
        $exito  = 0;
        $fallo = 0;
        foreach ($rows as $row) {
            $item =  Item::where('name', $row[0])->first();
            $unity =  Unity::where('name', $row[7])->first();

            if (!is_null($item) && !is_null($unity)) {
                if ($this->validar($row[2], $row[3], $row[1])) {

                    $pro = Product::create([
                        'item_id' => $item->id,
                        'client_code' => $row[1],
                        'serial_code' => $row[2],
                        'bar_code' => $row[3],
                        'description' => $row[4],
                        'stock' => intval($row[5]),
                        'price' => floatval($row[6]),
                        'unity_id' => $unity->id,
                        'user_id' => Auth::id(),
                    ]);
                    $params = [
                        'jp_code' => "JP-" . $item->id . "-" . $pro->id
                    ];
                    if ($pro->serial_code == null || $pro->serial_code == "N/A") {
                        $params['serial_code'] = $this->incrementalHash(4, 'letter') . $this->incrementalHash(9, 'number') . $pro->id;
                    }

                    $pro->update($params);
                    //GUARDO EN LA BODEGA

                    WarehouseProduct::create([
                        'product_id' => $pro->id,
                        'warehouse_id' => $this->warehouse_id,
                    ]);

                    $exito++;
                } else {

                    $this->agregarError($this->mapear($row), 'Ya existe registrado el producto');
                    $fallo++;
                }
            }else{
                if($row[0] != null || $row[7] != ""){
                    $this->agregarError($this->mapear($row), 'El item/unidad no existe');
                    $fallo++;
                }
            }
        }
        $this->data = [
            'exito' => $exito,
            'fallo' => $fallo
        ];
    }
}
