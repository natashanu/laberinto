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
            texto = '<h2>Reglas<img class="equis" id="equis" onclick="cerrarVentana();" src="./imagenes/equis.png" width="40px"></h2>'+
            '<p style="text-align:justify">'+
            '1º Es obligatorio desplazar las hileras del laberinto antes de mover al peón.<br/>'+ 
            '2º Cada jugador podrá utilizar una vez por turno la carta sobrante para desplazar una hilera.<br/>'+
            '3º No se podrá desplazar una hilera si a lo largo de ella se encuentra un peón.<br/>'+
            '4º Está permitido avanzar tanto como sea posible.<br/>'+
            '5º Los jugadores pueden optar porque el peón permanezca donde estaba, sin obligación de desplazarse.</p>';
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
        location.reload();
    }

}


function cerrarVentana(){
    $("#ventana").hide();
}

//Array de imagenes de personajes
personajes = new Array();
personajes.push(['gatito', 'imagenes/gatito.svg'])
personajes.push(['brujita', 'imagenes/bruja.svg'])
personajes.push(['brujito', 'imagenes/brujo.svg'])
personajes.push(['fantasma', 'imagenes/fantasma.svg'])

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
    sonido.style.display = "none";
    document.body.appendChild(sonido);
    return sonido;
}

function moverPiezaTablero(direccion, fila, columna){
    debugger;
    let mov_valido= true;
    texto ='';
    if(direccion == "flecha-abajo.png" || direccion == "flecha-arriba.png"){
        $('[id*="pieza"]').each(function(){
            if($(this).attr('data-columna')==columna) {mov_valido=false; texto= 'columna'}
        })
    }
    if(direccion == "flecha-derecha.png" || direccion == "flecha-izquierda.png"){
        $('[id*="pieza"]').each(function(){
            if($(this).attr('data-fila')==fila) {mov_valido=false; texto = 'fila'}
        })
    }
    if(mov_valido){
        if(direccion == "flecha-abajo.png"){
        //Se mueven las cartas del 1 al 7
        ultimaCarta = $('#carta_'+ 7 +"_"+columna)
        ultimaCarta ='<img src="'+ultimaCarta.attr('src')+'" data-lado1="'+ultimaCarta.attr('data-lado1') +
        '" data-lado2="'+ultimaCarta.attr('data-lado2')+'" data-lado3="'+ultimaCarta.attr('data-lado3') + '" data-tesoro="'+ultimaCarta.attr('data-tesoro')+'" '+
        'data-grados="'+ultimaCarta.attr('data-grados')+'">';
            for (let i = 6; i > 0; i--) {
                debugger;
                let carta = $('#carta_'+ i +"_"+columna);
                $('#carta_'+ (i+1) +"_"+columna).attr('src',carta.attr('src'))
                .attr('data-lado1', carta.attr('data-lado1'))
                .attr('data-lado2', carta.attr('data-lado2'))
                .attr('data-lado3', carta.attr('data-lado3'))
                .attr('data-tesoro', carta.attr('data-tesoro'))
                .attr('data-grados', carta.attr('data-grados'))
                .css('transform', 'rotate('+carta.attr('data-grados') +'deg)')
            }
            $('#carta_'+ 1 +"_"+columna)
            .attr('src', $('.draggable').attr('src'))
            .attr('data-lado1', $('.draggable').attr('data-lado1'))
            .attr('data-lado2',$('.draggable').attr('data-lado2'))
            .attr('data-lado3', $('.draggable').attr('data-lado3'))
            .attr('data-tesoro', $('.draggable').attr('data-tesoro'))
            .attr('data-grados', $('.draggable').attr('data-grados'))
            .css('transform', 'rotate('+$('.draggable').attr('data-grados') +'deg)')
            $('.draggable').remove();
        }
        if(direccion == 'flecha-arriba.png'){
            ultimaCarta = $('#carta_'+ 1 +"_"+columna)
            ultimaCarta ='<img src="'+ultimaCarta.attr('src')+'" data-lado1="'+ultimaCarta.attr('data-lado1') +
            '" data-lado2="'+ultimaCarta.attr('data-lado2')+'" data-lado3="'+ultimaCarta.attr('data-lado3') + '" data-tesoro="'+ultimaCarta.attr('data-tesoro')+'" '+
            'data-grados="'+ultimaCarta.attr('data-grados')+'">';
            for (let i = 2; i<8; i++) {
                debugger;
                let carta = $('#carta_'+ i +"_"+columna);
                $('#carta_'+ (i-1) +"_"+columna).attr('src',carta.attr('src'))
                .attr('data-lado1', carta.attr('data-lado1'))
                .attr('data-lado2', carta.attr('data-lado2'))
                .attr('data-lado3', carta.attr('data-lado3'))
                .attr('data-tesoro', carta.attr('data-tesoro'))
                .attr('data-grados', carta.attr('data-grados'))
                .css('transform', 'rotate('+carta.attr('data-grados') +'deg)')
            }
            $('#carta_'+ 7 +"_"+columna)
            .attr('src', $('.draggable').attr('src'))
            .attr('data-lado1', $('.draggable').attr('data-lado1'))
            .attr('data-lado2',$('.draggable').attr('data-lado2'))
            .attr('data-lado3', $('.draggable').attr('data-lado3'))
            .attr('data-tesoro', $('.draggable').attr('data-tesoro'))
            .attr('data-grados', $('.draggable').attr('data-grados'))
            .css('transform', 'rotate('+$('.draggable').attr('data-grados') +'deg)')
            $('.draggable').remove();
        }
        if(direccion == "flecha-derecha.png"){
            ultimaCarta = $('#carta_'+ fila +"_"+7)
            ultimaCarta ='<img src="'+ultimaCarta.attr('src')+'" data-lado1="'+ultimaCarta.attr('data-lado1') +
            '" data-lado2="'+ultimaCarta.attr('data-lado2')+'" data-lado3="'+ultimaCarta.attr('data-lado3') + '" data-tesoro="'+ultimaCarta.attr('data-tesoro')+'" '+
            'data-grados="'+ultimaCarta.attr('data-grados')+'">';
            for (let i = 6; i > 0; i--) {
                debugger;
                let carta = $('#carta_'+ fila +"_"+ i);
                $('#carta_'+ fila +"_"+(i+1)).attr('src',carta.attr('src'))
                .attr('data-lado1', carta.attr('data-lado1'))
                .attr('data-lado2', carta.attr('data-lado2'))
                .attr('data-lado3', carta.attr('data-lado3'))
                .attr('data-tesoro', carta.attr('data-tesoro'))
                .attr('data-grados', carta.attr('data-grados'))
                .css('transform', 'rotate('+carta.attr('data-grados') +'deg)')
            }
            $('#carta_'+ fila +"_"+1)
            .attr('src', $('.draggable').attr('src'))
            .attr('data-lado1', $('.draggable').attr('data-lado1'))
            .attr('data-lado2',$('.draggable').attr('data-lado2'))
            .attr('data-lado3', $('.draggable').attr('data-lado3'))
            .attr('data-tesoro', $('.draggable').attr('data-tesoro'))
            .attr('data-grados', $('.draggable').attr('data-grados'))
            .css('transform', 'rotate('+$('.draggable').attr('data-grados') +'deg)')
            $('.draggable').remove();
        }
        if(direccion == "flecha-izquierda.png"){
            ultimaCarta = $('#carta_'+ fila +"_"+1)
            ultimaCarta ='<img src="'+ultimaCarta.attr('src')+'" data-lado1="'+ultimaCarta.attr('data-lado1') +
            '" data-lado2="'+ultimaCarta.attr('data-lado2')+'" data-lado3="'+ultimaCarta.attr('data-lado3') + '" data-tesoro="'+ultimaCarta.attr('data-tesoro')+'" '+
            'data-grados="'+ultimaCarta.attr('data-grados')+'">';
            for (let i = 2; i<8; i++) {
                debugger;
                let carta = $('#carta_'+ fila +"_"+i);
                $('#carta_'+ fila +"_"+(i-1)).attr('src',carta.attr('src'))
                .attr('data-lado1', carta.attr('data-lado1'))
                .attr('data-lado2', carta.attr('data-lado2'))
                .attr('data-lado3', carta.attr('data-lado3'))
                .attr('data-tesoro', carta.attr('data-tesoro'))
                .attr('data-grados', carta.attr('data-grados'))
                .css('transform', 'rotate('+carta.attr('data-grados') +'deg)')
            }
            $('#carta_'+ fila +"_"+7)
            .attr('src', $('.draggable').attr('src'))
            .attr('data-lado1', $('.draggable').attr('data-lado1'))
            .attr('data-lado2',$('.draggable').attr('data-lado2'))
            .attr('data-lado3', $('.draggable').attr('data-lado3'))
            .attr('data-tesoro', $('.draggable').attr('data-tesoro'))
            .attr('data-grados', $('.draggable').attr('data-grados'))
            .css('transform', 'rotate('+$('.draggable').attr('data-grados') +'deg)')
            $('.draggable').remove();
        }

        $('#carta_sobrante').html(ultimaCarta)
        $('#carta_sobrante img').addClass('draggable').draggable({
            disabled: true,
            containment: '#contenedor',
            revert: 'invalid',
            opacity: 0.50,
            cursorAt: {
                top: $('img[data-reservada="NO"]').height()/2,
                left: $('img[data-reservada="NO"]').width()
              },
            drag: function(event, ui) {
                // Establece el nuevo ancho del elemento mientras se está arrastrando
                ui.helper.css({"width": $('img[data-reservada="NO"]').width(), 'height' : $('img[data-reservada="NO"]').height()})
            },
              stop: function(event, ui) {
                // Restaura el ancho original del elemento si se revierte el efecto
                ui.helper.css({'top': '0', 'left' : '0', 'width': 'fit-content', 'height' : '15vh'})
            }
        
        }).css({'transform': 'rotate('+$('#carta_sobrante img').attr('data-grados')+'deg)', 'opacity' : '0.50'});
        movimientoValido = true;
        return true;
        
    }else{
        alert('No puede introducir la pieza en esta ' + texto )
        return false;
    }

}
