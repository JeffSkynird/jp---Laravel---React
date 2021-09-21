<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'business_name',
        'ruc',
        'logo',
        'cellphone',
        'email',
        'ip',
        'terminal',
        'user_id'
    ];
}
