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
import { obtenerTodos as obtenerTodosBodegas } from '../../../../utils/API/bodegas';

import { Autocomplete } from '@material-ui/lab';
import MaterialTable from 'material-table';
import { LocalizationTable, TableIcons } from '../../../../utils/table';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);
    const [open, setOpen] = React.useState(false)

    const [cantidad, setCantidad] = React.useState("")
    const [proveedor, setProveedor] = React.useState("")
    const [proveedorData, setProveedorData] = React.useState([])
    const [autorizar, setAutorizar] = React.useState(false)
    const [productos, setProductos] = React.useState([])
    const [productosData, setProductosData] = React.useState([])
    const [producto, setProducto] = React.useState('')

    const [almacen, setAlmacen] = React.useState([])
    const [bodegaData, setBodegaData] = React.useState([])
    const [bodega, setBodega] = React.useState('')
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setProveedorData, initializer)
            obtenerTodosBodegas(setBodegaData, initializer)

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
        if (props.sistema != null&&almacen.length!=0) {
        guardarAlmacen(props.sistema.id,{data:almacen},initializer)
        }
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
        let t0=productos.slice()
        let id = row.tableData.id
        let t = almacen.slice()
        console.log(row)
        t0.push({numero:row.numero,product_id:row.product_id,inventory_id:row.inventory_id,name:row.name,jp_code:row.jp_code,supplier_code:row.supplier_code })
        setProductos(t0)

        setAlmacen(t.filter((e,i) =>i!=id))
     
    }
    const quitarInventario=(row) => {
    
       let t = [];
       productos.slice().map((e,i) =>{
           if(!estaIncluido(e.inventory_id,row)){
            t.push({...e})
           }
       })
       setProductos(t)
       
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
    const almacenar=(dat)=>{
       let eli=[]
       if(bodega!=""){
        let t=almacen.slice()
        dat.map((e)=>{
            eli.push(e)
            t.push({...e,warehouse_id:bodega,warehouse:obtenerBodega(bodega)})
        })
       console.log(t)
        quitarInventario(dat)
        setAlmacen(t)
       }else{
          
           initializer.mostrarNotificacion({ type: "warning", message: 'Seleccione una bodega primero' });

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
            
            <Confirmar open={open} setOpen={setOpen} accion={guardar} titulo='¿Desea continuar? Se anulará la orden y se creará otra.'/>
            <DialogTitle id="alert-dialog-slide-title">Almacenaje - Pedido {props.sistema?.id}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Seleccione los productos y envíelos a las bodegas correspondientes
                </DialogContentText>
                <Grid container spacing={2}>
                <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                        <Autocomplete

                            style={{ width: '100%' }}
                            options={bodegaData}
                            value={getName(bodega,bodegaData)}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                                if (value != null) {

                                    setBodega(value.id)
                                } else {

                                    setBodega('')

                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione una bodega destino" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>
                    
                    
                  
                 
                 <Grid item xs={12} md={12}>

                 <MaterialTable
                 key={1}
                 id={1}
                    icons={TableIcons}
                    columns={[
                        { title: "Número", field: "numero" },

                        {
                            title: 'Producto',
                            field: 'name',
                            render: rowData => (
                             <span >{rowData.name}</span>
                            ),
                          },
                        { title: "Código JP", field: "jp_code" },
                        { title: "Código Proveedor", field: "supplier_code" }
                



                    ]}
                    data={
                        productos
                    }
                    title="Productos en el pedido"
                   
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
                        search:false,
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
    { title: "Número", field: "numero" },

       {
           title: 'Producto',
           field: 'name',
           render: rowData => (
            <span >{rowData.name}</span>
           ),
         },
       { title: "Código JP", field: "jp_code" },
       { title: "Código Proveedor", field: "supplier_code" },
       { title: "Bodega Destino", field: "warehouse" }




   ]}
   data={
       almacen
   }

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
       toolbar:false,
       showTitle: false,
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
                <Button onClick={() => props.setOpen(false)} color="default">
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
