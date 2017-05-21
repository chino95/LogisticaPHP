<?php

class ConnectionManager {
	private $server="FK\FK";
	private $usr="iz";
	private $psw="ivan95";
	private $db="Logistica";

	public function connectSqlSrv(){
		try{
			$dbCnx = new PDO("sqlsrv:Server=$this->server;Database=$this->db;ConnectionPooling=0", $this->usr, $this->psw);
			$dbCnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return $dbCnx;
		}
		catch(PDOException $e){
			echo $e;
			die();
			return null;
		}
	}
}
?>