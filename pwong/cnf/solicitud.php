<?php
require_once('logmanager.php');
class Solicitud extends LogManager
{
	function getServicio(){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>array());
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		try{
			$sth = $cnx->prepare("SELECT nombre FROM servicios");
			$sth->execute();

			while($row = $sth->fetch(PDO::FETCH_ASSOC)){
				$retval['data']=true;
				// array_push($retval['r'], array($row['nombre']));
				 array_push($retval['r'], array('<option>'.$row['nombre'].'</option>'));
			}
		}
		catch(PDOException $e){
			$retval['error']=true;
			$retval['r']=$e->getMessage();
		}
		return json_encode($retval);
	}

}
?>