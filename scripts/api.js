function dibujarJugadores(numJugadores){
    tablero = $('#tablero').width()
    for (let i = 0; i < numJugadores; i++) {
        $('#tablero').append('<div id="pieza_'+(i+1)+'" class="pieza" data-jugador="jugador_'+(i+1)+'">');
        posicion = $('img[src*="jugador'+(i+1)+'"]').attr('id').split('_')
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
        // cargarEstructura();
        // seleccionPartida();
        location.reload();
    }

}


function cerrarVentana(){
    $("#ventana").hide();
}

function cargarSonido(sonidoRequerido) {
    var sonidos = new Array("campana", "creacion","plop");
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

function moverPiezaTablero(direccion, fila, columna){
    if(direccion == "flecha-abajo.png"){
       //Se mueven las cartas del 1 al 7
       ultimaCarta = $('#carta_'+ 7 +"_"+columna)
       ultimaCarta ='<img src="'+ultimaCarta.attr('src')+'" data-lado1="'+ultimaCarta.attr('data-lado1') +
       '" data-lado2="'+ultimaCarta.attr('data-lado2')+'" data-lado3="'+ultimaCarta.attr('data-lado3') + '" data-grados="'+ultimaCarta.attr('data-grados')+'">';
        for (let i = 6; i > 0; i--) {
            debugger;
            let carta = $('#carta_'+ i +"_"+columna);
            $('#carta_'+ (i+1) +"_"+columna).attr('src',carta.attr('src'))
            .attr('data-lado1', carta.attr('data-lado1'))
            .attr('data-lado2', carta.attr('data-lado2'))
            .attr('data-lado3', carta.attr('data-lado3'))
            .attr('data-grados', carta.attr('data-grados'))
            .css('transform', 'rotate('+carta.attr('data-grados') +'deg)')
        }
        $('#carta_'+ 1 +"_"+columna)
        .attr('src', $('.draggable').attr('src'))
        .attr('data-lado1', $('.draggable').attr('data-lado1'))
        .attr('data-lado2',$('.draggable').attr('data-lado2'))
        .attr('data-lado3', $('.draggable').attr('data-lado3'))
        .attr('data-grados', $('.draggable').attr('data-grados'))
        .css('transform', 'rotate('+$('.draggable').attr('data-grados') +'deg)')
        $('.draggable').remove();
    }
    if(direccion == 'flecha-arriba.png'){
        ultimaCarta = $('#carta_'+ 1 +"_"+columna)
        ultimaCarta ='<img src="'+ultimaCarta.attr('src')+'" data-lado1="'+ultimaCarta.attr('data-lado1') +
        '" data-lado2="'+ultimaCarta.attr('data-lado2')+'" data-lado3="'+ultimaCarta.attr('data-lado3') + '" data-grados="'+ultimaCarta.attr('data-grados')+'">';
         for (let i = 2; i<8; i++) {
             debugger;
             let carta = $('#carta_'+ i +"_"+columna);
             $('#carta_'+ (i-1) +"_"+columna).attr('src',carta.attr('src'))
             .attr('data-lado1', carta.attr('data-lado1'))
             .attr('data-lado2', carta.attr('data-lado2'))
             .attr('data-lado3', carta.attr('data-lado3'))
             .attr('data-grados', carta.attr('data-grados'))
             .css('transform', 'rotate('+carta.attr('data-grados') +'deg)')
         }
         $('#carta_'+ 7 +"_"+columna)
         .attr('src', $('.draggable').attr('src'))
         .attr('data-lado1', $('.draggable').attr('data-lado1'))
         .attr('data-lado2',$('.draggable').attr('data-lado2'))
         .attr('data-lado3', $('.draggable').attr('data-lado3'))
         .attr('data-grados', $('.draggable').attr('data-grados'))
         .css('transform', 'rotate('+$('.draggable').attr('data-grados') +'deg)')
         $('.draggable').remove();
    }
    if(direccion == "flecha-derecha.png"){
        ultimaCarta = $('#carta_'+ fila +"_"+7)
        ultimaCarta ='<img src="'+ultimaCarta.attr('src')+'" data-lado1="'+ultimaCarta.attr('data-lado1') +
        '" data-lado2="'+ultimaCarta.attr('data-lado2')+'" data-lado3="'+ultimaCarta.attr('data-lado3') + '" data-grados="'+ultimaCarta.attr('data-grados')+'">';
         for (let i = 6; i > 0; i--) {
             debugger;
             let carta = $('#carta_'+ fila +"_"+ i);
             $('#carta_'+ fila +"_"+(i+1)).attr('src',carta.attr('src'))
             .attr('data-lado1', carta.attr('data-lado1'))
             .attr('data-lado2', carta.attr('data-lado2'))
             .attr('data-lado3', carta.attr('data-lado3'))
             .attr('data-grados', carta.attr('data-grados'))
             .css('transform', 'rotate('+carta.attr('data-grados') +'deg)')
         }
         $('#carta_'+ fila +"_"+1)
         .attr('src', $('.draggable').attr('src'))
         .attr('data-lado1', $('.draggable').attr('data-lado1'))
         .attr('data-lado2',$('.draggable').attr('data-lado2'))
         .attr('data-lado3', $('.draggable').attr('data-lado3'))
         .attr('data-grados', $('.draggable').attr('data-grados'))
         .css('transform', 'rotate('+$('.draggable').attr('data-grados') +'deg)')
         $('.draggable').remove();
    }
    if(direccion == "flecha-izquierda.png"){
        ultimaCarta = $('#carta_'+ fila +"_"+1)
        ultimaCarta ='<img src="'+ultimaCarta.attr('src')+'" data-lado1="'+ultimaCarta.attr('data-lado1') +
        '" data-lado2="'+ultimaCarta.attr('data-lado2')+'" data-lado3="'+ultimaCarta.attr('data-lado3') + '" data-grados="'+ultimaCarta.attr('data-grados')+'">';
         for (let i = 2; i<8; i++) {
            debugger;
            let carta = $('#carta_'+ fila +"_"+i);
            $('#carta_'+ fila +"_"+(i-1)).attr('src',carta.attr('src'))
            .attr('data-lado1', carta.attr('data-lado1'))
            .attr('data-lado2', carta.attr('data-lado2'))
            .attr('data-lado3', carta.attr('data-lado3'))
            .attr('data-grados', carta.attr('data-grados'))
            .css('transform', 'rotate('+carta.attr('data-grados') +'deg)')
        }
        $('#carta_'+ fila +"_"+7)
        .attr('src', $('.draggable').attr('src'))
        .attr('data-lado1', $('.draggable').attr('data-lado1'))
        .attr('data-lado2',$('.draggable').attr('data-lado2'))
        .attr('data-lado3', $('.draggable').attr('data-lado3'))
        .attr('data-grados', $('.draggable').attr('data-grados'))
        .css('transform', 'rotate('+$('.draggable').attr('data-grados') +'deg)')
        $('.draggable').remove();
    }

    $('#carta_sobrante').html(ultimaCarta)
    $('#carta_sobrante img').addClass('draggable').draggable({
        containment: '#contenedor',
        revert: 'invalid',
        opacity: 0.50,
        drag: function(event,ui){
            ui.helper.css({"width": $('img[data-reservada="NO"]').width(), 'height' : $('img[data-reservada="NO"]').height()})
        }
       
    }).css('transform', 'rotate('+$('#carta_sobrante img').data('grados')+'deg)');
    console.log($('.draggable'))

}
