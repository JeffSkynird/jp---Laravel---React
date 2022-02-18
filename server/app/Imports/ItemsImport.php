<?php

namespace App\Imports;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ItemsImport  implements ToCollection
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
            $category =  Category::where('name',$row[4])->first();
        
            if(!is_null($category)){
                Item::create([
                        'name' => $row[0],
                        'description' => $row[1],
                        'min_stock' => intval($row[2]),
                        'max_stock' => intval($row[3]),
                        'category_id' => $category->id,
                        'user_id' => Auth::id(),
                    ]);
                }
        }
    }

}
