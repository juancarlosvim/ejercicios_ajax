var debug = true;
window.onload = function () {
    "use strict";
    iniciar();
};
var cogerNombre = document.getElementById('idNombre');
function iniciar() {
    var btnBuscar = document.getElementById('btnBuscar');
    btnBuscar.addEventListener("click", leer);
}
function leer() {
    var url = "http://daw2.iesoretania.es/alumno04/ejemploAjax/datos.php";
    var solicitud = new XMLHttpRequest();
    var data = new FormData();
    data.append('indice', '2');
    solicitud.addEventListener("load", mostrar);
    solicitud.open("POST", url, true);
    solicitud.send(data);
}
function mostrar(e) {
    var datos = e.target;
    if(debug){
        console.log(datos);
    }
    if(datos.status === 200){
       if(debug){
           console.log("CONEXIÓN CORRECTA");
       }

        var misDatos = JSON.parse(datos.responseText);
       if(debug){
           console.log(misDatos);
       }
       cogerNombre.value = misDatos;

    }
}
