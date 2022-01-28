<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'client_code',
        'serial_code',
        'description',
        'stock',
        'price',
        'item_id',
        'unity_id',
        'ip',
        'terminal',
        'user_id'
    ];
}
