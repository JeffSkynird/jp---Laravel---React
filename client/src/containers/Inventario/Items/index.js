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
import { Grid } from '@material-ui/core';
import { obtenerTodos } from '../../../utils/API/items.js';
import Crear from './componentes/Crear'
import Eliminar from './componentes/Eliminar'
import Filtro from './componentes/Filtro'
import { PUBLIC_PATH } from '../../../config/API';
import Confirmar from '../../../components/Confirmar'
export default function Sistemas(props) {
    const initializer = React.useContext(Initializer);
    const [confirmarMensaje, setConfirmarMensaje] = React.useState(false)

    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [selected, setSelected] = React.useState(null)
    const [selected2, setSelected2] = React.useState(null)
    const [imageSelected, setImageSelected] = React.useState(null)

    const [openFilter, setOpenFilter] = React.useState(false)

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setData, initializer)
        }
    }, [initializer.usuario])
    const carga = () => {
        obtenerTodos(setData, initializer)
        setSelected(null)
        setSelected2(null)
    }
    const total = () => {
        let tot = 0
        data.map((e) => {
            tot += e.evaluaciones
        })
        return tot
    }
    const colores=(stock,minimo,maximo)=>{
        if(stock==minimo){
            return '#ffa500'
        }else if(stock<minimo){
            return '#ff0000'
        }else if(stock>minimo && stock<maximo){
            return 'green'
        }else if(stock==maximo){
            return '#ffa500'
        }else if(stock>maximo){
            return '#ff0000'
        }else{
            return '#000000'
        }
    }
    return (
        <Grid container spacing={2}>

            <Confirmar ancho={true} body={<img
                style={{ height: '100%', width: '100%' }}
                src={PUBLIC_PATH+"storage/" + imageSelected}
            />} open={confirmarMensaje} setOpen={setConfirmarMensaje} accion={() => {
                setImageSelected(null)
                setConfirmarMensaje(false)
            }} titulo='Foto del producto' />
    {
                    open&&(
                        <Crear sistema={selected} setSelected={setSelected} setOpen={setOpen} open={open} carga={carga} />

                    )
                }
            <Eliminar sistema={selected2} setOpen={setOpen2} open={open2} carga={carga} />
            <Filtro setOpen={setOpenFilter} open={openFilter} />

            <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" >
                    Items
                </Typography>
                <Button onClick={() => setOpen(true)} startIcon={<AddIcon />} variant="contained" color="primary">
                    Nuevo
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
                        {
                            title: 'Imágen',
                            field: 'avatar',
                            render: rowData => (
                                <img
                                    onClick={() =>{
                                        setConfirmarMensaje(true)
                                        setImageSelected(rowData.image)
                                    }}
                                    style={{ height: 36, width: 36, borderRadius: 36 ,cursor: 'pointer' }}
                                    src={PUBLIC_PATH+"storage/" + rowData.image}
                                />
                            ),
                        },
                        { title: "Nombre", field: "name" },
                        { title: "Categoria", field: "category" },
                        { title: "Registro", field: "created_at", type: "datetime" },
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
                            icon: TableIcons.Delete,
                            tooltip: "Borrar",

                            onClick: (event, rowData) => {
                                setSelected2(rowData)
                                setOpen2(true)
                            }
                        }

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
