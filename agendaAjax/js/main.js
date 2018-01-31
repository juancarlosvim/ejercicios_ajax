var debug = true;
function iniciar() {
    var btnInsertar = document.getElementById('btnInsertar');
    var btnConsultar = document.getElementById('btnConsultar');
    btnConsultar.addEventListener("click", consultarBD);
    var btnModificar = document.getElementById('btnModificar');
    var btnEliminar = document.getElementById('btnELiminar');
}

function consultarBD() {
    var url = "http://daw2.iesoretania.es/recursos/bd_leer_agenda.php";

    var lecturaBD = function (e) {
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




        }
    };
    var misDatos = (function () {
        var auxId = document.getElementById('txtId').value;
        var nombre = document.getElementById("txtNombre").value;
        var apellidos = document.getElementById("txtApellidos").value;
        var alias =  document.getElementById("txtAlias").value;
        var direccion =  document.getElementById("txtDireccion").value;
        var poblacion =   document.getElementById("txtPoblacion").value;
        var telefono = document.getElementById("txtTelefono").value;
        var foto =  document.getElementById("imgFoto").src="data:image/jpg;base64, ";
        var auxForm = new FormData();
        auxForm.append("txtid", auxId);
        auxForm.append("txtalias", alias);
        auxForm.append("txtnombre", nombre);
        auxForm.append("txtnombre", nombre);
        auxForm.append("txtapellidos", apellidos);
        auxForm.append("txtdireccion", direccion);
        auxForm.append("txtpoblacion", poblacion);
        auxForm.append("txttelefono", telefono);
        auxForm.append("id", foto);
        return auxForm;
    })();
    var solicitud = new window.XMLHttpRequest();
    solicitud.addEventListener("load", meterDatosBD);
    solicitud.open("POST", url, true);
    solicitud.send(misDatos);
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