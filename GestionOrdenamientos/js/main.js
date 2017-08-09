
var colores = ['#FC1404', '#E91E63', '#9C27B0', '#0E2DDC', '#1ecbf2', '#009688', '#8B092E', '#DDF02B', '#FF7103', '#ffcb8e', '#64F510', '#FFFF00'];
var usuario, IdtipoOpt, IdOpt, datosorden, totalpendientes, detalledashboard,nombrearchivo,listacupsout;
var idtipoidaux = "CC";
var swalheadertxt = "Ordenamientos";

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
                swal(swalheadertxt, 'Los campos usuario y contraseña son necesarios!', 'warning');
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
            swal(swalheadertxt, 'Los campos usuario y contraseña son necesarios.', 'warning');
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

    $('#reportecups').on("click", function (e) {
        ObtenerReporteCUPS("spGestionOrdenamientos_ReporteCups");
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
	        var datos = lista.Table;

	        if (lista.Table.length > 0) {

	            if (lista.Table[0].respuesta == "OK") {

                   for (var i = 0; i < datos.length; i++) {
                        //Muestra el menu y la pagina correspondiente
	                    $('#' + datos[i].Menu).show();
	                    $('#' + datos[i].Pagina).show();
	                    ObtenerDatosIniciales(datos[i].Menu, lista);
                   }
                  
                   IdtipoOpt = lista.Table[0].idtipoid;
                   IdOpt = lista.Table[0].identificacion;
                   openMenu();                  
                   $('#btnMenu').removeAttr('style');
                   //ObtenerDatosIniciales(lista.Table[0].idtipousuario, lista);

	                //if (lista.Table[0].idtipousuario == "0") {
	                //    //si es un tipo usu o admin, vera todo el menu
	                //    openMenu();
	                //    consultarOrdenesFecha(lista.Table[0].idtipoid, lista.Table[0].identificacion);
	                //    consultarOrdenesProveedor(lista.Table[0].identificacion);
	                //    consultarAsignaciones("spGestionOrdenamiento_ListarResponsables");	                    
	                //    $('#btnMenu').removeAttr('style');

	                //    var cboCupsOut = $('#ddlCupsout');
	                //    llenarCombos(cboCupsOut, "spGestionOrdenamientos_ObtenerCupsSinAsignar");

	                //}else  if (lista.Table[0].idtipousuario == "1") {
	                //    //si es un tipo usu 1 optimizador, solo vera menu asignar y reportes

                    //    //esconde los menus
	                //    //$('#MenuCargaArchivo').show();
	                //    //$('#MenuResponsables').show();
	                //    //$('#MenuProveedor').show();
	                //    //$('#MenuCUPS').show();

                    //    //esconde las paginas	                        
	                //    //$('#page-ImportarArchivo').show();
	                //    //$('#page-Responsables').show();
	                //    //$('#page-Proveedores').show();
	                //    //$('#page-CUPS').show();


	                //    var row_id = "MenuOptimizador";
	                //    $('#' + row_id).show()
	                //    //$('#MenuOptimizador').show();
	                //    $('#page-AsignarAT4').show();

	                //    $('#MenuReportes').show();
	                //    $('#page-DashBoard').show();

	                //    openMenu();
	                //    consultarOrdenesFecha(lista.Table[0].idtipoid, lista.Table[0].identificacion);
	                //    $('#btnMenu').removeAttr('style');
	                //} else if (lista.Table[0].idtipousuario == "2") {
	                //    //si es un tipo usu 2 proveedor, solo vera el menu de proveedor y reportes
	                //    $('#MenuOptimizador').hide();
	                //    $('#MenuCargaArchivo').hide();
	                //    $('#MenuResponsables').hide();
	                //    $('#MenuCUPS').hide();

	                //    $('#page-AsignarAT4').hide();
	                //    $('#page-ImportarArchivo').hide();
	                //    $('#page-Responsables').hide();
	                //    $('#page-CUPS').hide();

	                //    openMenu();
	                //    consultarOrdenesProveedor(lista.Table[0].identificacion);
	                //    $('#btnMenu').removeAttr('style');
	                //} else {
	                //    swal('Evolution Ordenamientos', 'Lo sentimos, el usuario no tiene un rol valido definido, favor comunicarse con el área de sistemas.', 'warning');
	                //}

	                $('#lblUsuario').html(lista.Table[0].idtipoid + ': ' + lista.Table[0].identificacion);
	                $('#lblNombreUsuario').html(lista.Table[0].NombreCompleto);
	                    
	            } else {
	                swal({
	                    title: swalheadertxt,
	                    text: "Lo sentimos, no tienes permisos para ingresar.",
	                    type: "error",
	                    confirmButtonText: "ACEPTAR"
	                });	                
	            }
	        }
	        else {
	            swal({
	                title: swalheadertxt,
	                text: "Lo sentimos, no tienes permisos para ingresar.",
	                type: "error",
	                confirmButtonText: "ACEPTAR"
	            });
	        }
	    }
	});
}

