import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Initializer from '../../../../store/Initializer'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Slide from '@material-ui/core/Slide';
import { Avatar, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment } from '@material-ui/core';
import { editar as editarProveedor, registrar as registrarProveedor, subirFoto} from '../../../../utils/API/proveedores';
import { obtenerTodos as obtenerUnidades } from '../../../../utils/API/unidades';
import { Autocomplete } from '@material-ui/lab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { obtenerTodos } from '../../../../utils/API/tareas';
import { LocalizationTable, TableIcons } from '../../../../utils/table';
import MaterialTable from 'material-table';
import { obtenerInventario, obtenerTodos as obtenerTodosBodegas } from '../../../../utils/API/bodegas';

import Agregar from '../../Tareas/componentes/Agregar';
import { registrarPedido } from '../../../../utils/API/pedidos';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);
    const [open, setOpen] = React.useState(false)

    const [nombre, setNombre] = React.useState("")
    const [ruc, setRuc] = React.useState("")
    const [logo, setLogo] = React.useState(null)
    const [celular, setCelular] = React.useState("")
    const [correo, setCorreo] = React.useState("")
    const [tareaData,setTareaData] = React.useState([])
    const [tarea, setTarea] = React.useState("  ")
    const [productos, setProductos] = React.useState([])
    const [bodegaData, setBodegaData] = React.useState([])
    const [bodegaD, setBodegaD] = React.useState('')
    const [autorizar, setAutorizar] = React.useState(false)

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setTareaData, initializer)
            obtenerTodosBodegas(setBodegaData, initializer)

        }
    }, [initializer.usuario])
    React.useEffect(()=>{
        if(props.sistema!=null){
            setNombre(props.sistema.business_name)
            setRuc(props.sistema.ruc)
            setCelular(props.sistema.cellphone)

            setCorreo(props.sistema.email)

        }
    },[props.sistema])
    const subir=()=>{
        if(props.sistema!=null){
          if(logo!=null){
            subirFoto(props.sistema.id,{url:logo},initializer,  props.carga)

          }

        }
    }
    const guardar=()=>{
        let data={ 
           'products':productos,
        'task_id':tarea,
    'autorize':autorizar?1:0,
    'warehouse_id':bodegaD,
    }
        if(props.sistema==null){
            registrarPedido(data,initializer)
            limpiar()
            props.carga()
        }else{
            //editarProveedor(props.sistema.id,data,initializer)
            limpiar()
            subir()
            if(logo==null){
                props.carga()
            }

        }
        props.setOpen(false)
      
    }
    const limpiar=()=>{
        setNombre('')
        setRuc("")
        setLogo(null)
        setTarea("")
        setBodegaD("")
        setAutorizar(false)
        setProductos([])
        setCelular("")

        setCorreo("")
        props.setSelected(null)
        props.carga()
    }
    const getName = (id, data) => {
        let object = null
        data.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    const quitar = (row) => {
        let id = row.tableData.id
        let t = productos.slice()


        setProductos(t.filter((e, i) => i != id))
    }
    const carga = (product, quantity) => {
        //comprueba si el producto ya esta en la lista
        let existe = productos.find(e => e.id == product.id)
        if (!existe) {
            setProductos([...productos, { id: product.id, name: product.name, quantity, stock: product.stock }])

        } else {
            //Remplaza el producto
            let t = productos.slice()
            t[t.indexOf(existe)].quantity = quantity
            setProductos([...t])


        }
    }
    return (
        <Dialog
            open={props.open}
            fullScreen
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
                props.setOpen(false)
                limpiar()
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
                        <Agregar setOpen={setOpen} open={open} carga={carga} bodega={bodegaD} />

            <DialogTitle id="alert-dialog-slide-title">Pedido</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   {props.sistema!=null?"Formulario de edición de pedidos": "Formulario de creación de pedidos"}
                </DialogContentText>
            
                <Grid container spacing={2}>
         
                            <Grid item xs={12}>
                                <Autocomplete
                                    size="small"
                                    style={{ width: '100%' }}
                                    options={tareaData}
                                    value={getName(tarea, tareaData)}
                                    getOptionLabel={(option) => "#"+option.id+" "+option.description}
                                    onChange={(event, value) => {
                                        if (value != null) {
                                            setTarea(value.id)
                                        } else {
                                            setTarea('')
                                        }

                                    }} // prints the selected value
                                    renderInput={params => (
                                        <TextField {...params} label="Seleccione una tarea" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>
                  
            <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                                <Autocomplete

                                    style={{ width: '100%' }}
                                    size="small"
                                    options={bodegaData}
                                    getOptionDisabled={(option) => option.id === bodegaD}
                                    value={getName(bodegaD, bodegaData)}
                                    getOptionLabel={(option) => option.name+ " - "+(option.supplier!=null?option.supplier:"JP")}
                                    onChange={(event, value) => {
                                        if (value != null) {
                                            if (bodegaD != value.id) {
                                                setBodegaD(value.id)

                                            }
                                        } else {

                                            setBodegaD('')

                                        }

                                    }} // prints the selected value
                                    renderInput={params => (
                                        <TextField {...params} label="Seleccione la bodega" variant="outlined" fullWidth />
                                    )}
                                />

                            </Grid>
                      
                            <Grid item xs={12}>
                                <FormControlLabel
                                    label="Autorizar"
                                    control={
                                        <Checkbox
                                            value=""
                                            checked={autorizar}
                                            onChange={() => {
                                                setAutorizar(!autorizar)
                                            }}
                                            color="primary"
                                        />
                                    }
                                />
                            </Grid>
                       <Grid item xs={12} md={12}>

                        <MaterialTable
                            icons={TableIcons}
                            columns={[
                                {
                                    title: 'Producto',
                                    field: 'name',
                                    render: rowData => (
                                        <span >{rowData.name}</span>
                                    ),editable: 'never'
                                },
                                {editable:'never',headerStyle:{display:props.hasOwnProperty('pedido')?'auto':'none'},cellStyle:{display:props.hasOwnProperty('pedido')?'auto':'none'},title:"Stock",field:"stock",render:rowData=>(  <span >{rowData.stock}</span> )},
                                { title: "Cantidad", field: "quantity", type: "numeric", render: rowData => (   <span style={{color:(props.hasOwnProperty('pedido')?((rowData.quantity>rowData.stock?'red':'black')):'black')}}>{rowData.quantity}</span> ) },
                            ]}
                            data={
                                productos
                            }

                            localization={LocalizationTable}
                            title="Materiales"
                            actions={[{
                                icon: TableIcons.Add,
                                tooltip: 'Agregar',
                                isFreeAction: true,
                                onClick: (event, rowData) => {
                                    setOpen(true)
                                }
                            },
                            {
                                icon: TableIcons.Delete,
                                tooltip: 'Eliminar',

                                onClick: (event, rowData) => {
                                    quitar(rowData)
                                }
                            }]}
                            cellEditable={{
                                onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                                    return new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            if (newValue !== "") {
                                                if (newValue >= 0) {
                                                    const dataUpdate = [...productos];
            
                                                    const index = rowData.tableData.id;
                                                    dataUpdate[index][columnDef.field] = newValue;
                                            
                                                    setProductos([...dataUpdate]);
            
                                                }
                                            }
                                            resolve();
                                        }, 1000)
                                    });
                                }
                            }}
                            options={{
                                pageSize: 10,

                                actionsColumnIndex: -1,
                                width: '100%',
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
                <Button onClick={() => {props.setOpen(false)
                limpiar()
                }} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={guardar}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
