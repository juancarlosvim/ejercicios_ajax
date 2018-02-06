let debug = true;
let iniciar = () => {
    "use strict";
    let btnInsertar = document.getElementById('btnInsertar');
    btnInsertar.addEventListener("click", insertarBD);
    let btnConsultar = document.getElementById('btnConsultar');
    btnConsultar.addEventListener("click", consultarBD);
    let btnModificar = document.getElementById('btnModificar');
    btnModificar.addEventListener("click", modificarBD);
    let btnEliminar = document.getElementById('btnEliminar');
    btnEliminar.addEventListener("click", eliminarBD);
};

let consultarBD = () =>{
    "use strict";
    limpiardatos();
    let url = "http://daw2.iesoretania.es/recursos/bd_leer_agenda.php";
    let id =document.getElementById("txtId").value;
    let mensaje = document.getElementById('pMensaje');
    let estado = document.getElementById('estadoConexion');
    if(debug){
        console.log("Consultas");
    }
    let ajax = new XMLHttpRequest();
    let formulario = new FormData();
    formulario.append("txtid", id);
    if(debug){
        console.log(`id => ${id}`);
    }
    ajax.addEventListener("load", (e) => {
        if(ajax.status ===200 && ajax.readyState ===4){
            if(debug){
                console.log("entro");
            }
            estado.textContent=`Conexión correcta`;

            let datos = JSON.parse(e.target.responseText);
            if(debug){
                console.log(`Datos => ${datos}`);
            }
            if(datos.row.ID === id){
                mensaje.textContent = `el usuario con el id: ${id} ha sido encontrado`;
                recuperarDatos(datos);
            }else {
                mensaje.textContent =`El usuario con la id: ${id} no ha sido encontrado.`;                }
        }else{
            estado.textContent = "Error en la conexión";
        }
    });
    ajax.open("POST", url, true);
    ajax.send(formulario);

};
/* mostrar los datos cuando haces una llamada a ajax */
let recuperarDatos = (d) =>{
    "use strict";
    document.getElementById("txtNombre").value = d.row.Nombre;
    document.getElementById("txtApellidos").value = d.row.Apellidos;
    document.getElementById("txtAlias").value = d.row.Alias;
    document.getElementById("txtDireccion").value = d.row.Direccion;
    document.getElementById("txtPoblacion").value = d.row.Poblacion;
    document.getElementById("txtTelefono").value = d.row.Telefono;
    document.getElementById("imgFoto").src=`data:image/jpg;base64,${d.row.foto}`;
};

/* limpiar datos */
let limpiardatos = () =>{
    "use strict";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidos").value = "";
    document.getElementById("txtAlias").value = "";
    document.getElementById("txtDireccion").value = "";
    document.getElementById("txtPoblacion").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("imgFoto").src="data:image/jpg;base64, ";
};

/*
 INSERTAR
 */

let insertarBD = () =>{
    "use strict";
    let url = "http://daw2.iesoretania.es/recursos/bd_insertar_agenda.php";
    //let id = document.getElementById('txtId').value;
    let nombre = document.getElementById("txtNombre").value;
    let apellidos = document.getElementById("txtApellidos").value;
    let alias = document.getElementById("txtAlias").value;
    let direccion = document.getElementById("txtDireccion").value;
    let telefono = document.getElementById("txtTelefono").value;
    let imagen = document.getElementById("fFoto").files[0];
    let mensaje = document.getElementById('pMensaje');
    let estado = document.getElementById('estadoConexion');
    let ajax = new XMLHttpRequest();
    let formulario = new FormData();
    //formulario.append("txtid", id);
    formulario.append("txtalias", alias);
    formulario.append("txtnombre", nombre);
    formulario.append("txtapellidos", apellidos);
    formulario.append("txtdireccion", direccion);
    formulario.append("txttelefono", telefono);
    formulario.append("txtmovil", telefono);
    formulario.append("idfoto", imagen);
    ajax.addEventListener("load", (e)=>{
        if(ajax.status ===200 && ajax.readyState===4){
            if(debug){
                console.log("ENTRO");
            }
            estado.textContent=`Conexión correcta`;
            let datos = JSON.parse(e.target.responseText);
            if(debug){
                console.log(`datos => ${datos}`);
                console.log(`valor row => ${datos.row}`);
                console.log(`valor row1 => ${datos.row1}`);
            }
            if(datos.row ===1){
                mensaje.textContent=`El usuario con la id: ${datos.row1['LAST_INSERT_ID()']} ha sido insertado `;
            }else{
                mensaje.textContent = `El usuario con el nombre: ${nombre} no ha sido insertado`;
            }
        }else{
            estado.textContent = 'Error en la conexión';
        }
    });
    ajax.open("POST", url, true);
    ajax.send(formulario);

};
/*
 MODIFICAR
 */
let modificarBD = () =>{
    'use strict';
    let url = "http://daw2.iesoretania.es/recursos/bd_modificar_agenda.php";
    let id = document.getElementById('txtId').value;
    let nombre = document.getElementById("txtNombre").value;
    let apellidos = document.getElementById("txtApellidos").value;
    let alias = document.getElementById("txtAlias").value;
    let direccion = document.getElementById("txtDireccion").value;
    let telefono = document.getElementById("txtTelefono").value;
    let imagen = document.getElementById("fFoto").files[0];
    let mensaje = document.getElementById('pMensaje');
    let estado = document.getElementById('estadoConexion');
    let ajax = new XMLHttpRequest();
    let formulario = new FormData();
    formulario.append("txtid", id);
    formulario.append("txtalias", alias);
    formulario.append("txtnombre", nombre);
    formulario.append("txtapellidos", apellidos);
    formulario.append("txtdireccion", direccion);
    formulario.append("txttelefono", telefono);
    formulario.append("txtmovil", telefono);
    formulario.append("idfoto", imagen);
    ajax.addEventListener("load", (e) =>{
        if(ajax.status===200 && ajax.readyState===4){
            if(debug){
                console.log("ENTRO");
            }
            estado.textContent = `Conexión correcta`;
            let datos = JSON.parse(e.target.responseText);
            if(datos.row ===1){
                mensaje.textContent = `El usuario con la id: ${id} ha sido modificado`;
            }else{
                mensaje.textContent = `El usuario con la id: ${id} no ha sido modificado`;
            }

        }else{
            estado.textContent = 'Error en la conexión';
        }
    });
    ajax.open("POST", url, true);
    ajax.send(formulario);
};

/*
 Eliminar
 */
let eliminarBD = () =>{
    let url = "http://daw2.iesoretania.es/recursos/bd_borrar_agenda.php";
    let id = document.getElementById('txtId').value;
    let mensaje = document.getElementById('pMensaje');
    let estado = document.getElementById('estadoConexion');
    let ajax = new XMLHttpRequest();
    let formulario = new FormData();
    formulario.append("txtid", id);
    ajax.addEventListener("load", (e) =>{
        if(ajax.status===200 && ajax.readyState===4){
            estado.textContent = `Conexión correcta`;
            let datos = JSON.parse(e.target.responseText);
            if(datos.row ===1 ){
                mensaje.textContent = `El usuario con la id: ${id} ha sido eliminado`;
            }else{
                mensaje.textContent = `El usuario con la id: ${id} no ha sido eliminado`;
            }
        }
    });
    ajax.open("POST", url, true);
    ajax.send(formulario);

};
window.addEventListener("DOMContentLoaded", iniciar);