function ObtenerDatosIniciales(Menu, lista) {
    switch (Menu) {
        case "MenuResponsables":
            consultarAsignaciones("spGestionOrdenamiento_ListarResponsables");
            $("#ddlCups").select2({
                placeholder: "Selecciona el CUPS"
            });
            $("#ddlEmpleado").select2({
                placeholder: "Selecciona el Responsable"
            });
            var cboEmpleado = $('#ddlEmpleado');
            llenarCombos(cboEmpleado, "spOrdenamientos_ObtenerUsuarios");
            var cboCups = $('#ddlCups');
            llenarCombos(cboCups, "spOrdenamientos_Obtener_ListaCUPS");
            break;
        case "MenuOptimizador":
            consultarOrdenesFecha(lista.Table[0].idtipoid, lista.Table[0].identificacion);
            break;
        case "MenuProveedor":
            consultarOrdenesProveedor(lista.Table[0].identificacion);
            break;
        case "MenuCUPS":
            $("#ddlCupsout").select2({
                placeholder: "Selecciona la descripcion dada desde ciklos"
            });
            var cboCupsOut = $('#ddlCupsout');
            llenarCombos(cboCupsOut, "spGestionOrdenamientos_ObtenerCupsSinAsignar");
            break;
        case "MenuReportes":
            obtenerDashboard("spGestionOrdenamientos_ObtenerDashboard");
            
    }
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
	                       
	                   // console.log(datos[i].idConsecutivo)

	                    var tbl = '';
	                    //tbl += '<tr>';
	                    tbl += '<tr id="tr_' + datos[i].idConsecutivo + '">';
	                    tbl += '<td>' + datos[i].Codigo_Solicitud_Ciklos + '</td>';
	                    tbl += '<td>' + datos[i].Fecha_Registro_Solicitud + '</td>';
	                    tbl += '<td>' + datos[i].Fecha_Esperada_de_Respuesta + '</td>';
	                    tbl += '<td>' + datos[i].DiasEspera + '</td>';
	                    tbl += '<td>' + datos[i].Prestador_Solicitante + '</td>';
	                    tbl += '<td>' + datos[i].Cups + '</td>';
	                    tbl += '<td>' + datos[i].DescripcionNew + '</td>';
	                    tbl += '<td>' + '<button id="btninfo_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="MasInformacion(' + i + ')">Ver</button>' + '</td>';
	                    tbl += '<td>' + '<button id="btnAsignarProveedor_' + datos[i].idConsecutivo +
                                '" class="btn btn-primary" onclick="ValidarOrden(' + datos[i].idConsecutivo + ',' + i + ')">Auditar</button>' + '</td>';
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
	                tbl += '<td>' + datos[i].DescripcionNew + '</td>';
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


function ValidarOrden(posicion, posiciontabla) {

    $.ajax({
        url: "GestionOrdenamientos.aspx/validarOrden",
        data: "{ Id: '" + posicion + "'}",
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

                    swal({
                        title: swalheadertxt,
                        text: "Ya existe una orden similar que anteriormente fue optimizada!",
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: "Volver",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Continuar",
                        closeOnConfirm: true
                    },
                    function () {
                        document.getElementById('lblcodigo').innerHTML = datos[0].Codigo_Solicitud_Ciklos;
                        document.getElementById('lblFecha').innerHTML = datos[0].Fecha_Registro_Solicitud;
                        document.getElementById('lblFechaOpt').innerHTML = datos[0].Fecha_Registro_Solicitud;
                        document.getElementById('lblresponsable').innerHTML = datos[0].NombreCompleto;
                        document.getElementById('lblCups').innerHTML = datos[0].Cups;
                        document.getElementById('lbldetalle').innerHTML = datos[0].Descripcion;
                        document.getElementById('lblpacientet').innerHTML = datos[0].id_afiliado;

                        $("#ModalOrdenRepetida").modal();


                        $("#btnOmitirOrden").on("click", function (e) {
                          
                            swal({
                                title: swalheadertxt,
                                text: "¿Estas segur@ que la orden debe ser omitida?",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Si",
                                cancelButtonText: "No",
                                closeOnConfirm: false
                            }, function () {
                                GuardarOrdenRepetida(posicion);                              
                             });
                        });

                        $("#btnAuditarOrden").on("click", function (e) {
                            $('#ModalOrdenRepetida').modal('hide');
                            //$('#ModalOrdenRepetida').modal('toggle');
                            abrirModalAcciones(posicion, posiciontabla);
                        });

                        //swal(swalheadertxt, "La Orden se omitio correctamente.", "success");
                   });

                } else {
                    //console.log("ko")
                    abrirModalAcciones(posicion, posiciontabla);
                }
                //datos[i].FechaOptimizacion
            }else {
                swal({
                    title: swalheadertxt,
                    text: "Lo sentimos, no se pudo validar la orden, favor comunicarse con sistemas.",
                    type: "error",
                    confirmButtonText: "ACEPTAR"
                });
                

            }
        }
    });
}

