$(document).ready(function() {
	$("#btnregistrar").click(MostrarModal);
});

$.extend(jQuery.validator.messages, {
	required: "Éste campo es Requerido.",
	psw: "Éste campo es Requerido.",
	email: "Favor de ingresar un Correo Válido.",
	maxlength: jQuery.validator.format("No mas de {0} caracteres."),
	minlength: jQuery.validator.format("Ingresar al menos {0} caracteres."),
	equalTo: "Favor de ingresar el mismo valor en ambas contraseñas."
});

function MostrarModal() {   
	$('#modalmodificar').modal();
}

function newUser(){
	var data={
        nom:$("#mnombre").val(),
        emp:$("#memp").val(),
        dire:$("#mdire").val(),
        tel:$("#mtel").val(),
        ctpat:$("#mctpat").prop("checked"),
        email:$("#mcorreo").val(),
        psw:$("#mpsw").val()
    };
    $.post('main.php',{action:'new',dt:data},function(e){
      if(e.data==true){
        $('#modalmodificar').modal('toggle');
        notificacion("Usuario Registrado con éxito",'success');		
        clean();
    }
    else{
       notificacion(e.r,'danger');
       clean();
   }
});
    return false;
}
function notificacion (message,type) {
    $('body').pgNotification({
        style: 'circle',
        title: 'Aviso',
        message: message,
        position: "top-right",
        timeout: 2000,
        type: type

    }).show();
}

function loginDB(){
	var sendObj= {
		email:$("#correo").val(),
		psw:$("#psw").val()};
		$.post('main.php',{dt:sendObj,action:"login"},
			function(e){
				if(e.data==true){
					window.location.replace("../admin/clientes/");
				}
				else{
					notificacion(e.r,"danger");
				}
				clean();
			});
		return false;
	}

	function clean() {
		$("#correo").val('');
		$("#psw").val('');

		$("#mcorreo").val('');
		$("#mpasw").val('');
		$("#mrpsw").val('');
	}

	$('.formmodal').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
            	mcorreo: {
            		required: true,
            		email: true
            	},
            	mpsw: {
            		required: true
            	},
            	mrpsw: {
            		equalTo: "#mpsw"
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