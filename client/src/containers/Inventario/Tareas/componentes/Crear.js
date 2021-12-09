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
import { Avatar, Grid, IconButton, InputAdornment, FormControlLabel, Checkbox, ListItem, List, ListItemSecondaryAction, ListItemText, Typography, Paper } from '@material-ui/core';
import { editar as editarProveedor, obtenerSolicitudes, obtenerSubTareas, registrar as registrarProveedor } from '../../../../utils/API/tareas';
import { obtenerInventario, obtenerTodos as obtenerTodosBodegas } from '../../../../utils/API/bodegas';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import es from 'date-fns/locale/es'
import { Autocomplete } from '@material-ui/lab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MaterialTable from 'material-table';
import { LocalizationTable, TableIcons } from '../../../../utils/table';
import Agregar from './Agregar';
import { obtenerTodos } from '../../../../utils/API/proveedores';
import { utcDate } from '../../../../utils/Date';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [open, setOpen] = React.useState(false)
    const [mostrarTareas, setMostrarTareas] = React.useState(false)
    const [mostrarTareasCampo, setMostrarTareaCampo] = React.useState(false)

    
    const [logo, setLogo] = React.useState(null)
    const [celular, setCelular] = React.useState("")
    const [correo, setCorreo] = React.useState("")
    const [complete, setComplete] = React.useState(false)
    const [description, setDescription] = React.useState("")
    const [subtaskData, setSubTaskData] = React.useState([])
    const [addDescription, setAddDescription] = React.useState("")

    const [proveedor, setProveedor] = React.useState("")
    const [proveedorData, setProveedorData] = React.useState([])
    const [initDate, setInitDate] = React.useState(new Date())
    const [finalDate, setFinalDate] = React.useState(new Date())

    const [productos, setProductos] = React.useState([])
    const [bodegaData, setBodegaData] = React.useState([])
    const [bodegaD, setBodegaD] = React.useState('')

    React.useEffect(() => {
        if (props.sistema != null) {
            setDescription(props.sistema.description)
            setComplete(props.sistema.is_complete)
            obtenerSubTareas(props.sistema.id, setSubTaskData, initializer)
            obtenerSolicitudes(props.sistema.id, setProductos, initializer)
        }
    }, [props.sistema])

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setProveedorData, initializer)
            obtenerTodosBodegas(setBodegaData, initializer)

        }
    }, [initializer.usuario])



    const agregar = () => {
        if (addDescription != '') {
            setSubTaskData([...subtaskData, { description: addDescription, is_complete: false }])
            setAddDescription('')
        }
    }
    const guardar = () => {
        let resp = true
        subtaskData.map((e,i)=>{
            if(e.is_complete==false){
                resp= false
            }
                
            
        })
        if(complete&&resp==false){
            initializer.mostrarNotificacion({ type: "warning", message: 'Tiene subtareas pendientes' });

            return;
        }
        let data = {
            'description': description,
            'is_complete': complete ? 1 : 0,
            'subtask': subtaskData,
            'products': productos,
            'warehouse_id': bodegaD,
            'user_id': 1,
            'init_date': utcDate(initDate),
            'final_date': utcDate(finalDate)
        }
        if (props.sistema == null) {
            registrarProveedor(data, initializer, limpiar)


        } else {
            editarProveedor(props.sistema.id, data, initializer, limpiar)

        }


    }
    
    const limpiar = () => {
        setDescription("")
        setComplete(false)
        setSubTaskData([])
        setProductos([])
        setBodegaD('')
        setProveedor('')

        props.setSelected(null)
        props.carga()
        props.setOpen(false)
    }

    const handleToggle = (index) => {
        let data = subtaskData
        data[index].is_complete = !data[index].is_complete
        setSubTaskData([...data])
    }
    //Elimina un elemento del array por indice
    const eliminar = (index) => {
        let data = subtaskData
        let nw = data.filter((item, i) => {
            return i != index
        })

        setSubTaskData([...nw])
    }
    const actualizarTodo = () => {
        let data = subtaskData
        data.map((item, i) => {
            item.is_complete = 1
        })
        setSubTaskData([...data])
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
            setProductos([...productos, { id: product.id, name: product.name, quantity }])

        } else {
            //Remplaza el producto
            let t = productos.slice()
            t[t.indexOf(existe)].quantity = quantity
            setProductos([...t])


        }
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
    return (
        <Dialog
            fullScreen={true}
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
                props.setOpen(false)
                limpiar()
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dia
            log-slide-description"
        >
            <Agregar setOpen={setOpen} open={open} carga={carga} bodega={bodegaD}/>

            <DialogTitle id="alert-dialog-slide-title">Tareas</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de clientes" : "Formulario de creación de clientes"}
                </DialogContentText>

                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>


                        <MuiPickersUtilsProvider style={{ width: "100%" }} utils={DateFnsUtils} locale={es}>
                            <KeyboardDatePicker
                                autoOk

                                ampm={false}
                                size="small"
                                inputVariant="outlined"
                                label="Fecha inicial"
                                style={{ width: "100%" }}
                                disablePast
                                format="yyyy-MM-dd"
                                value={initDate}

                                onChange={date => setInitDate(date)}
                            />


                        </MuiPickersUtilsProvider>


                    </Grid>
                    <Grid item md={6} xs={12}>


                        <MuiPickersUtilsProvider style={{ width: "100%" }} utils={DateFnsUtils} locale={es}>
                            <KeyboardDatePicker
                                autoOk

                                ampm={false}
                                size="small"
                                inputVariant="outlined"
                                label="Fecha final"
                                style={{ width: "100%" }}
                                 disablePast
                                format="yyyy-MM-dd"
                                value={finalDate}

                                onChange={date => setFinalDate(date)}
                            />


                        </MuiPickersUtilsProvider>


                    </Grid>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        label="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                    /></Grid>
                    {
                        props.sistema != null ?
                            <Grid item xs={12}>
                                <FormControlLabel
                                    label="Completada"
                                    control={
                                        <Checkbox
                                            value=""
                                            checked={complete}
                                            onChange={() => {
                                                setComplete(!complete)
                                                if ((!complete) == true) {
                                                    actualizarTodo()
                                                }
                                            }}
                                            color="primary"
                                        />
                                    }
                                />
                            </Grid> : null


                    }

                    <Grid item xs={12} style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>

                        <Typography color="initial">Agregar sub tareas</Typography>
                    <div>
                    <IconButton size="small" onClick={() => setMostrarTareas(!mostrarTareas)}>

{mostrarTareas?<VisibilityOffIcon />:<VisibilityIcon />}
</IconButton>
                    <IconButton size="small" onClick={()=>{setMostrarTareaCampo(true)
                    setMostrarTareas(true)
                    }}>
                                    <AddIcon />
                                </IconButton>

                    </div>
                     

                       
                    </Grid>
                    {
                        mostrarTareasCampo && (
                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    style={{ width: '100%' }}

                                    label="Descripción"
                                    value={addDescription}
                                    onChange={(e) => setAddDescription(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            agregar()
                                            setMostrarTareaCampo(false)
                                        }

                                    }}
                                />



                            </Grid>
                        )
                    }
                    {
                        mostrarTareas && (

                            <Grid item xs={12}>
                                <Paper elevation={1} >
                                <List dense  style={{margin:0,padding:0}}>
                                    {subtaskData.map((value, i) => {
                                        return (
                                            <ListItem key={i} button onClick={() => eliminar(i)}>
                                                <ListItemText primary={value.description} />
                                                <ListItemSecondaryAction>
                                                    <Checkbox
                                                        edge="end"
                                                        checked={value.is_complete ? true : false}
                                                        onChange={() => handleToggle(i)}


                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        );
                                    })}
                                </List>

                                </Paper>


                            </Grid>
                        )
                    }
                    {
                        props.sistema == null ?
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
                            : null
                    }

                    <Grid item xs={12} md={12}>

                        <MaterialTable
                            icons={TableIcons}
                            columns={[
                                {
                                    title: 'Producto',
                                    field: 'name',
                                    render: rowData => (
                                        <span >{rowData.name}</span>
                                    ),
                                },
                                { title: "Cantidad", field: "quantity" }
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
                <Button onClick={() => limpiar()} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={guardar}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
