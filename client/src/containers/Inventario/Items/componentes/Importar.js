import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { importar } from '../../../../utils/API/items';
import { importar as importarProductos} from '../../../../utils/API/sistemas';
import Initializer from '../../../../store/Initializer'

export default function AlertDialog(props) {
    const initializer = React.useContext(Initializer);

    const [open, setOpen] = React.useState(false);
    const [tipo, setTipo] = React.useState("");
    const [archivo, setArchivo] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const guardar = () => {
        if(tipo=="items"){
            importar({ file: archivo }, initializer, props.carga)

        }else{
            importarProductos({file:archivo},initializer, props.carga);
        }

        setOpen(false);
    }
    return (
        <div>
            <IconButton aria-label="imprimir" onClick={handleClickOpen}>
                <ImportExportIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Importe masivo</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Selecciona un archivo en formato xlsx con los datos de los items
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item md={12} xs={12}>

                            <FormControl variant="outlined" style={{ width: '100%' }} >
                                <InputLabel id="demo-simple-select-outlined-label">Tipo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    label="Tipo"
                                >
                                    <MenuItem value="">
                                        <em>Seleccione una opción</em>
                                    </MenuItem>
                                    <MenuItem value={'items'}>Items</MenuItem>
                                    <MenuItem value={'productos'}>Productos</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <input
                        
                                style={{ display: "none", marginRight: "5px" }}
                                id="templateFile"

                                type="file"

                                onChange={(e) => {
                                    setArchivo(e.target.files[0])
                                }}
                            />
                            <label htmlFor="templateFile">
                                <Button
                                    startIcon={<CloudUploadIcon />}
                                    variant="outlined"
                                    color="default"
                                    component="span"
                                >
                                    Subir archivo{" "}
                                    {archivo != null
                                        ? "(" + archivo.name + ")"
                                        : ""}
                                </Button>
                            </label>
                        </Grid>
{
    tipo=="items" &&(
        <Grid item md={12} xs={12}>
        <Typography variant="caption" >Ejemplo:</Typography>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Descripción</TableCell>
                    <TableCell align="right">Mínimo</TableCell>
                    <TableCell align="right">Máximo</TableCell>
                    <TableCell align="right">Categoría</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow >
                    <TableCell align="right">Producto 1</TableCell>
                    <TableCell align="right">Descripcion 1</TableCell>
                    <TableCell align="right">0</TableCell>
                    <TableCell align="right">100</TableCell>
                    <TableCell align="right">Categoria 1</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Grid>
    )
}
{
    tipo=="productos" &&(
        <Grid item md={12} xs={12}>
        <Typography variant="caption" >Ejemplo:</Typography>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Código cliente</TableCell>
                    <TableCell align="right">Código serial</TableCell>
                    <TableCell align="right">Descripción</TableCell>
                    <TableCell align="right">Stock</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Unidad</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow >
                    <TableCell align="right">Item 1</TableCell>
                    <TableCell align="right">0001</TableCell>
                    <TableCell align="right">0001</TableCell>
                    <TableCell align="right">Descripción</TableCell>
                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">5.5</TableCell>
                    <TableCell align="right">cm</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Grid>
    )
}
                       
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={guardar} color="primary" autoFocus>
                        Importar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
