<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudeProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'solicitude_id',
        'quantity'
    ];
}
