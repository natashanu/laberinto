<?php
	// Conectamos con la base de datos
	require("conexion.php");

	// Seleccionamos los usuarios dados de alta
   	$consulta = "SELECT * 
				FROM usuario
			    ORDER BY puntos desc";

	$salida = array();
	if ($datos = $conexion->query($consulta))
	{   		
		while ($usuario = $datos->fetch_object()) 
		{
			$salida[] = $usuario;
		}
		$datos->close();
	}
	$conexion->close();
	echo json_encode($salida);
?>