<?php
require_once('logmanager.php');
class Vehiculo extends LogManager
{
	function getVehiculos(){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>array());
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		try{
			$sth = $cnx->prepare("SELECT id_vehiculo, marca, modelo, tipo, status FROM vehiculos");
			$sth->execute();

			while($row = $sth->fetch(PDO::FETCH_ASSOC)){
				$retval['data']=true;
				if($row['status']=='0'){
					$status='<span class="label label-danger">Fuera de servicio</span>';
				}
				else{
					$status='<span class="label label-success">En servicio</span>';
				}
				array_push($retval['r'], array($row['marca'], $row['modelo'],$row['tipo'],$status,'<button class="btn btn-outline-info" onclick="ModificarVehiculo('.$row['id_vehiculo'].')">Editar</button>'));
			}
		}
		catch(PDOException $e){
			$retval['error']=true;
			$retval['r']=$e->getMessage();
		}
		return json_encode($retval);
	}

	public function newVehiculo($dt){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>'');
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		//$dt['psw']=hash('sha256', $dt['psw']);
		try{
			$query="INSERT INTO vehiculos (marca, modelo, tipo, status) 
			VALUES (:marca, :modelo, :tipo, :activo)";
			$sth = $cnx->prepare($query);
			$sth->execute($dt);
			$retval['s']=$query;
			if($retval['r']=$sth->rowCount())
				$retval['data']=true;
		}
		catch(PDOException $e){
			$retval['error']=true;
			$retval['r']=$e->getMessage();
			if($e->getCode() == "23000")
				$retval['r']="Usuario duplicado";
			else
				$retval['r']=$e->getMessage()."  Error Code: ".$e->getCode();
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
			$sth = $cnx->prepare("SELECT marca, modelo, tipo, status FROM vehiculos where id_vehiculo=:id");
			$sth->bindParam(":id", $id);
			$sth->execute();
			if($row = $sth->fetch(PDO::FETCH_ASSOC)){	
				$retval['data']=true;
				$retval['r'] = array("marca"=>$row['marca'],"modelo"=>$row['modelo'],"tipo"=>$row['tipo'],
					"status"=>$row['status']);
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