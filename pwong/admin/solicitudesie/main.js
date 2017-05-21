$(document).ready(function() {
	getUsers();
    req = {ds : [], c : [{title:"Nombre"},{title:"Apellido"},{title:"Empresa"},{title:"Direccion"},{title:"Telelfono"},{title:"CTPAT"},{title:"Correo"},{title:"Accion"}]};

});


function getUsers() {
    $.post('main.php', {
        action: "get"
    }, function(e) {
        initTable(e.r,req.c,$("#bdUsers"));
    });
    return false;
}