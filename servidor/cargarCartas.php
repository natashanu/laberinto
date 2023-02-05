<?php
	// Conectamos con la base de datos
	require("conexion.php");

	// Seleccionamos las cartas
   	$consulta = "SELECT * 
				FROM cartas";

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