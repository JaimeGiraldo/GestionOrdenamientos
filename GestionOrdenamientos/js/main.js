
var colores = ['#F44336', '#E91E63', '#9C27B0', '#3F51B5', '#2196F3', '#009688', '#4CAF50', '#CDDC39', '#76FF03', '#FFEB3B', '#FF9800', '#795548', '#9E9E9E', '#FFFF00'];
var usuario, IdtipoOpt, IdOpt, datosorden, totalpendientes, detalledashboard,nombrearchivo,listacupsout;
var idtipoidaux = "CC";

var archivos = [];
; (function (window) {
  

    //Animacion para los graficos dashboard
    Math.easeOutBounce = function (pos) {
        if ((pos) < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        }
        if (pos < (2 / 2.75)) {
            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
        }
        if (pos < (2.5 / 2.75)) {
            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
        }
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
    };
        
       //Ingresar con enter
    $("#txtContraseña").keypress(function (e) {
        if (e.which == 13) {
            usuario = $('#txtUsuario').val();
            var clave = $('#txtContraseña').val();
            if (usuario.length == 0 || clave.length == 0) {
                swal('Evolution', 'Los campos usuario y contraseña son necesarios!', 'warning');
                return;
            }
            iniciarSesion(usuario, clave);
            e.preventDefault();
        }
    });

    $("#btnLogin").on("click", function (e) {
        usuario = $('#txtUsuario').val();
        var clave = $('#txtContraseña').val();
        if (usuario.length == 0 || clave.length == 0) {
            swal('Evolution', 'Los campos usuario y contraseña son necesarios.', 'warning');
            return;
        }

        iniciarSesion(usuario, clave);
        e.preventDefault();

    });

    $("#btnActualizartabla").on("click", function (e) {
       //remueve el cuerpo de la tabala
        var tbl = document.getElementById("tablaAsignar"); // Get the table
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0]);

        consultarOrdenesFecha(IdtipoOpt, IdOpt);
    });

    //muestra el grafico 2 del dashboard
    $("#btngrafico2").on("click", function (e) {
        pintarGrafico2();
        $("#ModalGrafico2").modal();
    });


    $("#btngrafico3").on("click", function (e) {
        pintarGrafico3();
        $("#ModalGrafico2").modal();
    });

    $("#btnSalir").on("click", function (e) {
        location.reload();
    });

    
    $("#btnAddcups").on("click", function (e) {
        SeleccionarCUPS();
    });
   
    $("#ddlCups").select2({
        placeholder: "Selecciona el CUPS"
    });

    $("#ddlEmpleado").select2({
        placeholder: "Selecciona el Responsable"
    });

    $("#ddlCupsout").select2({
        placeholder: "Selecciona la Descripción"
    });

    var cboEmpleado = $('#ddlEmpleado');
    llenarCombos(cboEmpleado, "spOrdenamientos_ObtenerUsuarios");

    var cboCups = $('#ddlCups');
    llenarCombos(cboCups, "spOrdenamientos_Obtener_ListaCUPS");   

    

    //var cboCups = $('#selecttest');
    //llenarCombos(cboCups, "spOrdenamientos_Obtener_ListaCUPS");
    //$("#selecttest").select2();
    
    $("#btnAdd").on("click", function (e) {
        AsignarResponsables();
    });

    //Reparte las ordenes entre los responsables asignados
    $("#btnRepartir").on("click", function (e) {
        $("#loaderepartir").show();
        RepartirOrdenes();
    }); 

    $("#btnreportes").on("click", function (e) {
        $("#ModalReportes").modal();
    });

    $('#reporteasignaciones').on("click", function (e) {
        ObtenerResponsablesAsignaciones("spGestionOrdenamientos_ObtenerReporteResponsables");
    });
    //////////////////////////////////////////////////////////////////////////////////////
    
	var support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		onEndTransition = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target != this ) return;
					this.removeEventListener( transEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		},
		// the pages wrapper
		stack = document.querySelector('.pages-stack'),
		// the page elements
		pages = [].slice.call(stack.children),
		// total number of page elements
		pagesTotal = pages.length,
		// index of current page
		current = 0,
		// menu button
		menuCtrl = document.querySelector('button.menu-button'),
		// the navigation wrapper
		nav = document.querySelector('.pages-nav'),
		// the menu nav items
		navItems = [].slice.call(nav.querySelectorAll('.link--page')),
		// check if menu is open
		isMenuOpen = false;

function init() {
	buildStack();
	initEvents();
}

function buildStack() {
	var stackPagesIdxs = getStackPagesIdxs();

	// set z-index, opacity, initial transforms to pages and add class page--inactive to all except the current one
	for(var i = 0; i < pagesTotal; ++i) {
		var page = pages[i],
			posIdx = stackPagesIdxs.indexOf(i);

		if( current !== i ) {
			classie.add(page, 'page--inactive');

			if( posIdx !== -1 ) {
				// visible pages in the stack
				page.style.WebkitTransform = 'translate3d(0,100%,0)';
				page.style.transform = 'translate3d(0,100%,0)';
			}
			else {
				// invisible pages in the stack
				page.style.WebkitTransform = 'translate3d(0,75%,-300px)';
				page.style.transform = 'translate3d(0,75%,-300px)';		
			}
		}
		else {
			classie.remove(page, 'page--inactive');
		}

		page.style.zIndex = i < current ? parseInt(current - i) : parseInt(pagesTotal + current - i);
			
		if( posIdx !== -1 ) {
			page.style.opacity = parseFloat(1 - 0.1 * posIdx);
		}
		else {
			page.style.opacity = 0;
		}
	}
}

