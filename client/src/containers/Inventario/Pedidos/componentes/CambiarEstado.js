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
import { editarSistema, registrarSistema, subirFoto, obtenerTodos } from '../../../../utils/API/sistemas';

import { obtenerTodos as obtenerUnidades } from '../../../../utils/API/unidades';
import { Autocomplete } from '@material-ui/lab';
import { obtenerTodos as obtenerProductos } from '../../../../utils/API/sistemas';
import { editar } from '../../../../utils/API/solicitues';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [unity, setUnity] = React.useState("")
    const [product, setProduct] = React.useState(null)

    const [unityData, setUnityData] = React.useState([])
    const [quantity, setQuantity] = React.useState("")
    const [status, setStatus] = React.useState("A")

    React.useEffect(() => {
        if (initializer.usuario != null&&props.selected!=null) {
            obtenerTodos(setUnityData, initializer)
            setStatus(props.selected.status)
        }
    }, [initializer.usuario, props.selected])
    const getName = (id, data) => {
        let object = null
        data.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    const guardar = () => {

            editar(props.selected.id,{status},initializer,props.carga)
            setProduct(null)
            setUnity("")
            setQuantity("")
            props.setOpen(false)
            props.setSelected(null)
     
    }

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
                props.setOpen(false)
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Cambiar estado</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Seleccione el estado de entregado del pedido
                </DialogContentText>

                <Grid container spacing={1}>
                    <FormControl variant="outlined" style={{width:'100%'}}>
                        <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={status}
                            onChange={(e)=>setStatus(e.target.value)}
                            label="Estado"
                        >
                            <MenuItem value={'A'}>Pendiente</MenuItem>
                            <MenuItem value={'P'}>Parcialmente entregado</MenuItem>
                            <MenuItem value={'C'}>Entregado</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={() => guardar()}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
