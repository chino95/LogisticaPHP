$(document).ready(function () {
	$('#btnsalir').click(logout);
});

function logout() {
	$.post('../permisos/main.php ', {
        action: "Logout"
    }, function(e) {
        if (!e.data) {
            window.location.replace("../../login");
        }
    })
    return false;
}

function notifilarga (message,type) {
    $('body').pgNotification({
                    style: 'bar',
                    message: message,
                    position: "top",
                    timeout: 1000,
                    type: type
                }).show();
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

    function initTable (ds,c,table ){ //cd = []) {
        var oTable = table.dataTable({
            sDom: "<'exportOptions'T><'table-responsive't><'row'<p i>>",
            destroy:true,
            data: ds,
            columns: c,
           // columnDefs: cd,
            "language": {
                "aria": {
                    "sortAscending": ": Orden Ascendente",
                    "sortDescending": ": Orden Descendente"
                },
                "emptyTable": "No hay datos para mostrar",
                "info": "Mostrando _START_ hasta _END_ de _TOTAL_ registros",
                "infoEmpty": "No se encontraron registros",
                "infoFiltered": "(Filtrado desde _MAX_ registros totales)",
                "lengthMenu": "_MENU_ Registros",
                "search": "Buscar:",
                "zeroRecords": "No se encontraron registros"
            },
            "oTableTools": {
                "sSwfPath": "../../assets/plugins/jquery-datatable/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                "aButtons": [{
                    "sExtends": "csv",
                    "sButtonText": "<i class='pg-grid'></i>",
                }, {
                    "sExtends": "xls",
                    "sButtonText": "<i class='fa fa-file-excel-o'></i>",
                }, {
                    "sExtends": "pdf",
                    "sButtonText": "<i class='fa fa-file-pdf-o'></i>",
                }, {
                    "sExtends": "copy",
                    "sButtonText": "<i class='fa fa-copy'></i>",
                }, {
                    "sExtends": "print",
                    "sButtonText": "<i class='fa fa-print'></i>",
                }]
            },
            fnDrawCallback: function(oSettings) {
                $('.export-options-container').append($('.exportOptions'));

                $('#ToolTables_tbl_0').tooltip({
                    title: 'Exportar como CSV',
                    container: 'body'
                });

                $('#ToolTables_tbl_1').tooltip({
                    title: 'Exportar como Excel',
                    container: 'body'
                });

                $('#ToolTables_tbl_2').tooltip({
                    title: 'Exportar como PDF',
                    container: 'body'
                });

                $('#ToolTables_tbl_3').tooltip({
                    title: 'Copiar datos',
                    container: 'body'
                });
                $('#ToolTables_tbl_4').tooltip({
                    title: 'Imprimir',
                    container: 'body'
                });
            },
            responsive: true,
            "order": [
                [0, 'asc']
            ],
            
            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] 
            ],
            "pageLength": 10,

            }); 
}