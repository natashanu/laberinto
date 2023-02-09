function comenzarJuego(numJugadores){       
 
}

//Ventana de mensajes
function cargarVentana(mensaje){
    let texto='';
    switch(mensaje){
        case "cerrar":
            texto= "<p>¿Desea salir de la partida?<br/>No se guardará el progreso</p>"+
            "<button id='cancelar' onclick='cerrarVentana();'>Cancelar</button><button id='salir' onclick='salirPartida();'>Salir</button>";
            break;
        case "reglas":
            texto = 'Reglas<img id="equis" onclick="cerrarVentana();" src="./imagenes/equis.png">'
            break;
        default:
    }
     return texto;
}

function salirPartida(){
    cargarEstructura();
    seleccionPartida();
}

function cerrarVentana(){
    $("#ventana").hide();
}