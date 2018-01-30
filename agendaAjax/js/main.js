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
        var datos = e.target;
        if(debug){
            console.log(datos);
        }
        if(datos.status ===200){
            if(debug){
                console.log("Conexión correcta");
            }else{
                console.log("Conexión incorrecta");
            }
            var respuesta = JSON.parse(datos.responseText);


        }
    };
    var misDatos = (function () {
        var auxId = document.getElementById('txtId');
        var auxForm = new FormData();
        auxForm.append("txtid", auxId);
        return auxForm;
    })();
    var solicitud = new window.XMLHttpRequest();
    solicitud.addEventListener("load", lecturaBD);
    solicitud.open("POST", url, true);
    solicitud.send(misDatos);
}


window.addEventListener("DOMContentLoaded", iniciar);