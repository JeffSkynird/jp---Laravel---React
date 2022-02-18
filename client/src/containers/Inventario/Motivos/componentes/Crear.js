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
import { editar, registrar } from '../../../../utils/API/motivos';
import { obtenerTodos } from '../../../../utils/API/modulos';
import { Autocomplete } from '@material-ui/lab';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [modulos, setModulos] = React.useState([])
    const [modulo, setModulo] = React.useState('')

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setModulos, initializer)
        }
    }, [initializer.usuario])
    React.useEffect(() => {
        if (props.sistema != null) {
            setNombre(props.sistema.name)
            setModulo(props.sistema.module_id)
        }
    }, [props.sistema])
    const guardar = () => {
        let data = {
            'name': nombre,
            'module_id': modulo,
        }
        if (props.sistema == null) {
            registrar(data, initializer, limpiar)

        } else {
            editar(props.sistema.id, data, initializer, limpiar)

        }
        props.setOpen(false)

    }
    const limpiar = () => {
        setNombre("")
        setModulo('')
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
            <DialogTitle id="alert-dialog-slide-title">Motivos</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de motivos" : "Formulario de creación de motivos"}
                </DialogContentText>

                <Grid container spacing={2}>

                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>

                    <Grid item xs={12}>
                        <FormControl variant="outlined"  style={{width:'100%'}}>
                            <InputLabel id="demo-simple-select-outlined-label">Módulo</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={modulo}
                                onChange={(e) => setModulo(e.target.value)}
                                label="Módulo"
                            >
                                <MenuItem value="">
                                    <em>Seleccione una opción</em>
                                </MenuItem>
                                {
                                    modulos.map((e) => (
                                        <MenuItem value={e.id}>
                                            {e.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
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