// event binding
function initEvents() {
	// menu button click
	menuCtrl.addEventListener('click', toggleMenu);



	// navigation menu clicks
	navItems.forEach(function(item) {
		// which page to open?
		var pageid = item.getAttribute('href').slice(1);
		item.addEventListener('click', function(ev) {
			ev.preventDefault();
			openPage(pageid);
		});
	});

	// clicking on a page when the menu is open triggers the menu to close again and open the clicked page
	pages.forEach(function(page) {
		var pageid = page.getAttribute('id');
		page.addEventListener('click', function(ev) {
			if( isMenuOpen ) {
				ev.preventDefault();
				openPage(pageid);
			}
		});
	});

	// keyboard navigation events
	document.addEventListener( 'keydown', function( ev ) {
		if( !isMenuOpen ) return; 
		var keyCode = ev.keyCode || ev.which;
		if( keyCode === 27 ) {
			closeMenu();
		}
	} );
}

// toggle menu fn
function toggleMenu() {
	if( isMenuOpen ) {
		closeMenu();
	}
	else {
		openMenu();
		isMenuOpen = true;
	}
}
// opens the menu
function openMenu() {
	// toggle the menu button
	classie.add(menuCtrl, 'menu-button--open')
	// stack gets the class "pages-stack--open" to add the transitions
	classie.add(stack, 'pages-stack--open');
	// reveal the menu
	classie.add(nav, 'pages-nav--open');

	// now set the page transforms
	var stackPagesIdxs = getStackPagesIdxs();
	for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
		var page = pages[stackPagesIdxs[i]];
		page.style.WebkitTransform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)'; // -200px, -230px, -260px
		page.style.transform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)';
    }       
}

// closes the menu
function closeMenu() {
	// same as opening the current page again
	openPage();
}

// opens a page
function openPage(id) {
	var futurePage = id ? document.getElementById(id) : pages[current],
		futureCurrent = pages.indexOf(futurePage),
		stackPagesIdxs = getStackPagesIdxs(futureCurrent);

	// set transforms for the new current page
	futurePage.style.WebkitTransform = 'translate3d(0, 0, 0)';
	futurePage.style.transform = 'translate3d(0, 0, 0)';
	futurePage.style.opacity = 1;

	// set transforms for the other items in the stack
	for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
		var page = pages[stackPagesIdxs[i]];
		page.style.WebkitTransform = 'translate3d(0,100%,0)';
		page.style.transform = 'translate3d(0,100%,0)';
	}

	// set current
	if( id ) {
		current = futureCurrent;
	}
		
	// close menu..
	classie.remove(menuCtrl, 'menu-button--open');
	classie.remove(nav, 'pages-nav--open');
	onEndTransition(futurePage, function() {
		classie.remove(stack, 'pages-stack--open');
		// reorganize stack
		buildStack();
		isMenuOpen = false;
	});
}

//Iniciar Sesion
function iniciarSesion(usuario, clave) {
	$.ajax({
	    url: "GestionOrdenamientos.aspx/validarUsuario",
	    data: "{ UsuarioSistema: '" + usuario + "', Clave: '" + clave + "'}",
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    async: true,
	    type: 'POST'
	}).done(function (rest) {
	    if (rest.Error != undefined) {
	        alert(rest.Error);
	    } else {

	        var lista = JSON.parse(rest.d);

	        if (lista.Table.length > 0) {

	            if (lista.Table[0].respuesta == "OK") {

                    //obtiene los datos para el dashboard
	                obtenerDashboard("spGestionOrdenamientos_ObtenerDashboard");

	                IdtipoOpt = lista.Table[0].idtipoid;
	                IdOpt = lista.Table[0].identificacion;

	                if (lista.Table[0].idtipousuario == "0") {
	                    //si es un tipo usu o admin, vera todo el menu
	                    openMenu();
	                    consultarOrdenesFecha(lista.Table[0].idtipoid, lista.Table[0].identificacion);
	                    consultarOrdenesProveedor(lista.Table[0].identificacion);
	                    consultarAsignaciones("spGestionOrdenamiento_ListarResponsables");	                    
	                    $('#btnMenu').removeAttr('style');

	                    var cboCupsOut = $('#ddlCupsout');
	                    llenarCombos(cboCupsOut, "spGestionOrdenamientos_ObtenerCupsSinAsignar");

	                }else  if (lista.Table[0].idtipousuario == "1") {
	                    //si es un tipo usu 1 optimizador, solo vera menu asignar y reportes

                        //esconde los menus
	                    $('#MenuCargaArchivo').hide();
	                    $('#MenuResponsables').hide();
	                    $('#MenuProveedor').hide();

                        //esconde las paginas	                        
	                    $('#page-ImportarArchivo').hide();
	                    $('#page-Responsables').hide();
	                    $('#page-Proveedores').hide();

	                    openMenu();
	                    consultarOrdenesFecha(lista.Table[0].idtipoid, lista.Table[0].identificacion);
	                    $('#btnMenu').removeAttr('style');
	                } else if (lista.Table[0].idtipousuario == "2") {
	                    //si es un tipo usu 2 proveedor, solo vera el menu de proveedor y reportes
	                    $('#MenuOptimizador').hide();
	                    $('#MenuCargaArchivo').hide();
	                    $('#MenuResponsables').hide();

	                    $('#page-AsignarAT4').hide();
	                    $('#page-ImportarArchivo').hide();
	                    $('#page-Responsables').hide();

	                    openMenu();
	                    consultarOrdenesProveedor(lista.Table[0].identificacion);
	                    $('#btnMenu').removeAttr('style');
	                } else {
	                    swal('Evolution Ordenamientos', 'Lo sentimos, el usuario no tiene un rol valido definido, favor comunicarse con el área de sistemas.', 'warning');
	                }

	                $('#lblUsuario').html(lista.Table[0].idtipoid + ': ' + lista.Table[0].identificacion);
	                $('#lblNombreUsuario').html(lista.Table[0].NombreCompleto);
	                    
	            } else {
	                swal('Evolution Ordenamientos', 'Lo sentimos, no tienes permisos para ingresar.', 'warning');
	            }
	        }
	        else {
	            swal('Evolution Ordenamientos', 'Lo sentimos, no tienes permisos para ingresar.', 'error');
	        }
	    }
	});
}
    
