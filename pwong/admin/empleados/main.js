$(document).ready(function() {
	getEmpleados();
    clean();
    usuario();
    $("#btnCancel").click(clean);
    $("#btnmodificar").click(updateUser);
    req = {ds : [], c : [{title:"Nombre"},{title:"Apellido"},{title:"Direccion"},{title:"Telelfono"},{title:"Accion"}]};

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

function updateUser(){
    var data={
     nom:$("#modnombre").val(),
     ape:$("#modape").val(),
     dire:$("#moddire").val(),
     tel:$("#modtel").val(),
     id:idusuario
 };
 $.post('main.php',{action:'update',dt:data},function(e){
    if(e.data==true){
        getEmpleados();
        clean();
        showNotification("Usuario Modificado con éxito",'lime',false);
        $('#modalmodificar').modal('toggle');
    }
});
 return false;
}

function ModalEdit(id) {
    $('#modalmodificar').modal();
}

var idusuario;
function ModificarUsuario(id) {   
    idusuario=id;
    $.post('main.php', {
        action: "getUsuarioModal", id:id
    }, function(e) {
       if (e.data) {
        $("#modnombre").val(e.r.nombre);
        $("#modape").val(e.r.apellido);
        $("#moddire").val(e.r.direccion);
        $("#modtel").val(e.r.telefono);
        $('#modalmodificar').modal();
    }
});
    return false;
}


function newUser(){
	var data={
     nom:$("#nombre").val(),
     ape:$("#ape").val(),
     dire:$("#dire").val(),
     tel:$("#tel").val()
 };
 $.post('main.php',{action:'new', dt:data},
    function(e){
      if(e.data==true){
        $('#modalmodificar').modal('toggle');
        notificacion("Usuario Registrado con éxito",'success');
        getEmpleados();
        clean();
    }
    else{
       showNotification(e.r,'ruby',true);
       clean();
   }
});
 return false;
}

function getEmpleados() {
    $.post('main.php', {
        action: "get"
    }, function(e) {
        initTable(e.r,req.c,$("#bdUsers"));
    });
    return false;
}

function showNotification(msg,type,stick){
  var settings = {
   theme: type,
   sticky: stick,
   horizontalEdge: 'top',
   verticalEdge: 'right',
   life:3000,
};
$.notific8('zindex', 11500);
$.notific8(msg, settings);
return false;
}

function clean() {
  $("#correo").val('');
  $("#psw").val('');

  $("#modcorreo").val('');
  $("#modpassword").val('');
  $("#modrpassword").val('');
}

$('.formmodal').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
            	modcorreo: {
            		required: true,
            		email: true
            	},
            	modpassword: {
            		required: true
            	},
            	modrpassword: {
            		equalTo: "#modpassword"
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
            	newUser();
            }
        });