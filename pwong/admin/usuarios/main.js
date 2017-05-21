$(document).ready(function() {
	getUsers();
    clean();
    usuario();
    $("#btnCancel").click(clean);
    $("#btnmodificar").click(updateUser);
    req = {ds : [], c : [{title:"Nombre"},{title:"Correo"},{title:"Accion"}]};
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
        nom:$("#mnombre").val(),
        email:$("#mcorreo").val(),
        psw:$("#mpassword").val(),
        id:idusuario
    };
    $.post('main.php',{action:'updateUser',dt:data},function(e){
        if(e.data==true){
            getUsers();
            clean();
            showNotification("Usuario Modificado con éxito",'lime',false);
            $('#modalmodificar').modal('toggle');
        }
    });
    return false;
}

var idusuario;
function ModificarUsuario(id) {   
    idusuario=id;
    $.post('main.php', {
        action: "getDatosModal", id:id
    }, function(e) {
     if (e.data) {

        $("#mnombre").val(e.r.nombre);
        $("#mcorreo").val(e.r.correo);
        $('#modalmodificar').modal(); 
    }
});
    return false;
}


function newUser(){
	var data={
        nom:$("#nombre").val(),
        email:$("#correo").val(),
        psw:$("#password").val()
    };
    $.post('main.php',{action:'new',dt:data},function(e){
      if(e.data==true){
           // $('#modalmodificar').modal('toggle');
           notificacion("Usuario registrado con éxito",'success');
           getUsers();
           clean();
       }
       else{
         showNotification(e.r,'ruby',true);
         clean();
     }
 });
    return false;
}

function getUsers() {
    $.post('main.php', {
        action: "get"
    }, function(e) {
        initTable(e.r,req.c,$("#bdUsers"));
    });
    return false;
}

function clean() {
  $("#nombre").val('');
  $("#correo").val('');
  $("#password").val('');
  $("#rpassword").val('');
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
            	newUser();
            }
        });

$('.form-login').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
            	correo: {
            		required: true,
            		email: true
            	},
            	psw: {
            		required: true
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
            	loginDB();
            }
        });