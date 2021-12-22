import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DateFnsUtils from '@date-io/date-fns';
import { utcDate } from '../../../utils/Date'
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import es from 'date-fns/locale/es'
import TodayIcon from '@material-ui/icons/Today';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { Chip, Grid, IconButton } from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
    function addDaysToDate(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }
    return (
        <div>


            <IconButton aria-label="abrirmodal" onClick={handleClickOpen}>
                <DateRangeIcon />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Filtros</DialogTitle>
                <DialogContent>


                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                            <DialogContentText id="alert-dialog-slide-description">
                                Seleccione el rango de fechas para filtrar.

                            </DialogContentText>

                        </Grid>

                        <Grid item md={6} xs={12}>


                            <MuiPickersUtilsProvider style={{ width: "100%" }} utils={DateFnsUtils} locale={es}>
                                <KeyboardDatePicker
                                    autoOk

                                    ampm={false}
                                    size="small"
                                    inputVariant="outlined"
                                    label="Desde"
                                    style={{ width: "100%" }}
                                    // disablePast
                                    format="yyyy-MM-dd"
                                    value={props.desde}

                                    onChange={date => props.setDesde(date)}
                                />


                            </MuiPickersUtilsProvider>


                        </Grid>
                        <Grid item md={6} xs={12}>


                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                                <KeyboardDatePicker
                                    autoOk

                                    ampm={false}
                                    size="small"
                                    inputVariant="outlined"
                                    label="Hasta"
                                    style={{ width: "100%" }}
                                    // disablePast
                                    format="yyyy-MM-dd"
                                    value={props.hasta}

                                    onChange={date => props.setHasta(date)}
                                />


                            </MuiPickersUtilsProvider>


                        </Grid>
                        <Grid item md={12} xs={12}>

                            <Chip
                                icon={<DateRangeIcon />}
                                style={{marginRight:5}}
                                label="Mes actual"
                                onClick={() => {
                                    props.setDesde(getFirst())
                                    props.setHasta(getLast())
    
                                }} 
                            />
                             <Chip
                                icon={<TodayIcon />}
                                label="Hoy"
                                onClick={() => {
                                    props.setDesde(new Date())
                                    props.setHasta(addDaysToDate(new Date(), +1))
    
                                }} 
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        props.filtrarFecha()
                        handleClose()
                    }} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
