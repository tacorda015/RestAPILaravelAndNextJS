<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SampleFood extends Model
{
    protected $fillable = ['name', 'calories', 'fat', 'carbs', 'protein', 'type'];

    protected $orderBy = 'id';
}
