$(function() {
    //Cuando inicia el juego
    $('#contenedor').html(
        "<header></header>" +
        "<main><div id='titulo'>LABERINTO</div> "+
        "<div id='comenzar' tabindex='0' role='link'>Comenzar!</div></main>" +
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
    $('header').html('<img src="imagenes/flecha.png" width="50px" title="Volver">');
    $(document).on('click', 'img[src*=flecha]', function(){
        cargarEstructura();
        seleccionPartida();
    });
    let texto = "<h2>Partida de " + numJugadores+ " jugadores</h2>";
    for (let i = 0; i < numJugadores; i++) {
        texto+= '<div id="jugador_'+ (i+1) +'">Jugador '+ (i+1) +' : <input><button onclick="elegirJugador(\'jugador_'+ (i+1) +'\');">Elegir jugador</button></div>'; 
    }
    texto += '<div class="rainbow-button" onclick="cargarTablero('+ numJugadores+');">Empezar partida</div>';
    $('main').html(texto);
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

// function cargarTablero(numJugadores){
//     tamanhoTablero = 49;
//     lado = 9;
//     let cabecera = '<img id="equis" src="./imagenes/equis.png"><div id="jugadores">';
//     for (let k = 0; k < numJugadores; k++) {
//         cabecera += '<div id="jugador">'+
//             '<div>Nombre</div>' +
//             '<div>Puntuacion</div>'+
//         '</div><dialog id="ventana"></dialog>';
//     }
//     cabecera += '</div>';
//     $('header').html(cabecera);
//     $("#equis").on('click', function(){
//         $('#ventana').html(cargarVentana('cerrar'));
//         $("#ventana").show();
//     })


//     texto ='<div id="tablero">';
//     for (let i = 0; i < lado; i++) {
//         texto += '<div class="columna">';
//         for (let j = 0; j < lado; j++) {
//             if(i==0){
//                 if(j%2==0 && j>0 && j<lado-1) texto+= '<img src="imagenes/flecha-abajo.png">';
//                 else texto+= "<p></p>";
//             }else if(j==0){
//                 if(i%2==0 && i>0 && i<lado-1)texto+= '<img src="imagenes/flecha-derecha.png">';
//                 else texto+= "<p></p>";
//             }else if(j==lado-1){
//                 if(i%2==0 && i>0 && i<lado-1)texto+= '<img src="imagenes/flecha-izquierda.png">';
//                 else texto+= "<p></p>";
//             }else if(i==lado-1){
//                 if(j%2==0 && j>0 && j<lado-1) texto+= '<img src="imagenes/flecha-arriba.png">';
//                 else texto+= "<p></p>";
//             }else{
//                 let ladi = Math.floor(Math.random() * 3);
//                 let imagen ='';
//                 if(ladi==0) imagen = 'imagenes/curva.png';
//                 else if(ladi == 1) imagen = 'imagenes/recto.png';
//                 else imagen = 'imagenes/tres.png';
//                 texto += '<img id="carta" data-lado="' + ladi + '" src="'+ imagen+'">';
//             }
//         }
//         texto += "</div>";
            
//     }
//     texto += "</div>";
//     $('main').html(texto);
//     $('img[src*=flecha]').css({'width': '30px', 'margin' : 'auto'})

// }

function cargarTablero(numJugadores){
    tamanhoTablero = 49;
    lado = 9;
    let cabecera = '<img id="equis" src="./imagenes/equis.png" title="Salir"><img id="reglas" src="./imagenes/reglas.png" title="Reglas">'+
                    '<div id="jugadores">';
    for (let k = 0; k < numJugadores; k++) {
        cabecera += '<div id="jugador">'+
            '<div>Nombre</div>' +
            '<div>Puntuacion</div>'+
        '</div><dialog id="ventana"></dialog>';
    }
    cabecera += '</div>';
    $('header').html(cabecera);
    $("#equis").on('click', function(){
        $('#ventana').html(cargarVentana('cerrar'));
        $('#ventana').css({'z-index':'100'})
        $("#ventana").show();
    })
    $("#reglas").on('click', function(){
        $('#ventana').html(cargarVentana('reglas'));
        
        $("#ventana").show();
    })

    texto ='<div id="tablero">';
    $.getJSON('servidor/cargarCartasRes.php', function(cartasRes){
        $.getJSON('servidor/cargarCartas.php', function(cartas){
            cartas = cartas.sort((a, b) => 0.5 - Math.random());
            posicion = 0;
            console.log(cartas);
            for (let i = 0; i < lado; i++) {
                texto += '<div class="fila">';         
                for (let j = 0; j < lado; j++) {        
                let bandera = true;
                    $.each(cartasRes, function(){
                        if(this.fila==i && this.columna==j){
                            //console.log("i :" + i + " j: " + j + " fila: " + this.fila + " columna: " + this.columna )
                            texto += '<img id="carta_'+i+'_'+j+'" src="imagenes/reservadas/'+ this.url+'">';
                            bandera = false;
                        }
                    })
                    if(bandera){
                        if(i!=0 && j!=0 && i!=lado-1 && j!=lado-1){
                            carta = Object.values(cartas[posicion]);
                            texto += '<img id="carta_'+i+'_'+j+'" src="imagenes/'+ carta[1]+
                            '" data-lado1="'+carta[2]+'" data-lado2="'+carta[3]+'" data-lado3="'+carta[4]+'"  data-reservada="NO">';
                            posicion++;
                        }else{
                            texto += '<p></p>';
                        }

                    }

                }
                texto += "</div>";
                
            }
            texto += "</div>";
            $('main').html(texto);
            $('img[src*=flecha]').css({'width': '30px', 'margin' : 'auto'})
            girarCarta();
        })
        
    })

}

function cargarCartas(){
    $.getJSON('servidor/cargarCartas.php', function(datos){
        return datos;
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
                let pos = 'lado'+j
                switch($(this).data(pos)){
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
                $(this).data(pos, lado)
                console.log($(this).data(pos))
            }
        }
    })

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
            texto = '<img id="equis" onclick="cerrarVentana();" src="./imagenes/equis.png">'
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


