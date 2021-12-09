import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Initializer from '../../../../store/Initializer'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slide from '@material-ui/core/Slide';
import { Grid } from '@material-ui/core';
import { obtenerStatusOrden,cambiarEstado } from '../../../../utils/API/pedidos';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);
    const [status, setStatus] =React.useState('')
    const [statusData, setStatusData] =React.useState([])

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerStatusOrden(setStatusData, initializer)
        }
    }, [initializer.usuario])
    React.useEffect(() => {
        if (props.sistema != null) {
        
                setStatus(props.sistema.status)
       
        }
    }, [props.sistema])
    const guardar = () => {
        if(props.sistema!=null){
            cambiarEstado({order:props.sistema.id,status:status}, initializer)

        }
        props.setOpen(false)
        props.carga()
    }
    console.log(statusData)
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.setOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Estados</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Con el estado ENTREGADO deberá distribuir los productos a las bodegas y se cerrará la orden.
                </DialogContentText>

                <FormControl variant="outlined"  style={{width: '100%'}}>
                    <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={status}
                        onChange={(e)=> {
                            if(props.sistema.authorized!=null){
                                setStatus(e.target.value)

                            }else{
                                if(e.target.value=="A"||e.target.value=="I"){
                                    setStatus(e.target.value)

                                }else{
                                    initializer.mostrarNotificacion({ type: "warning", message: 'El pedido aún no ha sido autorizado' });

                                }

                            }
                        
                        }}
                        label="Estado"
                    >

                        {
                            statusData.map((e)=>(
                                <MenuItem value={e.id}>{e.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={guardar}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
