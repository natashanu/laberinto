<?php
	// Conectamos con la base de datos
	require("conexion.php");

	$consulta = "INSERT INTO usuario (nombre, puntos)
				 VALUES ('".$_POST['nombre']."','".$_POST['puntos']."')";
	$conexion->query($consulta);
	$conexion->close();
?>