function GuardarOrdenRepetida(posicion) {
    $.ajax({
        url: "GestionOrdenamientos.aspx/guardarOrdenrepetida",
        data: "{ Id: '" + posicion + "'}",
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
                    $('#tr_' + posicion).html('');

                    swal(swalheadertxt, "Bien, la orden se omitio correctamente", "success");
                    $('#ModalOrdenRepetida').modal('hide');

                } else {
                    swal({
                        title: swalheadertxt,
                        text: "Lo sentimos, no se pudo validar la orden, favor comunicarse con sistemas.",
                        type: "error",
                        confirmButtonText: "ACEPTAR"
                    });
                }
            } else {
                swal({
                    title: swalheadertxt,
                    text: "Lo sentimos, no se pudo validar la orden, favor comunicarse con sistemas.",
                    type: "error",
                    confirmButtonText: "ACEPTAR"
                });


            }
        }
    });

}

function abrirModalAcciones(posicion, posiciontabla) {


    //console.log(posiciontabla)

    $("#ModalAcciones .modal-body").html('');
    $("#ModalAcciones .modal-footer").html('');

    var body = '';
    var footer = '';

    body += '<div class="box_swith_mod"><p>Genero AT4:</p><label class="switch"><input id="checkAt4_' + posicion + '" type="checkbox" onclick="GeneroAt4(' + posicion + ',' + posiciontabla + ')"><span class="slider round"></span></label></div>';
    body += '<div class="box_swith_mod" style="margin-bottom:5px"><p>Adecuada:</p><label class="switch"><input id="checkAdecuado_' + posicion + '" type="checkbox" onclick="NoAdecuado(' + posicion + ',' + posiciontabla + ')"><span class="slider round"></span></label></div>';

    body += '<div id="ddl_Div_' + posicion + '"><p style="margin:5px 0px 0px">Motivo AT4:</p><select id="ddl_Noat4_' + posicion + '" style="width:100%" class="js-example-basic-single js-states form-control" ></select></div>';

    body += '<p style="margin:5px 0px 0px">Observaciones Auditoria:</p><input type="text" id="txtObservacionesAud_' + posicion + '" placeholder="Relacionadas con la atención y notas de tipo médico." class="form-control">';
    body += '<p style="margin:5px 0px 0px">Observaciones Generales:</p><input type="text" id="txtObservacionesGene_' + posicion + '" placeholder="Relacionadas con cambios de servicio y datos administrativos." class="form-control">';
    body += '<p style="margin:5px 0px 0px">CIE 10:</p><input type="text" id="txtCIE10_' + posicion + '" placeholder="Ingresa el diagnóstico y presiona ENTER para buscar" class="form-control">';
    body += '<input type="text" style="margin-top:2px" id="txtCIE10Desc_' + posicion + '" placeholder="Descripción diagnóstico" class="form-control">';
    body += '<p style="margin:5px 0px 0px">Profesional Solicitante:</p><input type="text" id="txtProfesional_' + posicion + '" placeholder="Ingresa el nombre del profesional" class="form-control">';
    body += '<div id="ddl_Div_Proveedor' + posicion + '"><p style="margin:5px 0px 0px">Proveedor:</p><select id="ddl_Proveedoress_' + posicion + '" class="js-example-basic-single js-states form-control" style="width:100%"></select></div>';
    body += '<div id="ddl_DivSede_' + posicion + '"><p style="margin:5px 0px 0px">Sede PROMEDAN:</p><select id="ddl_PromedanSede_' + posicion + '" class="js-example-basic-single js-states form-control" style="width:100%"></select></div>';
    footer += '<button id="btnAsignarProveedor_' + posicion +
                                '" class="btn btn-primary" onclick="GuardarProovedor(' + posicion + ',' + 0 + ')">Guardar</button>';
   
    $("#ModalAcciones .modal-body").append(body);
    $("#ModalAcciones .modal-footer").append(footer);

    $('#checkAt4_' + posicion).prop('checked', true);
    $('#checkAdecuado_' + posicion).prop('checked', true);


    var noat4 = $('#ddl_Noat4_' + posicion);
    noat4.select2({
        placeholder: "Selecciona el porqué no se generó AT4"
    });   
    $('#ddl_Div_' + posicion).hide();

    var proveedor = $('#ddl_Proveedoress_' + posicion);
    proveedor.select2({
        placeholder: "Selecciona el Proveedor"
    });    
    llenarCombos(proveedor, "spsuministros_Proveedores_ObtenerNew");
  
    var sedes = $('#ddl_PromedanSede_' + posicion);  
    $('#ddl_DivSede_' + posicion).hide();
      
    proveedor.on('change', function () {
        var value = $(this).val();

        if (value == "9000389264") {
            $('#ddl_DivSede_' + posicion).show();
            llenarCombos(sedes, "spGestionOrdenamientos_ObtenerCentroCosto");
            sedes.select2({
                placeholder: "Selecciona la sede Promedan"
            });

        } else {            
            $('#ddl_DivSede_' + posicion).hide();
            sedes.val('').trigger('change')//limpia el combito y la descripcion
            sedes.html('');
           
        }
        //alert(value);
    });
       
    
    $('#txtCIE10Desc_' + posicion).prop('disabled', true);
     document.getElementById('ModaltittleAcciones').innerHTML = 'Gestión de la Orden ' + datosorden[posiciontabla].Codigo_Solicitud_Ciklos;

    $("#ModalAcciones").modal();

    //Despues de ingresar el diagnostico se detecta el ENTER
    $('#txtCIE10_' + posicion).keypress(function (e) {

        $('#txtCIE10Desc_' + posicion).val('');

        if (e.which == 13) {
            //Se obtienen los valores de los controles
            var diagnostico = $('#txtCIE10_' + posicion).val();
          
            if (diagnostico.length == 0) {
                swal({
                    title: swalheadertxt,
                    text: "Lo sentimos, el campo diagnóstico no puede estar vacío, debes ingresar un diagnóstico valido, ejemplo: S017.",
                    type: "info",
                    confirmButtonText: "ACEPTAR"
                });
               
               
            } else {
                ObtenerDiagnosticos(diagnostico, posicion);
            }
        }
    });

}

