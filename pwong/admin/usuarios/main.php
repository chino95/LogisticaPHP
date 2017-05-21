<?php

if(isset($_POST['action'])){
	include '../../cnf/usuarios.php';
	header('Content-Type: application/json');
	$obj =  new Usuarios();
	session_start();
	switch ($_POST['action']) {
		case 'get':
		echo $obj->getUsuarios();
		break;
		case 'new':
		echo $obj->newUsuario($_POST['dt']);
		break;
		case 'getDatosModal':
		echo $obj->getDatosModal($_POST['id']);
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