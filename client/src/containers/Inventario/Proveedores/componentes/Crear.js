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
import { Avatar, Grid, IconButton, InputAdornment } from '@material-ui/core';
import { editar as editarProveedor, registrar as registrarProveedor} from '../../../../utils/API/proveedores';
import { obtenerTodos as obtenerUnidades } from '../../../../utils/API/unidades';
import { Autocomplete } from '@material-ui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [ruc, setRuc] = React.useState("")
    const [logo, setLogo] = React.useState("")
    const [celular, setCelular] = React.useState("")
    const [correo, setCorreo] = React.useState("")
  
    React.useEffect(()=>{
        if(props.sistema!=null){
            setNombre(props.sistema.business_name)
            setRuc(props.sistema.ruc)
            setLogo(props.sistema.logo)
            setCelular(props.sistema.cellphone)

            setCorreo(props.sistema.email)

        }
    },[props.sistema])
    const guardar=()=>{
        let data={ 
        'business_name': nombre,
        'ruc': ruc,
        'cellphone': celular,
        'email': correo,
        'user_id': 1}
        if(props.sistema==null){
            registrarProveedor(data,initializer)
            limpiar()
        }else{
            editarProveedor(props.sistema.id,data,initializer)
            limpiar()

        }
        props.setOpen(false)
        props.carga()
    }
    const limpiar=()=>{
        setNombre('')
        setRuc("")
        setLogo("")
        setCelular("")

        setCorreo("")
        props.setSelected(null)
        props.carga()
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
            <DialogTitle id="alert-dialog-slide-title">Proveedores</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   {props.sistema!=null?"Formulario de edición de proveedores": "Formulario de creación de proveedores"}
                </DialogContentText>
            
                <Grid container spacing={2}>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Razón Social"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>
                 
            
                      <Grid item xs={12}>   <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                  
                        label="RUC"
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value)}

                    /></Grid>
                      <Grid item xs={12}>   <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                  
                        label="Celular"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}

                    /></Grid>
                         <Grid item xs={12}>   <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                  
                        label="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}

                    /></Grid>
                    


                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={guardar}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
