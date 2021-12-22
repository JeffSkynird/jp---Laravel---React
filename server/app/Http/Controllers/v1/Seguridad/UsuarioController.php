<?php

namespace App\Http\Controllers\v1\Seguridad;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\Adjustment;
use App\Models\Order;
use App\Models\Solicitude;
use App\Models\Task;
use App\Models\Transfer;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use \Validator;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
class UsuarioController extends Controller
{
    public function index(){
        $usuarios = User::all();
        return json_encode([
            "status" => "200",
            "data"=> $usuarios,
            "message" => 'Listado exitoso',
            "type" => 'success'
        ]);
    }
    public function create(UserRequest $request)
    {
        try {
            User::create($request->validated());
            return response()->json([
                "status" => "200",
                "message" => 'Registro exitoso',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function show($id)
    {
        $data = User::find($id);
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    public function notificationsNew(){
       //SOLICITUDES
      $pedidos = Solicitude::where('created_at', '>=', Carbon::now()->subMinutes(5)->toDateTimeString())->selectRaw('count(*) as total')->first();

      //TAREAS
      $tareas= Task::where('created_at', '>=', Carbon::now()->subMinutes(5)->toDateTimeString())->selectRaw('count(*) as total')->first();

      //COMPRAS
      $compras = Order::where('created_at', '>=', Carbon::now()->subMinutes(5)->toDateTimeString())->selectRaw('count(*) as total')->first();

      //AJUSTES
      $ajustes = Adjustment::where('created_at', '>=', Carbon::now()->subMinutes(5)->toDateTimeString())->selectRaw('count(*) as total')->first();

      //TRANSFERENCIAS
      $transferencias = Transfer::where('created_at', '>=', Carbon::now()->subMinutes(5)->toDateTimeString())->selectRaw('count(*) as total')->first(); 

      if($pedidos->total > 0||$tareas->total > 0||$compras->total > 0||$ajustes->total > 0||$transferencias->total > 0){
        return true;
      }else{
        return false;
      }
    }
    public function showAuth()
    {
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => Auth::user(),
            "notifications" => $this->notificationsNew(),
            "type" => 'success'
        ]);
    }
    public function update(UserRequest $request,$id){
        $names = $request->input('names');
        $lastNames = $request->input('last_names');
        $email = $request->input('email');
        $password = $request->input('password');
        $newPassword = $request->input('new_password');
        try {
            $user = User::find($id);
            $user->names=$names;
            $user->last_names=$lastNames;
            $user->email=$email;
            if(!is_null($password)&&!is_null($newPassword)){
                if(Hash::check($password, $user->password)){
                    $user->password=$newPassword;
                }
            }
            $user->save();

            return response()->json([
                "status" => "200",
                "message" => 'Modificación exitosa',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function updateAuth(UserRequest $request){
        $userAuth = Auth::user();
        $names = $request->input('names');
        $lastNames = $request->input('last_names');
        $email = $request->input('email');
        $password = $request->input('password');
        $vacios = Validator::make($request->all(), [
            'names' => 'required',
            'last_names' => 'required',
            'email' => 'required'
        ]);
        if ($vacios->fails()) {
            return response([
                'message' => "Revise los campos ingresados",
                'type' => "error",
            ]);
        }
        try {
            $user = User::find($userAuth->id);
            $user->names=$names;
            $user->last_names=$lastNames;
            $user->email=$email;
            if(!is_null($password)){
                $user->password=$password;
            }
            $user->save();

            return response()->json([
                "status" => "200",
                "message" => 'Modificación exitosa',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    public function delete(UserRequest $request,$id)
    {
        $data = User::find($id);
        $data->delete();
        return response()->json([
            "status" => "200",
            "message" => 'Eliminación exitosa',
            "type" => 'success'
        ]);
    }
    public function upload(Request $request) {
        $validator = Validator::make($request->all(),[ 
            'file'  => 'required|mimes:png,jpg,jpeg,gif|max:2305',
      ]);   
       
      if($validator->fails()) {          
           
        return response([
            'message' => "Debe subir una imagen",
            'type' => "error",
        ]);                     
       } 
       if ($file = $request->file('file')) {
        $us = Auth::user();
      
        $name = $file->getClientOriginalName();
        $file->storeAs('public', $us->id."_".$name);

       
        $save = User::find($us->id);
        $save->image_path = "storage/".$us->id."_".$name;
        $save->save();
           
        return response()->json([
            "status" => "200",
            "message" => 'Actualización exitosa',
            "type" => 'success'
        ]);

    }

    }
}
