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
    solicitud.addEventListener("load", mostrar);
    solicitud.open("GET", url, true);
    solicitud.send(null);
}
function mostrar(e) {
    var datos = e.target;
    if(debug){
        console.log(datos);
    }
    var nombres = datos.responseText.split(",");
    if(debug){
        for(var i=0, fin=nombres.length; i<fin;i++){
            console.log("Nombre => " +nombres[i]);
        }
    }

    if(datos.status === 200){
       if(debug){
           console.log("CONEXIÓN CORRECTA");
       }
        cogerNombre.innerHTML = JSON.parse(datos.responseText.split(",")[0]);

    }
}
