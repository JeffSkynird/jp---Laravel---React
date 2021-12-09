<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Adjustment extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'status',
        'product_id',
        'warehouse_id',
        'reason_id',
        'ip',
        'terminal',
        'user_id','quantity'
    ];
}
