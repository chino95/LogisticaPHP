<?php
require_once('logmanager.php');
class Tramiteie extends LogManager
{
	function getTramitesie(){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>array());
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		try{
			$sth = $cnx->prepare("SELECT sie.id_cliente ,c.empresa, c.contacto, sie.fecha FROM solicitud_ie sie
				INNER JOIN clientes c ON sie.id_cliente = c.id_cliente");
			$sth->execute();
			while($row = $sth->fetch(PDO::FETCH_ASSOC)){
				$retval['data']=true;
				array_push($retval['r'], array($row['empresa'], $row['contacto'],$row['fecha'],'<button class="btn btn-outline dark" onclick="ModalVer('.$row['id_cliente'].')" data-toggle="tooltip" title="Ver Cotización"><i class="fa fa-eye"></i></button>
					<button class="btn btn-outline green" onclick="aceptarTramite('.$row['id_cliente'].')" data-toggle="tooltip" title="Aceptar Cotización"><i class="fa fa-check-circle-o"></i></button>
					<button class="btn btn-outline red" onclick="rechazarCoti('.$row['id_cliente'].')" data-toggle="tooltip" title="Rechazar Cotización"><i class="fa fa-times-circle-o"></i></button>'));
			}
		}
		catch(PDOException $e){
			$retval['error']=true;
			$retval['r']=$e->getMessage();
		}
		return json_encode($retval);
	}

	function getDatosModal($id){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>array());
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		try{
			$sth = $cnx->prepare("SELECT sie.origen, sie.destino, sie.peso, sie.bultos FROM solicitud_ie sie
				WHERE sie.id_solicitudie = :id");
			$sth->bindParam(":id", $id);
			$sth->execute();

			while($row = $sth->fetch(PDO::FETCH_ASSOC)){
				$retval['data']=true;
				array_push($retval['r'], array($row['origen'], $row['destino'], $row['peso'], $row['bultos']));
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