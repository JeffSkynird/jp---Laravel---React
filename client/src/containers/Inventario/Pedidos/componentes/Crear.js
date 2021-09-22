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
import { editar as editarPedido, obtenerDetalleOrden, registrar as registrarPedido } from '../../../../utils/API/pedidos';
import { obtenerTodos } from '../../../../utils/API/proveedores';
import { obtenerTodos as obtenerProductos } from '../../../../utils/API/sistemas';

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

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setProveedorData, initializer)
            obtenerProductos(setProductosData, initializer)

        }
    }, [initializer.usuario])
    React.useEffect(() => {
        if (props.sistema != null) {
            setProductos([])
            obtenerDetalleOrden(props.sistema.id,setProductos,initializer)

        }
    }, [props.sistema])
    const guardar = () => {

       if (props.sistema == null) {
            registrarPedido({ suppliers: validarData(),authorize:autorizar?1:0 }, initializer)
            limpiar()
        } else {
            editarPedido(props.sistema.id, { suppliers: validarData(),authorize:autorizar?1:0 }, initializer)
            limpiar()

        }
        props.setOpen(false)
        props.carga() 
    }
    const limpiar = () => {
        setCantidad("")
        setProveedor("")
        setProducto("")
        setProductos([])
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
        let id = row.tableData.id
        let t = productos.slice()
      

        setProductos(t.filter((e,i) =>i!=id))
        setCantidad('')
        setProveedor('')
        setProducto('')
    }
    return (
        <Dialog
        fullWidth
        maxWidth='md'
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
            <DialogTitle id="alert-dialog-slide-title">{props.sistema!=null?'Pedido '+props.sistema.id:'Pedidos'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de pedido" : "Formulario de creación de pedido"}
                </DialogContentText>
                <Grid container spacing={2}>
                <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                        <Autocomplete

                            style={{ width: '100%' }}
                            options={productosData}
                            value={getName(producto,productosData)}
                            getOptionLabel={(option) => option.jp_code+" "+option.name}
                            onChange={(event, value) => {
                                if (value != null) {

                                    setProducto(value.id)
                                } else {

                                    setProducto('')

                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione un producto" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{  width: '100%' }}
                        type="number"
                        label="Cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}

                    /></Grid>
                    <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                        <Autocomplete

                            style={{ width: '100%' }}
                            options={proveedorData}
                            value={getName(proveedor,proveedorData)}
                            getOptionLabel={(option) => option.business_name}
                            onChange={(event, value) => {
                                if (value != null) {

                                    setProveedor(value.id)
                                } else {

                                    setProveedor('')

                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione un proveedor" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>
                    
                    { 
                    props.sistema!=null?
                       null
                :
                <Grid item xs={12} md={12} style={{ display: 'flex' }}>

                <FormControlLabel
                    onChange={(event, value) => {
                        setAutorizar(!autorizar)
                    }}
                    value={autorizar}
                    control={<Checkbox value="remember" color="primary" />}
                    label="Autorizar pedido"
                />
            </Grid>
                    }
                 
                 <Grid item xs={12} md={12}>

                 <MaterialTable
                    icons={TableIcons}
                    columns={[
                        {
                            title: 'Producto',
                            field: 'product',
                            render: rowData => (
                             <span >{rowData.product}</span>
                            ),
                          },
                        { title: "Cantidad", field: "quantity" },
                        { title: "Proveedor", field: "supplier" }
                



                    ]}
                    data={
                        productos
                    }

                    localization={LocalizationTable}

                actions={[      {
                    icon: TableIcons.Add,
                    tooltip: 'Agregar',
                    isFreeAction:true,
                    onClick: (event, rowData) => {
                      agregar()
                    }
                },
                {
                    icon: TableIcons.Delete,
                    tooltip: 'Eliminar',
                 
                    onClick: (event, rowData) => {
                      quitar(rowData)
                    }
                }]}

                    options={{
                        pageSize:10,
                        showTitle: false,
                        actionsColumnIndex: -1,
                        width:'100%',
                        maxBodyHeight: 350,
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
                <Button color="primary" onClick={()=>{
                     if(props.sistema!=null){
                        setOpen(true)
                     }else{
                        guardar()
                     }
                    
                }}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
