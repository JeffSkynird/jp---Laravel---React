import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require('axios');
export const editar= (id,data, store,limpiar) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"solicitudes/"+id;
    let setting = {
      method: "PUT",
      url: url,
      params:data,
      data: data,
      body: data,
      headers: { Accept: "application/json",  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          limpiar();
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
          limpiar();
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
export const eliminar = (id,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"solicitudes/"+id;
    
    let setting = {
      method: "DELETE",
      url: url,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
  
      }
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data
        if(res.data.type!="error"){
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
        }else{
        
          mostrarLoader(false);
          mostrarNotificacion({ type: "error", message: response.message });
        }
        
      })
      .catch((error) => {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: error.message });
      });
  };
export const registrar = (data,store,limpiar) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"solicitudes";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          limpiar();
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
          limpiar();
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  }
export const obtenerTodos = (setData,store,setKpis) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"solicitudes"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.data)
        setKpis({autorizadas:response.autorizadas,pendientes:response.pendientes})

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}


 
export const autorizar = (id,store,limpiar) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"solicitudes/authorize/"+id;
    let setting = {
      method: "POST",
      url: url,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
          limpiar();
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
          limpiar();
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  }