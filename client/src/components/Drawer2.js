import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import PersonIcon from '@material-ui/icons/Person';
import Hidden from '@material-ui/core/Hidden';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AccountCircle from '@material-ui/icons/PermIdentity';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { PUBLIC_PATH } from '../config/API'
import ListIcon from '@material-ui/icons/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import Initializer from '../store/Initializer'
import { desencriptarJson } from '../utils/security'
import AllInboxIcon from '@material-ui/icons/AllInbox';
import StoreIcon from '@material-ui/icons/Store';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import TransformIcon from '@material-ui/icons/Transform';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import TuneIcon from '@material-ui/icons/Tune';
import { cerrarSesion, obtenerUsuario } from '../utils/API/auth';
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import { useLocation, Switch } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SpeedDial from './SpeedDial';
import CallMissedIcon from '@material-ui/icons/CallMissed';
import logo from '../assets/logo.png'
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Badge, Box, Button, Grid } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import Notifications from './Notification';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
    search: {
        height: 45,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.12)',
        position: 'relative',
        borderRadius: 10,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            borderColor: 'rgb(30, 136, 229)',
            borderWidth: 1,
            borderStyle: 'solid'
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%', color: 'gray',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit', height: '100%'
    },
    root: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
        overflow: 'hidden'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    avatar: {
        margin: theme.spacing(2),

        width: theme.spacing(10),
        height: theme.spacing(10),

    },
    drawer: {
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        overflowX: 'hidden',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
    grow: {
        flexGrow: 1,
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    let history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const theme = useTheme();
    const [openCollapse, setOpenCollapse] = React.useState(false);
    const [openCollapse2, setOpenCollapse2] = React.useState(false);
    const [openCollapse3, setOpenCollapse3] = React.useState(false);


    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [cambio, setCambio] = React.useState(null)
    const [info, setInfo] = React.useState(null)
    const [file, setFile] = React.useState(null)

    const [names, setNames] = React.useState('')
    const initializer = useContext(Initializer);
    const [notification, setNotification] = React.useState(false)

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerUsuario(setInfo, setNotification, initializer)
        }
    }, [initializer.usuario])
    React.useEffect(() => {
        if (info != null) {
            setNames(info.names + " " + info.last_names)
        }
    }, [info])
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    function handleOpenSettings() {
        setOpenCollapse(!openCollapse);
    }
    const cerrar = () => {
        cerrarSesion(initializer)
    }
    const comprobador = (val) => {

        if (location.pathname == val) {
            return { backgroundColor: '#EDE7F6', borderRadius: 7, color: '#6645B3', marginRight: 5, marginLeft: 5 }
        } else {
            if (location.pathname == "/evaluacion" && val == "/evaluaciones") {
                return { backgroundColor: '#EDE7F6', borderRadius: 7, color: '#6645B3', marginRight: 5, marginLeft: 5 }

            } else {
                return { borderRadius: 7, marginRight: 5, marginLeft: 5 }

            }
        }


    }

    const drawer = (
        <div >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Avatar size="" className={classes.avatar} src={logo}>

                </Avatar>
                <Typography variant="subtitle1" style={{ fontSize: 15, color: '#929396' }}>
                    Administrador
                </Typography>
                <div style={{
                    width: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden', textAlign: 'center',
                    textOverflow: 'ellipsis'
                }}>
                    <Typography variant="subtitle1" style={{ fontSize: 15, color: '#929396' }}>
                        {names}
                    </Typography>

                </div>


            </div>

            <Divider />
            <div style={{ justifyContent: 'space-between', flexDirection: 'column', display: 'flex'}}>
                <List style={{ padding: 10 }} >

                    <ListItem button onClick={() => props.history.push('panel')} style={comprobador('/panel')}>
                        <ListItemIcon style={{ color: 'inherit' }}><DashboardIcon /> </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>


                    <ListItem button onClick={handleOpenSettings} style={comprobador('/inventario')}>
                        <ListItemIcon style={{ color: 'inherit' }}><TuneIcon style={{ color: 'inherit' }} /> </ListItemIcon>
                        <ListItemText primary={'Gestión'} />
                        {openCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            {/*     <ListItem button className={classes.nested} onClick={()=>props.history.push('/inventario/inventario')} >
                                <ListItemIcon>
                                    <PostAddIcon />
                                </ListItemIcon>
                                <ListItemText  primary="Inventario" />
                            </ListItem> */}


                            <ListItem button className={classes.nested} onClick={() => props.history.push('/inventario/bodegas')} >
                                <ListItemIcon>
                                    {" "}
                                    <StoreIcon />{" "}
                                </ListItemIcon>
                                <ListItemText primary="Bodegas" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => props.history.push('/inventario/items')} >
                                <ListItemIcon>
                                    <PostAddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Items" />
                            </ListItem>

                            <ListItem button className={classes.nested} onClick={() => props.history.push('/inventario/proveedores')}>
                                <ListItemIcon>
                                    <EmojiTransportationIcon />
                                </ListItemIcon>
                                <ListItemText primary="Clientes" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => props.history.push('/personal')} style={comprobador('/personal')}>
                                <ListItemIcon ><PeopleOutlineIcon style={{ color: 'inherit' }} /> </ListItemIcon>
                                <ListItemText primary={'Personal'} />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => props.history.push('/dependencias')} style={comprobador('/dependencias')}>
                                <ListItemIcon ><SettingsApplicationsIcon style={{ color: 'inherit' }} /> </ListItemIcon>
                                <ListItemText primary={'Dependencias'} />
                            </ListItem>

                            

                        </List>
                    </Collapse>
                    <ListItem button onClick={() => setOpenCollapse2(!openCollapse2)} style={comprobador('/inventario')}>
                        <ListItemIcon style={{ color: 'inherit' }}><ImportExportIcon style={{ color: 'inherit' }} /> </ListItemIcon>
                        <ListItemText primary={'Movimientos'} />
                        {openCollapse2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={openCollapse2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            <ListItem button className={classes.nested} onClick={() => props.history.push('/inventario/compras')} >
                                <ListItemIcon>
                                    <PostAddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inventario" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => props.history.push('/inventario/compras')} >
                                <ListItemIcon>
                                    <CallMissedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Ingresos" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => props.history.push('/movimientos/egresos')} >
                                <ListItemIcon>
                                    <CallMissedOutgoingIcon />
                                </ListItemIcon>
                                <ListItemText primary="Egresos" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => props.history.push('/inventario/transferencias')} >
                                <ListItemIcon>
                                    <TransferWithinAStationIcon />
                                </ListItemIcon>
                                <ListItemText primary="Transferencias" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => props.history.push('/ajustes')}>
                                <ListItemIcon>
                                    <TransformIcon />
                                </ListItemIcon>
                                <ListItemText primary="Ajuste" />
                            </ListItem>
                        </List>
                    </Collapse>
          
          
                    <ListItem button style={comprobador('/inventario/tareas')}   onClick={() => props.history.push('/inventario/tareas')}>
                        <ListItemIcon style={{ color: 'inherit' }}><AssignmentIcon /> </ListItemIcon>
                        <ListItemText primary={'Tareas'} />
                    </ListItem>       

                     <ListItem button style={comprobador('/inventario/pedidos')}   onClick={() => props.history.push('/inventario/pedidos')}>
                        <ListItemIcon style={{ color: 'inherit' }}><AssignmentReturnedIcon /> </ListItemIcon>
                        <ListItemText primary={'Pedidos'} />
                    </ListItem>   
                    <ListItem button style={comprobador('/control')}   onClick={() => props.history.push('/control')}>
                        <ListItemIcon style={{ color: 'inherit' }}><AvTimerIcon /> </ListItemIcon>
                        <ListItemText primary={'Control'} />
                    </ListItem>             
                    <ListItem button style={comprobador('/reportes')}>
                        <ListItemIcon style={{ color: 'inherit' }}><PrintIcon /> </ListItemIcon>
                        <ListItemText primary={'Reportes'} />
                    </ListItem>

                </List>

                <div>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => props.history.push('ajustes')} style={comprobador('/ajustes')} >
                            <ListItemIcon style={{ color: 'inherit' }}><SettingsIcon /> </ListItemIcon>
                            <ListItemText primary={'Configuración'} />
                        </ListItem>
                        <ListItem button onClick={cerrar}>
                            <ListItemIcon><ExitToAppIcon /> </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>

                    </List>
                </div>
            </div>


        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    console.log(history)
    return (
        <div className={classes.root}>
            <CssBaseline />

            {
                // initializer.usuario != null ?
                history.location.pathname != "/bienvenida" && history.location.pathname != "/login" ?

                    <React.Fragment>
                        <AppBar position="fixed"
                            className={mobileOpen ? classes.appBarShift : classes.appBar} position="fixed" color="white" elevation={0} style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>
                            <Toolbar>

                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>

                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                                <div className={classes.grow} />

                                <Avatar variant="rounded" style={{ marginTop: 5, backgroundColor: '#e3f2fd', borderRadius: 5 }} >

                                    <Notifications notification={notification} />

                                </Avatar>
                                <Avatar variant="rounded" style={{ marginLeft: 10, marginTop: 5, backgroundColor: '#ede7f6', borderRadius: 5}} >
                                    <IconButton aria-label="show 4 new mails" color="inherit">

                                        <AccountCircle style={{ color: '#5e35b1' }} />
                                    </IconButton>

                                </Avatar>

                            </Toolbar>
                        </AppBar>
                        <nav aria-label="mailbox folders" className={classes.drawer}>
                            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                            <Hidden smUp implementation="css">
                                <Drawer
                                    container={container}
                                    variant="temporary"
                                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                    open={mobileOpen}
                                    onClose={handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    ModalProps={{
                                        keepMounted: true, // Better open performance on mobile.
                                    }}
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>
                            <Hidden xsDown implementation="css">
                                <Drawer
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    variant="permanent"
                                    open
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>

                        </nav>
                    </React.Fragment>
                    :
                    null
            }
            <main className={classes.content} style={{ overflow: 'auto', padding: 15 }} >


                <div className={classes.toolbar} />
                {props.children}
                {
                    initializer.usuario != null ?
                        <SpeedDial />
                        : null
                }

            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
