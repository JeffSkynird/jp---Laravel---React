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
import Initializer from '../../store/Initializer'
import Tabs from '@material-ui/core/Tabs';

import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { LocalizationTable, TableIcons, removeAccent } from '../../utils/table.js'
import MaterialTable from "material-table";
import { Grid, IconButton } from '@material-ui/core';
import { obtenerSistemaEvaluaciones, obtenerTodos } from '../../utils/API/sistemas.js';
import Crear from './components/Crear'
import Eliminar from './components/Eliminar'
import { obtenerTodos as obtenerMetricasSistemas } from '../../utils/API/clientes';
import Bar from './components/Bar';
import BarVertical from './components/BarVertical';
import PieChart from './components/PieChart';

import { utcDate } from '../../utils/Date'
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Box from '@material-ui/core/Box';
import Tab2 from './components/Tab2';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Radio from './components/Radio';
import noValue from '../../assets/noValue.svg'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import FiltroPanel from './components/FiltroPanel';
import { ObtenerGrafico1 } from '../../utils/API/reporte';
 import { Alert } from '@material-ui/lab';
import { obtenerIngresosEgresos, obtenerKpis, obtenerPedidosStatus, obtenerProductosBodegas, obtenerStatusPorSupervisor, obtenerTareasStatus, totalComprasUltimosMeses } from '../../utils/API/dashboard';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import Lineal from './components/Lineal'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        backgroundColor: "#5e35b1",
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: '#4527a0',
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: '#4527a0',
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    card2: {
        backgroundColor: "#5e35b1",
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: '#1565c0',
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: '#1565c0',
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    card3: {
        backgroundColor: "#26C367",
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: '#1BA554',
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: '#2CBE68',
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    card4: {
        backgroundColor: "#E7564A",
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: '#E05145',
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: '#E05145',
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.,
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function Sistemas(props) {
    const initializer = React.useContext(Initializer);
    const classes = useStyles();

    const [data, setData] = React.useState(null)
    const [data0, setData0] = React.useState([])
    const [desde, setDesde] = React.useState(null)
    const [hasta, setHasta] = React.useState(null)
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [selected, setSelected] = React.useState(null)
    const [selected2, setSelected2] = React.useState(null)
    const [values, setValues] = React.useState([])
    const [labels, setLabels] = React.useState([])
    const [values2, setValues2] = React.useState([])
    const [labels2, setLabels2] = React.useState([])
    const [value, setValue] = React.useState(0);
    const [sistemas, setSistemas] = React.useState([])
    const [sistema, setSistema] = React.useState('')
    const [data1, setData1] = React.useState({values:[],labels:[]})
    const [data2, setData2] = React.useState({completas:0,incompletas:0})
    const [data3, setData3] = React.useState({autorizados:0,noAutorizados:0})
    const [data4, setData4] = React.useState({ingresos:0,egresos:0})
    const [data5, setData5] = React.useState({mes:[],total:[]})

    const [cajaAbierta, setCajaAbierta] = React.useState(null)
    const [comprasVentas, setComprasVentas] = React.useState({ventas:[],compras:[]})
    const [cajaVenta, setCajaVenta] = React.useState({factura:[],caja:[]})

    React.useEffect(() => {
        if (initializer.usuario != null) {
           // obtenerKpisPanel({desde:utcDate(getFirst()),hasta:utcDate(getLast())},setData, initializer)
           obtenerProductosBodegas({desde:utcDate(getFirst()),hasta:utcDate(getLast())},setData1, initializer)
           obtenerTareasStatus({desde:utcDate(getFirst()),hasta:utcDate(getLast())},setData2, initializer)
           obtenerKpis({desde:utcDate(getFirst()),hasta:utcDate(getLast())},setData, initializer)
           obtenerPedidosStatus({desde:utcDate(getFirst()),hasta:utcDate(getLast())},setData3, initializer)
           obtenerIngresosEgresos({desde:utcDate(getFirst()),hasta:utcDate(getLast())},setData4, initializer)

           totalComprasUltimosMeses({desde:utcDate(getFirst()),hasta:utcDate(getLast())},setData5, initializer)
            ObtenerGrafico1(setData1,initializer)
            setDesde(getFirst())
            setHasta(getLast())
        }
    }, [initializer.usuario])
    const getFirstLast = () => {
        return "(" + utcDate(desde) + " hasta " + utcDate(hasta) + ")"
      }
    const getFirst = () => {
        let date = new Date();
        let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);

        return primerDia
    }
    const getLast = () => {
        let date = new Date();

        let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return ultimoDia
    }
    const carga = () => {
        setSelected(null)
        setSelected2(null)
    }
  
    const total = () => {
        let tot = 0
        data0.map((e) => {
            tot += e.evaluaciones
        })
        return tot
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getName = (id) => {
        let object = null
        sistemas.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    const filtrarFecha=()=>{
        obtenerProductosBodegas({desde:utcDate(desde),hasta:utcDate(hasta)},setData1, initializer)
        obtenerTareasStatus({desde:utcDate(desde),hasta:utcDate(hasta)},setData2, initializer)
        obtenerKpis({desde:utcDate(desde),hasta:utcDate(hasta)},setData, initializer)
        obtenerPedidosStatus({desde:utcDate(desde),hasta:utcDate(hasta)},setData3, initializer)
        obtenerIngresosEgresos({desde:utcDate(desde),hasta:utcDate(hasta)},setData4, initializer)
        totalComprasUltimosMeses({desde:utcDate(desde),hasta:utcDate(hasta)},setData5, initializer)

    }
    return (
        <Grid container spacing={2}>
            <Crear sistema={selected} setSelected={setSelected} setOpen={setOpen} open={open} carga={carga} />
            <Eliminar sistema={selected2} setOpen={setOpen2} open={open2} carga={carga} />
            <Grid item xs={12} md={12} style={{display:'flex',justifyContent:'space-between'}}>
                <Typography variant="h5" >
                    Dashboard 
                </Typography> 
                
                <FiltroPanel desde={desde} hasta={hasta} setDesde={setDesde} setHasta={setHasta} filtrarFecha={filtrarFecha}/>
            </Grid>
            
            <Grid item xs={12} md={12} >
                <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                        <Alert severity="info">
                         <Typography  color="initial"> Correspondiente a {getFirstLast()}</Typography> 
                          </Alert>
                    </Grid>
                 
                    <Grid item xs={12} md={3}>
                        <Card class={classes.card} style={{ width: '100%', height: 157, marginRight: 20, marginBottom: 5, backgroundColor: '#5e35b1', borderRadius: 12 }}>
                            <CardContent>
                                <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#5e35b1', borderRadius: 5, marginBottom: 15 }} >
                                    <IconButton aria-label="show 4 new mails" color="inherit" >

                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>

                                </Avatar>
                                <Avatar variant="rounded" style={{ marginTop: 5, backgroundColor: '#4527a0', borderRadius: 5, marginBottom: 15 }} >

                                    <AssignmentIcon />

                                </Avatar>


                                <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                                    {data != null ? data.tareas : 0}
                                </Typography>
                                <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                                    Número Tareas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card class={classes.card2} style={{ width: '100%', height: 157, marginRight: 20, marginBottom: 5, backgroundColor: '#1e88e5', borderRadius: 12 }}>
                            <CardContent>
                                <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#1e88e5', borderRadius: 5, marginBottom: 15 }} >
                                    <IconButton aria-label="show 4 new mails" color="inherit" >

                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>

                                </Avatar>
                                <Avatar variant="rounded" style={{ marginTop: 5, backgroundColor: '#1565c0', borderRadius: 5, marginBottom: 15 }} >
                                    <ShoppingCartIcon />
                                </Avatar>


                                <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                                    ${data != null ? data.monto.toFixed(2) : 0}
                                </Typography>
                                <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                                    Total compras
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card class={classes.card3} style={{ width: '100%', height: 157, marginRight: 20, marginBottom: 5, backgroundColor: '#26D06C', borderRadius: 12 }}>
                            <CardContent>
                                <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#26D06C', borderRadius: 5, marginBottom: 15 }} >
                                    <IconButton aria-label="show 4 new mails" color="inherit" >

                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>

                                </Avatar>
                                <Avatar variant="rounded" style={{ marginTop: 5, backgroundColor: '#1BA554', borderRadius: 5, marginBottom: 15 }} >
                                    <PostAddIcon />
                                </Avatar>


                                <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                                    {data != null ? data.ajustes : 0}
                                </Typography>
                                <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                                    Número productos
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card class={classes.card4} style={{ width: '100%', height: 157, marginRight: 20, marginBottom: 5, backgroundColor: '#F55F53', borderRadius: 12 }}>
                            <CardContent>
                                <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#F55F53', borderRadius: 5, marginBottom: 15 }} >
                                    <IconButton aria-label="show 4 new mails" color="inherit" >

                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>

                                </Avatar>
                                <Avatar variant="rounded" style={{ marginTop: 5, backgroundColor: '#C04B41', borderRadius: 5, marginBottom: 15 }} >
                                    <TransferWithinAStationIcon />
                                </Avatar>


                                <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                                    {data != null ? data.transfer : 0}
                                </Typography>
                                <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                                    Número transferencias
                                </Typography>
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>
            </Grid>
                <Grid item md={12} xs={12}>
                <div style={{ marginTop: 15 }} >
                    {
                        data1.values.length != 0 && data1.labels.length != 0? (
                            <Bar values={data1.values} labels={data1.labels} text="Productos por bodega"/>
                        )
                            :
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={noValue} width={150} height={150} alt="" srcset="" />
                                <p>No hay registros</p>
                            </div>
                    }
                </div>


            </Grid>
            
            <Grid item md={6} xs={12}>
                <div style={{ marginTop: 15 }} >
                
                {
                        data2.completas != 0 ||data2.incompletas != 0 ? (
                            <PieChart type="donut" completas={data2.completas} incompletas={data2.incompletas} labels={['Completas','Incompletas']} text="Estado de tareas"/>
                            )
                            :
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={noValue} width={150} height={150} alt="" srcset="" />
                                <p>No hay registros</p>
                            </div>
                    }
                </div>


            </Grid>
            <Grid item md={6} xs={12}>
                <div style={{ marginTop: 15 }} >
                
                {
                        data3.autorizados != 0 || data3.noAutorizados != 0 ? (
                            <PieChart type="pie" completas={data3.autorizados} incompletas={data3.noAutorizados} labels={['Autorizados','No autorizados']} text="Estado de pedidos"/>
                            )
                            :
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={noValue} width={150} height={150} alt="" srcset="" />
                                <p>No hay registros</p>
                            </div>
                    }
                </div>


            </Grid>
            <Grid item md={6} xs={12}>
                <div style={{ marginTop: 15 }} >

                {
                        data4.ingresos != 0 ||data4.egresos != 0 ? (
                            <BarVertical ingresos={data4.ingresos} egresos={data4.egresos} text="Ingresos/Egresos"/>
                            )
                            :
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={noValue} width={150} height={150} alt="" srcset="" />
                                <p>No hay registros</p>
                            </div>
                    }
                </div>


            </Grid>
            <Grid item md={6} xs={12}>
                <div style={{ marginTop: 15 }} >

                {
                        data5.mes.length!= 0 ||data5.total.length != 0 ? (
                            <Lineal  mes={data5.mes} total={data5.total} text="Compras de los últimos 6 meses"/>
                            )
                            :
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={noValue} width={150} height={150} alt="" srcset="" />
                                <p>No hay registros</p>
                            </div>
                    }
                </div>


            </Grid>
              {/* 
            <Grid item md={6} xs={12} style={{ display: 'flex', justifyContent: 'center' }}>

                {
                    labels2.length != 0 && values2.length != 0 ? (
                        <Radio values={values2} labels={labels2} />
                    )
                        :
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                            <img src={noValue} width={150} height={150} alt="" srcset="" />
                            <p>No hay registros</p>
                        </div>
                }


            </Grid>
            <Grid item md={6} xs={12}>
                <MaterialTable
                    icons={TableIcons}
                    columns={[

                        { title: "Sistema", field: "name" },

                        {
                            title: "Puntaje", field: "avg", render: rowData => <span >{rowData.avg}%</span>
                        },




                    ]}
                    data={
                        data
                    }
                    localization={LocalizationTable}
                    detailPanel={rowData => {
                        return (
                            <div style={{ padding: 10 }}>

                                <MaterialTable
                                    icons={TableIcons}
                                    columns={[

                                        { title: "Métrica", field: "metric", headerStyle: { fontWeight: 'bold' } },

                                        { title: "Puntaje", field: "avg", render: rowData => <span >{parseFloat(rowData.avg).toFixed(2)}%</span> },




                                    ]}
                                    data={
                                        rowData.detail
                                    }
                                    localization={LocalizationTable}

                                    options={{
                                        showTitle: false,
                                        actionsColumnIndex: -1,
                                        search: false,
                                        header: false,
                                        toolbar: false,
                                        padding: 'dense',
                                        headerStyle: {
                                            textAlign: 'left'
                                        },
                                        pageSizeOptions: false,
                                        cellStyle: {
                                            textAlign: 'left'
                                        },
                                        paging: false,
                                        searchFieldStyle: {

                                            padding: 5
                                        }
                                    }}

                                />
                            </div>
                        )
                    }}
                    title="Puntaje por sistemas"
                    options={{

                        actionsColumnIndex: -1,
                        search: false,
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
 */}
        </Grid>
    )
}
