<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitude extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_id',
        'solicitude_id',
        'quantity',
        'warehouse_id',
        'status',
        'task_id',
        'user_id'
    ];
}
