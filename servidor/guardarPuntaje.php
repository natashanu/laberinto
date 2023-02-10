<?php
	// Conectamos con la base de datos
	require("conexion.php");

    $puntos = (int) $_POST['puntos'];
	// Seleccionamos las cartas
   	$consulta = "UPDATE usuario
                SET puntos= puntos +".$puntos."
                WHERE nombre='".$_POST['nombre']."'"; 
    $conexion->query($consulta);
    $conexion->close(); 
?>