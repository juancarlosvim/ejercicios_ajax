var debug = true;
let iniciar = () =>{
    let nombre = "0";
    let p = "Roger";
    let url = "http://172.21.0.15/wcf/Biblioteca.svc/ListaObras?por="+nombre+"&pista="+p;
    let ajax = new XMLHttpRequest();

    ajax.addEventListener("load", (e)=>{
        if(ajax.status===200 && ajax.readyState===4){
            if(debug){
                console.log("CONEXION CORRECTA");
            }
            let datos = JSON.parse(e.target.responseText);
            console.log(datos.ListaObrasResult);
            let nombre = [];
            let editorial = [];
            let fecha = [];
            let contenido = [];
            contenido = datos.ListaObrasResult;
            /*for(let i=0;i<contenido.length;i++){
                nombre[i] = contenido[i];
            }*/
            for  (let item in datos.ListaObrasResult){
               nombre += contenido[item].autores;
               editorial += contenido[item].editorial;
            }
           console.log(nombre);
           console.log(editorial);

        }else{
            if(debug){
                console.log("CONEXION INCORRECTA");
            }
        }
    });
    ajax.open("GET", url, true);
    ajax.send(null);
};

window.addEventListener("DOMContentLoaded", iniciar);