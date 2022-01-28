<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'name',
        'image',
        'description',
        'min_stock',
        'max_stock',
        'stock',
        'status',
        'category_id',
        'ip',
        'terminal',
        'user_id'
    ];
}
