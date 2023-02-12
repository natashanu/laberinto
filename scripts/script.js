$(function() {
    //Cuando inicia el juego
    $('#contenedor').html(
        "<header></header>" +
        "<main><div id='titulo'>LABERINTO</div> "+
        "<div id='comenzar' tabindex='0' role='link'>Comenzar!</div></main>" +
        "<div class='panel'><div class='ventana'></div></div>"+
        "<footer></footer>"
    );  
    $('#comenzar').addClass('rainbow-button');   
      
    $(document).on('click', '#comenzar', function(){
        cargarEstructura();
        seleccionPartida();
    })
});

//Función que carga la sección principal del juego
function cargarEstructura(){
    $('header').html(
        '<nav>'+
            '<h2 id="jugar" tabindex="0" role="link">Jugar</h2>'+
            '<h2 id="instrucciones" tabindex="0" role="link">Instrucciones</h2>'+
            '<h2 id="marcador" tabindex="0" role="link">Marcador</h2>'+
        '</nav>'
    );
    $('footer').html('');
    $(document).on('click', '#jugar', function(){
        seleccionPartida();
    });  
    $(document).on('click', '#instrucciones', function(){
        cargarInstrucciones();
    });
    $(document).on('click', '#marcador', function(){
        cargarMarcador();
    });
    $('nav h2').hover(
        function() {
          $( this ).css('text-decoration', 'underline');
        }, function() {
          $( this ).css('text-decoration', 'none');
        }
    );
}

function seleccionPartida(){
    document.title = "Laberinto | Partida";
    $('footer').html('');
    $('#marcador, #jugar, #instrucciones').removeClass('paginaAct');
    $('#jugar').addClass('paginaAct');
    $('main').html(
        '<h2>Crear partida</h2>'+
        '<div id="jugadores2" tabindex="0">2 jugadores</div>'+
        '<div id="jugadores3" tabindex="0">3 jugadores</div>'+
        '<div id="jugadores4" tabindex="0">4 jugadores</div>'
    );
    $('main div').addClass('rainbow-button');
    $(document).on('click', '#jugadores2', function(){
        crearPartida(2);
    })
    $(document).on('click', '#jugadores3', function(){
        crearPartida(3);
    })
    $(document).on('click', '#jugadores4', function(){
        crearPartida(4);
    })
}

function cargarInstrucciones(){
    document.title = "Laberinto | Instrucciones";
    $('#marcador, #jugar, #instrucciones').removeClass('paginaAct');
    $('#instrucciones').addClass('paginaAct');
    $('main').html(
        '<div></div>'
    );
}

//Función que crea el marcador con las posiciones de los jugares
//Aquí tengo un problema de sincronia
function cargarMarcador(){
    document.title = "Laberinto | Marcador";
    $('#marcador, #jugar, #instrucciones').removeClass('paginaAct');
    $('#marcador').addClass('paginaAct');
    $('main').html('<div id="tablaMarcador"></div>');        
    let texto = '<table>'+
            '<tr>'+
            '<th>Posición</th>' +
            '<th>Nombre</th>' +
            '<th>Puntuación</th>'+
            '</tr>';
    $.getJSON('servidor/cargarUsuarios.php', function(datos){
        posicion = 1;       
        $.each(datos,function(){
            texto += '<tr>'+
                '<td>' +posicion + '</td>' + 
                '<td>' +this.nombre + '</td>' +
                '<td>' +this.puntos + '</td>' +
            '</tr>';
            posicion++;
        })
    texto += '</table>';
        $('#tablaMarcador').html(texto);
        $('tr:odd').addClass('filasPares');
        $('tr:even:not(:eq(0))').addClass('filasImpares');

    })      

}

/*Separamos cargar usuarios para llamarlo en varios sitios*/
function cargarUsuarios(){
    $.getJSON('servidor/cargarUsuarios.php', function(datos){
        return datos;
    })  
}

/*En esta función se elije el nombre de los jugadores de la partida*/
function crearPartida(numJugadores){
    document.title = "Laberinto | Partida " + numJugadores + " jugadores";
    $('header').html('<img id="volver" src="imagenes/flecha.png" width="50px" title="Volver">');
    $(document).on('click', '#volver', function(){
        cargarEstructura();
        seleccionPartida();
    });
    let texto = "<h2>Partida de " + numJugadores+ " jugadores</h2>";
    for (let i = 0; i < numJugadores; i++) {
        texto+= '<div id="jugador_'+ (i+1) +'">Jugador '+ (i+1) +' : <input><button onclick="elegirJugador(\'jugador_'+ (i+1) +'\');">Elegir jugador</button></div>'; 
    }
    texto += '<div class="rainbow-button otro" onclick="verificarDatos('+ numJugadores+');">Empezar partida</div>';
    $('main').html(texto);
}

