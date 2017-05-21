$(document).ready(function() {
  $('#fechaS').datepicker.dates['es'];
  $('#fechaS').datepicker();
  $('#btnsolicitar').click(newSolicitud);
});


function usuario(){
 $.post('main.php',{action:'getUsuario'},function(e){
   $("#usuario").text(e.correo)
 });
 return false;
}


function newSolicitud(){
	var data={
    id:0,
    fecha:$('#fechaS').val(),
    origen:$("#origen").val(),
    destino:$("#destino").val(),
    peso:$("#peso").val(),
    bultos:$("#bultos").val()
  };
  $.post('main.php',{action:'newSolicitud',dt:data},
    function(e){
      if(e.data==true){
        notificacion("Servicio solicitado con éxito",'success');
     }
     else{
       showNotification(e.r,'ruby',true);
     }
   });
  return false;
}
