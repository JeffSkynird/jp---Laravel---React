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
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Slide from '@material-ui/core/Slide';
import { Avatar, Grid, IconButton, InputAdornment } from '@material-ui/core';
import { editarSistema, registrarSistema, subirFoto } from '../../../../utils/API/sistemas';
import { obtenerTodos as obtenerCategorias } from '../../../../utils/API/categories';
import { obtenerInventario, obtenerTodos as obtenerTodosBodegas } from '../../../../utils/API/bodegas';

import { obtenerTodos as obtenerUnidades } from '../../../../utils/API/unidades';
import { Autocomplete } from '@material-ui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);

    const [nombre, setNombre] = React.useState("")
    const [jpcode, setJpcode] = React.useState("")
    const [supplierCode, setSupplirCode] = React.useState("")
    const [serie, setSerie] = React.useState("")
    const [unity, setUnity] = React.useState("")
    const [unityData, setUnityData] = React.useState([])

    const [category, setCategory] = React.useState("")
    const [categoryData, setCategoryData] = React.useState([])
    const [image, setImage] = React.useState(null)

    const [barcode, setBarcode] = React.useState("")
    const [stock, setStock] = React.useState("")
    const [stockMin, setStockMin] = React.useState("")
    const [stockMax, setStockMax] = React.useState("")

    const [descripcion, setDescripcion] = React.useState("")
    const [bodega, setBodega] = React.useState("")
    const [bodegaData, setBodegaData] = React.useState([])

    React.useEffect(() => {
        if (initializer.usuario != null) {

            obtenerCategorias(setCategoryData, initializer)
            obtenerTodosBodegas(setBodegaData, initializer)

            obtenerUnidades(setUnityData, initializer)
        }

    }, [initializer.usuario])
    React.useEffect(() => {
        if (props.sistema != null) {
            setNombre(props.sistema.name)
            setJpcode(props.sistema.jp_code)
            setSupplirCode(props.sistema.supplier_code)
            setUnity(props.sistema.unity_id)
            setCategory(props.sistema.category_id)

            setSerie(props.sistema.serie)
            setBarcode(props.sistema.bar_code)
            setStockMax(props.sistema.max_stock)

            setStock(props.sistema.stock)

            setStockMin(props.sistema.min_stock)
            setDescripcion(props.sistema.description)
            setBodega(props.sistema.warehouse_id)
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
            'stock': 0,
            'min_stock': stockMin,
            'max_stock': stockMax,
            'unity_id': unity,
            'url': image,
            'bar_code': barcode,
            'warehouse_id': bodega,
            'user_id': 1
        }
        if (props.sistema == null) {
            registrarSistema(data, initializer)
            limpiar()
            props.carga()
        } else {
            editarSistema(props.sistema.id, data, initializer)
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
        setJpcode("")
        setSupplirCode("")

        setSerie("")
        setImage(null)
        setBodega("")
        setCategory('')
        setDescripcion('')
        setUnity('')

        setStockMax("")

        setStock("")

        setStockMin("")
        props.setSelected(null)
        props.carga()
    }
    const getName = (id) => {
        let object = null
        unityData.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    const getNameAll = (id, data) => {
        let object = null
        data.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
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
            <DialogTitle id="alert-dialog-slide-title">Productos</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de productos" : "Formulario de creación de productos"}
                </DialogContentText>

                <Grid container spacing={2}>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width: '100%' }}

                        label="Código de barras"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}

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
                    <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                        <Autocomplete

                            style={{ width: '100%' }}
                            options={unityData}
                            value={getName(unity)}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                                if (value != null) {

                                    setUnity(value.id)
                                } else {

                                    setUnity('')

                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione una medida" variant="outlined" fullWidth />
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
                    <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                        <Autocomplete

                            style={{ width: '100%' }}
                            size="small"
                            options={bodegaData}
                            getOptionDisabled={(option) => option.id === bodega}
                            value={getNameAll(bodega, bodegaData)}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                                if (value != null) {
                                    if (bodega != value.id) {
                                        setBodega(value.id)

                                    }
                                } else {

                                    setBodega('')

                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione la bodega" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>
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
