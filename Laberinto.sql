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