function GeneroAt4(posicion, posiciontabla) {

    if (!$('#checkAt4_' + posicion).is(':checked')) {
        //at4 = 0;
        //oculta proveedores y restea el valor
        $('#ddl_Div_Proveedor' + posicion).hide();
        $('#ddl_Proveedoress_' + posicion).val('');

        //oculta las sedes y resetea el valor
        $('#ddl_DivSede_' + posicion).hide();
        $('#ddl_PromedanSede_' + posicion).val('');

        $('#ddl_Div_' + posicion).show();        
        $('#ddl_Noat4_' + posicion).html('');
        $('#ddl_Noat4_' + posicion).append('<option value="' + 0 + '">' + "" + '</option>'); //para validar si el usuario no selecciono nada
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Razon 1" + '">' + "Razon 1" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Razon 2" + '">' + "Razon 2" + '</option>');
    } else {
        //at4 = 1;
        $('#ddl_Div_' + posicion).hide();       
        $('#ddl_Noat4_' + posicion).val('').trigger('change')
        $('#ddl_Div_Proveedor' + posicion).show();
    }   

}

function NoAdecuado(posicion, posiciontabla) {
   
    $('#ModalAcciones').modal('hide');
    $("#Modalnoadecuado .modal-body").html('');
    $("#Modalnoadecuado .modal-footer").html('');

    var footer = '';
    var body = '';

    body += '<div class="col-lg-12 col-md-12" style="padding:0px"><p style="margin:5px 0px 0px">Motivo no Adecuada:</p><select id="txtObservacionesmotivo" class="js-example-basic-single js-states form-control" style="width:100%"></select></div>';
    body += '<div class="col-lg-12 col-md-12" style="padding:0px"><p style="margin:5px 0px 0px">Observaciones Auditoria:</p><input type="text" id="txtObservacionesaud" placeholder="Relacionadas con la atención y notas de tipo médico." class="form-control"></div> ';
    body += '<div class="col-lg-12 col-md-12" style="padding:0px"><p style="margin:5px 0px 0px">Observaciones Generales:</p><input type="text" id="txtObservacionesgenera" placeholder="Relacionadas con cambios de servicio y datos administrativos." class="form-control"></div>';
    body += '<div class="col-lg-12 col-md-12" style="padding-bottom:10px;padding-left:0px;padding-right:0px"><p style="margin:5px 0px 0px">Profesional Solicitante:</p><input type="text" id="txtProfesionalsolicita" placeholder="Ingresa el nombre del profesional" class="form-control"></div>';
    footer += '<button id="btnguardarNoAdecuado_' + posicion +
                               '" class="btn btn-primary" onclick="GuardarProovedor(' + posicion + ',' + 1 + ')">Guardar</button>';
   
    $("#Modalnoadecuado .modal-body").append(body);
    $("#Modalnoadecuado .modal-footer").append(footer);

    $("#txtObservacionesmotivo").select2({
        placeholder: "Selecciona el motivo"
    });
    $("#txtObservacionesmotivo").append('<option value="' + 0 + '">' + "" + '</option>'); //para validar si el usuario no selecciono nada
    $("#txtObservacionesmotivo").append('<option value="' + "Completar HC" + '">' + "Completar HC" + '</option>');
    $("#txtObservacionesmotivo").append('<option value="' + "Completar Estudios" + '">' + "Completar Estudios" + '</option>');
    $("#txtObservacionesmotivo").append('<option value="' + "Anulada" + '">' + "Anulada" + '</option>');
    $("#txtObservacionesmotivo").append('<option value="' + "Repetida" + '">' + "Repetida" + '</option>');
    $("#txtObservacionesmotivo").append('<option value="' + "Innecesaria" + '">' + "Innecesaria" + '</option>');

   document.getElementById('Modalnoadecuadotittle').innerHTML = 'Reporte de no adecuada para la orden ' + datosorden[posiciontabla].Codigo_Solicitud_Ciklos;
  
   $("#Modalnoadecuado").modal();

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
                swal({
                    title: swalheadertxt,
                    text: "Lo sentimos, no se encontró el diagnóstico ingresado.",
                    type: "error",
                    confirmButtonText: "ACEPTAR"
                });
                
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

function GuardarProovedor(posicion,opcion) {
            
        var input, filter, table, tr, td, i;
        table = document.getElementById("tablaAsignar");
        tr = table.getElementsByTagName("tr");      
        var idconsecutivo = posicion;
        var proveedorasignado = $('#ddl_Proveedoress_' + posicion).val();
        var observacionesaudit = $('#txtObservacionesAud_' + posicion).val();
        var observacionesagen = $('#txtObservacionesGene_' + posicion).val();
        var sedepromedan = $('#ddl_PromedanSede_' + posicion).val();
        var noAt4motivo = $('#ddl_Noat4_' + posicion).val();    
        var cie10 = $('#txtCIE10_' + posicion).val();
        var cie10desc = $('#txtCIE10Desc_' + posicion).val();
        var profesional = $('#txtProfesional_' + posicion).val();
        var at4 = 0;
        var adecuado = 0;
        var motivonadecuado = $('#txtObservacionesmotivo').val();

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

        if (opcion == 1) {
            proveedorasignado = 'No Aplica';
            observacionesaudit = $('#txtObservacionesaud').val();
            observacionesagen = $('#txtObservacionesgenera').val();
            profesional = $('#txtProfesionalsolicita').val();
            at4 = 0;
            sedepromedan = 'No Aplica';
            noAt4motivo = 'No Aplica';
        } else {
            motivonadecuado = '';
        }
       
        if (opcion == 1 && motivonadecuado == 0) {
            swal(swalheadertxt, 'Lo sentimos, debes seleccionar el motivo del porqué no se generó AT4.', 'warning');
        }else if (cie10.length > 0 && cie10desc.length == 0) {
            swal(swalheadertxt, 'Lo sentimos, debes ingresar un diagnóstico valido.', 'warning');
        } else if ((proveedorasignado == "0" && at4 == 1) || (proveedorasignado == null && at4 == 1)) {
            swal(swalheadertxt, 'Lo sentimos, debes seleccionar un proveedor de la lista', 'warning');
        } else if (proveedorasignado == "9000389264" && sedepromedan == "00") {
            swal(swalheadertxt, 'Lo sentimos, al seleccionar como proveedor PROMEDAN debes seleccionar una sede de la lista.', 'warning');
        } else if (at4 == 0 && noAt4motivo == 0) {
            swal(swalheadertxt, 'Lo sentimos, debes seleccionar el motivo del porqué no se generó AT4.', 'warning');
        } else {
            ////TEST VALUES
            //console.log(noAt4motivo)
            //console.log(at4)
            //console.log(adecuado)
            //console.log(observacionesaudit)
            //console.log(observacionesagen)
            //console.log(cie10)
            //console.log(profesional)
            //console.log(proveedorasignado)           
            //console.log(sedepromedan)

            //console.log(motivonadecuado)                 


            $.ajax({
                url: "GestionOrdenamientos.aspx/actualizarOrdenes",
                data: "{ tipoidoptimizador: '" + IdtipoOpt + "', optimizador: '" + IdOpt + "', idconsecutivo: '"
                    + idconsecutivo + "', proveedorasignado: '" + proveedorasignado + "', observacionesaudit: '"
                    + observacionesaudit + "', observacionesagen: '" + observacionesagen + "', at4: '" + at4 + "', cie10: '"
                    + cie10 + "', adecuado: '" + adecuado + "', profesional: '" + profesional + "', sedepromedan: '"
                    + sedepromedan + "', noAt4motivo: '" + noAt4motivo + "', motivonadecuado: '" + motivonadecuado + "'}",
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

                            if (opcion == 1) {
                                //envia un correo con el reporte de la orden no adecuada
                                EnviarEmailNoAdecuado(posicion);
                                //borra la fila de la tabla en pantalla
                                $('#tr_' + posicion).html('');

                                totalpendientes = totalpendientes - 1;
                                document.getElementById('lbltotalpendientes').innerHTML = totalpendientes;
                                $("#ModalAcciones").modal('hide');
                                $("#Modalnoadecuado").modal('hide');

                            } else {
                                swal(swalheadertxt, 'Bien, la orden se auditó correctamente.', 'success');
                                ////tr[posiciontabla].style.display = "none";
                                //document.getElementById("tablaAsignar").deleteRow(posiciontabla);

                                //borra la fila de la tabla en pantalla
                                $('#tr_' + posicion).html('');

                                totalpendientes = totalpendientes - 1;
                                document.getElementById('lbltotalpendientes').innerHTML = totalpendientes;
                                $("#ModalAcciones").modal('hide');
                                $("#Modalnoadecuado").modal('hide');
                            }

                        } else {
                            swal(swalheadertxt, 'Lo sentimos, la orden no se auditó correctamente.', 'warning');
                        }
                    }
                    else {
                        swal(swalheadertxt, 'Lo sentimos, el registro no se actualizo.', 'warning');
                    }
                }
            });
        }
    }