/*Función que verifica que los datos introducidos en el input no son de un usuario existente o un usuario invalido (cadena vacía)*/
function verificarDatos(numJugadores){
    $.getJSON('servidor/cargarUsuarios.php', function(datos){
        valido = true;
        for (let i = 0; i < numJugadores; i++) {
            if($('#jugador_'+ (i+1) + ' input').val()==""){
                valido = false;
                $('#jugador_'+ (i+1) + ' input').addClass('rojo');
            }else if($('#jugador_'+ (i+1) + ' input').val()!=""){
                $('#jugador_'+ (i+1) + ' input').removeClass('rojo');
            }
            $.each(datos,function(){
                if($('#jugador_'+ (i+1) + ' input').val()==this.nombre){
                    valido = false;
                    $('#jugador_'+ (i+1) + ' input').addClass('rojo');
                }else if($('#jugador_'+ (i+1) + ' input').val()==this.nombre){
                    $('#jugador_'+ (i+1) + ' input').removeClass('rojo');
                }
            })
            
        }
        if(valido){
            for (let i = 0; i < numJugadores; i++) {
                $.post('servidor/crearUsuario.php', {nombre: $('#jugador_'+ (i+1) + ' input').val(), puntos:0}, function(){
                    
                })
            }
            cargarTablero(numJugadores)  
        }
    })
    
}

//Se puede reutilizar para cada modo de juego
//Sirve para elegir un jugador existente en la BD
function elegirJugador(jugador){
    console.log(jugador)
    $.getJSON('servidor/cargarUsuarios.php', function(datos){
        let texto = '<select>'+
            '<option value="0">Selecciona un jugador</option>'
        $.each(datos,function(){
            texto += '<option value="'+this.idUsuario+'">'+ this.nombre+'</option>';
        })
        texto+= '</select>';
        let numJugador= jugador.split('_')
        $('#' + jugador).html("Jugador " + numJugador[1] +" :" + texto);
    })
}

