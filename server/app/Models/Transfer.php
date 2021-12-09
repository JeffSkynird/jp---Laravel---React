<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_id',
        'warehouse_origin',
        'warehouse_destination',
        'status',
        'ip',
        'terminal',
        'user_id'
    ];
}
