$(document).ready(function() {
	getTramitesie();
    req = {ds : [], c : [{title:"Empresa"},{title:"Contacto"},{title:"Fecha"},{title:"Accion"}]};

});

function getTramitesie() {
    $.post('main.php', {
        action: "getTramitesie"
    }, function(e) {
        initTable(e.r,req.c,$("#ttramites"));
    });
    return false;
}

var idcliente;
function ModalVer(id) {
    var tabla = '<tr><th>Producto</th><th>Cantidad</th></tr>';
    idcliente=id;
    $.post('main.php', {action: "getDatosModal", id:id}, function(e) {
       if (e.data) {
        for (var i = e.r.length - 1; i >= 0; i--) {
            for (var j = e.r[i].length - 1; j >= 0; j--) {
                j=0;
                tabla += '<tr><td>'+e.r[i][j]+'</td><td>'+e.r[i][j+1]+'</td></tr>';
            }
        }
        $('#tablaDetalle').html(tabla);
        $('#modaltramite').modal();
    }
});
    return false;
}

function aceptarTramite(id) {
    var tabla = '<tr><th>Producto</th><th>Cantidad</th></tr>';
    idcliente=id;
    $.post('main.php', {action: "getDatosModal", id:id}, function(e) {
       if (e.data) {
        for (var i = e.r.length - 1; i >= 0; i--) {
            for (var j = e.r[i].length - 1; j >= 0; j--) {
                j=0;
                tabla += '<tr><td>'+e.r[i][j]+'</td><td>'+e.r[i][j+1]+'</td></tr>';
            }
        }
        $('#tablaDetalle').html(tabla);
        $('#aceptramite').modal();
    }
});
    return false;
}