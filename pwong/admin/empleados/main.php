<?php

if(isset($_POST['action'])){
	include '../../cnf/empleados.php';
	header('Content-Type: application/json');
	$obj =  new Empleados();
	session_start();
	switch ($_POST['action']) {
		case 'get':
		echo $obj->getEmpleados();
		break;
		case 'new':
		echo $obj->newUser($_POST['dt']);
		break;
		case 'update':
		echo $obj->updateEmpleado($_POST['dt']);
		break;
		case 'getUsuarioModal':
		echo $obj->getDatosModal($_POST['id']);
		break;
		default:
		echo "Opción Inválida";
		break;

	}
}
?>