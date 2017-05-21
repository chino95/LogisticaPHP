<?php
require_once('logmanager.php');
class Empleados extends LogManager
{
	public function newUser($dt){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>'');
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		try{
			$query="INSERT INTO empleados (nombre, apellido, direccion, telefono) 
			VALUES (:nom, :ape,:dire, :tel)";
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

	function getEmpleados(){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>array());
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		try{
			$sth = $cnx->prepare("SELECT id_empleado, nombre, apellido, direccion, telefono FROM empleados");
			$sth->execute();

			while($row = $sth->fetch(PDO::FETCH_ASSOC)){
				$retval['data']=true;
				array_push($retval['r'], array($row['nombre'], $row['apellido'], $row['direccion'],$row['telefono'],'<button class="btn btn-outline-info" onclick="ModificarUsuario('.$row['id_empleado'].')">Editar</button>'));
			}
		}
		catch(PDOException $e){
			$retval['error']=true;
			$retval['r']=$e->getMessage();
		}
		return json_encode($retval);
	}

	public function updateEmpleado($dt){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>'');

		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		try{
			$query="UPDATE empleados SET nombre =:nom, apellido=:ape, direccion=:dire, telefono =:tel WHERE id_empleado = :id";
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
			$sth = $cnx->prepare("SELECT id_empleado, nombre, apellido, direccion, telefono FROM empleados where id_empleado=:id");
			$sth->bindParam(":id", $id);
			$sth->execute();
			if($row = $sth->fetch(PDO::FETCH_ASSOC)){	
				$retval['data']=true;
				$retval['r'] = array("nombre"=>$row['nombre'],"apellido"=>$row['apellido'],"direccion"=>$row['direccion'],
					"telefono"=>$row['telefono']);
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