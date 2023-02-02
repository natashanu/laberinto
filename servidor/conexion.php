<?php
	$servidor="localhost";
	$usuario="root";
	$contrasinal="";
	$baseDatos="laberinto";

	// Creamos la conexión
	$conexion = new mysqli($servidor, $usuario, $contrasinal, $baseDatos);
	$conexion->query("SET NAMES 'utf8'");
?>