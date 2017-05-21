$(document).ready(function() {
	getClientes();
    clean();
    usuario();
    $("#btncancelar").click(clean);
    $("#btnmodificar").click(updateCliente);
    req = {ds : [], c : [{title:"Nombre"},{title:"Empresa"},{title:"Direccion"},{title:"Telelfono"},{title:"CTPAT"},{title:"Correo"},{title:"Accion"}]};

});

$.extend(jQuery.validator.messages, {
	required: "Éste campo es Requerido.",
	psw: "Éste campo es Requerido.",
	email: "Favor de ingresar un Correo Válido.",
	maxlength: jQuery.validator.format("No mas de {0} caracteres."),
	minlength: jQuery.validator.format("Ingresar al menos {0} caracteres."),
	equalTo: "Favor de ingresar el mismo valor en ambas contraseñas."
});

function usuario(){
 $.post('main.php',{action:'getUsuario'},function(e){
   $("#usuario").text(e.correo)            
});
 return false;
}

var idcliente;
function ModalEdit(id) {
    idcliente=id;
    $.post('main.php', {action: "getDatosModal", id:id}, function(e) {
     if (e.data) {
        $("#nombre").val(e.r.contacto);
        $("#emp").val(e.r.empresa);
        $("#dire").val(e.r.direccion);
        $("#tel").val(e.r.telefono);
        $("#correo").val(e.r.correo);
        $('#modalmodificar').modal();
    }
});
    return false;
}

function updateCliente(){
    var data={
     nom:$("#nombre").val(),
     emp:$("#emp").val(),
     dire:$("#dire").val(),
     tel:$("#tel").val(),
     ctpat:$("#ctpat").prop("checked"),
     email:$("#correo").val(),
     psw:$("#password").val(),
     id:idcliente
 };
 $.post('main.php',{action:'update',dt:data},function(e){
    if(e.data==true){
        $('#modalmodificar').modal('toggle');
        getClientes();
        clean();
        notificacion("Cliente Modificado con éxito",'success');
    }
});
 return false;
}

function newCliente(){
	var data={
     nom:$("#nombre").val(),
     emp:$("#emp").val(),
     dire:$("#dire").val(),
     tel:$("#tel").val(),
     ctpat:$("#ctpat").prop("checked"),
     email:$("#correo").val(),
     psw:$("#password").val()
 };
 $.post('main.php',{action:'new',dt:data},function(e){
  if(e.data==true){
    notificacion("Cliente registrado con éxito",'success');
    getClientes();
    clean();
}
else{
   showNotification(e.r,'ruby',true);
   clean();
}
});
 return false;
}

function getClientes() {
    $.post('main.php', {
        action: "getClientes"
    }, function(e) {
        initTable(e.r,req.c,$("#bdUsers"));
    });
    return false;
}

function clean() {
  $("#nombre").val('');
  $("#emp").val('');
  $("#dire").val('');
  $("#tel").val('');
  $("#correo").val('');
  $("#password").val('');
  $('#rpassword').val('');
}

$('.formmodal').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
            	correo: {
            		required: true,
            		email: true
            	},
            	password: {
            		required: true
            	},
            	rpassword: {
            		equalTo: "#password"
            	}
            },
            invalidHandler: function(event, validator) { //display error alert on form submit   
            },
            highlight: function(element) { // hightlight error inputs
            	$(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
                },
                success: function(label) {
                	label.closest('.form-group').removeClass('has-error');
                	label.remove();
                },
                errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
                	error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                	error.insertAfter(element.closest('.input-icon'));
                } else {
                	error.insertAfter(element);
                }
            },
            submitHandler: function(form) {
            	newCliente();
            }
        });
