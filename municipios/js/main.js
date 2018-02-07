let debug = true;
let iniciar = () =>{
    let iniciarPronvincias = (()=>{
        let url = "http://daw2.iesoretania.es/alumno04/bdRecursos/bdprovincias.php";
        let ajax =new XMLHttpRequest();
        let formulario = new FormData();
        ajax.addEventListener("load", (e) =>{
            if(ajax.status ===200 && ajax.readyState ===4){
                console.log(`CARGAR PROVINCIAS`);

                let dato = e.target;
                let provincias = [];
                provincias =  JSON.parse(dato.responseText);
                console.log(provincias);
                let cargarProvincias = document.getElementById('slProvincias');

                for(let i=0; i<provincias.length;i++){
                    let opcion = document.createElement("option");
                    opcion.setAttribute('id',provincias[i].id_provincia);
                    opcion.textContent = provincias[i].provincia;
                    cargarProvincias.appendChild(opcion);
                    //console.log(`Pronvicia => ${provincias[i].provincia}`);
                }

            } else{
                console.log(`CARGAR PRONVICIAS ERROR`);
            }
        });
        ajax.open("POST", url, true);
        ajax.send(null);
    })();

    let seleccionarProvincia = document.getElementById('slProvincias');
    seleccionarProvincia.addEventListener("click", (e)=>{
        let valor= e.target.id;
        console.log(valor);
        let url = "http://daw2.iesoretania.es/alumno04/bdRecursos/municipios.php";
        let ajax = new XMLHttpRequest();
        let formulario = new FormData();
        formulario.append("numero", valor);
        ajax.addEventListener("load", (e)=>{
            if(ajax.status ===200 && ajax.readyState ===4){
                if(debug){
                    console.log(`conexion correcta`);
                }
                let dato1 = e.target;
                if(debug){
                    console.log(`dato del e target  => ${dato1}`);
                }
                let arrayMunicipios = [];
                arrayMunicipios = JSON.parse(dato1.responseText);

                if(debug){
                    for(let i=0;i<arrayMunicipios.length;i++){
                        console.log(`Array => ${arrayMunicipios[i].nombre}`);
                    }
                }
                let cargarMunicipios = document.getElementById('slMunicipios');
                while(cargarMunicipios.childNodes.length>0){
                    cargarMunicipios.removeChild(cargarMunicipios.childNodes[0]);
                }
                for(let i=0;i<arrayMunicipios.length;i++){
                    let opcion = document.createElement("option");
                    opcion.setAttribute(`id`,`${arrayMunicipios[i].id_municipio}`);
                    opcion.textContent = arrayMunicipios[i].nombre;
                    cargarMunicipios.appendChild(opcion);
                }
            }else{
                if(debug){
                    console.log(`error en la conexion`);
                }
            }
        });
        ajax.open("POST", url, true);
        ajax.send(formulario);
    });

};
window.addEventListener("DOMContentLoaded", iniciar);