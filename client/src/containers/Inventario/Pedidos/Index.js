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

import { LocalizationTable, TableIcons, removeAccent } from '../../../utils/table.js'
import MaterialTable from "material-table";
import { Chip, Grid } from '@material-ui/core';
import { autorizar, obtenerTodos } from '../../../utils/API/solicitues';
import Crear from './componentes/Crear'
import Eliminar from './componentes/Eliminar'
import Filtro from './componentes/Filtro'
import { PUBLIC_PATH } from '../../../config/API';
import Confirmar from '../../../components/Confirmar'
import EditarPedido from '../Tareas/componentes/Crear'
import { printVoucher } from '../../../utils/API/reporte';
import CambiarEstado from  './componentes/CambiarEstado'
export default function Sistemas(props) {
    const initializer = React.useContext(Initializer);
    const [imageSelected, setImageSelected] = React.useState(null)
    const [confirmarMensaje, setConfirmarMensaje] = React.useState(false)
    const [confirmarMensaje2, setConfirmarMensaje2] = React.useState(false)

    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [kpis, setKpis] = React.useState({autorizadas:0,pendientes:0})

    const [selected, setSelected] = React.useState(null)
    const [selected2, setSelected2] = React.useState(null)
    const [openFilter, setOpenFilter] = React.useState(false)

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setData, initializer,setKpis)
        }
    }, [initializer.usuario])
    const carga = () => {
        obtenerTodos(setData, initializer,setKpis)
        setSelected(null)
        setSelected2(null)
    }
    const total=()=>{
        let tot=0
        data.map((e)=>{
            tot+=e.evaluaciones
        })
        return tot
    }
    return (
        <Grid container spacing={2}>
            <EditarPedido pedido={true} sistema={selected} setSelected={setSelected} setOpen={setOpen3} open={open3} carga={carga} />

              <Confirmar open={confirmarMensaje} setOpen={setConfirmarMensaje} accion={() => {
                autorizar(selected.id,initializer,carga)
                setConfirmarMensaje(false)
            }} titulo='¿Está seguro de autorizar el pedido?' />

              <CambiarEstado open={confirmarMensaje2} setOpen={setConfirmarMensaje2}  selected={selected} setSelected={setSelected} carga={carga}/>
            <Crear sistema={selected} setSelected={setSelected} setOpen={setOpen} open={open} carga={carga} />
            <Eliminar sistema={selected2} setOpen={setOpen2} open={open2} carga={carga} />
            <Filtro setOpen={setOpenFilter} open={openFilter}  />

            <Grid item xs={12} md={12} style={{display:'flex',justifyContent:'space-between'}}>
                <Typography variant="h5" >
                    Pedidos
                </Typography>
                <Button onClick={() => setOpen(true)} startIcon={<AddIcon />} variant="contained" color="primary">
                    Nuevo
                </Button>
            </Grid>
            <Grid item xs={12} md={12} style={{ display: 'flex', marginTop: 10 }}>

<Card style={{ width: 300, height: 120, marginRight: 20, marginBottom: 5,borderRadius:12,borderColor: 'rgba(0, 0, 0, 0.12)',borderWidth:1,borderStyle: 'solid'}} elevation={0}>
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
<Card style={{ width: 300, height: 120, marginRight: 20, marginBottom: 5,borderRadius:12,borderColor: 'rgba(0, 0, 0, 0.12)',borderWidth:1,borderStyle: 'solid'}} elevation={0}>
    <CardContent>
        <Typography variant="subtitle1" gutterBottom>
            Autorizados
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" gutterBottom>
                {kpis.autorizadas}
            </Typography>
            <Avatar variant="rounded" style={{ backgroundColor: 'rgb(30, 136, 229)', borderRadius: 20 }} >
                <DesktopWindowsIcon />
            </Avatar>
        </div>
    </CardContent>
</Card>
<Card style={{ width: 300, height: 120, marginRight: 20, marginBottom: 5,borderRadius:12,borderColor: 'rgba(0, 0, 0, 0.12)',borderWidth:1,borderStyle: 'solid'}} elevation={0}>
    <CardContent>
        <Typography variant="subtitle1" gutterBottom>
            Sin autorizar
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" gutterBottom>
            {kpis.pendientes}
            </Typography>
            <Avatar variant="rounded" style={{ backgroundColor: 'rgb(216, 67, 21)', borderRadius: 20 }} >
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
                      
                        { title: "Bodega", field: "warehouse_name" },
                        { title: "Tarea", field: "task_name" },
                        { title: "Solicitado por", field: "solicited"  },
                        { title: "Autorizado por", field: "authorized",render:rowData=>rowData.authorized?rowData.authorized:'N/A' },  
                        { title: "Estado entreado", field: "status" ,render:rowData=>rowData.status=='A'?<Chip label="Pendiente" color="default" />:(rowData.status=='C'?<Chip label="Entregado" color="primary" style={{backgroundColor:'#27ae60'}} />:<Chip label="Parc. Entregado" color="secondary" />)},
                        { title: "Registro", field: "created_at", type: "datetime" },
                    ]}
                    data={
                        data
                    }

                    localization={LocalizationTable}

                    actions={[
                     /*    {
                            icon: TableIcons.Edit,
                            tooltip: 'Editar',

                            onClick: (event, rowData) => {
                                setOpen3(true)
                                rowData.id = rowData.task_id
                                setSelected(rowData)
                            }
                        }, */
                        {
                            icon: TableIcons.AssignmentIndIcon,
                            tooltip: 'Autorizar',

                            onClick: (event, rowData) => {
                                if(rowData.authorized_by==null){
                                    setConfirmarMensaje(true)
                                    setSelected(rowData)
                                }else{
                                    initializer.mostrarNotificacion({ type: "warning", message: 'El pedido ya ha sido autorizado' });
                                }
                               
                            }
                        },
                        {
                            icon: TableIcons.Check,
                            tooltip: 'Estado',

                            onClick: (event, rowData) => {
                                if(rowData.authorized_by!=null){
                                    setConfirmarMensaje2(true)
                                    setSelected(rowData)
                                }else{
                                    initializer.mostrarNotificacion({ type: "warning", message: 'El pedido no ha sido autorizado' });
                                }
                               
                            }
                        },
                        {
                            icon: TableIcons.Export,
                            tooltip: 'Imprimir',

                            onClick: (event, rowData) => {
                              printVoucher(rowData.id,'pedido',initializer)
                                    
                          
                            }
                        }

                    ]}

                    options={{
                        pageSize:10,
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
