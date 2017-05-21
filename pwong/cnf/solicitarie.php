<?php
require_once('logmanager.php');
class Solicitarie extends LogManager
{
	function newSolicitud($dt){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>array());
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		try{
			$query="INSERT INTO solicitud_ie (id_cliente, fecha, origen, destino, peso, bultos) 
			VALUES (:id, :fecha, :origen, :destino, :peso, :bultos)";
			$sth = $cnx->prepare($query);
			$sth->execute($dt);
			$retval['s']=$query;
			if($retval['r']=$sth->rowCount())
				$retval['data']=true;
		}
		catch(PDOException $e){
			$retval['error']=true;
			$retval['r']=$e->getMessage();
		}
		return json_encode($retval);
	}	

}
?>