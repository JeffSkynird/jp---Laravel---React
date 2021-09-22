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
import { editarSistema, registrarSistema } from '../../../../utils/API/sistemas';
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
    const [image, setImage] = React.useState("")

    const [stock, setStock] = React.useState("")
    const [stockMin, setStockMin] = React.useState("")
    const [stockMax, setStockMax] = React.useState("")

    const [descripcion, setDescripcion] = React.useState("")
    React.useEffect(() => {
        if (initializer.usuario != null) {

        obtenerUnidades(setUnityData,initializer)
        }
  
}, [initializer.usuario])
    React.useEffect(()=>{
        if(props.sistema!=null){
            setNombre(props.sistema.name)
            setJpcode(props.sistema.jp_code)
            setSupplirCode(props.sistema.supplier_code)
            setUnity(props.sistema.unity_id)

            setSerie(props.sistema.serie)

            setStockMax(props.sistema.max_stock)

            setStock(props.sistema.stock)

            setStockMin(props.sistema.min_stock)
            setDescripcion(props.sistema.description)
setImage(props.sistema.image)
        }
    },[props.sistema])
    const guardar=()=>{
        let data={ 'jp_code': jpcode,
        'supplier_code': supplierCode,
        'bar_code': '',
        'serie': serie,
        'name': nombre,
        'description': descripcion,
        'stock': stock,
        'min_stock': stockMin,
        'max_stock': stockMax,
        'unity_id': unity,
        'user_id': 1}
        if(props.sistema==null){
            registrarSistema(data,initializer)
            limpiar()
        }else{
            editarSistema(props.sistema.id,data,initializer)
            limpiar()

        }
        props.setOpen(false)
        props.carga()
    }
    const limpiar=()=>{
        setNombre("")
            setJpcode("")
            setSupplirCode("")

            setSerie("")

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
                   {props.sistema!=null?"Formulario de edición de productos": "Formulario de creación de productos"}
                </DialogContentText>
            
                <Grid container spacing={2}>
                    <Grid item xs={12}>    <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                      
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>   <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                    
                        label="Código JP"
                        value={jpcode}
                        onChange={(e) => setJpcode(e.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">      <IconButton size="small" aria-label="delete">
                            <AutorenewIcon />
                          </IconButton></InputAdornment>,
                          }}
                    />
            
                    </Grid>
                      <Grid item xs={12}>   <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                  
                        label="Código Proveedor"
                        value={supplierCode}
                        onChange={(e) => setSupplirCode(e.target.value)}

                    /></Grid>
                      <Grid item xs={12}>   <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                  
                        label="Serie"
                        value={serie}
                        onChange={(e) => setSerie(e.target.value)}

                    /></Grid>
                     <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                        <Autocomplete
                      
                            style={{ width: '100%'}}
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
                        style={{ width:'100%' }}
                      
                        label="Cantidad"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}

                    /></Grid>
                      <Grid item xs={12}>   <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
                   
                        type="number"
                        label="Cantidad mínima"
                        value={stockMin}
                        onChange={(e) => setStockMin(e.target.value)}

                    /></Grid>
                      <Grid item xs={12}>   <TextField
                        variant="outlined"
                        style={{ width:'100%' }}
               
                        type="number"
                        label="Cantidad máxima"
                        value={stockMax}
                        onChange={(e) => setStockMax(e.target.value)}

                    /></Grid>
                    <Grid item xs={12}>  <TextField
                        variant="outlined"

                        style={{ width:'100%' }}
                                    
                        label="Descripción"

                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}

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