//consultar ordenes para optimizar
function consultarOrdenesFecha(tipoidoptimizador, idoptimizador) {
	$.ajax({
	    url: "GestionOrdenamientos.aspx/consultarOrdenesxOptimizador",
	    data: "{ tipoidoptimizador: '" + tipoidoptimizador + "', idoptimizador: '" + idoptimizador + "'}",
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    async: true,
	    type: 'POST'
	}).done(function (rest) {
	    if (rest.Error != undefined) {
	        alert(rest.Error);
	    } else {
	        var listaDatos = JSON.parse(rest.d);
	        var datos = listaDatos.Table;
	        var datos1 = listaDatos.Table1;
	        var datos2 = listaDatos.Table2;	           

	        $('#tablaAsignar td').remove();

	            if (listaDatos.Table.length > 0) {	                    

	                totalpendientes = datos2[0].cantidadPendientes;
	                document.getElementById('lbltotalasignados').innerHTML = datos1[0].cantidadTotal;
	                document.getElementById('lbltotalpendientes').innerHTML = datos2[0].cantidadPendientes;

	                for (var i = 0; i < datos.length; i++) {
	                       
	                    var tbl = '';
	                    tbl += '<tr>';

	                    tbl += '<td>' + datos[i].Codigo_Solicitud_Ciklos + '</td>';
	                    tbl += '<td>' + datos[i].Fecha_Registro_Solicitud + '</td>';
	                    tbl += '<td>' + datos[i].Fecha_Esperada_de_Respuesta + '</td>';
	                    tbl += '<td>' + datos[i].Prestador_Solicitante + '</td>';
	                    tbl += '<td>' + datos[i].Cups + '</td>';
	                    tbl += '<td>' + datos[i].Descripcion + '</td>';
	                    tbl += '<td>' + '<button id="btninfo_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="MasInformacion(' + i + ')">Ver</button>' + '</td>';
	                    tbl += '<td>' + '<button id="btnAsignarProveedor_' + datos[i].idConsecutivo +
                                '" class="btn btn-primary" onclick="abrirModalAcciones(' + datos[i].idConsecutivo + ',' + (i + 1) + ')">Auditar</button>' + '</td>';
	                    tbl += '</tr>';	                        
                        
	                    $("#tablaAsignar").append(tbl);
                           
	                }
	                datosorden = datos;
	            }
	            else {
	                document.getElementById('headeroptimizacion').innerHTML = "No Tienes ordenes asignadas";
	                document.getElementById('optimi').innerHTML = "";	                    
	                //swal('Evolution Ordenamientos', 'No se encontraron ordenes asignadas al usuario: ' + tipoidoptimizador +': ' + idoptimizador + '.', 'warning');
	                $('#tablaAsignar td').remove();
	        }
	    }
	});
}   
	
//consultar ordenes para optimizar
function consultarOrdenesProveedor(proveedor) {
	$.ajax({
	    url: "GestionOrdenamientos.aspx/consultarOrdenesxProveedor",
	    data: "{ proveedor: '" + proveedor + "'}",
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    async: true,
	    type: 'POST'
	}).done(function (rest) {
	    if (rest.Error != undefined) {
	        alert(rest.Error);
	    } else {
	        var listaDatos = JSON.parse(rest.d);
	        var datos = listaDatos.Table;
	        $('#tablaProveedores td').remove();

	        if (listaDatos.Table.length > 0) {

	            for (var i = 0; i < datos.length; i++) {

	                var tbl = '';
	                tbl += '<tr>';
	                tbl += '<td>' + datos[i].FechaOptimizacion + '</td>';
	                tbl += '<td>' + datos[i].Cups + '</td>';
	                tbl += '<td>' + datos[i].Descripcion + '</td>';
	                tbl += '<td>' + '<button id="btninfoPro_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="MasInformacionProveedor(' + i + ')">Ver</button>' + '</td>';
	                tbl += '<td>' + '<input type="text" id="txtOrden_' + datos[i].idConsecutivo + '" placeholder="Ingresa la orden">' + '</td>';
	                tbl += '<td>' + '<button id="btnAdjunto_' + datos[i].idConsecutivo +
                            '" class="btn btn-primary" onclick="GuardarAdjuntoProveedor(' + datos[i].idConsecutivo + ')">Adjuntar</button>' + '</td>';
	                tbl += '<td>' + '<label class="switch"><input id="check_' + datos[i].idConsecutivo + '" type="checkbox" onclick="GuardarProovedorGestion(' + datos[i].idConsecutivo + ',' + (i + 1) + ')"><span class="slider round"></span></label>' + '</td>';
	                tbl += '</tr>';

	                $("#tablaProveedores").append(tbl);

                    //valida si la orden ya fue realizada por el proveedor
	                if (datos[i].EstadoProveedor == 1) {
	                    $('#check_' + datos[i].idConsecutivo).prop('checked', true);
	                    $('#txtOrden_' + datos[i].idConsecutivo).val(datos[i].OrdenProveedor);
	                    $('#txtOrden_' + datos[i].idConsecutivo).prop("disabled", true);
	                    $('#btnAdjunto_' + datos[i].idConsecutivo).prop("disabled", true);
	                }
	            }
	            datosorden = datos; //
	        }
	        else {

	            document.getElementById('headerproveedor').innerHTML = "No Tienes ordenes pendientes";
	            document.getElementById('lblheaderproveedor').innerHTML = "";
	                //swal('Evolution Ordenamientos', 'No se encontraron ordenes asignadas al usuario: ' + tipoidoptimizador +': ' + idoptimizador + '.', 'warning');
	            $('#tablaProveedores td').remove();
	        }
	    }
	});
}
   
// gets the current stack pages indexes. If any of them is the excludePage then this one is not part of the returned array
function getStackPagesIdxs(excludePageIdx) {
	var nextStackPageIdx = current + 1 < pagesTotal ? current + 1 : 0,
		nextStackPageIdx_2 = current + 2 < pagesTotal ? current + 2 : 1,
		idxs = [],

		excludeIdx = excludePageIdx || -1;

	if( excludePageIdx != current ) {
		idxs.push(current);
	}
	if( excludePageIdx != nextStackPageIdx ) {
		idxs.push(nextStackPageIdx);
	}
	if( excludePageIdx != nextStackPageIdx_2 ) {
		idxs.push(nextStackPageIdx_2);
	}

	return idxs;
}

	init();

})(window);

// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function () {
     
   
  
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

function abrirModalAcciones(posicion, posiciontabla) {

    $("#ModalAcciones .modal-body").html('');
    $("#ModalAcciones .modal-footer").html('');

    var body = '';
    var footer = '';

    body += '<div class="box_swith_mod"><p>Genero AT4:</p><label class="switch"><input id="checkAt4_' + posicion + '" type="checkbox"><span class="slider round"></span></label></div>';
    body += '<div class="box_swith_mod"><p>Adecuada:</p><label class="switch"><input id="checkAdecuado_' + posicion + '" type="checkbox"><span class="slider round"></span></label></div>';
    body += '<p style="margin:5px 0px 0px">Observaciones Auditoria:</p><input type="text" id="txtObservacionesAud_' + posicion + '" placeholder="Relacionadas con la atención y notas de tipo médico." class="form-control">';
    body += '<p style="margin:5px 0px 0px">Observaciones Generales:</p><input type="text" id="txtObservacionesGene_' + posicion + '" placeholder="Relacionadas con cambios de servicio y datos administrativos." class="form-control">';
    body += '<p style="margin:5px 0px 0px">CIE 10:</p><input type="text" id="txtCIE10_' + posicion + '" placeholder="Ingresa el diagnóstico y presiona ENTER para buscar" class="form-control">';
    body += '<input type="text" style="margin-top:2px" id="txtCIE10Desc_' + posicion + '" placeholder="Descripción diagnóstico" class="form-control">';
    body += '<p style="margin:5px 0px 0px">Profesional Solicitante:</p><input type="text" id="txtProfesional_' + posicion + '" placeholder="Ingresa el nombre del profesional" class="form-control">';
    body += '<p style="margin:5px 0px 0px">Proveedor:</p><select id="ddl_Proveedoress_' + posicion + '" class="js-example-basic-single js-states form-control" style="width:100%"></select>';

    footer += '<button id="btnAsignarProveedor_' + posicion +
                                '" class="btn btn-primary" onclick="GuardarProovedor(' + posicion + ',' + posiciontabla + ')">Guardar</button>';
   
    $("#ModalAcciones .modal-body").append(body);
    $("#ModalAcciones .modal-footer").append(footer);

    var combo = $('#ddl_Proveedoress_' + posicion);
    llenarCombos(combo, "spsuministros_Proveedores_ObtenerNew");

    $('#ddl_Proveedoress_' + posicion).select2({
        placeholder: "Selecciona el Proveedor"
    });

    $('#txtCIE10Desc_' + posicion).prop('disabled', true);
     document.getElementById('ModaltittleAcciones').innerHTML = 'Gestión de la Orden ' + datosorden[posiciontabla - 1].Codigo_Solicitud_Ciklos;

    $("#ModalAcciones").modal();

    //Despues de ingresar el diagnostico se detecta el ENTER
    $('#txtCIE10_' + posicion).keypress(function (e) {

        $('#txtCIE10Desc_' + posicion).val('');

        if (e.which == 13) {
            //Se obtienen los valores de los controles
            var diagnostico = $('#txtCIE10_' + posicion).val();
          
            if (diagnostico.length == 0) {
                swal('Evolution Ordenamientos', 'Lo sentimos, El campo de diagnóstico no puede estar vacío, debes ingresar un diagnóstico valido.', 'warning');
               
            } else {
                ObtenerDiagnosticos(diagnostico, posicion);
            }
        }
    });

}

function ObtenerDiagnosticos(diagnostico, posicion) {

    var controldiagnostico = $('#txtCIE10Desc_' + posicion);

    $.ajax({
        url: "GestionOrdenamientos.aspx/buscarDiagnostico",
        data: "{ diagnostico: '" + diagnostico + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        type: 'POST'
    }).done(function (rest) {

        if (rest.d != '') {
            //Convierte la lista Json 
            var listaDatos = JSON.parse(rest.d);

            if (listaDatos.Table.length > 0) {
                controldiagnostico.val(listaDatos.Table[0].Descripcion);
            } else {
                controldiagnostico.val('');
                swal('Evolution Ordenamientos', 'Lo sentimos, no se encontró el diagnóstico que ingresado.', 'warning');
            }
        }
    })
}

function FiltrarTablaSede() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("txtfiltro");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaAsignar");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function GuardarProovedor(posicion, posiciontabla) {

        var input, filter, table, tr, td, i;
        table = document.getElementById("tablaAsignar");
        tr = table.getElementsByTagName("tr");    
   
        var idconsecutivo = posicion;
        var proveedorasignado = $('#ddl_Proveedoress_' + posicion).val();
        var observacionesaudit = $('#txtObservacionesAud_' + posicion).val();
        var observacionesagen = $('#txtObservacionesGene_' + posicion).val();

        var cie10 = $('#txtCIE10_' + posicion).val();
        var cie10desc = $('#txtCIE10Desc_' + posicion).val();
        var profesional = $('#txtProfesional_' + posicion).val();
        var at4 = 0;
        var adecuado = 0;


        if (!$('#checkAt4_' + posicion).is(':checked')) {
            at4 = 0;
        } else {
            at4 = 1;
        }

        if (!$('#checkAdecuado_' + posicion).is(':checked')) {
            adecuado = 0;
        } else {
            adecuado = 1;
        }        

        //console.log(cie10)
        //console.log(cie10desc)

        if (cie10.length > 0 && cie10desc.length == 0) {
            swal('Evolution Ordenamientos', 'Lo sentimos, debes ingresar un diagnóstico valido.', 'warning');
        } else if (proveedorasignado == "0") {
            swal('Evolution Ordenamientos', 'Lo sentimos, debes seleccionar un proveedor de la lista', 'warning');

         } else {
            $.ajax({
                url: "GestionOrdenamientos.aspx/actualizarOrdenes",
                data: "{ tipoidoptimizador: '" + IdtipoOpt + "', optimizador: '" + IdOpt + "', idconsecutivo: '"
                    + idconsecutivo + "', proveedorasignado: '" + proveedorasignado + "', observacionesaudit: '"
                    + observacionesaudit + "', observacionesagen: '" + observacionesagen + "', at4: '" + at4 + "', cie10: '"
                    + cie10 + "', adecuado: '" + adecuado + "', profesional: '" + profesional + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                type: 'POST'
            }).done(function (rest) {
                if (rest.Error != undefined) {
                    alert(rest.Error);
                } else {
                    var listaDatos = JSON.parse(rest.d);
                    var datos = listaDatos.Table;

                    if (listaDatos.Table.length > 0) {

                        if (datos[0].Respuesta == "OK") {
                            swal('Evolution Ordenamientos', 'Bien, la orden se auditó correctamente.', 'success');
                            //tr[posiciontabla].style.display = "none";
                            document.getElementById("tablaAsignar").deleteRow(posiciontabla);
                            totalpendientes = totalpendientes - 1;
                            document.getElementById('lbltotalpendientes').innerHTML = totalpendientes;
                            $("#ModalAcciones").modal('hide');
                        } else {
                            swal('Evolution Ordenamientos', 'Lo sentimos, la orden no se auditó correctamente.', 'warning');
                        }
                    }
                    else {
                        swal('Evolution Ordenamientos', 'Lo sentimos, el registro no se actualizo.', 'warning');
                    }
                }
            });
        }
    }

