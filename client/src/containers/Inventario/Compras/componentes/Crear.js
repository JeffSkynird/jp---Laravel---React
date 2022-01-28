import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Initializer from '../../../../store/Initializer'
import Confirmar from '../../../../components/Confirmar'
import Slide from '@material-ui/core/Slide';
import { Checkbox, FormControlLabel, Grid, InputAdornment, Paper } from '@material-ui/core';
import { editar as editarPedido, obtenerDetalleOrden, registrar as registrarPedido } from '../../../../utils/API/pedidos';
import { obtenerTodos } from '../../../../utils/API/proveedores';
import { obtenerPorBodega, obtenerPropios, obtenerTodos as obtenerProductos } from '../../../../utils/API/sistemas';
import { obtenerInventario, obtenerTodos as obtenerTodosBodegas } from '../../../../utils/API/bodegas';
import { obtenerTodos as obtenerItems } from '../../../../utils/API/items';

import { Autocomplete } from '@material-ui/lab';
import MaterialTable from 'material-table';
import { LocalizationTable, TableIcons } from '../../../../utils/table';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Crear(props) {
    const initializer = React.useContext(Initializer);
    const [open, setOpen] = React.useState(false)

    const [cantidad, setCantidad] = React.useState(1)
    const [proveedor, setProveedor] = React.useState("")
    const [proveedorData, setProveedorData] = React.useState([])
    const [autorizar, setAutorizar] = React.useState(false)
    const [productos, setProductos] = React.useState([])
    const [productosData, setProductosData] = React.useState([])
    const [producto, setProducto] = React.useState([])

    const [itemData, setItemData] = React.useState([])
    const [item, setItem] = React.useState("")
    const [itemObject, setItemObject] = React.useState(null)

    const [price, setPrice] = React.useState("")
    const [subTotalV, setSubTotalV] = React.useState(0)
    const [bodegaData, setBodegaData] = React.useState([])
    const [bodega, setBodega] = React.useState('')
    React.useEffect(() => {
        if (initializer.usuario != null && props.open) {
            obtenerTodos(setProveedorData, initializer)
            obtenerTodosBodegas(setBodegaData, initializer)
            obtenerItems(setItemData, initializer)

        }
    }, [initializer.usuario, props.open])
    React.useEffect(() => {
        if (props.sistema != null) {
            setProductos([])
            obtenerDetalleOrden(props.sistema.id, setProductos, initializer)

        }
    }, [props.sistema])
    const guardar = () => {

        if (props.sistema == null) {
            registrarPedido({ total: (subTotalV + ((subTotalV) * 0.12)).toFixed(2), type: 'P', subtotal: subTotalV, products: productos, authorize: autorizar ? 1 : 0 }, initializer)
            limpiar()
        } else {
            editarPedido(props.sistema.id, { total: (subTotalV + ((subTotalV) * 0.12)).toFixed(2), type: 'P', subtotal: subTotalV, products: productos, authorize: autorizar ? 1 : 0 }, initializer)
            limpiar()

        }
        props.setOpen(false)
        props.carga()
    }
    const limpiar = () => {
        setSubTotalV(0)
        setProveedor("")
        setProducto([])
        setProductos([])
        props.setSelected(null)
        props.carga()
    }

    const getName = (id, data) => {
        let object = null
        data.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    const validarData = () => {
        let final = []

        productos.map((e) => {

            if (!final.some(i => i.supplier_id === e.supplier_id)) {
                final.push({
                    supplier_id: e.supplier_id,
                    products: obtenerProductosPorId(e.supplier_id)
                })
            }

        })
        return final
    }
    const obtenerProductosPorId = (id) => {
        return productos.filter((e) => e.supplier_id == id)
    }
    const agregar = () => {
        if (item!= ""&&bodega!="") {
            let t = productos.slice()
            t.push({ serial_code    : "N/A",client_code:"N/A", product: itemObject.name,warehouse_id:bodega, item_id: itemObject.id, stock: cantidad, price: price, subtotal: cantidad * price })
            setProductos(t)
            setPrice('')
            setItem("")
            setItemObject(null)
        } else {
            initializer.mostrarNotificacion({ type: "warning", message: 'No deje campos vacíos' });

        }

    }
    const obtenerProveedor = (id) => {
        let nombre = ""
        proveedorData.map((e) => {
            if (e.id == id) {
                nombre = e.business_name
            }
        })
        return nombre
    }
    const obtenerProducto = (id) => {
        let nombre = ""
        productosData.map((e) => {
            if (e.id == id) {
                nombre = e.name
            }
        })
        return nombre
    }
    const quitar = (row) => {
        let id = row.tableData.id
        let t = productos.slice()


        setProductos(t.filter((e, i) => i != id))
        setProveedor('')
        setProducto([])
    }

 
    return (
        <Dialog
            fullWidth
            fullScreen
            maxWidth='md'
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

            <Confirmar open={open} setOpen={setOpen} accion={guardar} titulo='¿Desea continuar? Se anulará la orden y se creará otra.' />
            <DialogTitle id="alert-dialog-slide-title">{props.sistema != null ? 'Compra ' + props.sistema.id : 'Compra'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.sistema != null ? "Formulario de edición de Compra" : "Formulario de creación de Compra"}
                </DialogContentText>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} style={{ display: 'flex' }}>
                        <Autocomplete
                            size="small"
                            style={{ width: '100%' }}
                            options={bodegaData}
                            value={getName(bodega, bodegaData)}
                            getOptionLabel={(option) => option.name + " - " + (option.supplier != null ? option.supplier : "JP")}
                            onChange={(event, value) => {
                                if (value != null) {

                                    setBodega(value.id)

                                } else {
                                    setBodega('')
                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione una bodega" variant="outlined" fullWidth />
                            )}
                        />

                    </Grid>

                    <Grid item xs={12} md={6} style={{ display: 'flex' }}>
                        <Autocomplete
                            size="small"
                            style={{ width: '100%' }}
                            options={itemData}
                            value={getName(item, itemData)}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                                if (value != null) {

                                    setItem(value.id)
                                    setItemObject(value)
                                    //cargarInventario(value.id)
                                } else {
                                    setItem('')
                                    setItemObject(null)
                                }

                            }} // prints the selected value
                            renderInput={params => (
                                <TextField {...params} label="Seleccione un item" variant="outlined" fullWidth />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12} md={12}>

                        <MaterialTable
                            icons={TableIcons}
                            columns={[
                                {
                                    title: 'Item',
                                    field: 'product',editable:'never'
                                },
                                {
                                    title: 'Código cliente',
                                    field: 'client_code'
                                },
                                {
                                    title: 'Código serial',
                                    field: 'serial_code'
                                },
                                { title: "Cantidad", field: "stock" },
                                { title: "Precio", field: "price", type: "currency" },
                                { title: "Subototal", field: "subtotal", type: "currency", editable: 'never' },

                            ]}
                            data={
                                productos
                            }
                            components={{
                                Container: props => <Paper {...props} elevation={0} />
                            }}
                            localization={LocalizationTable}
                            title="Listado"
                            actions={[{
                                icon: TableIcons.Add,
                                tooltip: 'Agregar',
                                isFreeAction: true,
                                onClick: (event, rowData) => {
                                    agregar()
                                }
                            },
                            {
                                icon: TableIcons.Delete,
                                tooltip: 'Eliminar',

                                onClick: (event, rowData) => {
                                    quitar(rowData)
                                }
                            }]}

                            cellEditable={{
                                onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                                    return new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            if (newValue !== "") {
                                                if (newValue >= 0) {
                                                    const dataUpdate = [...productos];

                                                    const index = rowData.tableData.id;
                                                    dataUpdate[index][columnDef.field] = newValue;
                                                    //RECALCULAR SUBTOTAL
                                                    let nuevoSub = (dataUpdate[index].stock * dataUpdate[index].price).toFixed(2)
                                                    //CALCULAR EL SUBTOTAL
                                                    let tSub = parseFloat((subTotalV - dataUpdate[index].subtotal)) + parseFloat(nuevoSub);

                                                    dataUpdate[index].subtotal = nuevoSub

                                                    setSubTotalV(tSub)
                                                    setProductos([...dataUpdate]);

                                                }
                                            }
                                            resolve();
                                        }, 1000)
                                    });
                                }
                            }}
                            options={{
                                pageSize: 10,

                                actionsColumnIndex: -1,
                                width: '100%',
                                maxBodyHeight: 250,
                                padding: 'dense',
                                headerStyle: {
                                    textAlign: 'left'
                                },
                                cellStyle: {
                                    textAlign: 'left'
                                },
                                searchFieldStyle: {

                                    padding: 5
                                }
                            }}

                        />
                    </Grid>

                    <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <TextField
                            variant="outlined"

                            size="small"
                            label="SubTotal"
                            value={subTotalV.toFixed(2)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />

                    </Grid>

                    <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <TextField
                            variant="outlined"

                            size="small"
                            label="Iva"
                            value={((subTotalV) * 0.12).toFixed(2)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />

                    </Grid>
                    <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <TextField
                            variant="outlined"

                            size="small"
                            label="Total"
                            value={(subTotalV + ((subTotalV) * 0.12)).toFixed(2)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />

                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    props.setOpen(false)
                    setSubTotalV(0)
                }} color="default">
                    Cancelar
                </Button>
                <Button color="primary" onClick={() => {
                    if (props.sistema != null) {
                        setOpen(true)
                    } else {
                        guardar()
                    }

                }}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
