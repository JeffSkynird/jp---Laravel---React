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
import { Grid } from '@material-ui/core';
import { autorizarOrden, obtenerTodos } from '../../../utils/API/pedidos.js';
import Crear from './componentes/Crear'
import Eliminar from './componentes/Eliminar'

export default function Sistemas(props) {
    const initializer = React.useContext(Initializer);

    const [data, setData] = React.useState([])
    const [kpis, setKpis] = React.useState({autorizados:0,no_autorizados:0})

    const [confirmarMensaje, setConfirmarMensaje] = React.useState(false)

    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [selected, setSelected] = React.useState(null)
    const [selected2, setSelected2] = React.useState(null)
    const [selected3, setSelected3] = React.useState(null)

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setData, initializer)
        }
    }, [initializer.usuario])

    React.useEffect(() => {
        if (data.length!=0) {
            let aut=0
            let noaut=0
            data.map((e)=>{
                if(e.authorized!=null){
                    aut++
                }else{
                    noaut++
                }
            })
            setKpis({autorizados:aut,no_autorizados:noaut})
        }
    }, [data])
    const carga = () => {
        obtenerTodos(setData, initializer)
        setSelected(null)
        setSelected2(null)
        setSelected3(null)
    }
    const autorizar=()=>{
        if(selected3!=null){
            autorizarOrden(selected3, initializer,carga)
            
        }
    }

    return (
        <Grid container spacing={2}>
         <Confirmar open={confirmarMensaje} setOpen={setConfirmarMensaje} accion={autorizar} titulo='¿Desea continuar? Se autorizará la orden.'/>

            <Crear sistema={selected} setSelected={setSelected} setOpen={setOpen} open={open} carga={carga} />
            <Eliminar sistema={selected2} setOpen={setOpen2} open={open2} carga={carga} />
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
                                {kpis.autorizados}
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
                            {kpis.no_autorizados}
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

                        { title: "Número", field: "id" },
                        { title: "Proveedor", field: "supplier" },
                        { title: "Autorizado por", field: "authorized" },
                        { title: "Creado por", field: "created" },
                        { title: "Solicitado por", field: "requested" },
                        { title: "Fecha", field: "created_at", type: "datetime" },




                    ]}
                    data={
                        data
                    }

                    localization={LocalizationTable}

                    actions={[
                        {
                            icon: TableIcons.Edit,
                            tooltip: 'Editar',

                            onClick: (event, rowData) => {
                                setSelected(rowData)
                                setOpen(true)
                            }
                        },

                        {
                            icon: TableIcons.AssignmentIndIcon,
                            tooltip: 'Autorizar',
                       
                            onClick: (event, rowData) => {
                                if(rowData.authorized==null){
                                    setConfirmarMensaje(true)
                                    setSelected3(rowData.id)
                                }else{
                                    alert('El pedido ya ha sido autorizado')
                                }
                                

                            }
                        },

                        {
                            icon: TableIcons.Delete,
                            tooltip: "Borrar",

                            onClick: (event, rowData) => {
                                setSelected2(rowData)
                                setOpen2(true)
                            }
                        },
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
