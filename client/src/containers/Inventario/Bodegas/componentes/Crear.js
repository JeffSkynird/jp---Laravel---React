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
import { Avatar, Grid, IconButton, InputAdornment, FormControlLabel, Checkbox } from '@material-ui/core';
import { editar as editarBodega, registrar as registrarBodega } from '../../../../utils/API/bodegas';
import { obtenerTodos as obtenerZonas } from '../../../../utils/API/zones';
import { Autocomplete } from '@material-ui/lab';
import { obtenerTodos } from '../../../../utils/API/proveedores';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [jpcode, setJpcode] = React.useState("")
    const [supplierCode, setSupplirCode] = React.useState("")
    const [serie, setSerie] = React.useState("")
    const [zone, setZone] = React.useState("")
    const [zoneData, setZoneData] = React.useState([])
    const [image, setImage] = React.useState("")

    const [isown, setIsOwn] = React.useState(true)
    const [stockMin, setStockMin] = React.useState("")
    const [stockMax, setStockMax] = React.useState("")

    const [descripcion, setDescripcion] = React.useState("")

    const [proveedor, setProveedor] = React.useState("")
    const [proveedorData, setProveedorData] = React.useState([])

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setProveedorData, initializer)
            obtenerZonas(setZoneData, initializer)
        }

    }, [initializer.usuario])
    React.useEffect(() => {
        if (props.sistema != null) {
            setNombre(props.sistema.name)
            setZone(props.sistema.zone_id)
            setDescripcion(props.sistema.description)
            setProveedor(props.sistema.supplier_id)
            setIsOwn(props.sistema.is_own==0?false:true)
        }
    }, [props.sistema])
    const guardar = () => {
        let data = {
            'name': nombre,
            'description': descripcion,
            'zone_id': zone,
            'user_id': 1,
            'supplier_id':isown?'':proveedor,
            'is_own':isown?1:0,
        }
        if (props.sistema == null) {
            registrarBodega(data, initializer)
            limpiar()
        } else {
            editarBodega(props.sistema.id, data, initializer)
            limpiar()

        }
        props.setOpen(false)
        props.carga()
    }
    const limpiar = () => {
        setNombre("")
        setProveedor("")
        setIsOwn(false)
        setZone("")

        setDescripcion("")
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
            <DialogTitle id="alert-dialog-slide-title">Bodegas</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de bodegas" : "Formulario de creación de bodegas"}
                </DialogContentText>

                <Grid container spacing={2}>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>


                    <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                        <Autocomplete

                            style={{ width: '100%' }}
                            options={zoneData}
                            value={getName(zone,zoneData)}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                                if (value != null) {

                                    setZone(value.id)
                                } else {

                                    setZone('')

                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione una zona" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>

                    <Grid item xs={12}>  <TextField
                        variant="outlined"

                        style={{ width: '100%' }}

                        label="Descripción"

                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}

                    /></Grid>
                    <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                            <FormControlLabel
                              label="Es propia"
                              control={
                                <Checkbox
                                  value=""
                                  checked={isown}
                                  onChange={(e) => setIsOwn(!isown)}
                                  color="primary"
                                />
                              }
                            />
                    </Grid>
                    {
                        !isown ?
                        <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                        <Autocomplete
                            size="small"
                            style={{ width: '100%' }}
                            options={proveedorData}
                            value={getName(proveedor, proveedorData)}
                            getOptionLabel={(option) => option.business_name}
                            onChange={(event, value) => {
                                if (value != null) {

                                    setProveedor(value.id)
                                } else {

                                    setProveedor('')

                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione un cliente" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>

                        :null
                    }
                  
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
