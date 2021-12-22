import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Initializer from '../store/Initializer'
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';

import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import TransformIcon from '@material-ui/icons/Transform';
import AllInboxIcon from '@material-ui/icons/AllInbox';

import NotificationsIcon from '@material-ui/icons/NotificationsNone';
import { obtenerNotificacionesMenu } from '../utils/API/reporte'
import MoreIcon from '@material-ui/icons/MoreVert';

import ClearIcon from '@material-ui/icons/Clear';
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
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
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function PrimarySearchAppBar(props) {
    const initializer = React.useContext(Initializer);

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [data, setData] = React.useState({tareas:0,pedidos:0,transferencias:0,compras:0,ajustes:0});
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    React.useEffect(() => {
        if (initializer.usuario != null&&isMenuOpen==true) {
            obtenerNotificacionesMenu(setData, initializer)
        }
    }, [initializer.usuario,isMenuOpen]);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            elevation={1}
        >
            <Typography  color="initial" style={{fontWeight:'bold',textAlign:'center'}}>Actividad</Typography>
            { (data.tareas+ data.pedidos+ data.ajustes+data.compras+data.transferencias)==0&&(<MenuItem onClick={handleMenuClose}> <ClearIcon style={{marginRight:5}}/> Sin nueva actividad</MenuItem>)}
            {
                data.tareas != 0 && (<MenuItem onClick={handleMenuClose}> <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={data.tareas} color="secondary">
                        <AssignmentIcon />
                    </Badge>
                </IconButton>
                    Tareas</MenuItem>)
            }
            {
                data.pedidos != 0 && (
            <MenuItem onClick={handleMenuClose}> <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={data.pedidos} color="secondary">
                    <AssignmentReturnedIcon />
                </Badge>
            </IconButton>Pedidos</MenuItem>
            )
            }
            {
                data.compras != 0 && (
            <MenuItem onClick={handleMenuClose}> <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={data.compras} color="secondary">
                    <AllInboxIcon />
                </Badge>
            </IconButton>Compras</MenuItem>
            )}
                {
                data.ajustes != 0 && (
            <MenuItem onClick={handleMenuClose}> <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={data.ajustes} color="secondary">
                    <TransformIcon />
                </Badge>
            </IconButton>Ajuste</MenuItem>

                )}
                 {
                data.transferencias != 0 && (
            <MenuItem onClick={handleMenuClose}> <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={data.transferencias} color="secondary">
                    <TransferWithinAStationIcon />
                </Badge>
            </IconButton>Trasnferencias</MenuItem> )}
        </Menu>
    );


    return (
        <div className={classes.grow}>
            <IconButton

                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <Badge invisible={props.notification==false||(data.tareas+ data.pedidos+ data.ajustes+data.compras+data.transferencias)==0} color="secondary" variant="dot" > <NotificationsIcon style={{ color: '#1e88e5' }} /></Badge> 

            </IconButton>

            {renderMenu}
        </div>
    );
}
