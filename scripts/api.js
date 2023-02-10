function comenzarJuego(numJugadores){       
 
}

//Ventana de mensajes
function cargarVentana(mensaje, numJugadores){
    let texto='';
    switch(mensaje){
        case "cerrar":
            texto= "<p>¿Desea salir de la partida?<br/>No se guardará el progreso</p>"+
            "<button id='cancelar' onclick='cerrarVentana();'>Cancelar</button><button id='salir' onclick='salirPartida("+numJugadores+");'>Salir</button>";
            break;
        case "reglas":
            texto = 'Reglas<img id="equis" onclick="cerrarVentana();" src="./imagenes/equis.png">'
            break;
        default:
    }
     return texto;
}

function salirPartida(numJugadores){
    let bandera = new Array();
    for (let i = 0; i < numJugadores; i++) {
        $.post('servidor/guardarPuntaje.php', {nombre: $('#jugador' + (i+1) + ' div:eq(0)').text(), 
            puntos : $('#jugador' + (i+1) + ' div:eq(1)').text()}, function(){

        }).done(bandera.push(true))
        
    }
    if(bandera.length == numJugadores){
        cargarEstructura();
        seleccionPartida();
    }

}

function cerrarVentana(){
    $("#ventana").hide();
}