-- Creación de la base de datos
create database if not exists laberinto
	default character set utf8mb4
    default collate utf8mb4_spanish_ci;
    
use laberinto;

-- Creación de la tabla usuario
create table if not exists usuario(
idUsuario tinyint auto_increment,
nombre varchar(25) not null,
puntos int,
	constraint pk_usuario primary key (idUsuario)
)engine=InnoDB;

-- Añadimos usuarios
insert into usuario (nombre, puntos) values ('natasha', 0),('pepe',0);

-- Creación de la tabla cartasReservadas
create table if not exists cartas(
idCarta tinyint auto_increment,
url varchar(25) not null,
fila int,
columna int,
	constraint pk_Carta primary key (idCarta)
)engine=InnoDB;

insert into cartas(url, fila, columna) values ('flecha-abajo.png', 0, 2), ('flecha-abajo.png', 0, 4), ('flecha-abajo.png', 0, 6),
('jugador1.png', 1, 1), ('jugador3.png', 1, 7), ('jugador2.png', 7, 1), ('jugador4.png', 7, 7),
('flecha-derecha.png', 2, 0), ('flecha-derecha.png', 4, 0), ('flecha-derecha.png', 6, 0),
('flecha-arriba.png', 8, 2),('flecha-arriba.png', 8, 4),('flecha-arriba.png', 8, 6),
('flecha-izquierda.png', 2, 8),('flecha-izquierda.png', 4, 8),('flecha-izquierda.png', 6, 8),
('arriba.png', 7, 3), ('arriba.png', 7, 5), ('arriba.png', 5, 3), 
('abajo.png', 1, 3), ('abajo.png', 1, 5), ('abajo.png', 3, 5), 
('derecha.png', 3, 1), ('derecha.png', 5, 1), ('derecha.png', 3, 3), 
('izquierda.png', 3, 7),('izquierda.png', 5, 7),('izquierda.png', 5, 5);

