import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { BottomNavigation, BottomNavigationAction, Box, Container, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Productos from './Productos'
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Items from '../Items'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 500,
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4),
        maxWidth: '100%'
    },
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
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

export default function IconLabelTabs(props) {
    const classes = useStyles();
    const [tab, setTab] = React.useState(0);


    return (
<div>

            {
                tab == 0 ?
                    <Items {...props} />
                    :
                    <Productos {...props} />
            }
            <BottomNavigation
                value={tab}

                onChange={
                    (event, newValue) => {
                        setTab(newValue);
                    }
                }
                style={{
            
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    zIndex: 599
                }}
                showLabels

            >
                <BottomNavigationAction label="Items" icon={<AccountTreeIcon />} />
                <BottomNavigationAction label="Inventario" icon={<PostAddIcon />} />

            </BottomNavigation>
      

    
            </div>
    );
}
