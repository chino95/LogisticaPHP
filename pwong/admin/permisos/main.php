<?php
if(isset($_POST['action'])){
	require_once("../../cnf/logmanager.php");
	$obj =  new LogManager();
	session_start();
	header('Content-Type: application/json');
	switch ($_POST['action']) {
		case 'Logout':
		echo $obj->Logout();
		break;
		default:
		echo "Opción Inválida";
		break;
	}
}
?>