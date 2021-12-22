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
import { editar as editarProveedor, obtenerSolicitudes, obtenerSubTareas, obtenerUsuariosAsignados, registrar as registrarProveedor } from '../../../../utils/API/tareas';
import { obtenerInventario, obtenerTodos as obtenerTodosBodegas } from '../../../../utils/API/bodegas';
import DateFnsUtils from '@date-io/date-fns';
import tasks from '../../../../assets/tareas.png'
import Chip from '@material-ui/core/Chip';
import {
    DateTimePicker,
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
import {obtenerTodos as obtenerUsuarios} from '../../../../utils/API/usuarios'; 
import { utcDate } from '../../../../utils/Date';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [open, setOpen] = React.useState(false)
    const [mostrarTareas, setMostrarTareas] = React.useState(false)
    const [mostrarTareasCampo, setMostrarTareaCampo] = React.useState(false)
    const [mostrarUsersCampo, setMostrarUsersCampo] = React.useState(false)


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
    const [usersData, setUsersData] = React.useState([])

    const [usuarioData, setUsuarioData] = React.useState([])
    const [usuario, setUsuario] = React.useState('')


    React.useEffect(() => {
        if (props.sistema != null) {
            setDescription(props.sistema.description)
            setComplete(props.sistema.is_complete)
            obtenerSubTareas(props.sistema.id, setSubTaskData, initializer)
            obtenerSolicitudes(props.sistema.id, setProductos, initializer)
            obtenerUsuariosAsignados(props.sistema.id, setUsersData, initializer)


        }
    }, [props.sistema])

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setProveedorData, initializer)
            obtenerTodosBodegas(setBodegaData, initializer)
            setFinalDate(addDaysToDate(new Date(), 7))
            obtenerUsuarios(setUsuarioData, initializer)

        }
    }, [initializer.usuario])

    function addDaysToDate(date, days) {
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }

    const agregar = () => {
        if (addDescription != '') {
            setSubTaskData([...subtaskData, { description: addDescription, is_complete: false }])
            setAddDescription('')
        }
    }
    const guardar = () => {
        let resp = true
        subtaskData.map((e, i) => {
            if (e.is_complete == false) {
                resp = false
            }


        })
        if (complete && resp == false) {
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
            'final_date': utcDate(finalDate),
            'users': usersData
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
        setUsersData([])
        setUsuario('')  
        setMostrarTareaCampo(false)
        setMostrarUsersCampo(false)
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
    const getName = (id, data) => {
        let object = null
        data.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    const handleDelete = (index) => {
        let data = usersData
        let nw = data.filter((item, i) => {
            return i != index
        })
        setUsersData([...nw])
    }
    const agregarUsuario = (value) => {
        if(!existeUsuario(value)){
            setUsersData([...usersData, {...value }])
            setUsuario('')
        }
    }
    const existeUsuario = (value) => {
        let existe = usersData.find(e => e.id == value.id)
        if (!existe) {
            return false
        } else {
            return true
        }
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
            <Agregar setOpen={setOpen} open={open} carga={carga} bodega={bodegaD} />

            <DialogTitle id="alert-dialog-slide-title">Tareas</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de clientes" : "Formulario de creación de clientes"}
                </DialogContentText>

                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>


                        <MuiPickersUtilsProvider style={{ width: "100%" }} utils={DateFnsUtils} locale={es}>
                            <DateTimePicker
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
                            <DateTimePicker
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

                    <Grid item xs={12} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <Typography color="initial">Tecnicos asignados</Typography>
                        <IconButton size="small" onClick={() => {
                            setMostrarUsersCampo(true)
                        }}>
                            <AddIcon />
                        </IconButton>

                    </Grid>
                    {
                        mostrarUsersCampo && (
                            <Grid item xs={12}>
                                <Autocomplete
                                    size="small"
                                    style={{ width: '100%' }}
                                    options={usuarioData}
                                    value={getName(usuario, usuarioData)}
                                    getOptionLabel={(option) => option.names+" "+option.last_names}
                                    onChange={(event, value) => {
                                        if (value != null) {
                                            setUsuario(value.id)
                                            setMostrarUsersCampo(false)
                                            agregarUsuario(value)
                                        } else {
                                            setUsuario('')
                                        }

                                    }} // prints the selected value
                                    renderInput={params => (
                                        <TextField {...params} label="Seleccione un usuario" variant="outlined" fullWidth />
                                    )}
                                />
                            </Grid>

                        )
                    }
                    {
                        usersData.length!=0 && (
                            <Grid item xs={12}>
                            {
                                usersData.map((e) => (
                                    <Chip
                                        style={{ marginRight: '5px' }}
                                        label={e.names}
                                        onDelete={() => handleDelete(e.id)}
    
                                    />
                                ))
                            }
    
    
                        </Grid>

                        )
                    }
          



                    <Grid item xs={12} style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>

                        <Typography color="initial">Agregar sub tareas</Typography>
                        <div>
                            <IconButton size="small" onClick={() => setMostrarTareas(!mostrarTareas)}>

                                {mostrarTareas ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                            <IconButton size="small" onClick={() => {
                                setMostrarTareaCampo(true)
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
               

                            <Grid item xs={12}>
                                <Paper elevation={1} >
                                    <List style={{ margin: 0, padding: 0 }}>
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

                  
                    {
                        subtaskData.length == 0 && (
                            <Grid item xs={12}>

                                <div style={{ display: 'flex', marginTop: 20, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={tasks} width={300} alt="" srcset="" />
                                    <p>No hay registros</p>
                                </div>

                            </Grid>)
                    }
                 

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
