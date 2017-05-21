<?php
require_once('logmanager.php');
class Usuarios extends LogManager
{

	function getUsuarios(){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>array());
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		try{
			$sth = $cnx->prepare("SELECT id_usuario, nombre, correo FROM usuarios");
			$sth->execute();

			while($row = $sth->fetch(PDO::FETCH_ASSOC)){
				$retval['data']=true;
				array_push($retval['r'], array($row['nombre'], $row['correo'],'<button class="btn btn-outline-info" onclick="ModificarUsuario('.$row['id_usuario'].')">Editar</button>'));
			}
		}
		catch(PDOException $e){
			$retval['error']=true;
			$retval['r']=$e->getMessage();
		}
		return json_encode($retval);
	}

	public function newUsuario($dt){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>'');
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		$dt['psw']=hash('sha256', $dt['psw']);
		try{
			$query="INSERT INTO usuarios (nombre, correo, psw) 
			VALUES (:nom, :email, :psw)";
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

	public function updateUser($dt){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>'');

		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();

		$dt['register_password']=hash('sha256', $dt['register_password']);

		try{
			$query="UPDATE usuarios SET psw =:register_password, correo=:email WHERE id_usuario = :id";
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
			$sth = $cnx->prepare("SELECT nombre, correo FROM usuarios where id_usuario=:id");
			$sth->bindParam(":id", $id);
			$sth->execute();
			if($row = $sth->fetch(PDO::FETCH_ASSOC)){	
				$retval['data']=true;
				$retval['r'] = array("nombre"=>$row['nombre'],"correo"=>$row['correo']);
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