<?php

if(isset($_POST['action'])){
	include '../../cnf/tramiteie.php';
	header('Content-Type: application/json');
	$obj =  new Tramiteie();
	session_start();
	switch ($_POST['action']) {
		case 'getTramitesie':
		echo $obj->getTramitesie();
		break;
		case 'getDatosModal':
		echo $obj->getDatosModal($_POST['id']);
		break;
		default:
		echo "Opción Inválida";
		break;
	}
}
?>