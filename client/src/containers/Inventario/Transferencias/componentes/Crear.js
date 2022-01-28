import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Initializer from '../../../../store/Initializer'
import Confirmar from '../../../../components/Confirmar'
import Slide from '@material-ui/core/Slide';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import { editar as editarPedido, obtenerDetalleOrden, registrar as registrarPedido,obtenerInventarioOrden, guardarAlmacen } from '../../../../utils/API/pedidos';
import { obtenerTodos } from '../../../../utils/API/proveedores';
import { obtenerInventario, obtenerTodos as obtenerTodosBodegas } from '../../../../utils/API/bodegas';
import {  obtenerTodos as obtenerRazones } from '../../../../utils/API/razones';

import { Autocomplete } from '@material-ui/lab';
import MaterialTable from 'material-table';
import { LocalizationTable, TableIcons } from '../../../../utils/table';
import { obtenerTodosParam } from '../../../../utils/API/sistemas';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);
    const [open, setOpen] = React.useState(false)

    const [cantidad, setCantidad] = React.useState("")
    const [proveedor, setProveedor] = React.useState("")
    const [proveedorData, setProveedorData] = React.useState([])
    const [inventario, setInventario] = React.useState([])
    const [productos, setProductos] = React.useState([])
    const [productosData, setProductosData] = React.useState([])
    const [producto, setProducto] = React.useState('')

    const [almacen, setAlmacen] = React.useState([])
    const [bodegaData, setBodegaData] = React.useState([])
    const [bodegaO, setBodegaO] = React.useState('')
    const [bodegaD, setBodegaD] = React.useState('')
    const [razon, setRazon] = React.useState("")
    const [razonData, setRazonData] = React.useState([])
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setProveedorData, initializer)
            obtenerTodosBodegas(setBodegaData, initializer)
            obtenerRazones(setRazonData, initializer)

        }
    }, [initializer.usuario ])
    React.useEffect(() => {
        if (props.sistema != null&&props.open) {
            console.log(props.open)
            setProductos([])
            setAlmacen([])
            obtenerInventarioOrden(props.sistema.id,setProductos, initializer)


        }
    }, [props.sistema,props.open])
    const guardar = () => {
      
        guardarAlmacen({data:almacen},initializer)
    
        props.setOpen(false)
    
        limpiar()
    }
    const limpiar = () => {
        setCantidad("")
        setProveedor("")
        setProducto("")
        setProductos([])
        setAlmacen([])
        props.setSelected(null)
        props.carga()
        props.setOpen(false)
    }
   
    const getName = (id,data) => {
        let object = null
        data.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    const validarData=()=>{
        let final=[]

        productos.map((e)=>{
            
            if (!final.some(i => i.supplier_id === e.supplier_id)) {
                final.push({
                    supplier_id:e.supplier_id,
                    products:obtenerProductosPorId(e.supplier_id)
                })
            }
           
        })
        return final
    }
    const obtenerProductosPorId=(id)=>{
        return productos.filter((e)=>e.supplier_id==id)
    }
    const agregar=() => {
        if(producto!=""&&proveedor!=""&&cantidad!=""&&cantidad>0){
            let t = productos.slice()
            t.push({product:obtenerProducto(producto),supplier:obtenerProveedor(proveedor),product_id:producto,quantity:cantidad,supplier_id:proveedor})
            setProductos(t)
            setCantidad('')
  
            setProducto('')
        }
       
    }
    const obtenerProveedor=(id)=> {
        let nombre=""
        proveedorData.map((e)=>{
            if(e.id==id){
                nombre=e.business_name
            }
        })
        return nombre
    }
    const obtenerBodega=(id)=> {
        let nombre=""
        bodegaData.map((e)=>{
            if(e.id==id){
                nombre=e.name
            }
        })
        return nombre
    }
    const obtenerProducto=(id)=> {
        let nombre=""
        productosData.map((e)=>{
            if(e.id==id){
                nombre=e.name
            }
        })
        return nombre
    }
    const quitar=(row) => {
        let t0=inventario.slice()
        let id = row.tableData.id
        let t = almacen.slice()
        console.log(row)
        t0.push({numero:row.numero,product_id:row.product_id,inventory_id:row.inventory_id,name:row.name,jp_code:row.jp_code,supplier_code:row.supplier_code })
        setInventario(t0)

        setAlmacen(t.filter((e,i) =>i!=id))
     
    }
    const quitarInventario=(row) => {
    
       let t = [];
       inventario.slice().map((e,i) =>{
           if(!estaIncluido(e.inventory_id,row)){
            t.push({...e})
           }
       })
       setInventario(t)
       
    }
    const estaIncluido=(id,dt) => {
        let res = false
        dt.map((e,i) =>{
            if(e.inventory_id==id){
                res = true
            }
        })
        return res
    }
    const obtenerRazon=(id)=> {
        let nombre=""
        razonData.map((e)=>{
            if(e.id==id){
                nombre=e.name
            }
        })
        return nombre
    }
   
    const almacenar=(dat)=>{
     
       if(bodegaD!=""){
        let t=almacen.slice()
        dat.map((e)=>{
           
            t.push({...e,reason_id:razon,reason:obtenerRazon(razon),warehouse_idO:bodegaO,warehouse_id:bodegaD,warehouse:obtenerBodega(bodegaD),warehouseO:obtenerBodega(bodegaO),product_id:e.id})
        })
    
        quitarInventario(dat)
        setAlmacen(t)
       }else{
          
           initializer.mostrarNotificacion({ type: "warning", message: 'Seleccione una bodega destino' });

       }
    
    }
    const cargarInventario=(id)=>{
        if (id!=''){
            setInventario([])
          
            obtenerTodosParam({warehouse_id:id},setInventario,initializer)

        }
  
    }
    return (
        <Dialog
        fullWidth
        maxWidth='lg'
        fullScreen
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
                props.setOpen(false)
                limpiar()
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            
            <DialogTitle id="alert-dialog-slide-title">Transferencia</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Seleccione los productos y envíelos a la bodega correspondiente
                </DialogContentText>
                <Grid container spacing={2}>
                <Grid item xs={12} md={6} style={{ display: 'flex' }}>
                        <Autocomplete
     size="small"
                            style={{ width: '100%' }}
                            options={bodegaData}
                            value={getName(bodegaO,bodegaData)}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                                if (value != null) {

                                    setBodegaO(value.id)
                                    setBodegaD('')
                                    cargarInventario(value.id)
                                } else {

                                    setBodegaO('')
                                    setBodegaD('')
                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione la bodega origen" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>
                    <Grid item xs={12} md={6} style={{ display: 'flex' }}>
                        <Autocomplete
            size="small"
                            style={{ width: '100%' }}
                            options={bodegaData}
                            getOptionDisabled={(option) => option.id === bodegaO}
                            value={getName(bodegaD,bodegaData)}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                                if (value != null) {
                                    if(bodegaO!=value.id){
                                        setBodegaD(value.id)

                                    }
                                } else {

                                    setBodegaD('')

                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione la bodega destino" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>
                    <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                        <Autocomplete

                            style={{ width: '100%' }}
                            size="small"
                            options={razonData}
                            
                            value={getName(razon,razonData)}
                            onChange={(event, newValue) => {
                              
                                if (newValue != null) {

                                    setRazon(newValue.id);
                                } else {

                                    setRazon('')

                                }
                              }}
                            getOptionLabel={(option) =>option.name}
                         // prints the selected value
                            renderInput={params => (
                                <TextField    variant="outlined" {...params} label="Seleccione un motivo" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>
                  
                 
                 <Grid item xs={12} md={12}>

                 <MaterialTable
                 key={1}
                 id={1}
                    icons={TableIcons}
                    columns={[
                 

                        {
                            title: 'Producto',
                            field: 'name',
                            render: rowData => (
                             <span >{rowData.name}</span>
                            ),
                          },
                          { title: "Código de cliente", field: "client_code" },

                        { title: "Código serial", field: "serial_code" },
                        { title: "Stock", field: "stock" }



                    ]}
                    data={
                        inventario
                    }
                    title="Productos de la bodega origen"
                   
                    localization={LocalizationTable}
                    actions={[
                        {
                            icon: TableIcons.Add,
                            tooltip: 'Agregar',
                         
                            onClick: (evt, data1) => almacenar( data1 )
                         }
                    ]}
                  

                    options={{
                        pageSize:10,
                        paging:false,
                        selection: true,
                        actionsColumnIndex: -1,
                        width:'100%',
                        maxBodyHeight: 150,
                        padding: 'dense',
                        headerStyle: {
                            textAlign: 'left'
                        },
                        cellStyle: {
                            textAlign: 'left'
                        },
                        searchFieldStyle: {

                            padding: 5
                        }
                    }}

                />
</Grid>
<Grid item xs={12} md={12}>

<MaterialTable
key={2}
id={2}
   icons={TableIcons}
   columns={[

    {
        title: 'Producto',
        field: 'name',
        render: rowData => (
         <span >{rowData.name}</span>
        ),
      },
    { title: "Stock", field: "stock" },
    { title: "Bodega Origen", field: "warehouseO" },
       { title: "Bodega Destino", field: "warehouse" },
      
       { title: "Motivo", field: "reason" }



   ]}
   data={
       almacen
   }
   title="Productos a transferir"

   localization={LocalizationTable}

actions={[    
{
   icon: TableIcons.Delete,
   tooltip: 'Eliminar',

   onClick: (event, rowData) => {
     quitar(rowData)
   }
}]}

   options={{
       pageSize:10,
       selection:false,
       paging: false,
       actionsColumnIndex: -1,
       width:'100%',
       maxBodyHeight: 170,
       padding: 'dense',
       headerStyle: {
           textAlign: 'left'
       },
       cellStyle: {
           textAlign: 'left'
       },
       searchFieldStyle: {

           padding: 5
       }
   }}

/>
</Grid>

                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                      limpiar()
                }} color="default">
                    Cancelar
                </Button>
                <Button color="primary" disabled={almacen.length==0} onClick={()=>{
                  guardar()
                }}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