function MasInformacion(posicion) {
  
        document.getElementById('myModaltittle').innerHTML ='Detalle de la Orden ' + datosorden[posicion].Codigo_Solicitud_Ciklos;

        document.getElementById('lblsolicitud').innerHTML = datosorden[posicion].Cups;
        document.getElementById('lblpaciente').innerHTML = datosorden[posicion].Id_Afiliado;
        document.getElementById('lbltiposervicio').innerHTML = datosorden[posicion].Tipo_de_servicio;
        document.getElementById('lblestadoservicio').innerHTML = datosorden[posicion].Estado_servicio;
    
        document.getElementById('lblestadoserv').innerHTML = datosorden[posicion].Nivel_Autorizacion;
        document.getElementById('lbltiposerv').innerHTML = datosorden[posicion].Centro_generador_de_autorizacion;
    
        $("#myModal").modal();   
    }

function GuardarAdjuntoProveedor(id) {
    
        archivos = [];
        $("#ModalAdjuntoProveedor .modal-body").html('');
   
        var body='';
        body += '<div class="cinta_whit_sh"><label>Arrastra el archivo o toca para seleccionar</label></div><div id="mydropzone1_' + id + '" class="dropzone"></div>';
        $("#ModalAdjuntoProveedor .modal-body").append(body);
        $("#ModalAdjuntoProveedor").modal();
       
        Dropzone.autoDiscover = false;

        $("#mydropzone1_"+id).dropzone({
            url: "ImportarArchivo.ashx",
            addRemoveLinks: true,
            success: function (file, response) {
                var filename = response;               
                archivos.push(filename);
                //console.log(archivos)
                //console.log(archivos.toString())
                sessionStorage.setItem('archivos', archivos);
            },
            error: function (file, response) {
                alert("Error cargando el archivo");
            }
        });

    }

function MasInformacionProveedor(posicion) {

        document.getElementById('lblcupsPro').innerHTML = datosorden[posicion].Cups;   
        document.getElementById('lblpacientePro').innerHTML = datosorden[posicion].Id_Afiliado;
        document.getElementById('lblusuregistroPro').innerHTML = datosorden[posicion].TipoIdOptimizador +': '+ datosorden[posicion].Optimizador;
        document.getElementById('lblestadosoliPro').innerHTML = datosorden[posicion].Estado_Solicitud;
        document.getElementById('lblestadoservPro').innerHTML = datosorden[posicion].Estado_servicio;
        document.getElementById('lbltiposervPro').innerHTML = datosorden[posicion].ObservacionesAud;

        $("#DetalleModalProveedor").modal();
    }

function GuardarProovedorGestion(posicion, posiciontabla) {

        var orden = $('#txtOrden_' + posicion).val();
        var idorden = posicion;
        var proveedor = IdOpt;
        var adjunto = archivos.toString();

        if (orden.length == 0) {
            swal('Evolution Ordenamientos', 'Lo sentimos, debes ingresar el número de la orden para continuar.', 'warning');
            $('#check_' + posicion).prop('checked', false);

        } else  if (!$('#check_' + posicion).is(':checked')) {
            $('#check_' + posicion).prop('checked', true);
            swal('Evolution Ordenamientos', 'Lo sentimos, esta orden ya fue diligenciada y no es posible cambiar el estado.', 'warning');
        } else {
           

            $.ajax({
                url: "GestionOrdenamientos.aspx/guardarOrdenesEstadoProveedor",
                data: "{ proveedor: '" + proveedor + "', idorden: '" + idorden + "', orden: '" + orden + "', adjunto: '" + adjunto + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                type: 'POST'
            }).done(function (rest) {
                if (rest.Error != undefined) {
                    alert(rest.Error);
                } else {
                    var listaDatos = JSON.parse(rest.d);
                    var datos = listaDatos.Table;

                    if (listaDatos.Table.length > 0) {

                        if (datos[0].Respuesta == "OK") {

                            $('#txtOrden_' + idorden).prop("disabled", true);
                            $('#btnAdjunto_' + idorden).prop("disabled", true);
                            swal('Evolution Ordenamientos', 'Bien, la orden se diligenció correctamente.', 'success');
                      
                        } else {
                            swal('Evolution Ordenamientos', 'Lo sentimos, la no orden se diligenció correctamente.', 'warning');
                        }
                    }
                    else {
                        swal('Evolution Ordenamientos', 'Lo sentimos, el registro no se actualizo.', 'warning');
                    }
                }
            });           
        }    
}

