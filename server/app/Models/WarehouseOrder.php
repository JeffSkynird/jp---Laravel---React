<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WarehouseOrder extends Model
{
    use HasFactory;
    protected $fillable = [
        'inventory_id',
        'warehouse_id',
        'order_id'
    ];
}
