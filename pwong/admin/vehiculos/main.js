$(document).ready(function() {
	getVehiculos();
    clean();
    usuario();
    $("#btnCancel").click(clean);
    $("#btnmodificarm").click(updateVehiculo);
    req = {ds : [], c : [{title:"Marca"},{title:"Modelo"},{title:"Tipo"},{title:"Status"},{title:"Accion"}]};

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

function updateVehiculo(){
    var data={
        email:$("#modemail").val(),
        register_password:$("#modregister_password").val(),
        id:idusuario
    };
    $.post('main.php',{action:'updateVehiculo',dt:data},function(e){
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
function ModificarVehiculo(id) {   
    idusuario=id;
    $.post('main.php', {
        action: "getDatosModal", id:id
    }, function(e) {
       if (e.data) {

        $("#mmarca").val(e.r.marca);
        $("#mmodelo").val(e.r.modelo);
        $("#mstatus").val(e.r.status);
         $('#modalmodificar').modal();
    }
});
    return false;
}


function newVehiculo(){
	var data={
		marca:$("#marca").val(),
		modelo:$("#modelo").val(),
        tipo:$("#tipo").select2('data').text,
        activo:'Activo'
	};
	$.post('main.php',{action:'newVehiculo',dt:data},function(e){
		if(e.data==true){
            notificacion("Vehiculo registrado con éxito",'success');
            getVehiculos();
            clean();
        }
        else{
           showNotification(e.r,'ruby',true);
           clean();
       }
   });
	return false;
}

function getVehiculos() {
    $.post('main.php', {
        action: "getVehiculos"
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
		$("#marca").val('');
		$("#modelo").val('');
        $("#mmarca").val('');
        $("#mmodelo").val('');
	}

	$('.formmodal').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
            	marca: {
            		required: true
            	},
            	modelo: {
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
            	newVehiculo();
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