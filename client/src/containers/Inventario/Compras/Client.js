import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Avatar from '@material-ui/core/Avatar';
import Initializer from '../../../store/Initializer'
import Confirmar from '../../../components/Confirmar'

import { LocalizationTable, TableIcons, removeAccent } from '../../../utils/table.js'
import MaterialTable from "material-table";
import { ButtonGroup, ClickAwayListener, Grid, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import { autorizarOrden, obtenerStatusOrden, obtenerTodos } from '../../../utils/API/pedidos.js';
import Crear from './componentes/Crear'
import EstadoOrden from './componentes/EstadoOrden'
import Asignar from './componentes/Asignar'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Eliminar from './componentes/Eliminar'
import CrearClientes from './componentes/CrearClientes'
import { printVoucher } from '../../../utils/API/reporte';

export default function Sistemas(props) {
    const initializer = React.useContext(Initializer);

    const [data, setData] = React.useState([])
    const [kpis, setKpis] = React.useState({ autorizados: 0, no_autorizados: 0 })

    const [confirmarMensaje, setConfirmarMensaje] = React.useState(false)

    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [open4, setOpen4] = React.useState(false)
    const [open5, setOpen5] = React.useState(false)

    const [selected, setSelected] = React.useState(null)
    const [selected2, setSelected2] = React.useState(null)
    const [selected3, setSelected3] = React.useState(null)
    const [selected4, setSelected4] = React.useState(null)
    const [selected5, setSelected5] = React.useState(null)
    const [estado, setEstado] = React.useState([])
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [openMenu, setOpenMenu] = React.useState(false)

    const handleClick = () => {
       if(selectedIndex==0){
        setOpen(true)
       }else{
           setOpen5(true)
       }
    };

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos("C",setData, initializer)
            obtenerStatusOrden(setEstado, initializer)

        }
    }, [initializer.usuario])

    React.useEffect(() => {
        if (data.length != 0) {
            let aut = 0
            let noaut = 0
            data.map((e) => {
                if (e.authorized != null) {
                    aut++
                } else {
                    noaut++
                }
            })
            setKpis({ autorizados: aut, no_autorizados: noaut })
        }
    }, [data])

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpenMenu(false);
    };

    const handleToggle = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const carga = () => {
        obtenerTodos("C",setData, initializer)
        setSelected(null)
        setSelected2(null)
        setSelected3(null)
        setSelected4(null)
        setSelected5(null)

    }
    const autorizar = () => {
        if (selected3 != null) {
            autorizarOrden(selected3, initializer, carga)

        }
    }

    return (
        <Grid container spacing={2}>
            <Confirmar open={confirmarMensaje} setOpen={setConfirmarMensaje} accion={autorizar} titulo='¿Desea continuar? Se autorizará la orden.' />
            <EstadoOrden sistema={selected4} setSelected={setSelected4} setOpen={setOpen3} open={open3} carga={carga} />
            <Asignar sistema={selected5} setSelected={setSelected5} setOpen={setOpen4} open={open4} carga={carga} />
            <CrearClientes sistema={selected} setSelected={setSelected} setOpen={setOpen5} open={open5} carga={carga} />

            <Crear sistema={selected} setSelected={setSelected} setOpen={setOpen} open={open} carga={carga} />
            <Eliminar sistema={selected2} setOpen={setOpen2} open={open2} carga={carga} />
            <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" >
                    Ingreso/Clientes
                </Typography>

                <Button
                        color="primary"
                        startIcon={<AddIcon />}
                        variant="contained"
                        onClick={()=>setOpen5(true)}
                    >
                        NUEVO
                    </Button>

            </Grid>

            <Grid item xs={12} md={12} style={{ display: 'flex', marginTop: 10 }}>

                <Card style={{ width: 300, height: 120, marginRight: 20, marginBottom: 5, borderRadius: 12, borderColor: 'rgba(0, 0, 0, 0.12)', borderWidth: 1, borderStyle: 'solid' }} elevation={0}>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                            Totales
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h4" gutterBottom>
                                {data.length}
                            </Typography>
                            <Avatar variant="rounded" style={{ backgroundColor: 'rgb(94, 53, 177)', borderRadius: 20 }} >
                                <DesktopWindowsIcon />
                            </Avatar>
                        </div>
                    </CardContent>
                </Card>

            </Grid>

            <Grid item xs={12}>
                <MaterialTable
                    icons={TableIcons}
                    columns={[

                        { title: "Número", field: "id" },

                        { title: "Fecha", field: "created_at", type: "datetime" },



                    ]}
                    data={
                        data
                    }

                    localization={LocalizationTable}

                    actions={[
                          {
                              icon: TableIcons.Export,
                              tooltip: 'Imprimir',
  
                              onClick: (event, rowData) => {
                                printVoucher(rowData.id,'compra',initializer)
                                      
                                 
                            
                              }
                          },
   /*
                          {
                              icon: TableIcons.AssignmentIndIcon,
                              tooltip: 'Autorizar',
                         
                              onClick: (event, rowData) => {
                                  if(rowData.authorized==null){
                                      setConfirmarMensaje(true)
                                      setSelected3(rowData.id)
                                  }else{
                                    initializer.mostrarNotificacion({ type: "warning", message: 'El pedido ya ha sido autorizado' });
                                    
                                  }
                                  
  
                              }
                          },
                          {
                              icon: TableIcons.Check,
                              tooltip: 'Cambiar estado',
                         
                              onClick: (event, rowData) => {
                                  if(rowData.status!='E'){
                                      setSelected4(rowData)
                                      setOpen3(true)
                                  }else{
                                      initializer.mostrarNotificacion({ type: "warning", message: 'El pedido ya ha sido entregado' });     
                                  }
                                  
  
                              }
                          },
                          {
                              icon: TableIcons.ImportExportIcon,
                              tooltip: 'Almacenar productos',
                         
                              onClick: (event, rowData) => {
                               if(rowData.status=='E'){
                                  setSelected5(rowData)
                                  setOpen4(true)
                               }else{
                         
                                   initializer.mostrarNotificacion({ type: "warning", message: 'El pedido primero debe ser entregado' });     
  
                               }
                                    
                                
                                  
  
                              }
                          }, */
                        /*   {
                              icon: TableIcons.Delete,
                              tooltip: "Borrar",
  
                              onClick: (event, rowData) => {
                                  if(rowData.status!="E"){
                                      setSelected2(rowData)
                                      setOpen2(true)
                                  }else{
                                      initializer.mostrarNotificacion({ type: "warning", message: 'No se puede anular un pedido entregado' });     
   
                                  }
                              
                             
                          }, } */
                    ]}

                    options={{
                        pageSize: 10,
                        showTitle: false,
                        actionsColumnIndex: -1,

                        maxBodyHeight: 350,
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
        </Grid>
    )
}