function SeleccionarCUPS() {   

    $('#tablaCUPS tbody').html('');
    var descripcion = $('#ddlCupsout').val();


    if (descripcion.length == 0 || descripcion == "") {
        swal('Evolution Ordenamientos', 'Lo sentimos, debes selecionar una descripcion valida.', 'warning');
    } else {
        for (var i = 0; i < listacupsout.Table.length; i++) {
            if (listacupsout.Table[i].Nit == descripcion) {
                var tbl = '';
                tbl += '<tr>';
                tbl += '<td>' + '<input type="text" id="txtOrden_' + i + '" placeholder="Ingresa el CUPS">' + '</td>';
                tbl += '<td>' + listacupsout.Table[i].Nit + '</td>';
                tbl += '<td>' + '<button id="btnAsignarCups_' + i +
                        '" class="btn btn-primary" onclick="GuardarCUPS(' + i + ')">Guardar</button>' + '</td>';
                tbl += '</tr>';

                $("#tablaCUPS").append(tbl);
            }
        }
    }

    
}

function GuardarCUPS(i) {

    //$('#tablaCUPS td').remove();

    var descripcion = $('#ddlCupsout').val();
    var cups = $('#txtOrden_' + i).val();

    if (cups.length == 0) {
        swal('Evolution Ordenamientos', 'Lo sentimos, debes ingresar un CUPS.', 'warning');
    } else {

         $.ajax({
        url: "GestionOrdenamientos.aspx/actualizarCups",
        data: "{ DescripcionCUPS: '" + descripcion + "', CUPS: '" + cups + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        type: 'POST'
    }).done(function (rest) {
        if (rest.Error != undefined) {
            swal('EvolutionNet', 'No tiene permisos para ingresar', 'warning');
        } else {
            //Obtenemos la lista
            var lista = JSON.parse(rest.d);

            if (lista.Table.length > 0) {

                if (lista.Table[0].Respuesta == "OK") {                   
                   
                    ////Recarga el combo y limpia la pantalla
                    $('#tablaCUPS tbody').html('');
                    //$('#ddlCupsout').attr('title','');
                    $('#ddlCupsout').html('');
                    var cboCupsOut = $('#ddlCupsout');
                    llenarCombos(cboCupsOut, "spGestionOrdenamientos_ObtenerCupsSinAsignar");

                    swal('Evolution Ordenamientos', 'Bien, la asignación se realizó correctamente.', 'success');
                    

                } else {
                    swal('Evolution Ordenamientos', 'Lo sentimos, la descripcion seleccionada ya ah sido asignada, favor comunicarse con sistemas para revisar.', 'warning');
                }
            }
            else {
                swal('Evolution Ordenamientos', 'Lo sentimos, el registro no se actualizo.', 'warning');
            }     
        }

    });

    }
    

    

}

//llenar combos o select
function llenarCombos(combo, spP) {

        $.ajax({
            url: "GestionOrdenamientos.aspx/cargarDatos",
            data: "{ sp: '" + spP + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            type: 'POST'
        }).done(function (rest) {
            if (rest.Error != undefined) {
                swal('EvolutionNet', 'No tiene permisos para ingresar', 'warning');
            } else {
                //Obtenemos la lista
                var lista = JSON.parse(rest.d);

                // $.each(lista, function (index, value) {
                //Incrustamos las opciones del SelectList
                for (var i = 0; i < lista.Table.length; i++) {

                    $(combo).append('<option value="' + lista.Table[i].Nit + '">' + lista.Table[i].RazonSocial + '</option>');


                    if (combo.selector == "#ddlCupsout") {
                        listacupsout = lista;
                    }
                   
                }
                // });
            }

        });
    }

var archivos = [];
function subirArchivos() {
        Dropzone.autoDiscover = false;

        $("#mydropzone").dropzone({
            url: "ImportarArchivo.ashx",
            addRemoveLinks: true,
            success: function (file, response) {
                var imgName = response;
                archivos.push(imgName);
                sessionStorage.setItem('archivos', archivos);
            },
            error: function (file, response) {
               
                alert("Error cargando el archivo");
            }
        });

    }

    //jQuery time
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    $(".next").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50) + "%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({ 'transform': 'scale(' + scale + ')' });
                next_fs.css({ 'left': left, 'opacity': opacity });
            },
            duration: 500,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeOutQuint'
        });
    });

    $(".previous").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                left = ((1 - now) * 50) + "%";
                //3. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({ 'left': left });
                previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
            },
            duration: 500,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeOutQuint'
        });
    });

    $(".submit").click(function () {
        return false;
    })

function procesarArchivo() {

             
        if (archivos.length == 0 || nombrearchivo == archivos || archivos.toString().indexOf("error") != -1) {
        swal('Evolution Ordenamientos', 'Lo sentimos, no se encontraron archivos o el archivo ya fue procesado anteriormente.', 'warning');
        } else {

        $.ajax({
            url: "GestionOrdenamientos.aspx/procesarArchivo",
            data: "{ Archivo: '" + archivos + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            type: 'POST'
        }).done(function (rest) {

            //console.log(rest)
            //console.log(rest.d)

            if (rest.d == "KO") {
                //alert(rest.Error);
                swal('Evolution Ordenamientos', 'Lo sentimos, no se encontraron archivos con el formato adecuado.', 'warning');
            } else {
                nombrearchivo = archivos;
                swal('Evolution Ordenamientos', 'Bien, proceso realizado con exito.', 'success');
            }

            //if (rest.Error != undefined) {
            //    alert(rest.Error);
            //    swal('GestionOrdenamiento', 'lo sentimos, ocurrio un error..', 'warning');
            //} else {
            //    swal('GestionOrdenamiento', 'Proceso realizado con exito..', 'success');
            //}
        });
    }       
 }

