<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            font-family: Verdana, Geneva, sans-serif;
        }

        .title {
            display: flex;
            justify-content: center;
        }

        .personal_data>h3 {
            margin-top: 10px;
            margin-bottom: 10px;
            border-bottom-color: black;
            border-bottom-style: dashed;
            border-bottom-width: 2px;
            padding-bottom: 5px;
        }

        .personal_data {
            margin: 10px;
            background-color: whitesmoke;
            padding: 5px;
        }

        ul {
            margin: 0px;
            padding: 0px;
        }

        li {
            font-weight: bold;
            list-style: none;
            font-size: 14px;
            margin-bottom: 5px;
        }

        li>span {
            font-weight: normal;
        }

        #customers {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #customers td,
        #customers th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #customers tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        #customers tr:hover {
            background-color: #ddd;
        }

        #customers th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #3f51b5;
            color: white;
        }
        .banner {
            text-align: left;

            width: 100;
            object-fit: cover;
            text-align: center;
            display: block;
            margin-bottom: 20px;
        }

        .left {
            text-align: left;


        }

        .right {
            text-align: right;


        }

        .cabecera {
            display: flex;
            margin: 0px;
        }

        .subtitle {
            display: block;
        }
    </style>
</head>

<body>
<div class="cabecera">
        <img src="{{ public_path('jp.png') }}" class="banner">
        <div class="right">
            <h3 style="margin-bottom:0px;margin-top:0px;">JP MACHALA</h3>
            <span class="subtitle">Jean Patricio Pazmiño</span>
            <span class="subtitle">Machala</span>
            <span class="subtitle">Cell.: 0993040644</span>
        </div>
    </div>


    <header class="title" style="padding-bottom:0px;margin:0px;">
        <h3 style="text-align:center;margin:0px;">COMPROBANTE DE INGRESO -{{$data['type']=='P'?'ORDEN DE COMPRA':'INGRESO DE PRODUCTOS'}} {{$data['id']}}</h3>

    </header>
    <p style="font-weight:bold;text-align:left;margin-top:5px;  font-size:17px; margin: 10px;">Registros: {{count($body )}}</p>
    <p style="font-weight:bold;text-align:left;margin-top:5px;  font-size:17px; margin: 10px;">Total: ${{$data['total']}}</p>
    <p style="font-weight:bold;text-align:left;margin-top:5px;  font-size:17px; margin: 10px;">Tipo: {{$data['type']=='P'?'Propia':'Cliente'}}</p>


    <section class="personal_data" style="margin-bottom:30px;">
        <table id="customers">
            <thead>

                <tr>
                    <th>Producto</th>
                    <th>Codigo de barras</th>
                    <th>Codigo serial</th>
                    <th>Cantidad</th>
                
                </tr>
            </thead>

            <tbody>
                @foreach ($body as $dt)
                <tr style="background-color:#E5E5E5;">
                    <td>{{ $dt['product'] }}</td>
                    <td>{{ $dt['bar_code'] }}</td>
                    <td>{{ $dt['serial_code'] }}</td>
                    <td>{{ $dt['quantity'] }}</td>
                
                  

                </tr>
                @endforeach
            </tbody>
        </table>
    </section>




</body>

</html>