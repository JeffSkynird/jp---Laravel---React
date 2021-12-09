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
import { Avatar, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select } from '@material-ui/core';
import { editar as editarBodega, registrar as registrarBodega } from '../../../../utils/API/usuarios';
import { obtenerTodos as obtenerZonas } from '../../../../utils/API/zones';
import { Autocomplete } from '@material-ui/lab';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [documento, setDocumento] = React.useState("")
    const [direccion, setDireccion] = React.useState("")
    const [celular, setCelular] = React.useState("")
    const [correo, setCorreo] = React.useState("")
    const [telefono, setTelefono] = React.useState("")
    const [jpcode, setJpcode] = React.useState("")
    const [supplierCode, setSupplirCode] = React.useState("")
    const [serie, setSerie] = React.useState("")
    const [zone, setZone] = React.useState("")
    const [zoneData, setZoneData] = React.useState([])
    const [image, setImage] = React.useState("")

    const [stock, setStock] = React.useState("")
    const [clave, setClave] = React.useState("")
    const [apellidos, setApellidos] = React.useState("")

    const [descripcion, setDescripcion] = React.useState("")
    React.useEffect(() => {
        if (initializer.usuario != null) {

        obtenerZonas(setZoneData,initializer)
        
        }
  
}, [initializer.usuario])
    React.useEffect(()=>{
        if(props.sistema!=null){
            setNombre(props.sistema.names)
            setApellidos(props.sistema.last_names)
            setDocumento(props.sistema.dni)
  
            setCorreo(props.sistema.email)
     

        }
    },[props.sistema])
    const guardar=()=>{
        let data={ 
        'names': nombre,
        'last_names':apellidos,
        'dni': documento,
        'email': correo,
        'password':clave
   }
        if(props.sistema==null){
            registrarBodega(data,initializer,limpiar)
            
        }else{
            editarBodega(props.sistema.id,data,initializer,limpiar)

        }
        props.setOpen(false)
      
    }
    const limpiar=()=>{
        setNombre("")
        setDocumento("")
        setClave("")
        setDireccion("")
        setApellidos("")
  
        setCelular("")
        setCorreo("")
        setTelefono("")
        props.setSelected(null)
        props.carga()
    }
    const getName = (id) => {
        let object = null
        zoneData.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    return (
        <Dialog
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
            <DialogTitle id="alert-dialog-slide-title">Personal</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   {props.sistema!=null?"Formulario de edición de usuarios": "Formulario de creación de usuarios"}
                </DialogContentText>
            
                <Grid container spacing={2}>
            
    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Cédula/RUC"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}

                    /></Grid>
                  
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Nombres "
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Apellidos "
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}

                    /></Grid>
                   <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}

                    /></Grid>
    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                        type="password"
                        label="Clave"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}

                    /></Grid>
                  

                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                 limpiar()
                 props.setOpen(false)
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
