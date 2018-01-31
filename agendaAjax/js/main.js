var debug = true;
function iniciar() {
    "use strict";
    /*var btnInsertar = document.getElementById('btnInsertar');
    btnInsertar.addEventListener("click", insertarBD);*/
    var btnConsultar = document.getElementById('btnConsultar');
    btnConsultar.addEventListener("click", consultarBD);
    /*var btnModificar = document.getElementById('btnModificar');
    var btnEliminar = document.getElementById('btnELiminar');*/
}

function consultarBD() {
    var url = "http://daw2.iesoretania.es/recursos/bd_leer_agenda.php";

    var lecturaBD = function (e) {
        var datos = e.target;
        var estado = document.getElementById('estadoConexion');
        var mensaje = document.getElementById('pMensaje');
        if(debug){
            console.log(datos);
        }
        if (datos.status !== 200){
            estado.textContent = "Error en la conexión";
        }
        else{
            var respuesta = JSON.parse(datos.responseText);
            estado.textContent = "Conexión Correcta";
            if (typeof respuesta.row !== "undefined"){
                if (debug){
                    console.log(respuesta.row.length);
                }
                if (respuesta.row.length === 0) {
                    mensaje.textContent = "No encontrado";
                }
                else {
                    mensaje.textContent = "Encontrado";
                    document.getElementById("txtNombre").value = respuesta.row.Nombre;
                    document.getElementById("txtApellidos").value = respuesta.row.Apellidos;
                    document.getElementById("txtAlias").value = respuesta.row.Alias;
                    document.getElementById("txtDireccion").value = respuesta.row.Direccion;
                    document.getElementById("txtPoblacion").value = respuesta.row.Poblacion;
                    document.getElementById("txtTelefono").value = respuesta.row.Telefono;
                    document.getElementById("imgFoto").src = "data:image/jpg;base64, " + respuesta.row.foto;
                }

            }else{
                mensaje.textContent = "No existe";
            }
        }
    };
    var misDatos = (function () {
        var auxId = document.getElementById('txtId').value;
        var auxForm = new FormData();
        auxForm.append("txtid", auxId);
        return auxForm;
    })();
    var solicitud = new window.XMLHttpRequest();
    solicitud.addEventListener("load", lecturaBD);
    solicitud.open("POST", url, true);
    solicitud.send(misDatos);
}
/*
 INSERTAR
 */

function insertarBD() {
    var url = "http://daw2.iesoretania.es/recursos/bd_insertar_agenda.php";

    var meterDatosBD = function (e) {
        var datos = e.target;
        var estado = document.getElementById('estadoConexion');
        var mensaje = document.getElementById('pMensaje');
        if(debug){
            console.log(datos);
        }
        if (datos.status !== 200) {
            estado.textContent = "Error en la conexión";
        }
        else {

            var respuesta = JSON.parse(datos.responseText);
            estado.textContent = "Conexión Correcta";
           if(respuesta.row > 0){
               mensaje.textContent = "Usuario registrado";
               document.getElementById('txtId').value = respuesta.row1['LAST_INSERT_ID'];
           }else{
               mensaje.textContent = "Usuario no registrado, revise los campos";
           }
        }
    };
    var myDate = (function () {
        var auxId = document.getElementById('txtId').value;
        var name = document.getElementById("txtNombre").value;
        var subName = document.getElementById("txtApellidos").value;
        var alias =  document.getElementById("txtAlias").value;
        var direction =  document.getElementById("txtDireccion").value;
        var population =   document.getElementById("txtPoblacion").value;
        var phone = document.getElementById("txtTelefono").value;
        var image =  document.getElementById("fFoto").files[0];
        var auxForm = new FormData();
        auxForm.append("txtid", auxId);
        auxForm.append("txtalias", alias);
        auxForm.append("txtnombre", name);
        auxForm.append("txtnombre", name);
        auxForm.append("txtapellidos", subName);
        auxForm.append("txtdireccion", direction);
        auxForm.append("txtpoblacion", population);
        auxForm.append("txttelefono", phone);
        auxForm.append("idFoto", image);
        return auxForm;
    })();
    var solicitud = new window.XMLHttpRequest();
    solicitud.addEventListener("load", meterDatosBD);
    solicitud.open("POST", url, true);
    solicitud.send(myDate);
}

/* MODIFICAR */
function modificarBD() {
    var url = "http://daw2.iesoretania.es/recursos/bd_modificar_agenda.php";

    var editarDatosBD = function (e) {
        var datos = JSON.parse(e.target.responseText);
        if(debug){
            console.log(datos);
        }
        if(datos.status ===200){
            if(debug){
                console.log("Conexión correcta");
            }
            var respuesta = JSON.parse(datos.responseText);
            if(debug){
                console.log(respuesta.row.length)
            }

            document.getElementById("txtNombre").value = respuesta.row.Nombre;
            document.getElementById("txtApellidos").value = respuesta.row.Apellidos;
            document.getElementById("txtAlias").value = respuesta.row.Alias;
            document.getElementById("txtDireccion").value = respuesta.row.Direccion;
            document.getElementById("txtPoblacion").value = respuesta.row.Poblacion;
            document.getElementById("txtTelefono").value = respuesta.row.Telefono;
            document.getElementById("imgFoto").src="data:image/jpg;base64, "+respuesta.row.foto;


        }
    };
    var misDatos = (function () {
        var auxId = document.getElementById('txtId').value;
        var auxForm = new FormData();
        auxForm.append("txtid", auxId);
        return auxForm;
    })();
    var solicitud = new window.XMLHttpRequest();
    solicitud.addEventListener("load", modificarBD);
    solicitud.open("POST", url, true);
    solicitud.send(misDatos);
}

window.addEventListener("DOMContentLoaded", iniciar);