function consultarAsignaciones(spP) {

        $.ajax({
            url: "GestionOrdenamientos.aspx/cargarDatos",
            data: "{ sp: '" + spP + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            type: 'POST'
        }).done(function (rest) {
            if (rest.Error != undefined) {
                swal('EvolutionNet', 'No tiene permisos para ingresar', 'warning');
            } else {
               
                var listaDatos = JSON.parse(rest.d);
                var datos = listaDatos.Table;

                $('#tablaParametros td').remove();             

                if (listaDatos.Table.length > 0) {
                  
                    for (var i = 0; i < datos.length; i++) {
                     
                        var tbl = '';
                        tbl += '<tr id="tr_' + datos[i].IdAsignacion + '">';
                        tbl += '<td>' + datos[i].NombreCompleto + '</td>';
                        tbl += '<td>' + datos[i].identificacion + '</td>';
                        tbl += '<td>' + datos[i].cups + '</td>';
                        tbl += '<td>' + datos[i].Descripcion + '</td>';
                        tbl += '<td>' + '<button id="btnEliminar_' + datos[i].IdAsignacion + '" onclick="EliminarResponsable(' + datos[i].IdAsignacion + ')" class="btn btn-primary">Eliminar</button>' + '</td>';
                        tbl += '</tr>';

                        $("#tablaParametros").append(tbl);
                    }
                }
                else {
                    //swal('Evolution Ordenamientos', 'No se encontraron ordenes asignadas al usuario: ' + tipoidoptimizador +': ' + idoptimizador + '.', 'warning');                   
                }              
            }

        });

    }

function AsignarResponsables() {
            
        var idresponsable = $('#ddlEmpleado').val();
        var responsable = $("#ddlEmpleado :selected").text();
        var cups = $('#ddlCups').val();
        var descripcion = $("#ddlCups :selected").text();      
    //var rowCount = $('#tablaParametros tr').length;       

        //console.log(idresponsable)
        //console.log(cups)
        //console.log($('#selecttest').val())

        if (idresponsable.length == 0 || cups == "null" || idresponsable == 0) {
            swal('EvolutionNet', 'Lo sentimos, debes seleccionar un resposable de la lista.', 'warning');
        }else if (cups.length = 0 || cups == "null" || cups == 0) {
            swal('EvolutionNet', 'Lo sentimos, debes seleccionar un cups de la lista.', 'warning');
        } else {
            
            $.ajax({
                url: "GestionOrdenamientos.aspx/guardarAsignacionResponsable",
                data: "{ IdTipoId: '" + idtipoidaux + "', Identificacion: '" + idresponsable + "', Cups: '" + cups + "', descripcion: '" + descripcion + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                type: 'POST'
            }).done(function (rest) {
                if (rest.Error != undefined) {
                    alert(rest.Error);
                } else {
                    var listaDatos = JSON.parse(rest.d);
                    var datos = listaDatos.Table;

                    if (listaDatos.Table.length > 0) {

                        if (datos[0].Respuesta == "OK") {

                            var tbl = '';
                            tbl += '<tr id="tr_' + datos[0].idasignacion + '">';
                            tbl += '<td>' + responsable + '</td>';
                            tbl += '<td>' + idresponsable + '</td>';
                            tbl += '<td>' + cups + '</td>';
                            tbl += '<td>' + descripcion + '</td>';
                            tbl += '<td>' + '<button id="btnEliminar_a' + datos[0].idasignacion + '" onclick="EliminarResponsable(' + datos[0].idasignacion + ')" class="btn btn-primary">Eliminar</button>' + '</td>';
                            tbl += '</tr>';

                            $("#tablaParametros").append(tbl);
                           
                            swal('Evolution Ordenamientos', 'Bien, la asignación se realizó correctamente.', 'success');

                        } else {
                            swal('Evolution Ordenamientos', 'Lo sentimos, el CUPS ' + cups + ' ya fue asignado a ' + responsable +'.', 'warning');
                        }
                    }
                    else {
                        swal('Evolution Ordenamientos', 'Lo sentimos, el registro no se actualizo.', 'warning');
                    }
                }
            });
        }       
    }

function EliminarResponsable(idasignacion) {
      
        $.ajax({
            url: "GestionOrdenamientos.aspx/eliminarAsignacionResponsable",
            data: "{ idasignacion: '" + idasignacion + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            type: 'POST'
        }).done(function (rest) {
            if (rest.Error != undefined) {
                alert(rest.Error);
            } else {
                var listaDatos = JSON.parse(rest.d);
                var datos = listaDatos.Table;

                if (listaDatos.Table.length > 0) {

                    if (datos[0].Respuesta == "OK") {
                        //borra la fila de la tabla en pantalla
                        $('#tr_' + idasignacion).html('');
                        //tr[posicion].style.display = "none";
                        swal('Evolution Ordenamientos', 'Bien, la asignación se eliminó correctamente.', 'success');
                    } else {
                        swal('Evolution Ordenamientos', 'Lo sentimos, la asignación no se eliminó correctamente.', 'warning');
                    }
                }
                else {
                    swal('Evolution Ordenamientos', 'Lo sentimos, el registro no se eliminó.', 'warning');
                }
            }
        });
                
    }

function FiltrarResponsables() {

        var input, filter, table, tr, td, i;
        input = document.getElementById("txtfiltroRespon");
        filter = input.value.toUpperCase();
        table = document.getElementById("tablaParametros");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

}

function RepartirOrdenes() {
   
    $.ajax({
        url: "GestionOrdenamientos.aspx/actualizarDistribuir_Ordenes",
        data: "{ IdtipoOpt: '" + IdtipoOpt + "', IdOpt: '" + IdOpt + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        type: 'POST'
    }).done(function (rest) {
        if (rest.Error != undefined) {
            alert(rest.Error);
        } else {
            var listaDatos = JSON.parse(rest.d);
            var datos = listaDatos.Table;
           
            //$('#tablaRepartir td').remove();
            $('#tablaRepartir tbody').html('');


            if (listaDatos.Table.length > 0) {          

               

                for (var i = 0; i < datos.length; i++) {

                    var tbl = '';
                    tbl += '<tr>';
                    tbl += '<td>' + datos[i].IdTipoId + '</td>';
                    tbl += '<td>' + datos[i].Identificacion + '</td>';
                    tbl += '<td>' + datos[i].NombreCompleto + '</td>';
                    tbl += '<td>' + datos[i].Cups + '</td>';
                    tbl += '<td>' + datos[i].TotalAsignado + '</td>';
                    tbl += '<td>' + datos[i].TotalOrdenes + '</td>';
                    tbl += '</tr>';

                    $("#tablaRepartir").append(tbl);

                    $("#loaderepartir").hide();                    
                }
            }
            else {
                swal('Evolution Ordenamientos', 'Lo sentimos, no se encontraron datos, todas las ordenes ya fueron asignadas.', 'warning');
                $("#loaderepartir").hide();
            }
        }
    });
}

