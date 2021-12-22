<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'jp_code',
        'bar_code',
        'name',
        'image',
        'description',
        'stock',
        'min_stock',
        'price',
        'serial_code',
        'max_stock',
        'unity_id',
        'status',
        'category_id',
        'ip',
        'terminal',
        'user_id',
        'warehouse_id'
    ];
}
