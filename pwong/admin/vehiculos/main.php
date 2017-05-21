<?php

if(isset($_POST['action'])){
	include '../../cnf/vehiculo.php';
	header('Content-Type: application/json');
	$obj =  new Vehiculo();
	session_start();
	switch ($_POST['action']) {
		case 'getVehiculos':
		echo $obj->getVehiculos();
		break;
		case 'getDatosModal':
		echo $obj->getDatosModal($_POST['id']);
		break;
		case 'newVehiculo':
		echo $obj->newVehiculo($_POST['dt']);
		break;
		case 'getUsuario':
		echo $obj->usuario();
		break;
		default:
		echo "Opción Inválida";
		break;

	}
}
?>