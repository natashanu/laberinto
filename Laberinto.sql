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
create table if not exists cartas_reservadas(
idCarta tinyint auto_increment,
url varchar(30) not null,
fila int,
columna int,
lado1 varchar(30) not null,
lado2 varchar(30) not null,
lado3 varchar(30) not null default '0',
	constraint pk_carta_reservada primary key (idCarta)
)engine=InnoDB;

insert into cartas_reservadas(url, fila, columna, lado1, lado2, lado3) values 
('flecha-abajo.png', 0, 2, '0', '0', '0'), 
('flecha-abajo.png', 0, 4, '0', '0', '0'), 
('flecha-abajo.png', 0, 6, '0', '0', '0'),
('flecha-derecha.png', 2, 0, '0', '0', '0'), 
('flecha-derecha.png', 4, 0, '0', '0', '0'), 
('flecha-derecha.png', 6, 0, '0', '0', '0'),
('flecha-arriba.png', 8, 2, '0', '0', '0'),
('flecha-arriba.png', 8, 4, '0', '0', '0'),
('flecha-arriba.png', 8, 6, '0', '0', '0'),
('flecha-izquierda.png', 2, 8, '0', '0', '0'),
('flecha-izquierda.png', 4, 8, '0', '0', '0'),
('flecha-izquierda.png', 6, 8, '0', '0', '0'),
('jugador1.png', 1, 1, 'derecha','abajo', '0'), 
('jugador3.png', 1, 7, 'izquierda','abajo', '0'), 
('jugador2.png', 7, 1, 'derecha','arriba', '0'), 
('jugador4.png', 7, 7, 'izquierda','arriba', '0'),
('arriba.png', 7, 3, 'derecha','arriba', 'izquierda'), 
('arriba.png', 7, 5, 'derecha','arriba', 'izquierda'), 
('arriba.png', 5, 3, 'derecha','arriba', 'izquierda'),
('abajo.png', 1, 5, 'derecha','abajo', 'izquierda'),  
('abajo.png', 1, 3, 'derecha','abajo', 'izquierda'), 
('abajo.png', 3, 5, 'derecha','abajo', 'izquierda'), 
('derecha.png', 3, 1, 'derecha','arriba', 'abajo'), 
('derecha.png', 5, 1, 'derecha','arriba', 'abajo'), 
('derecha.png', 3, 3, 'derecha','arriba', 'abajo'), 
('izquierda.png', 3, 7, 'izquierda','arriba', 'abajo'),
('izquierda.png', 5, 7, 'izquierda','arriba', 'abajo'),
('izquierda.png', 5, 5, 'izquierda','arriba', 'abajo');

-- Creación de la tabla de las demás cartas
create table if not exists cartas(
idCarta tinyint,
url varchar(30) not null,
lado1 varchar(30) not null,
lado2 varchar(30) not null,
lado3 varchar(30) not null default '0',
	constraint pk_carta primary key (idCarta)
)engine=InnoDB;

insert into cartas values 
(1, 'recto.png', 'izquierda', 'derecha' , '0'),
(2, 'recto.png', 'izquierda', 'derecha' , '0'),
(3, 'recto.png', 'izquierda', 'derecha' , '0'),
(4, 'recto.png', 'izquierda', 'derecha' , '0'),
(5, 'recto.png', 'izquierda', 'derecha' , '0'),
(6, 'recto.png', 'izquierda', 'derecha' , '0'),
(7, 'recto.png', 'izquierda', 'derecha' , '0'),
(8, 'recto.png', 'izquierda', 'derecha' , '0'),
(9, 'recto.png', 'izquierda', 'derecha' , '0'),
(10, 'recto.png', 'izquierda', 'derecha' , '0'),
(11, 'recto.png', 'izquierda', 'derecha' , '0'),
(12, 'recto.png', 'izquierda', 'derecha' , '0'),
(13, 'curva.png', 'abajo', 'derecha' , '0'),
(14, 'curva.png', 'abajo', 'derecha' , '0'),
(15, 'curva.png', 'abajo', 'derecha' , '0'),
(16, 'curva.png', 'abajo', 'derecha' , '0'),
(17, 'curva.png', 'abajo', 'derecha' , '0'),
(18, 'curva.png', 'abajo', 'derecha' , '0'),
(19, 'curva.png', 'abajo', 'derecha' , '0'),
(20, 'curva.png', 'abajo', 'derecha' , '0'),
(21, 'curva.png', 'abajo', 'derecha' , '0'),
(22, 'curva.png', 'abajo', 'derecha' , '0'),
(23, 'curva.png', 'abajo', 'derecha' , '0'),
(24, 'curva.png', 'abajo', 'derecha' , '0'),
(25, 'curva.png', 'abajo', 'derecha' , '0'),
(26, 'curva.png', 'abajo', 'derecha' , '0'),
(27, 'curva.png', 'abajo', 'derecha' , '0'),
(28, 'curva.png', 'abajo', 'derecha' , '0'),
(29, 'tres.png', 'izquierda', 'abajo', 'arriba'),
(30, 'tres.png', 'izquierda', 'abajo', 'arriba'),
(31, 'tres.png', 'izquierda', 'abajo', 'arriba'),
(32, 'tres.png', 'izquierda', 'abajo', 'arriba'),
(33, 'tres.png', 'izquierda', 'abajo', 'arriba'),
(34, 'tres.png', 'izquierda', 'abajo', 'arriba');

