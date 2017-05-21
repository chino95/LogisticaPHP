<?php
require_once('pdocnx.php');

class LogManager extends ConnectionManager{

	public function login($dt){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>'');
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		$cnxData = array('email' => $dt['email'], 
			'psw' => hash('sha256', $dt['psw']));
		try{
			$sth = $cnx->prepare("SELECT id_cliente FROM clientes WHERE correo=:email AND psw=:psw");
			$sth->execute($cnxData);
			if($row = $sth->fetch(PDO::FETCH_ASSOC)){
				session_start();
				$_SESSION['data'] = array('id_cliente'=> $row['id_cliente'], 'correo'=> $dt['email']);
				$retval['data']=true;
				$retval['r']=$_SESSION['data'];
			}
			else{
				$retval['r']="Usuario o Contraseña Incorrectos";
				$retval['error']=true;
			}
		}
		catch(PDOException $e){
			$retval['error']=true;
			$retval['r']=$e->getMessage();
		}
		return json_encode($retval);
	}
	public function usuario(){	
		return json_encode(array('correo'=>$_SESSION['data']['correo']));
	}

	public function newCliente($dt){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>'');
		$obj = new ConnectionManager();
		$cnx = $obj-> connectSqlSrv();
		$dt['psw']=hash('sha256', $dt['psw']);
		try{
			$query="INSERT INTO clientes (nombre, empresa, direccion, telefono, ctpat, correo, psw) 
			VALUES (:nom :emp, :dire, :tel, :ctpat, :email, :psw)";
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



	public function Logout(){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>'');

		unset($_SESSION['data']);

		return json_encode($retval);
	}

	public function CheckSession(){
		$retval=array('data'=>false,
			'error'=>false,
			'r'=>'',
			'role'=>'');

		if (isset($_SESSION['data'])) 
		{
			$retval['data']=true;
			$retval['r']=$_SESSION['data']['role'];
		}

		return json_encode($retval);
	}


	
	
}


?>