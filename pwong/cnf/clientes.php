<?php
require_once('logmanager.php');
class Clientes extends LogManager
{
	function getClientes(){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>array());
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		try{
			$sth = $cnx->prepare("SELECT id_cliente, contacto, empresa, direccion, telefono, ctpat, correo FROM clientes");
			$sth->execute();

			while($row = $sth->fetch(PDO::FETCH_ASSOC)){
				$retval['data']=true;
				$ctpat='';
				switch ($row['ctpat']) {
					case '0':
					$ctpat = 'No';
					break;
					case '1':
					$ctpat = 'Si';
					break;
					default:
					break;
				}
				array_push($retval['r'], array($row['contacto'], $row['empresa'], $row['direccion'], $row['telefono'], $ctpat, 
					$row['correo'], '<button class="btn btn-outline-info" onclick="ModalEdit('.$row['id_cliente'].')">Editar</button>'));
			}
		}
		catch(PDOException $e){
			$retval['error']=true;
			$retval['r']=$e->getMessage();
		}
		return json_encode($retval);
	}

	public function updateCliente($dt){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>'');

		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();

		$dt['psw']=hash('sha256', $dt['psw']);
		try{
			$query="UPDATE clientes SET contacto =:nom, empresa=:emp, direccion=:dire, telefono =:tel, ctpat=:ctpat, correo=:email, psw=:psw WHERE id_cliente = :id";
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

	public function getDatosModal($id){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>'');

		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();

		try{
			$sth = $cnx->prepare("SELECT contacto, empresa, direccion, telefono, ctpat, correo FROM clientes where id_cliente=:id");
			$sth->bindParam(":id", $id);
			$sth->execute();
			if($row = $sth->fetch(PDO::FETCH_ASSOC)){	
				$retval['data']=true;
				$retval['r'] = array("contacto"=>$row['contacto'],"empresa"=>$row['empresa'],"direccion"=>$row['direccion'],
					"telefono"=>$row['telefono'],"ctpat"=>$row['ctpat'],"correo"=>$row['correo']);
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