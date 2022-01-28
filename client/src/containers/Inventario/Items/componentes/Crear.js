import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Initializer from '../../../../store/Initializer'
import Slide from '@material-ui/core/Slide';
import { Avatar, Grid, IconButton, InputAdornment } from '@material-ui/core';
import { editar, registrar, subirFoto } from '../../../../utils/API/items';
import { obtenerTodos as obtenerCategorias } from '../../../../utils/API/categories';
import { Autocomplete } from '@material-ui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [categoryData, setCategoryData] = React.useState([])
    const [image, setImage] = React.useState(null)
    const [stockMin, setStockMin] = React.useState("")
    const [stockMax, setStockMax] = React.useState("")
    const [descripcion, setDescripcion] = React.useState("")
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerCategorias(setCategoryData, initializer)
        }

    }, [initializer.usuario])
    React.useEffect(() => {
        if (props.sistema != null) {
            setNombre(props.sistema.name)
            setCategory(props.sistema.category_id)
            setStockMax(props.sistema.max_stock)
            setStockMin(props.sistema.min_stock)
            setDescripcion(props.sistema.description)
        }
    }, [props.sistema])
    const subir = () => {
        if (props.sistema != null) {
            if (image != null) {
                subirFoto(props.sistema.id, { url: image }, initializer, props.carga)
            }
        }
    }
    const guardar = () => {
        let data = {
            'name': nombre,
            'category_id': category,
            'description': descripcion,
            'min_stock': stockMin,
            'max_stock': stockMax,
            'url': image,
            'user_id': 1
        }
        if (props.sistema == null) {
            registrar(data, initializer)
            limpiar()
            props.carga()
        } else {
            editar(props.sistema.id, data, initializer)
            limpiar()
            subir()

            if (image == null) {
                props.carga()
            }
        }
        props.setOpen(false)

    }
    const limpiar = () => {
        setNombre("")
        setImage(null)
        setCategory('')
        setDescripcion('')
        setStockMax("")
        setStockMin("")
        props.setSelected(null)
        props.carga()
    }
    const getName2 = (id) => {
        let object = null
        categoryData.map((e) => {
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
            <DialogTitle id="alert-dialog-slide-title">Items</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de items" : "Formulario de creación de items"}
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
                            options={categoryData}
                            value={getName2(category)}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                                if (value != null) {

                                    setCategory(value.id)
                                } else {

                                    setCategory('')

                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione una categoria" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>
                    <Grid item xs={12}>   <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        type="number"
                        label="Cantidad mínima"
                        value={stockMin}
                        onChange={(e) => setStockMin(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>   <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        type="number"
                        label="Cantidad máxima"
                        value={stockMax}
                        onChange={(e) => setStockMax(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>  <TextField
                        variant="outlined"

                        style={{ width: '100%' }}

                        label="Descripción"

                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}

                    /></Grid>
                    <Grid item md={12} xs={12}>
                        <input
                            accept="image/*"
                            style={{ display: "none", marginRight: "5px" }}
                            id="templateFile"
                            multiple
                            type="file"

                            onChange={(e) => {
                                setImage(e.target.files[0])
                            }}
                        />
                        <label htmlFor="templateFile">
                            <Button
                                startIcon={<CloudUploadIcon />}
                                variant="outlined"
                                color="default"
                                component="span"
                            >
                                Subir foto{" "}
                                {image != null
                                    ? "(" + image.name + ")"
                                    : ""}
                            </Button>
                        </label>
                    </Grid>


                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    props.setOpen(false)
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
