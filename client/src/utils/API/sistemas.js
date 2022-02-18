import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require('axios');


export const generarCodigoSerial = (id,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"generate_serial"
let setting = {
  method: "Get",
  url: url,
  params:id,
  headers: { 'Accept': 'application/json',
  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

};


axios(setting)
  .then((res) => {
    let response = res.data
   if(response.type!="error"){
      setData(response.data)
   

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}

export const subirFoto = (id,data,store,carga) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
  var resp = new FormData()
for ( var key in data ) {
  resp.append(key, data[key]);
}
  let url = ENTRYPOINT+"products/upload_image/"+id;
  let setting = {
    method: "POST",
    url: url,
    data: resp,
    body: resp,
    headers: { Accept: "application/json",
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
       carga()
      } else {
      }
    })
    .catch((error) => {

    });
}


export const editarSistema = (id,data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"products/"+id;
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
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
export const eliminarSistema = (id,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"products/"+id;
    
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
export const registrarSistema = (data,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    var resp = new FormData()
    for ( var key in data ) {
      resp.append(key, data[key]);
    }
    let url = ENTRYPOINT+"products";
    let setting = {
      method: "POST",
      url: url,
      data: resp,
      body: resp,
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
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  }

  
export const importar = (data,store,carga,cargaErrores) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  var resp = new FormData()
  resp.append('file', data.file)
  resp.append('warehouse_id', data.warehouse_id)

  let url = ENTRYPOINT+"import/product";
  let setting = {
    method: "POST",
    url: url,
    data: resp,
    body: resp,
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
      
        if(response.errors.fallo!=0){
          cargaErrores(response.error_data)
        }
        carga();
        mostrarLoader(false);
        mostrarNotificacion({ type: response.type, message: response.message });
   
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
  export const obtenerInventory = (setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"inventories"
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
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerTodosParam = (params,setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"products"
  let setting = {
    method: "Get",
    params,
    url: url,
    headers: { 'Accept': 'application/json',
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.data)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const obtenerTodos = (setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"products"
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
   

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerSistemaEvaluaciones = (setLabels,setValues,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"systems_evaluations"
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
      setLabels(response.data.system)
      setValues(response.data.count)


   }else{
   
   }
  })
  .catch((error) => {
   


  });
}

export const obtenerPorBodega = (id,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"products_by_warehouse/"+id
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
   

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerPorCliente = (id,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"products_by_client/"+id
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
   

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}
export const obtenerPropios = (setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


let url = ENTRYPOINT+"products_own"
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
   

   }else{
   
   }
  })
  .catch((error) => {
   


  });
}