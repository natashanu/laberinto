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

/**/
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

function verificarDatos(numJugadores){
    $.getJSON('servidor/cargarUsuarios.php', function(datos){
        valido = true;
        for (let i = 0; i < numJugadores; i++) {
            if($('#jugador_'+ (i+1) + ' input').val()==""){
                valido = false;
                $('#jugador_'+ (i+1) + ' input').addClass('rojo');
            }
            $.each(datos,function(){
                if($('#jugador_'+ (i+1) + ' input').val()==this.nombre){
                    valido = false;
                    $('#jugador_'+ (i+1) + ' input').addClass('rojo');
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
    tamanhoTablero = 49;
    lado = 9;
    let cabecera = '<img id="equis" src="./imagenes/equis.png" title="Salir"><img id="reglas" src="./imagenes/reglas.png" title="Reglas">'+
                    '<div id="jugadores">';
    for (let k = 0; k < numJugadores; k++) {
        cabecera += '<div class="jugador">'+
            '<div>'+ $('#jugador_'+ (k+1) + ' input').val() +'</div>' +
            '<div>0</div>'+
        '</div>';
    }
    cabecera += '<dialog id="ventana"></dialog></div>';
    $('header').html(cabecera);
    $("#equis").on('click', function(){
        $('#ventana').html(cargarVentana('cerrar'));
        $('.panel').show();
        $("#ventana").show();
    })
    $("#reglas").on('click', function(){
        $('.panel').show();
        $('#ventana').html(cargarVentana('reglas'));
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
                    "</div>";
            $('main').html(texto);
            $('footer').html("<div id='carta_sobrante'><img src='imagenes/"+ carta[1]+"' data-lado1='"+carta[2]+
            "' data-lado2='"+carta[3]+"' data-lado3='"+carta[4]+"'  data-reservada='NO'></div>");
            $('#carta_sobrante img').draggable();
            $('img[src*=flecha]').css({'width': '30px', 'margin' : 'auto'})
            girarCarta();
            tablero = $('#tablero').width()
            for (let i = 0; i < numJugadores; i++) {
                $('#tablero').append('<div id="pieza_'+(i+1)+'" class="pieza" data-jugador="jugador_'+(i+1)+'">');
                posicion = $('img[src*="jugador'+(i+1)+'"]').attr('id').split('_')
                console.log(tablero*posicion[2]/9)
                console.log('#pieza_'+(i+1))
                $('#pieza_'+(i+1)).css({'left': 10+tablero*posicion[2]/9, 'top': 10+tablero*posicion[1]/9})
                
            }

            //https://programandoointentandolo.com/2013/02/arrastrar-y-soltar-en-html5-drag-drop-html5.html
            comenzarJuego(numJugadores);
        })
        
    })
    $(document).on('click', '#insertar' ,function(){
        // $('#carta_sobrante').css({ 'margin-top': '0','transition': '0.9s ease-out'})
    })

}

function girarCarta(){
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