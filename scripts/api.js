function dibujarJugadores(numJugadores){
    tablero = $('#tablero').width()
    for (let i = 0; i < numJugadores; i++) {
        $('#tablero').append('<div id="pieza_'+(i+1)+'" class="pieza" data-jugador="jugador_'+(i+1)+'">');
        posicion = $('img[src*="jugador'+(i+1)+'"]').attr('id').split('_')
        console.log(tablero)
        console.log('#pieza_'+(i+1))
        $('#pieza_'+(i+1)).css({'left': 10+tablero*posicion[2]/9, 'top': 10+tablero*posicion[1]/9})
        .attr('data-fila', posicion[1])
        .attr('data-columna', posicion[2])

    }
    //https://programandoointentandolo.com/2013/02/arrastrar-y-soltar-en-html5-drag-drop-html5.html
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

function cargarSonido(sonidoRequerido) {
    console.log(sonidoRequerido)
    var sonidos = new Array("campana", "creacion");
    const sonido = document.createElement("audio");
    for (let i = 0; i < sonidos.length; i++) {
        if (sonidos[i] == sonidoRequerido) {
            sonido.src = "./sonidos/" + sonidos[i] + ".mp3";
        }
    }
    sonido.setAttribute("preload", "auto");
    sonido.setAttribute("controls", "none");
    sonido.setAttribute('autoplay',true)
    sonido.style.display = "none"; // <-- oculto
    document.body.appendChild(sonido);
    return sonido;
}