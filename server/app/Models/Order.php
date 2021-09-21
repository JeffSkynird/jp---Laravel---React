<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'product_id',
        'quantity',
        'supplier_id',
        'status',
        'authorized_by',
        'created_by',
        'requested_by',
        'ip',
        'terminal',
        'user_id'
    ];
}