function cargarTablero(numJugadores){
    cargarSonido('creacion');
    tamanhoTablero = 49;
    lado = 9;
    let cabecera = '<img id="equis" src="./imagenes/equis.png" title="Salir"><img id="reglas" src="./imagenes/reglas.png" title="Reglas">'+
                    '<div id="jugadores">';
    for (let k = 0; k < numJugadores; k++) {
        cabecera += '<div class="jugador" id="jugador'+(k+1)+'">'+
            '<div>'+ $('#jugador_'+ (k+1) + ' input').val() +'</div>' +
            '<div>100</div>'+
        '</div>';
    }
    cabecera += '<dialog id="ventana"></dialog></div>';
    $('header').html(cabecera);
    $("#equis").on('click', function(){
        $('#ventana').html(cargarVentana('cerrar',numJugadores));
        $('.panel').show();
        $("#ventana").show();
    })
    $("#reglas").on('click', function(){
        $('.panel').show();
        $('#ventana').html(cargarVentana('reglas',numJugadores));
        $("#ventana").show();
    })

    texto ='<div id="tablero">';
    $.getJSON('servidor/cargarCartasRes.php', function(cartasRes){
        $.getJSON('servidor/cargarCartas.php', function(cartas){
            cartas = cartas.sort((a, b) => 0.5 - Math.random());
            posicion = 0;
            //console.log(cartas);
            for (let i = 0; i < lado; i++) {
                texto += '<div class="fila">';         
                for (let j = 0; j < lado; j++) {        
                let bandera = true;
                    $.each(cartasRes, function(){
                        if(this.fila==i && this.columna==j){
                            //console.log("i :" + i + " j: " + j + " fila: " + this.fila + " columna: " + this.columna )
                            texto += '<img id="carta_'+i+'_'+j+'" src="imagenes/reservadas/'+ this.url+
                            '" data-lado1="'+this.lado1+'" data-lado2="'+this.lado2+'" data-lado3="'+this.lado3+'">';
                            bandera = false;
                        }
                    })
                    if(bandera){
                        if(i!=0 && j!=0 && i!=lado-1 && j!=lado-1){
                            carta = Object.values(cartas[posicion]);
                            console.log(carta)
                            texto += '<img id="carta_'+i+'_'+j+'" src="imagenes/'+ carta[1]+
                            '" data-lado1="'+carta[2]+'" data-lado2="'+carta[3]+'" data-lado3="'+carta[4]+'"  data-reservada="NO">';
                            posicion++;
                            console.log(posicion)
                        }else{
                            texto += '<p></p>';
                        }

                    }

                }
                texto += "</div>";
                
            }
            carta = Object.values(cartas[posicion]);
            texto += "</div>"+
                    "<div id='botones'>"+
                        "<button class='rainbow-button'>Mostrar carta</button>"+
                        "<button class='rainbow-button'>Comprobar carta</button>"+
                        "<button id='saltar' class='rainbow-button'>Saltar turno</button>"+
                    "</div>";
            $('main').html(texto);
            $('footer').html("<div id='carta_sobrante'><img src='imagenes/"+ carta[1]+"' data-lado1='"+carta[2]+
            "' data-lado2='"+carta[3]+"' data-lado3='"+carta[4]+"'  data-reservada='NO'></div>");
            $('#carta_sobrante img').addClass('draggable').draggable({
                containment: '#contenedor',
                revert: 'invalid',
               
        });
            $('img[src*="flecha"]').addClass('droppable').droppable({
                drop: function( event, ui ) {
                    ui.draggable.css({"width": $('img[data-reservada="NO"]').width(), 'height' : $('img[data-reservada="NO"]').height()});
                    let direccion = $(this).attr('src').split('/');
                    let posicion = $(this).attr('id').split('_');
                    moverPiezaTablero(direccion[2], posicion[1], posicion[2]);
                 }
             });

            $('img[src*="flecha"]').css({'width': '30px', 'margin' : 'auto'})

            girarCartas();
            dibujarJugadores(numJugadores);
            jugadorActivo= Math.floor(Math.random() * numJugadores);   
            saltarTurno(numJugadores)
            
        })
        
    })
    $(document).on('click', '#insertar' ,function(){

    })


    $(document).on('click', '#saltar' ,function(){
        saltarTurno(numJugadores)
    })

    $(document).on('click', '[id*="carta_"]' ,function(){
        let posicion = $(this).attr('id').split('_')
        moverPiezaJugador(posicion[1],posicion[2]);
        // $('#carta_sobrante').css({ 'margin-top': '0','transition': '0.9s ease-out'})
    })

}

