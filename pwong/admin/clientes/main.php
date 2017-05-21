<?php

if(isset($_POST['action'])){
	include '../../cnf/clientes.php';
	header('Content-Type: application/json');
	$obj =  new Clientes();
	session_start();
	switch ($_POST['action']) {
		case 'getClientes':
		echo $obj->getClientes();
		break;
		case 'getDatosModal':
		echo $obj->getDatosModal($_POST['id']);
		break;
		case 'new':
		echo $obj->newCliente($_POST['dt']);
		break;
		case 'update':
		echo $obj->updateCliente($_POST['dt']);
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