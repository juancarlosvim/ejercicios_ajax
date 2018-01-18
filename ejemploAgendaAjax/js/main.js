window.onload = function () {
    "use strict";

};

function iniciar() {
    var cogerNombre = document.getElementById('idNombre');
    var cogerApellido = document.getElementById('idApellido');
    var cogerTelefono = document.getElementById('idTelefono');
    var btnBuscar = document.getElementById('btnBuscar');
    btnBuscar.addEventListener("click", leer);
}
function leer() {
    alert("prueba")
}