function girarCartas(){
    $('img[data-reservada="NO"]').each(function(){
        let giros = Math.floor(Math.random() * (4-1)+1);
        for (let i = 0; i < giros; i++) {
            this.rotacion=(this.rotacion+90) || 90;
            this.style.transform="rotate("+this.rotacion+"deg)";    
            for (let j = 1; j < 4; j++) {
                let lado = '';
                let pos = 'data-lado'+j
                switch($(this).attr(pos)){
                    case 'izquierda':
                        lado = 'arriba'; 
                    break;
                    case 'derecha':
                        lado = 'abajo';
                        break;
                    case 'abajo':
                        lado = 'izquierda';
                        break;
                    case 'arriba':
                        lado = 'derecha';
                        break;
                    default:
                }
                console.log(this.id + ' lado' + j + " "+ lado);
                $(this).attr(pos, lado)
                console.log($(this).attr(pos))
            }
        }
    })

}

    function saltarTurno(numJugador){
        cargarSonido('plop');
        jugadorActivo = (jugadorActivo==numJugador-1)? 0 : jugadorActivo+1;
        console.log(jugadorActivo);
        $('[id*=jugador]').removeClass('turnoAct')
        $('#jugador'+(jugadorActivo+1)).addClass('turnoAct')

    }

    //Función que mueve la pieza del jugador
    //Recibe de parametro las coordenadas (x,y) de la carta a la que se quiere mover
    function moverPiezaJugador(i,j){
        console.log("fila" + i + " columna" + j)
        i = parseFloat(i);
        j = parseFloat(j);
        console.log("juagdor " +(jugadorActivo+1))
        let fila = parseInt($('#pieza_'+(jugadorActivo+1)).attr('data-fila'))
        let columna = parseInt($('#pieza_'+(jugadorActivo+1)).attr('data-columna'))
        //Primero verificamos la contiguidad
        //Verificamos si se quiere mover en fila
        if((fila+1)==i && columna==j){ //Se va a mover hacia abajo
            movimiento(fila,columna,i,j ,'bajar');
        }else if((fila-1)==i  && columna==j){//Se va a mover hacia arriba
            movimiento(fila,columna,i,j ,'subir');
        //Verificamos si se quiere mover en columna
        }else if((columna+1)==j  && fila==i){//Se va a mover a la derecha
            movimiento(fila,columna,i,j ,'derecha');
        }else if((columna-1)==j  && fila==i){//Se va a mover a la izquierda
            movimiento(fila,columna,i,j ,'izquierda');
        }else{
            alert('No se puede mover a la pieza seleccionada')
        }
    }

    //Recibe las coordenadas de la ubicación de la pieza, la ubicación de la carta a moverse, y el movimiento a realizar
    function movimiento(pieza_i,pieza_j, i, j, direccion){
        let lado1 = ''; //direccion que debe tener la carta donde esta posicionada la pieza
        let lado2 = ''; //direccion que debe tener la carta a la que quiere posicionarse
        let carta1 = $('#carta_'+ pieza_i + '_' + pieza_j);
        let carta2 = $('#carta_'+ i + '_' + j);
        switch(direccion){
            case 'bajar':
                lado1= 'abajo'
                lado2= 'arriba'
                break;
            case 'subir':
                lado1= 'arriba'
                lado2= 'abajo'
                break;
            case 'derecha':
                lado1= 'derecha'
                lado2= 'izquierda'
                break;
            case 'izquierda':
                lado1= 'izquierda'
                lado2= 'derecha'
                break;
            default:
        }
        let bandera1 = false;
        let bandera2 = false;
        for (let k = 0; k < 3; k++) {
            if(carta1.data('lado'+(k+1))==lado1) bandera1=true;        
        }
        for (let k = 0; k < 3; k++) {
            if(carta2.data('lado'+(k+1))==lado2) bandera2=true;        
        }
        console.log(bandera1 +" "+ bandera2)
        if(bandera1==true && bandera2==true){
            $('#pieza_'+(jugadorActivo+1))
            .attr('data-fila', i)
            .attr('data-columna', j)
            $('#pieza_'+(jugadorActivo+1)).css({'left': 10+tablero*j/9, 'top': 10+tablero*i/9})
        }else alert('No se puede mover a la pieza seleccionada')

    }

    function moverPiezaTablero(direccion, fila, columna){
        console.log(direccion)   
        console.log(fila)
        console.log(columna)
        if(direccion == "flecha-abajo.png"){
           //Se mueven las cartas del 1 al 7
           ultimaCarta = $('#carta_'+ 7 +"_"+columna);
           console.log(ultimaCarta)
            for (let i = 6; i > 0; i--) {
                debugger;
                let carta = $('#carta_'+ i +"_"+columna);
                console.log(carta.attr('style'));
                console.log(carta.attr('src'))
                $('#carta_'+ (i+1) +"_"+columna).attr('src',carta.attr('src'))
                .attr('data-lado1', carta.attr('data-lado1'))
                .attr('data-lado2', carta.attr('data-lado2'))
                .attr('data-lado3', carta.attr('data-lado3'))
                .attr('style', carta.attr('style'))
                console.log($('#carta_'+ (i+1) +"_"+columna).attr('src'))
            }
            console.log($('.draggable').attr('style'))
            $('#carta_'+ 1 +"_"+columna)
            .attr('src', $('.draggable').attr('src'))
            .attr('data-lado1', $('.draggable').attr('data-lado1'))
            .attr('data-lado2',$('.draggable').attr('data-lado2'))
            .attr('data-lado3', $('.draggable').attr('data-lado3'))
            $('.draggable').remove();
        }
        $('#carta_sobrante').html('<img src="'+ultimaCarta.attr('src') +'">')
        $('#carta_sobrante img')
        .attr('data-lado1', ultimaCarta.attr('data-lado1'))
        .attr('data-lado2', ultimaCarta.attr('data-lado2'))
        .attr('data-lado3', ultimaCarta.attr('data-lado3'))
        .attr('style', ultimaCarta.attr('style'))
        $('#carta_sobrante img').addClass('draggable').draggable({
            containment: '#contenedor',
            revert: 'invalid',
           
        });
    
    }