function ObtenerResponsablesAsignaciones(spP) {
    $.ajax({
        url: "GestionOrdenamientos.aspx/cargarDatos",
        data: "{ sp: '" + spP + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        type: 'POST'
    }).done(function (rest) {
        if (rest.Error != undefined) {
            alert(rest.Error);
        } else {
            var listaDatos = JSON.parse(rest.d);
            var datos = listaDatos.Table;

            //$('#tblasignacionesresponsables td').remove();
            $('#tblasignacionesresponsables tbody').html('');

            if (listaDatos.Table.length > 0) {

                for (var i = 0; i < datos.length; i++) {

                    var tbl = ''; 
                    tbl += '<tr>';
                    tbl += '<td>' + datos[i].TipoIdOptimizador + '</td>';
                    tbl += '<td>' + datos[i].Optimizador + '</td>';
                    tbl += '<td>' + datos[i].NombreCompleto + '</td>';
                    tbl += '<td>' + datos[i].cups + '</td>';
                    tbl += '<td>' + datos[i].TotalOrdenesAsignadas + '</td>';
                    tbl += '<td>' + datos[i].TotalOrdenesAuditadas + '</td>';
                    tbl += '</tr>';

                    $("#tblasignacionesresponsables").append(tbl);
                }

                ExportToExcelResponsables();
            }
            else {
                swal('Evolution Ordenamientos', 'Lo sentimos, no se encontraron datos.', 'warning');
            }
        }
    });

}

function obtenerDashboard(spP) {

        var cups = [];
        var cantidades = [];
        var coloress = [];   
    
        $.ajax({
            url: "GestionOrdenamientos.aspx/cargarDatos",
            data: "{ sp: '" + spP + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            type: 'POST'
        }).done(function (rest) {
            if (rest.Error != undefined) {
                alert(rest.Error);
            } else {
                var listaDatos = JSON.parse(rest.d);
                var datos = listaDatos.Table;
                var datos1 = listaDatos.Table1;
                var datos2 = listaDatos.Table2;
                var datos3 = listaDatos.Table3;
                var datos4 = listaDatos.Table4;

                if (listaDatos.Table.length > 0) {
                    coloress = colores.sort(function () { return Math.random() - 0.5 });

                    if (datos.length <= 10) {
                        for (var i = 0; i < datos.length; i++) {
                            cups.push(datos[i].cups);
                            cantidades.push(datos[i].cantidad);
                        }
                    } else {
                        for (var i = 0; i < 10; i++) {
                            cups.push(datos[i].cups);
                            cantidades.push(datos[i].cantidad);
                        }
                    }
                              
                    coloress.push(colores);

                    $("#lblgeneradas").html(datos1[0].TotalOrdenes);
                    $("#lblpendientes").html(datos2[0].TotalPendientes);
                    $("#lbladecuadas").html(datos3[0].TotalAdecuadas);
                    $("#lblnoadecuadas").html(datos4[0].TotalNoAdecuadas);

                    pintarGrafico1(cups, cantidades, coloress);

                    //$('#tbldetallegraficodash td').remove();
                    $('#tbldetallegraficodash tbody').html('');

                    for (var i = 0; i < datos.length; i++) {

                        var tbl = '';
                        tbl += '<tr>';
                        tbl += '<td>' + datos[i].cups + '</td>';
                        tbl += '<td>' + datos[i].Descripcion + '</td>';
                        tbl += '<td>' + datos[i].cantidad + '</td>';
                        tbl += '</tr>';

                        $("#tbldetallegraficodash").append(tbl);
                    }
                }
                else {
                    swal('Evolution Ordenamientos', 'Lo sentimos, no se encontraron datos.', 'warning');
                    $("#loaderdashboard").hide();
                }
            }
        });
    }

function pintarGrafico1(motivos, cantidades, colores) {

        //console.log(cantidades.map(Number));
        var chart = Highcharts.chart('container', {

            title: {
                text: 'CUPS MAS GENERADOS'
            },
            
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: 'Total: {point.y}'
            },
            plotOptions: {
                series: {               
                    borderWidth: 2,
                    dataLabels: {
                        enabled: true
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutBounce'
                    }
                }
            },

            yAxis: {
                title: {
                    text: 'Total generados'
                }
            },

            xAxis: {
                categories: motivos
            },

            series: [{
                type: 'column',
                colors: colores,
                colorByPoint: true,
                data: cantidades.map(Number),
                showInLegend: false
            }]

        });

        $("#loaderdashboard").hide();
}

function ExportToExcelRepartir() {
    var htmltable = document.getElementById('tablaRepartir');
    var html = htmltable.outerHTML;
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
}

function ExportToExcel() {
        var htmltable = document.getElementById('tbldetallegraficodash');
        var html = htmltable.outerHTML;
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
}

function ExportToExcelResponsables() {
    var htmltable = document.getElementById('tblasignacionesresponsables');
    var html = htmltable.outerHTML;
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
}

function pintarGrafico2() {
        Highcharts.chart('containergrafico2', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
   
    }

function pintarGrafico3() {
    
        // Build the chart
        Highcharts.chart('containergrafico2', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Browser market shares January, 2015 to May, 2015'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Microsoft Internet Explorer',
                    y: 56.33
                }, {
                    name: 'Chrome',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Firefox',
                    y: 10.38
                }, {
                    name: 'Safari',
                    y: 4.77
                }, {
                    name: 'Opera',
                    y: 0.91
                }, {
                    name: 'Proprietary or Undetectable',
                    y: 0.2
                }]
            }]
        });
    }
