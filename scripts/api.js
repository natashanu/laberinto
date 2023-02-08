function comenzarJuego(numJugadores){
    for (let i = 0; i < numJugadores; i++) {
        $('img[src*="jugador'+(i+1)+'"]').parent().append('<div id="pieza_'+(i+1)+'">');
        
    }

}