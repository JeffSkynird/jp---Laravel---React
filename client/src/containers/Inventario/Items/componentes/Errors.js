import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import Slide from '@material-ui/core/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Errors(props) {
    const { data } = props
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            fullScreen
            onClose={() => props.setOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Errores en la importación: {data.length}</DialogTitle>
            <DialogContent>

                <Grid container>

                    <Grid item md={12} xs={12}>

                        <Table aria-label="simple table" size="small" >
                            <TableHead>
                                <TableRow>
                                    <TableCell >Motivo</TableCell>
                                    <TableCell align="right">Item</TableCell>
                                    <TableCell align="right">Código serial</TableCell>
                                    <TableCell align="right">Código cliente</TableCell>
                                    <TableCell align="right">Código barras</TableCell>
                                    <TableCell align="right">Unidad</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    data.map((item, index) => (
                                        <TableRow key="index">
                                            <TableCell >{item.error}</TableCell>
                                            <TableCell align="right">{item.row.item}</TableCell>
                                            <TableCell align="right">{item.row.serial_code}</TableCell>
                                            <TableCell align="right">{item.row.client_code}</TableCell>
                                            <TableCell align="right">{item.row.bar_code}</TableCell>

                                            <TableCell align="right">{item.row.unity}</TableCell>

                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)} >
                    Aceptar
                </Button>

            </DialogActions>
        </Dialog>


    )
}