function EnviarEmailNoAdecuado(posicion) {

    //console.log(posicion)
    $.ajax({
        url: "GestionOrdenamientos.aspx/enviarEmail",
        data: "{ posicion: '" + posicion + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        type: 'POST'
    }).done(function (rest) {
        if (rest.Error != undefined) {
            swal(swalheadertxt, 'No tiene permisos para ingresar', 'warning');
        } else {
            //Obtenemos la lista
            var lista = JSON.parse(rest.d);

            // $.each(lista, function (index, value) {
            //Incrustamos las opciones del SelectList
            for (var i = 0; i < lista.Table.length; i++) {

                if (lista.Table[i].Respuesta == "OK") {
                    swal(swalheadertxt, 'Bien, la orden se auditó correctamente y se envió un correo con el detalle de inadecuación.', 'success');
                } else {
                    swal(swalheadertxt, 'Lo sentimos, el registro no se actualizo, favor comunicarse con sistemas.', 'warning');
                }

            }
            // });
        }

    });

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
            swal(swalheadertxt, 'Lo sentimos, debes ingresar el número de la orden para continuar.', 'warning');
            $('#check_' + posicion).prop('checked', false);

        } else  if (!$('#check_' + posicion).is(':checked')) {
            $('#check_' + posicion).prop('checked', true);
            swal(swalheadertxt, 'Lo sentimos, esta orden ya fue diligenciada y no es posible cambiar el estado.', 'warning');
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
                            swal(swalheadertxt, 'Bien, la orden se diligenció correctamente.', 'success');
                      
                        } else {
                            swal(swalheadertxt, 'Lo sentimos, la no orden se diligenció correctamente.', 'warning');
                        }
                    }
                    else {
                        swal(swalheadertxt, 'Lo sentimos, el registro no se actualizo.', 'warning');
                    }
                }
            });           
        }    
}

