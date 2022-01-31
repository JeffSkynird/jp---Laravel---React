<?php

namespace App\Imports;

use App\Models\Item;
use App\Models\Product;
use App\Models\Unity;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToCollection;
class ProductsImport implements ToCollection
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
   
    public function collection(Collection $rows)
    {
        set_time_limit(500);
        foreach ($rows as $row)
        {
            $item =  Item::where('name',$row[0])->first();
            $unity =  Unity::where('name',$row[6])->first();
            if(!is_null($item)&&!is_null($unity)){
                Product::create([
                        'item_id' => $item->id,
                        'client_code' => $row[1],
                        'serial_code' => $row[2],
                        'description' => $row[3],
                        'stock' => intval($row[4]),
                        'price' => floatval($row[5]),
                        'unity_id' => $unity->id,
                        'user_id' => Auth::id(),
                    ]);
                }
        }
    }
}
