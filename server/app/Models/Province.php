<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Province extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'name',
        'country_id',
        'ip',
        'terminal',
        'user_id'
    ];
}