function SeleccionarCUPS() {   

    $('#tablaCUPS tbody').html('');
    var descripcion = $('#ddlCupsout').val();


    if (descripcion.length == 0 || descripcion == "") {
        swal(swalheadertxt, 'Lo sentimos, debes selecionar una descripcion valida.', 'warning');
    } else {
        for (var i = 0; i < listacupsout.Table.length; i++) {
            if (listacupsout.Table[i].Nit == descripcion) {
                var tbl = '';
                tbl += '<tr>';
                tbl += '<td>' + listacupsout.Table[i].Nit + '</td>';
                tbl += '<td>' + '<input type="text" id="txtCupss_' + i + '" placeholder="Ingresa el CUPS" class="form-control">' + '</td>';
                tbl += '<td>' + '<input type="text" id="txtNuevaDescripcion_' + i + '" placeholder="Ingresa la nueva descripción" class="form-control">' + '</td>';
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
    var cups = $('#txtCupss_' + i).val();
    var nuevadescripcion = $('#txtNuevaDescripcion_' + i).val();

    //console.log(descripcion)
    //console.log(cups)
    //console.log(nuevadescripcion)

    if (cups.length == 0 || nuevadescripcion.length == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar un CUPS y la nueva descripción segun la resolución 1132.', 'warning');
    } else {

         $.ajax({
        url: "GestionOrdenamientos.aspx/actualizarCups",
        data: "{ DescripcionCUPS: '" + descripcion + "', CUPS: '" + cups + "', nuevadescripcion: '" + nuevadescripcion + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        type: 'POST'
    }).done(function (rest) {
        if (rest.Error != undefined) {
            swal(swalheadertxt, 'No tiene permisos para ingresar', 'warning');
        } else {
            //Obtenemos la lista
            var lista = JSON.parse(rest.d);

            if (lista.Table.length > 0) {

                if (lista.Table[0].Respuesta == "OK") {                   
                   
                    ////Recarga el combo y limpia la pantalla
                    $('#tablaCUPS tbody').html('');
                    //$('#ddlCupsout').attr('title','');
                    $('#ddlCupsout').html('');

                    $('#ddlCupsout').val('').trigger('change')
                    var cboCupsOut = $('#ddlCupsout');
                    llenarCombos(cboCupsOut, "spGestionOrdenamientos_ObtenerCupsSinAsignar");

                    swal(swalheadertxt, 'Bien, la asignación se realizó correctamente.', 'success');
                    

                } else {
                    swal(swalheadertxt, 'Lo sentimos, la descripcion seleccionada ya ah sido asignada, favor comunicarse con sistemas para revisar.', 'warning');
                }
            }
            else {
                swal(swalheadertxt, 'Lo sentimos, el registro no se actualizo.', 'warning');
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
                swal(swalheadertxt, 'No tiene permisos para ingresar', 'warning');
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
            swal(swalheadertxt, 'Lo sentimos, no se encontraron archivos o el archivo ya fue procesado anteriormente.', 'warning');
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
                swal(swalheadertxt, 'Lo sentimos, no se encontraron archivos con el formato adecuado.', 'warning');
            } else {
                nombrearchivo = archivos;
                swal(swalheadertxt, 'Bien, proceso realizado con exito.', 'success');
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
                swal(swalheadertxt, 'No tiene permisos para ingresar', 'warning');
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
            swal(swalheadertxt, 'Lo sentimos, debes seleccionar un responsable de la lista.', 'warning');
        }else if (cups.length = 0 || cups == "null" || cups == 0) {
            swal(swalheadertxt, 'Lo sentimos, debes seleccionar un cups de la lista.', 'warning');
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
                           
                            swal(swalheadertxt, 'Bien, la asignación se realizó correctamente.', 'success');

                        } else {
                            swal(swalheadertxt, 'Lo sentimos, el CUPS ' + cups + ' ya fue asignado a ' + responsable + '.', 'warning');
                        }
                    }
                    else {
                        swal(swalheadertxt, 'Lo sentimos, el registro no se actualizo.', 'warning');
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
                        swal(swalheadertxt, 'Bien, la asignación se eliminó correctamente.', 'success');
                    } else {
                        swal(swalheadertxt, 'Lo sentimos, la asignación no se eliminó correctamente.', 'error');
                    }
                }
                else {
                    swal(swalheadertxt, 'Lo sentimos, el registro no se eliminó.', 'error');
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
                swal(swalheadertxt, 'Lo sentimos, no se encontraron datos, todas las ordenes ya fueron asignadas.', 'info');
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
                swal(swalheadertxt, 'Lo sentimos, no se encontraron datos.', 'warning');
            }
        }
    });

}

function ObtenerReporteCUPS(spP) {
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
            $('#tablacupsreporte tbody').html('');

            if (listaDatos.Table.length > 0) {

                for (var i = 0; i < datos.length; i++) {

                    var tbl = '';
                    tbl += '<tr>';
                    tbl += '<td>' + datos[i].Codigo_Cups + '</td>';
                    tbl += '<td>' + datos[i].DescripcionNew + '</td>';
                    tbl += '<td>' + datos[i].Servicio + '</td>';
                    tbl += '</tr>';

                    $("#tablacupsreporte").append(tbl);
                }

                ExportToReportCups();
            }
            else {
                swal(swalheadertxt, 'Lo sentimos, no se encontraron datos.', 'warning');
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
                        tbl += '<td>' + datos[i].DescripcionNew + '</td>';
                        tbl += '<td>' + datos[i].Descripcion + '</td>';                        
                        tbl += '<td>' + datos[i].cantidad + '</td>';
                        tbl += '</tr>';

                        $("#tbldetallegraficodash").append(tbl);
                    }
                }
                else {
                    swal(swalheadertxt, 'Lo sentimos, no se encontraron datos.', 'warning');
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

function ExportToReportCups() {
    var htmltable = document.getElementById('tablacupsreporte');
    var html = htmltable.outerHTML;
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
}

function pintarGrafico2() {
    
    var Servicios = [];
    var Cantidades = [];
    var spP = "spGestionOrdenamientos_ObtenerGrafico2";
    
    $.ajax({
        url: "GestionOrdenamientos.aspx/cargarDatos",
        data: "{ sp: '" + spP + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        type: 'POST'
    }).done(function (rest) {
        if (rest.Error != undefined) {
            swal(swalheadertxt, 'No se encontraron datos', 'error');
        } else {
            var listaDatos = JSON.parse(rest.d);
            var TipoServicio = listaDatos.Table;

            if (listaDatos.Table.length > 0) {

                for (var i = 0; i < TipoServicio.length; i++) {
                    var serv = TipoServicio[i].Servicio;
                    var num = TipoServicio[i].Total;
                    Servicios.push(serv);
                    Cantidades.push(num);
                }

                MostrarGrafico2(Servicios, Cantidades, 10);

            } else {
                swal(swalheadertxt, 'Lo sentimos, no se encontraron datos', 'warning');
            }
    
        }

    });   
           
}

function MostrarGrafico2(tiporeque, totalreque, totalgeneral) {
    
    document.getElementById('ModalGrafico2tittle').innerHTML = 'TIPO DE SERVICIO';
    seriesreque = [];

    for (var i = 0; i < tiporeque.length; i++) {
        seriesreque.push({
            name: tiporeque[i],
            y: totalreque[i],
            color: colores[i],
        });
    }
    // Build the chart
    Highcharts.chart('containergrafico2', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: null
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
            name: 'Total',
            colorByPoint: true,
            data: seriesreque
        }]
    });
}

function pintarGrafico3() {

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

function showNotification(from, align) {

    //type = ['default','primary', 'info', 'success', 'warning', 'danger'];
    //color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "help_outline",
        message: "<b>Responsables: </b>Se asignan las personas que optimizaran las ordenes en funcion del CUPS."

    }, {
        //type: type[color],
        type: 'info',
        timer: 4000,
        placement: {
            from: from,
            align: align
        }
    });


}
