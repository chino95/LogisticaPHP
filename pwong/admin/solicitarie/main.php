<?php

if(isset($_POST['action'])){
	require_once '../../cnf/solicitarie.php';
	header('Content-Type: application/json');
	$obj =  new Solicitarie();
	session_start();
	switch ($_POST['action']) {
		case 'newSolicitud':
		echo $obj->newSolicitud($_POST['dt']);
		break;
		default:
		echo "Opción Inválida";
		break;

	}
}
?>