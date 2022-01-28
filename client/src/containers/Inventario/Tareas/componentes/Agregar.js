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
import { editarSistema, registrarSistema, subirFoto ,obtenerTodos} from '../../../../utils/API/sistemas';

import { obtenerTodos as obtenerUnidades } from '../../../../utils/API/unidades';
import { Autocomplete } from '@material-ui/lab';
import { obtenerTodos as obtenerProductos } from '../../../../utils/API/sistemas';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [unity, setUnity] = React.useState("")
    const [product, setProduct] = React.useState(null)

    const [unityData, setUnityData] = React.useState([])
    const [quantity, setQuantity] = React.useState("")


    React.useEffect(() => {
        if (initializer.usuario != null) {

            obtenerTodos(setUnityData, initializer)
        }
    }, [initializer.usuario,props.bodega])
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

        if (unity != "" && quantity != "") {
          
                props.carga(product, quantity)
                setProduct(null)
                setUnity("")
                setQuantity("")
                props.setOpen(false)
          
          
        }
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
            <DialogTitle id="alert-dialog-slide-title">Agregar</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Seleccione el producto y cantidad a agregar
                </DialogContentText>

                <Grid container spacing={1}>


                    <Grid item xs={12} md={12} >
                        <Autocomplete
                            size="small"
                            style={{ width: '100%' }}
                            options={unityData}
                            value={getName(unity, unityData)}
                            getOptionLabel={(option) => option.serial_code+" - "+option.name}
                            onChange={(event, value) => {
                                if (value != null) {

                                    setUnity(value.id)
                                    setProduct(value)
                                } else {

                                    setUnity('')
                                    setProduct(null)

                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione un producto" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>
                    <Grid item xs={12} md={12} >
                        <TextField
                            size="small"
                            style={{ width: '100%' }}
                            variant="outlined"
                            label="Cantidad"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}

                        />

                    </Grid>

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
