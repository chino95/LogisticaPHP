<?php

if(isset($_POST['action'])){
	include '../cnf/logmanager.php';
	header('Content-Type: application/json');
	$obj =  new LogManager();
	switch ($_POST['action']) {
		case 'new':
		echo $obj->newUser($_POST['dt']);
		break;
		case 'login':
			echo $obj->login($_POST['dt']);
		break;
		case 'CheckSession':
		echo $obj->CheckSession();
		break;
		default:
			echo "Opción Inválida";
		break;
	}
}
?>