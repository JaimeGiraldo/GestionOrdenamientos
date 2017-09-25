
var colores = ['#FC1404', '#E91E63', '#9C27B0', '#0E2DDC', '#1ecbf2', '#009688', '#8B092E', '#DDF02B', '#FF7103', '#ffcb8e', '#64F510', '#FFFF00'];
var usuario, IdtipoOpt, IdOpt, datosorden, totalpendientes, detalledashboard, nombrearchivo, listacupsout, datosordenproveedor, proveedorasignado, datosordenproveedor2, datosordenproveedor3;
var idtipoidaux = "CC";
var swalheadertxt = "Ordenamientos";

var archivos = [];
var archivos2 = [];
; (function (window) {
  
    var user = sessionStorage.getItem("UsuarioSistema"); 
    var contra = sessionStorage.getItem("ContraseñaSistema");
    usuario = sessionStorage.getItem("ContraseñaSistema");

    if (user != null) {

        $("#txtUsuario").val(user);    
    }

    if (user != null && contra != null) {
        iniciarSesion(user, contra);
    } 
     
    
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
        //sessionStorage.removeItem("UsuarioSistema");
        sessionStorage.removeItem("ContraseñaSistema");
        location.reload();
    });

    
    $("#btnAddcups").on("click", function (e) {
        SeleccionarCUPS();
    });
   
        
    $("#btnAdd").on("click", function (e) {
        AsignarResponsables();
    });

    $("#btnAddPx").on("click", function (e) {
        AsignarProveedoresCups();
    });

    $("#btnAddPromeCups").on("click", function (e) {
        AsignarProveedoresCupsProme();
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

    $('#reporteasignacionesProve').on("click", function (e) {
        ObtenerReporteCUPSProveedores("spGestionOrdenamientos_ReporteAsigProveedores");
    });

    $('#rptAsigProvePromedan').on("click", function (e) {
        ObtenerReporteCUPSProvePROME("spGestionOrdenamientos_ReporteProvedoresPromedan");
    });

    $('#reportegeneral').on("click", function (e) {
        //window.open('VisorReporting.aspx', '',
        //                'width=450,height=300,status=yes,resizable=yes,scrollbars=yes')
        window.open('VisorReporting.aspx?Id=311', '');
    });

    $('#btnreporteprovee').on("click", function (e) {
        var usuariosistema = sessionStorage.getItem("UsuarioSistema");
        var proveedorsistema = sessionStorage.getItem("Proveedor");
        window.open('VisorReporting.aspx?Id=314&Proveedor=' + proveedorsistema + '()' + usuariosistema, '');
    });

    $('#reportefaltantescontacto').on("click", function (e) {
        window.open('VisorReporting.aspx?Id=315', '');
    });

    $('#btnListResponsables').on("click", function (e) {
        consultarAsignaciones("spGestionOrdenamiento_ListarResponsables");
    });

    $('#btnListProveCups').on("click", function (e) {
        consultarAsignacionesProveedoresCups("spGestionOrdenamiento_ListarProveedoresXCups");
    });

    $('#btnListaCupsProme').on("click", function (e) {
        consultarAsignacionesPromedanCups("spGestionOrdenamiento_ListarProveedoresXCupsPromedan");
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

	                sessionStorage.setItem("UsuarioSistema", usuario);
	                sessionStorage.setItem("ContraseñaSistema", clave);

	                $('#lblUsuario').html(lista.Table[0].idtipoid + ': ' + lista.Table[0].identificacion);
	                $('#lblNombreUsuario').html(lista.Table[0].NombreCompleto);

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

            sessionStorage.setItem("Proveedor", lista.Table[0].ProveedorAsignado);

            //si el proveedor no es promedan se ocultan los campos de sede
            if (lista.Table[0].ProveedorAsignado != "9000389264") {
                $('#th_Sede1').hide();
                $('#th_CentroGenera').hide();
                $('#div_filtrosede1').css("visibility", "hidden");
            }

            $('#lblProveedor').html('Proveedor: ' + lista.Table[0].RazonSocial);
            proveedorasignado = lista.Table[0].ProveedorAsignado;
                         
           
            var Especialidad = $('#ddlespecialidadproveedor1');
            Especialidad.select2({
                placeholder: "Selecciona"
            });
            llenarCombos(Especialidad, "spGestionOrdenamientos_ObtenerEspecialidades");

             $("#btnConsultarOrdenesProveedor").on("click", function (e) {                                
                consultarOrdenesProveedor(lista.Table[0].ProveedorAsignado, lista.Table[0].idtipoid, lista.Table[0].identificacion);                                
            });
            break;
            
        case "MenuProveedor2":
            if (lista.Table[0].ProveedorAsignado != "9000389264") {
                $('#th_Sede2').hide();
                $('#div_filtrosede2').css("visibility", "hidden");
            }

            $('#lblProveedor').html('Proveedor: ' + lista.Table[0].RazonSocial);
            proveedorasignado = lista.Table[0].ProveedorAsignado;

            $("#btnConsultarOrdenesProveedor2").on("click", function (e) {
                consultarOrdenesProveedor2(lista.Table[0].ProveedorAsignado, lista.Table[0].idtipoid, lista.Table[0].identificacion);
            });

            break;

        case "MenuProveedor3":
            if (lista.Table[0].ProveedorAsignado != "9000389264") {
                $('#th_Sede3').hide();
                $('#div_filtrosede3').css("visibility", "hidden");
            }

            $('#lblProveedor').html('Proveedor: ' + lista.Table[0].RazonSocial);
            proveedorasignado = lista.Table[0].ProveedorAsignado;

            //$("#ddlTipoID").select2({
            //    placeholder: "Selecciona el tipo de documento."
            //});
            //var tipoid = $('#ddlTipoID');
            //llenarCombos(tipoid, "spGestionOrdenamientos_TipoIdObtener");

            $("#btnConsultarOrdenesProveedor3").on("click", function (e) {
                consultarOrdenesProveedor3(lista.Table[0].ProveedorAsignado, lista.Table[0].idtipoid, lista.Table[0].identificacion);
            });
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
            break;
        case "MenuDashProveedor":
            obtenerDashboardProveedores("spGestionOrdenamientos_ObtenerDashboardProveedores", lista.Table[0].ProveedorAsignado, lista.Table[0].idtipoid, lista.Table[0].identificacion);
            break;
        case "MenuProveedoresCups":           

            var cboProveedor = $('#ddlPProveedor');
            var cboProveedoresXCups = $('#ddlProveedoresXCups');
            
            cboProveedor.select2({
                placeholder: "Selecciona el Proveedor"
            });

            cboProveedoresXCups.select2({
                placeholder: "Selecciona el CUPS"
            });
                      
            llenarCombos(cboProveedor, "spsuministros_Proveedores_ObtenerNew");
            llenarCombos(cboProveedoresXCups, "spOrdenamientos_Obtener_ListaCUPS");
            break;
        case "MenuProveedoresProm":

            var cboProveedorProm = $('#ddlPProveedorProm');
            var cboProveedoresXCupsProm = $('#ddlProveedoresXCupsProm');

            cboProveedorProm.select2({
                placeholder: "Selecciona el Proveedor"
            });

            cboProveedoresXCupsProm.select2({
                placeholder: "Selecciona el CUPS"
            });

            llenarCombos(cboProveedorProm, "spGestionOrdenamientos_ProveedoresObtenerPromedan");
            llenarCombos(cboProveedoresXCupsProm, "spOrdenamientos_Obtener_ListaCUPS");
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
	        var datos3 = listaDatos.Table3;

	        $('#tablaAsignar td').remove();
	        $("#bodytablaAsignar").empty();

	            if (listaDatos.Table.length > 0) {	                    

	                totalpendientes = datos2[0].cantidadPendientes;
	                document.getElementById('lbltotalasignados').innerHTML = datos1[0].cantidadTotal;
	                document.getElementById('lbltotalpendientes').innerHTML = datos2[0].cantidadPendientes;
	                document.getElementById('lbltotalvencidas').innerHTML = datos3[0].cantidadVencidas;


	                for (var i = 0; i < datos.length; i++) {
	                       
	                   // console.log(datos[i].idConsecutivo)

	                    var tbl = '';
	                    //tbl += '<tr>';
	                    tbl += '<tr id="tr_' + datos[i].idConsecutivo + '">';
	                    tbl += '<td>' + datos[i].Codigo_Solicitud_Ciklos + ' - ' + datos[i].idConsecutivo + '</td>';
	                    tbl += '<td>' + datos[i].FechaCargueSistema + '</td>';
	                    tbl += '<td id="td_dias' + datos[i].idConsecutivo + '">' + datos[i].DiasEspera + '</td>';
	                    tbl += '<td id="td_pciente' + datos[i].idConsecutivo + '">' + datos[i].Id_Afiliado + ': ' + datos[i].NombreCompleto + '</td>';
	                    tbl += '<td>' + datos[i].IPSUsuario + '</td>';
	                    tbl += '<td>' + datos[i].Centro_generador_de_autorizacion + '</td>';
	                    tbl += '<td>' + datos[i].DescripcionNew + '</td>';	                    
	                    tbl += '<td>' + datos[i].Especialidad + '</td>';	                  
	                    tbl += '<td>' + '<button id="btninfo_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="MasInformacion(' + i + ')">Ver</button>' + '</td>';
	                    tbl += '<td>' + '<button id="btnAsignarProveedor_' + datos[i].idConsecutivo +
                                '" class="btn btn-primary" onclick="ValidarOrden(' + datos[i].idConsecutivo + ',' + i + ')">Optimizar</button>' + '</td>';
	                    tbl += '</tr>';
                        
                        
	                    $("#tablaAsignar").append(tbl);

                        //muestra en color rojo la celda del registro para mostrar alerta por demora en la gestion de la orden
	                    if (datos[i].DiasEspera > 3) {
	                        $('#td_dias' + datos[i].idConsecutivo).css('background-color', '#f9dde2');
	                    }

	                    if (datos[i].NombreCompleto == "No Registra En EVO") {
	                        $('#td_pciente' + datos[i].idConsecutivo).css('background-color', '#F4FA58');
	                    }
                           
	                }
	                datosorden = datos;
	            }
	            else {
	                document.getElementById('headeroptimizacion').innerHTML = "No Tienes ordenes asignadas";
	                document.getElementById('optimi').innerHTML = "";	                    
	                //swal('Evolution Ordenamientos', 'No se encontraron ordenes asignadas al usuario: ' + tipoidoptimizador +': ' + idoptimizador + '.', 'warning');
	                $('#tablaAsignar td').remove();
	                $("#bodytablaAsignar").empty();
	        }
	    }
	});
}   
	
//consultar ordenes desde el proveedor para contactar
function consultarOrdenesProveedor(proveedor,idtipoid,identificacion) {
   
    var usuariosis = sessionStorage.getItem("UsuarioSistema");
    //var estado = $('#ddlEstadoOrden').val();
    var estado = "Aprobada";
    var fechainicial = $('#ProveedorFechaInicial').val();
    var fechafinal = $('#ProveedorFechaFinal').val();
    var especialidad = $('#ddlespecialidadproveedor1').val();

    //console.log(especialidad)

    //if (estado == "0") {
    //    swal(swalheadertxt, 'Lo sentimos, debes seleccionar un estado de la lista.', 'warning');       
    //} else

    if (fechainicial == "") {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar una fecha inicial.', 'warning');       
    } else if (fechafinal == "") {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar una fecha final.', 'warning');
    } else {
        $.ajax({
            url: "GestionOrdenamientos.aspx/consultarOrdenesxProveedor",
            data: "{ proveedor: '" + proveedor + "', estado: '" + estado + "', usuariosis: '"
                + usuariosis + "', fechainicial: '" + fechainicial + "', fechafinal: '" + fechafinal + "', especialidad: '" + especialidad + "'}",
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

                $("#bodyproveedores").empty();
                //$('#tablaProveedores td').remove();

                if (listaDatos.Table.length > 0) {

                    for (var i = 0; i < datos.length; i++) {

                        var tbl = '';
                        tbl += '<tr id="tr_ContactoProveedor' + datos[i].idConsecutivo + '">';
                        tbl += '<td>' + datos[i].FechaOptimizacion + '</td>';
                        tbl += '<td id="td_sedepromedan1' + datos[i].idConsecutivo + '">' + datos[i].IpsUsuario + '</td>';
                        tbl += '<td id="td_centrogenero1' + datos[i].idConsecutivo + '">' + datos[i].Centro_generador_de_autorizacion + '</td>';
                        tbl += '<td>' + datos[i].Especialidad + '</td>';
                        tbl += '<td>' + datos[i].DescripcionNew + '</td>';
                        tbl += '<td>' + datos[i].Id_Afiliado +', '+ datos[i].NombreCompleto + '</td>';
                        tbl += '<td>' + '<button id="btninfoPro_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="MasInformacionProveedor(' + datos[i].idConsecutivo + ',' + i + ')">Ver</button>' + '</td>';
                        tbl += '<td>' + '<button id="btnImprimirOrden_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="ImprimirOrden(' + datos[i].idConsecutivo + ')">Generar</button>' + '</td>';
                        tbl += '<td>' + '<button id="btngestion_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="AccionesProveedor1(' + datos[i].idConsecutivo + ',' + i + ')">Gestionar</button>' + '</td>';
                                               
                        tbl += '</tr>';

                        $("#tablaProveedores").append(tbl);

                        if (proveedor != "9000389264") {                           
                            $('#td_sedepromedan1' + datos[i].idConsecutivo).hide();
                            $('#td_centrogenero1' + datos[i].idConsecutivo).hide();
                        }
                        //si el proveedor no pudo contactar al usuario la orden va a seguir saliendo en el sistema pero con una sombre de color rojo
                        if (datos[i].SeContactoUsuario == '0') {
                            $('#tr_ContactoProveedor' + datos[i].idConsecutivo).css('background-color', '#f9dde2');
                        } else if (datos[i].SeContactoUsuario == '2') {//cuando ya se le actualizo el contacto
                            $('#tr_ContactoProveedor' + datos[i].idConsecutivo).css('background-color', '#D1FEE5');
                        } else if (datos[i].EstadoProveedor == 'No Asistencia') {
                            $('#tr_ContactoProveedor' + datos[i].idConsecutivo).css('background-color', '#FCDEAB');
                        }
                    }
                    datosordenproveedor = datos; //
                   
                } else {
                    swal(swalheadertxt, 'Lo sentimos, no se encontraron ordenes con los datos ingresados.', 'warning');
                    $("#bodyproveedores").empty();
                }
            }
        });

    }

	
}
       
//consultar ordenes desde el proveedor para la gestion finaltablaProveedores
function consultarOrdenesProveedor2(proveedor, idtipoid, identificacion) {

    //var estado = $('#ddlEstadoOrden').val();
    var estado = "Contactada";
    var fechainicial = $('#ProveedorFechaInicial2').val();
    var fechafinal = $('#ProveedorFechaFinal2').val();

    //console.log(fechainicial)

    //if (estado == "0") {
    //    swal(swalheadertxt, 'Lo sentimos, debes seleccionar un estado de la lista.', 'warning');       
    //} else

    if (fechainicial == "") {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar una fecha inicial.', 'warning');
    } else if (fechafinal == "") {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar una fecha final.', 'warning');
    } else {
        $.ajax({
            url: "GestionOrdenamientos.aspx/consultarOrdenesxProveedor2",
            data: "{ proveedor: '" + proveedor + "', estado: '" + estado + "', idtipoid: '"
                + idtipoid + "', identificacion: '" + identificacion + "', fechainicial: '" + fechainicial + "', fechafinal: '" + fechafinal + "'}",
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
                $("#bodyproveedores2").empty();

                if (listaDatos.Table.length > 0) {

                    for (var i = 0; i < datos.length; i++) {

                        var tbl = '';
                        tbl += '<tr id="tr_AsistProve' + datos[i].idConsecutivo + '">';
                        tbl += '<td>' + datos[i].FechaOptimizacion + '</td>';                       
                        tbl += '<td id="td_sedepromedan2' + datos[i].idConsecutivo + '">' + datos[i].SedePromedan + '</td>';
                        tbl += '<td>' + datos[i].Especialidad + '</td>';
                        tbl += '<td>' + datos[i].DescripcionNew + '</td>';
                        tbl += '<td>' + datos[i].Id_Afiliado + ', ' + datos[i].NombreCompleto + '</td>';
                        tbl += '<td>' + '<button id="btninfoPro2_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="MasInformacionProveedor2(' + datos[i].idConsecutivo + ',' + i + ')">Ver</button>' + '</td>';
                        tbl += '<td>' + '<button id="btnordenPro2_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="ImprimirOrden(' + datos[i].idConsecutivo + ')">Generar</button>' + '</td>';
                        tbl += '<td>' + '<button id="btngestion2_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="AccionesProveedor2(' + datos[i].idConsecutivo + ',' + i + ')">Gestionar</button>' + '</td>';

                        tbl += '</tr>';
                        $("#tablaProveedores2").append(tbl);

                        if (proveedor != "9000389264") {
                            $('#td_sedepromedan2' + datos[i].idConsecutivo).hide();
                        }
                    }
                    datosordenproveedor2 = datos; //

                } else {
                    swal(swalheadertxt, 'Lo sentimos, no se encontraron ordenes con los datos ingresados.', 'warning');
                    $("#bodyproveedores2").empty();
                }
            }
        });
    }
}

function consultarOrdenesProveedor3(proveedor, idtipoid, identificacion) {

    //var estado = $('#ddlEstadoOrden').val();
    var estado = "Impresa";
    //var tipoidpaciente = $('#ddlTipoID').val();
    var numorden = $('#Proveedor3numsolicitud').val();

    //console.log(fechainicial)

    //if (estado == "0") {
    //    swal(swalheadertxt, 'Lo sentimos, debes seleccionar un estado de la lista.', 'warning');       
    //} else

    if (numorden == "" || numorden.length == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar el Nº de Solicitud que se encuentra en la parte superior de la orden.', 'warning');
        $("#bodyproveedores3").empty();
    } else {
        $.ajax({
            url: "GestionOrdenamientos.aspx/consultarOrdenesxProveedor3",
            data: "{ proveedor: '" + proveedor + "', estado: '" + estado + "', idtipoid: '"
                + idtipoid + "', identificacion: '" + identificacion + "', numorden: '" + numorden + "'}",
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
                $("#bodyproveedores3").empty();

                if (listaDatos.Table.length > 0) {

                    for (var i = 0; i < datos.length; i++) {

                        var tbl = '';
                        tbl += '<tr id="tr_EjecucionProveedor' + datos[i].idConsecutivo + '">';
                        tbl += '<td>' + datos[i].FechaOptimizacion + '</td>';
                        tbl += '<td id="td_sedepromedan3' + datos[i].idConsecutivo + '">' + datos[i].SedePromedan + '</td>';
                        tbl += '<td>' + datos[i].Especialidad + '</td>';
                        tbl += '<td>' + datos[i].DescripcionNew + '</td>';
                        tbl += '<td>' + datos[i].Id_Afiliado + ', ' + datos[i].NombreCompleto + '</td>';
                        tbl += '<td>' + '<button id="btninfoPro3_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="MasInformacionProveedor3(' + datos[i].idConsecutivo + ',' + i + ')">Ver</button>' + '</td>';
                        tbl += '<td>' + '<button id="btngestion3_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="AccionesProveedor3(' + datos[i].idConsecutivo + ',' + i + ')">Gestionar</button>' + '</td>';

                        tbl += '</tr>';
                        $("#tablaProveedores3").append(tbl);

                        if (proveedor != "9000389264") {
                            $('#td_sedepromedan3' + datos[i].idConsecutivo).hide();
                        }
                    }
                    datosordenproveedor3 = datos; //

                } else {
                    swal(swalheadertxt, 'Lo sentimos, no se encontraron ordenes en estado impresa con los datos ingresados.', 'warning');
                    $("#bodyproveedores3").empty();
                }
            }
        });
    }
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

function ImprimirOrden(idorden) {
    
    window.open("VisorOrdenes.aspx?IdOrdenamiento=" + idorden + "&Id=313", '');

}

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
                        document.getElementById('lblFecha').innerHTML = datos[0].FechaCargueSistema;
                        document.getElementById('lblFechaOpt').innerHTML = datos[0].FechaOptimizacion;
                        document.getElementById('lblresponsable').innerHTML = datos[0].NombreCompleto;
                        document.getElementById('lblCups').innerHTML = datos[0].Cups;
                        document.getElementById('lbldetalle').innerHTML = datos[0].Descripcion;
                        document.getElementById('lblpacientet').innerHTML = datos[0].id_afiliado;
                        document.getElementById('lblestadoorden').innerHTML = datos[0].estadoproveedor;

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
                    $('#tr_' + posicion).remove();

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

    body += '<div class="box_swith_mod" style="margin-bottom:5px"><p>Dir. Externo:</p><label class="switch"><input id="checkDirreccio_' + posicion + '" type="checkbox" onclick="NotificacionProveExterno(' + posicion + ')"><span class="slider round"></span></label></div>';


    body += '<div id="ddl_Div_' + posicion + '"><p style="margin:5px 0px 0px">Motivo AT4:</p><select id="ddl_Noat4_' + posicion + '" style="width:100%" class="js-example-basic-single js-states form-control" ></select></div>';

    body += '<p style="margin:5px 0px 0px">Observaciones Auditoria:</p><input type="text" id="txtObservacionesAud_' + posicion + '" placeholder="Relacionadas con la atención y notas de tipo médico." class="form-control">';
    body += '<p style="margin:5px 0px 0px">Observaciones Generales:</p><input type="text" id="txtObservacionesGene_' + posicion + '" placeholder="Relacionadas con cambios de servicio y datos administrativos." class="form-control">';
    body += '<p style="margin:5px 0px 0px">CIE 10:</p><input type="text" id="txtCIE10_' + posicion + '" placeholder="Ingresa el código del diagnóstico y presiona ENTER para buscar." class="form-control">';
    body += '<input type="text" style="margin-top:2px" id="txtCIE10Desc_' + posicion + '" placeholder="Descripción del diagnóstico." class="form-control">';
    body += '<p style="margin:5px 0px 0px">Profesional Solicitante:</p><input type="text" id="txtProfesional_' + posicion + '" placeholder="Ingresa el nombre del profesional." class="form-control">';

    //body += '<div id="ddl_Div_Proveedor' + posicion + '"><p style="margin:5px 0px 0px">Proveedor:</p><select id="ddl_Proveedoress_' + posicion + '" class="js-example-basic-single js-states form-control" style="width:100%"></select></div>';
    //body += '<div id="ddl_DivSede_' + posicion + '"><p style="margin:5px 0px 0px">Sede PROMEDAN:</p><select id="ddl_PromedanSede_' + posicion + '" class="js-example-basic-single js-states form-control" style="width:100%"></select></div>';

    footer += '<button  class="btn btn-primary" data-dismiss="modal">Volver</button>';
    footer += '<button id="btnAsignarProveedor_' + posicion + '" class="btn btn-primary" onclick="GuardarProovedor(' + posicion + ',' + 0 + ')">Guardar</button>';
   
    $("#ModalAcciones .modal-body").append(body);
    $("#ModalAcciones .modal-footer").append(footer);

    $('#checkAt4_' + posicion).prop('checked', true);
    $('#checkAdecuado_' + posicion).prop('checked', true);


    var noat4 = $('#ddl_Noat4_' + posicion);
    noat4.select2({
        placeholder: "Selecciona el porqué no se generó AT4"
    });   
    $('#ddl_Div_' + posicion).hide();

    //var proveedor = $('#ddl_Proveedoress_' + posicion);
    //proveedor.select2({
    //    placeholder: "Selecciona el Proveedor"
    //});    
    //llenarCombos(proveedor, "spsuministros_Proveedores_ObtenerNew");
  
    //var sedes = $('#ddl_PromedanSede_' + posicion);  
    //$('#ddl_DivSede_' + posicion).hide();
      
    //proveedor.on('change', function () {
    //    var value = $(this).val();

    //    if (value == "9000389264") {
    //        $('#ddl_DivSede_' + posicion).show();
    //        llenarCombos(sedes, "spGestionOrdenamientos_ObtenerCentroCosto");
    //        sedes.select2({
    //            placeholder: "Selecciona la sede Promedan"
    //        });
                      
    //        if (datosorden[posiciontabla].IPSUsuario != null) {
    //            showNotificationOptmizacionsede('top', 'center', datosorden[posiciontabla].IPSUsuario);
    //        }           

    //    } else {            
    //        $('#ddl_DivSede_' + posicion).hide();
    //        sedes.val('').trigger('change')//limpia el combito y la descripcion
    //        sedes.html('');
           
    //    }
    //    //alert(value);
    //});
       
    
    $('#txtCIE10Desc_' + posicion).prop('disabled', true);
    document.getElementById('ModaltittleAcciones').innerHTML = 'Gestión de la Orden ' + datosorden[posiciontabla].Codigo_Solicitud_Ciklos;

    $('#ModalAcciones').modal({ backdrop: 'static', keyboard: false })
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

function NotificacionProveExterno(posicion) {

    if ($('#checkDirreccio_' + posicion).is(':checked')) {
        showNotificationOptmizacionsede('bottom', 'center');
    } 
}

function GeneroAt4(posicion, posiciontabla) {

    if (!$('#checkAt4_' + posicion).is(':checked')) {

        $('#checkDirreccio_' + posicion).attr('checked', false);
        $('#checkDirreccio_' + posicion).prop("disabled", true);
       

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
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Solicitud mal ingresada (Back1 - Back2)" + '">' + "Solicitud mal ingresada (Back1 - Back2)" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Error en aplicativo Ciklos" + '">' + "Error en aplicativo Ciklos" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Procedimiento no contratado con la IPS del Afiliado" + '">' + "Procedimiento no contratado con la IPS del Afiliado" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Se redirecciona orden a EPS CON recobro" + '">' + "Se redirecciona orden a EPS CON recobro" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Se redirecciona orden a EPS SIN recobro" + '">' + "Se redirecciona orden a EPS SIN recobro" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Se anula la orden" + '">' + "Se anula la orden" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Se supera la cantidad de ordenes parametrizadas (Frecuencia)" + '">' + "Se supera la cantidad de ordenes parametrizadas (Frecuencia)" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "El servicio no es de PGP" + '">' + "El servicio no es de PGP" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "El afiliado no tiene solicitudes pendientes de auditoría" + '">' + "El afiliado no tiene solicitudes pendientes de auditoría" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Se deja pendiente" + '">' + "Se deja pendiente (P)" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Otras" + '">' + "Otras" + '</option>');

    } else {
        //at4 = 1;
        $('#ddl_Div_' + posicion).hide();       
        $('#ddl_Noat4_' + posicion).val('').trigger('change')
        $('#ddl_Div_Proveedor' + posicion).show();
        $('#checkDirreccio_' + posicion).prop("disabled", false);
    }   

}

function NoAdecuado(posicion, posiciontabla) {
   
    $('#checkDirreccio_' + posicion).attr('checked', false);

    //var direccionamiento = 0;

    //if (!$('#checkDirreccio_' + posicion).is(':checked')) {
    //    direccionamiento = 0;
    //} else {
    //    direccionamiento = 1;
    //}
    //console.log(direccionamiento)
    $('#ModalAcciones').modal('hide');
    $("#Modalnoadecuado .modal-body").html('');
    $("#Modalnoadecuado .modal-footer").html('');

    var footer = '';
    var body = '';

    body += '<div class="col-lg-12 col-md-12" style="padding:0px"><p style="margin:5px 0px 0px">Motivo no Adecuada:</p><select id="txtObservacionesmotivo" class="js-example-basic-single js-states form-control" style="width:100%"></select></div>';
    body += '<div class="col-lg-12 col-md-12" style="padding:0px"><p style="margin:5px 0px 0px">Observaciones Auditoria:</p><input type="text" id="txtObservacionesaud" placeholder="Relacionadas con la atención y notas de tipo médico." class="form-control"></div> ';
    body += '<div class="col-lg-12 col-md-12" style="padding:0px"><p style="margin:5px 0px 0px">Observaciones Generales:</p><input type="text" id="txtObservacionesgenera" placeholder="Relacionadas con cambios de servicio y datos administrativos." class="form-control"></div>';
    body += '<div class="col-lg-12 col-md-12" style="padding-bottom:10px;padding-left:0px;padding-right:0px"><p style="margin:5px 0px 0px">Profesional Solicitante:</p><input type="text" id="txtProfesionalsolicita" placeholder="Ingresa el nombre del profesional" class="form-control"></div>';
    footer += '<button  class="btn btn-primary" data-dismiss="modal">Cerrar</button>';
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

    document.getElementById('Modalnoadecuadotittle').innerHTML = 'Reporte de Inadecuación para la orden ' + datosorden[posiciontabla].Codigo_Solicitud_Ciklos;
  

    $('#Modalnoadecuado').modal({ backdrop: 'static', keyboard: false }); //bloque el clic por fuera para no minimizar
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
    //var proveedorasignado = $('#ddl_Proveedoress_' + posicion).val();
    //var sedepromedan = $('#ddl_PromedanSede_' + posicion).val();
    var proveedorasignado = '';
    var sedepromedan = '';
    var observacionesaudit = $('#txtObservacionesAud_' + posicion).val();
    var observacionesagen = $('#txtObservacionesGene_' + posicion).val();
    
    var noAt4motivo = $('#ddl_Noat4_' + posicion).val();    
    var cie10 = $('#txtCIE10_' + posicion).val();
    var cie10desc = $('#txtCIE10Desc_' + posicion).val();
    var profesional = $('#txtProfesional_' + posicion).val();
    var at4 = 0;
    var adecuado = 0;
    var motivonadecuado = $('#txtObservacionesmotivo').val();

    var direccionamiento = 0; 

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

    if (!$('#checkDirreccio_' + posicion).is(':checked')) {
        direccionamiento = 0;
    } else {
        direccionamiento = 1;
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

    //console.log(direccionamiento)
       
    if (opcion == 1 && (motivonadecuado == 0 || observacionesaudit.length == 0 || observacionesagen.length == 0 || profesional.length == 0)) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar el motivo del porqué no es adecuada la orden y completar los demás campos para continuar.', 'warning');
    }else if (cie10.length > 0 && cie10desc.length == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar un diagnóstico valido.', 'warning');
    } else if (at4 == 1 && (proveedorasignado == "0" || proveedorasignado == null || observacionesaudit.length == 0 || observacionesagen.length == 0 || cie10.length == 0 || profesional.length == 0)) {
        swal(swalheadertxt, 'Lo sentimos, debes completar todos los campos para continuar.', 'warning');
    } else if (proveedorasignado == "9000389264" && sedepromedan == "00") {
        swal(swalheadertxt, 'Lo sentimos, al seleccionar como proveedor PROMEDAN debes seleccionar una sede de la lista.', 'warning');
    } else if (at4 == 0 && adecuado == 1 && (noAt4motivo == 0 || observacionesaudit.length == 0 || observacionesagen.length == 0 || cie10.length == 0 || profesional.length == 0)) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar el motivo del porqué no se generó AT4 y completar los demás campos para continuar.', 'warning');
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

       

        //observacionesaudit.replace("'", "") esto para que no saque error cuando el usuario ingrese comillas simple



        $.ajax({
            url: "GestionOrdenamientos.aspx/actualizarOrdenes",
            data: "{ tipoidoptimizador: '" + IdtipoOpt + "', optimizador: '" + IdOpt + "', idconsecutivo: '"
                + idconsecutivo + "', proveedorasignado: '" + proveedorasignado + "', observacionesaudit: '"
                + observacionesaudit.replace("'", "") + "', observacionesagen: '" + observacionesagen.replace("'", "") + "', at4: '" + at4 + "', cie10: '"
                + cie10 + "', adecuado: '" + adecuado + "', profesional: '" + profesional + "', sedepromedan: '"
                + sedepromedan + "', noAt4motivo: '" + noAt4motivo + "', motivonadecuado: '" + motivonadecuado + "', direccionamiento: '" + direccionamiento + "'}",
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
                            $('#tr_' + posicion).remove();

                            totalpendientes = totalpendientes - 1;
                            document.getElementById('lbltotalpendientes').innerHTML = totalpendientes;
                            $("#ModalAcciones").modal('hide');
                            $("#Modalnoadecuado").modal('hide');

                        } else {
                            swal(swalheadertxt, 'Bien, la orden se auditó correctamente.', 'success');
                            ////tr[posiciontabla].style.display = "none";
                            //document.getElementById("tablaAsignar").deleteRow(posiciontabla);

                            //borra la fila de la tabla en pantalla
                            $('#tr_' + posicion).remove();

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
    document.getElementById('lblfechacicklos').innerHTML = datosorden[posicion].Fecha_Registro_Solicitud;
    document.getElementById('lblpaciente').innerHTML = datosorden[posicion].Id_Afiliado;
    document.getElementById('lbltiposervicio').innerHTML = datosorden[posicion].Descripcion;
    document.getElementById('lblciudad').innerHTML = datosorden[posicion].Ciudad_del_centro_generador_de_autorizacion;
    document.getElementById('lblestadoserv').innerHTML = datosorden[posicion].Fecha_Registro_Solicitud;
    document.getElementById('lbltiposerv').innerHTML = datosorden[posicion].Centro_generador_de_autorizacion;
    document.getElementById('lblFechanacimiento').innerHTML = datosorden[posicion].FechaNacimiento;
    
    $("#myModal").modal();   
}


//Menu Proveedor 1 - Contacto usuario
function MasInformacionProveedor(idconsecutivo,posicion) {

    document.getElementById('DetalleModalProveedortitle').innerHTML = 'Contacto de la Orden ' + datosordenproveedor[posicion].Codigo_Solicitud_Ciklos + ' - ' + idconsecutivo;

    document.getElementById('lblpacientePro').innerHTML = datosordenproveedor[posicion].Id_Afiliado;
    document.getElementById('lblpacientenombre').innerHTML = datosordenproveedor[posicion].NombreCompleto;
    document.getElementById('lblcontacto').innerHTML = datosordenproveedor[posicion].Contacto;
    document.getElementById('lblestado').innerHTML = datosordenproveedor[posicion].EstadoProveedor;
    document.getElementById('lblobgene').innerHTML = datosordenproveedor[posicion].ObservacionesGen;
    document.getElementById('lblfechaciklos').innerHTML = datosordenproveedor[posicion].Fecha_Registro_Solicitud
    document.getElementById('lblprofesionalsol').innerHTML = datosordenproveedor[posicion].ProfesionalSolicita;
    document.getElementById('lbldetalleciklos').innerHTML = datosordenproveedor[posicion].Descripcion;
    //document.getElementById('lblobaud').innerHTML = datosordenproveedor[posicion].ObservacionesAud;      

    $("#DetalleModalProveedor").modal();
}

function AccionesProveedor1(posicion, i) {

    $("#ModalAccionesProveedor1 .modal-body").html('');
    $("#ModalAccionesProveedor1 .modal-footer").html('');

    body += '<div class="row"><div class="col-sm-3"><div class="form-group"><div class="input-group date" id="dateFechaAsignacion_' + posicion + '"><input type="text" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div></div></div></div>';

    var body = '';
    var footer = '';
    body += '<div class="box_swith_modPro"><p>Se contactó al Usuario:</p><label class="switch"><input id="checkContacto_' + posicion + '" type="checkbox" onclick="ContactoUsuario(' + posicion + ')"><span class="slider round"></span></label></div>';
    body += '<div class="box_swith_modPro" style="display:inline-grid"><p>Fecha de Asignación:</p><input  style="margin-bottom:5px" id="dateFechaAsignacion_' + posicion + '" class="form-control" /></div>';
    body += '<p style="margin:5px 0px 0px">Observaciones:</p><input type="text" id="txtObservacionesContacto_' + posicion + '" placeholder="En caso de ser necesario." class="form-control">';
    body += '<div id="ddl_Div_Profesional' + posicion + '"><p style="margin:5px 0px 0px">Profesional:</p><input type="text" id="ddl_profesionalContacto_' + posicion + '"  placeholder="Escribe el nombre del Profesional Asignado." class="form-control"></div>';

    body += '<div id="ddl_DivSede_' + posicion + '"><p style="margin:5px 0px 0px">Sede:</p><select id="ddl_PromedanSede_' + posicion + '" class="js-example-basic-single js-states form-control" style="width:100%"></select></div>';


    footer += '<button id="btnGuardarContacto_' + posicion +
                                   '" class="btn btn-primary" onclick="GuardarContactoProveedor(' + posicion + ')">Guardar</button>';

    $("#ModalAccionesProveedor1 .modal-body").append(body);
    $("#ModalAccionesProveedor1 .modal-footer").append(footer);
    $('#checkContacto_' + posicion).prop('checked', true);


    $('#dateFechaAsignacion_' + posicion).datetimepicker();



    document.getElementById('ModaltittleAccionesProveedor1').innerHTML = 'Gestión de contacto para la Orden ' + datosordenproveedor[i].Codigo_Solicitud_Ciklos;

    if (proveedorasignado == '9000389264') {

        //var profesional = $('#ddl_profesionalContacto_' + posicion);
        //profesional.select2({
        //    placeholder: "Selecciona el Profesional"
        //});
        //llenarCombos(profesional, "spGestionOrdenamientos_ObtenerProfesionales");

        var sedes = $('#ddl_PromedanSede_' + posicion);
        sedes.select2({
            placeholder: "Selecciona la sede donde se prestara el servicio"
        });
        llenarCombos(sedes, "spGestionOrdenamientos_ObtenerCentroCosto");
              
    } else {
        $('#ddl_Div_Profesional' + posicion).hide();
        $('#ddl_DivSede_' + posicion).hide();
    }

    $("#ModalAccionesProveedor1").modal();
}

function GuardarContactoProveedor(posicion) {

    var idorden = posicion;
    var contactousuario = 0;
    var fechaasigncion = $('#dateFechaAsignacion_' + posicion).val();
    var observacionescontacto = $('#txtObservacionesContacto_' + posicion).val();
    var profesional = $('#ddl_profesionalContacto_' + posicion).val();
    var sedeasignada = $('#ddl_PromedanSede_' + posicion).val();
    var user = sessionStorage.getItem("UsuarioSistema");
    //console.log(usuario)

    if (!$('#checkContacto_' + posicion).is(':checked')) {
        contactousuario = 0;
    } else {
        contactousuario = 1;
    }

    //console.log(contactousuario)
    //console.log(fechaasigncion)
    //console.log(observacionescontacto)
    //console.log(profesional)
    //console.log(sedeasignada)
    //console.log(posicion)

    if (contactousuario == 1 && fechaasigncion == '') {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar la FECHA y HORA de asignación para continuar.', 'warning');
    } else if (contactousuario == 1 && proveedorasignado == '9000389264' && profesional.length == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar el nombre del profesional para continuar.', 'warning');
    } else if (contactousuario == 1 && proveedorasignado == '9000389264' && sedeasignada == '00') {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar la sede asignada de la lista para continuar.', 'warning');
    } else if (contactousuario == 0 && observacionescontacto.length == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar el detalle del porqué no se logró contactar al usuario en las observaciones.', 'warning');
    } else {

        $.ajax({
            url: "GestionOrdenamientos.aspx/contactoProveedor",
            data: "{ idorden: '" + idorden + "', contactousuario: '" + contactousuario + "', fechaasigncion: '" + fechaasigncion + "', observacionescontacto: '" + observacionescontacto.replace("'", "") + "', profesional: '" + profesional + "', usuario: '" + user + "', sedeasignada: '" + sedeasignada + "'}",
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
                        $('#tr_ContactoProveedor' + posicion).remove();
                        $("#ModalAccionesProveedor1").modal('hide');
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

function ContactoUsuario(posicion) {

    if (!$('#checkContacto_' + posicion).is(':checked')) {

        $('#dateFechaAsignacion_' + posicion).prop('disabled', true);
        $('#dateFechaAsignacion_' + posicion).val('');

        $('#ddl_profesionalContacto_' + posicion).prop('disabled', true);
        $('#ddl_profesionalContacto_' + posicion).val('');

        $('#ddl_PromedanSede_' + posicion).prop('disabled', true);
        $('#ddl_PromedanSede_' + posicion).val('');
    } else {
        $('#dateFechaAsignacion_' + posicion).prop('disabled', false);
        $('#ddl_profesionalContacto_' + posicion).prop('disabled', false);
        $('#ddl_PromedanSede_' + posicion).prop('disabled', false);
    }
}

//Menu Proveedor 2 - Asistencia usuario
function MasInformacionProveedor2(idconsecutivo, posicion) {

    document.getElementById('DetalleModalProveedortitle2').innerHTML = 'Gestión de asistencia para la Orden ' + datosordenproveedor2[posicion].Codigo_Solicitud_Ciklos + ' - ' + idconsecutivo;

    document.getElementById('lblpacientePro2').innerHTML = datosordenproveedor2[posicion].Id_Afiliado;
    document.getElementById('lblpacientenombre2').innerHTML = datosordenproveedor2[posicion].NombreCompleto;   
    document.getElementById('lblestado2').innerHTML = datosordenproveedor2[posicion].EstadoProveedor;
    document.getElementById('lblcontacto2').innerHTML = datosordenproveedor2[posicion].ObservacionesContacto;
    document.getElementById('lblobgene2').innerHTML = datosordenproveedor2[posicion].ObservacionesGen;
    //document.getElementById('lblobaud2').innerHTML = datosordenproveedor2[posicion].ObservacionesAud; 
    document.getElementById('lblfechaeje').innerHTML = datosordenproveedor2[posicion].FechaAsignacion;

    $("#DetalleModalProveedor2").modal();
}

function AccionesProveedor2(posicion, i) {

    $("#ModalAccionesProveedor2 .modal-body").html('');
    $("#ModalAccionesProveedor2 .modal-footer").html('');
    archivos = [];
    var body = '';
    var footer = '';
    body += '<div style="text-align:-webkit-center;padding-bottom:7px"><div class="box_swith_modPro"><p>Usuario asistió:</p><label class="switch"><input id="checkAsitencia_' + posicion + '" type="checkbox"><span class="slider round"></span></label></div></div>';
    body += '<p style="margin:5px 0px 0px;text-align:center">Observaciones:</p><input type="text" id="txtObserpro2_' + posicion + '" placeholder="Detalles generales o de inasistencia del usuario" style="text-align:center" class="form-control">';

    body += '<div><label style="text-align:center;padding-top: 7px">Arrastra o toca para seleccionar los archivos de soporte</label></div><div id="mydropzone1_' + posicion + '" class="dropzone"></div>';


    footer += '<button id="btnGuardarContacto_' + posicion +
                                   '" class="btn btn-primary" onclick="GuardarProovedorGestionAsistencia(' + posicion + ')">Guardar</button>';

    $("#ModalAccionesProveedor2 .modal-body").append(body);
    $("#ModalAccionesProveedor2 .modal-footer").append(footer);

    $('#checkAsitencia_' + posicion).prop('checked', true);

    document.getElementById('ModaltittleAccionesProveedor2').innerHTML = 'Asistencia de la Orden ' + datosordenproveedor2[i].Codigo_Solicitud_Ciklos;

    Dropzone.autoDiscover = false;

    $("#mydropzone1_" + posicion).dropzone({
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

    $("#ModalAccionesProveedor2").modal();
}

function GuardarProovedorGestionAsistencia(posicion) {

    var asistiousuario = 0;
    var observaciones = $('#txtObserpro2_' + posicion).val();
    var adjunto = archivos.toString();
    var idorden = posicion;
    var user = sessionStorage.getItem("UsuarioSistema");

    if (!$('#checkAsitencia_' + posicion).is(':checked')) {
        asistiousuario = 0;
    } else {
        asistiousuario = 1;
    }

    //console.log(asistiousuario)
    //console.log(observaciones)
    //console.log(adjunto)

    if (asistiousuario == 0 && observaciones.length == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar el detalle de la inasistencia en las observaciones.', 'warning');
        //} else if (adjunto.length == 0 && asistiousuario == 1) {
        //    swal(swalheadertxt, 'Lo sentimos, debes adjuntar los soportes de ejecución correspondientes.', 'warning');
    } else {

        $.ajax({
            url: "GestionOrdenamientos.aspx/guardarGestionProveedor2",
            data: "{ idorden: '" + idorden + "', asistiousuario: '" + asistiousuario + "', observaciones: '" + observaciones + "', adjunto: '" + adjunto + "', usuario: '" + user + "'}",
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
                        $('#tr_AsistProve' + posicion).remove();
                        $("#ModalAccionesProveedor2").modal('hide');
                        swal(swalheadertxt, 'Bien, la orden se diligenció correctamente.', 'success');

                    } else {
                        swal(swalheadertxt, 'Lo sentimos, la no orden se diligenció correctamente.', 'warning');
                    }
                }
                else {
                    swal(swalheadertxt, 'Lo sentimos, el registro no se actualizo.', 'error');
                }
            }
        });
    }
}


//Menu Proveedor 3 - Ejecucion servicio
function MasInformacionProveedor3(idconsecutivo,posicion) {

    document.getElementById('DetalleModalProveedortitle3').innerHTML = 'Gestión Final de la Orden ' + datosordenproveedor3[posicion].Codigo_Solicitud_Ciklos + ' - ' + idconsecutivo;

    document.getElementById('lblpacientePro3').innerHTML = datosordenproveedor3[posicion].Id_Afiliado;
    document.getElementById('lblpacientenombre3').innerHTML = datosordenproveedor3[posicion].NombreCompleto;
    document.getElementById('lblcontacto3').innerHTML = datosordenproveedor3[posicion].Contacto;
    document.getElementById('lblestado3').innerHTML = datosordenproveedor3[posicion].EstadoProveedor;
    document.getElementById('lblobgene3').innerHTML = datosordenproveedor3[posicion].ObservacionesAsistencia;
    document.getElementById('lblfechaeje3').innerHTML = datosordenproveedor3[posicion].FechaAsignacion; 
    document.getElementById('lblfechaasisusu').innerHTML = datosordenproveedor3[posicion].FechaAsistenciaProveedor;

    $("#DetalleModalProveedor3").modal();
}

function AccionesProveedor3(posicion, i) {

    $("#ModalAccionesProveedor3 .modal-body").html('');
    $("#ModalAccionesProveedor3 .modal-footer").html('');
    archivos2 = [];
    var body = '';
    var footer = '';

    body += '<p style="margin:5px 0px 0px;text-align:center">Observaciones:</p><input type="text" id="txtObserpro3_' + posicion + '" placeholder="Detalles generales del proceso de ejecución de la orden" style="text-align:center" class="form-control">';
    body += '<div><label style="text-align:center;padding-top: 7px">Arrastra o toca para seleccionar los archivos de soporte</label></div><div id="mydropzone2_' + posicion + '" class="dropzone"></div>';
    footer += '<button id="btnGuardarGestion3_' + posicion +
                                   '" class="btn btn-primary" onclick="GuardarProovedorGestionEjecucion(' + posicion + ')">Guardar</button>';

    $("#ModalAccionesProveedor3 .modal-body").append(body);
    $("#ModalAccionesProveedor3 .modal-footer").append(footer);

    document.getElementById('ModaltittleAccionesProveedor3').innerHTML = 'Ejecución Final de la Orden ' + datosordenproveedor3[i].Codigo_Solicitud_Ciklos;

    Dropzone.autoDiscover = false;

    $("#mydropzone2_" + posicion).dropzone({
        url: "ImportarArchivo.ashx",
        addRemoveLinks: true,
        success: function (file, response) {
            var filename = response;
            archivos2.push(filename);
            //console.log(archivos)
            //console.log(archivos.toString())
            sessionStorage.setItem('archivos', archivos2);
        },
        error: function (file, response) {
            alert("Error cargando el archivo");
        }
    });

    $("#ModalAccionesProveedor3").modal();
}

function GuardarProovedorGestionEjecucion(posicion) {

    var observaciones = $('#txtObserpro3_' + posicion).val();
    var adjunto = archivos2.toString();
    var idorden = posicion;
    var user = sessionStorage.getItem("UsuarioSistema");

    //console.log(idorden)
    //console.log(observaciones)
    //console.log(adjunto)

    if (adjunto.length == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar el adjunto de soporte.', 'warning');
        //} else if (adjunto.length == 0 && asistiousuario == 1) {
        //    swal(swalheadertxt, 'Lo sentimos, debes adjuntar los soportes de ejecución correspondientes.', 'warning');
    } else {

        $.ajax({
            url: "GestionOrdenamientos.aspx/guardarGestionProveedor3",
            data: "{ idorden: '" + idorden + "', observaciones: '" + observaciones + "', adjunto: '" + adjunto + "', usuario: '" + user + "'}",
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
                        $('#tr_EjecucionProveedor' + posicion).remove();
                        $("#ModalAccionesProveedor3").modal('hide');
                        swal(swalheadertxt, 'Bien, la orden se diligenció correctamente.', 'success');

                    } else {
                        swal(swalheadertxt, 'Lo sentimos, la no orden se diligenció correctamente.', 'warning');
                    }
                }
                else {
                    swal(swalheadertxt, 'Lo sentimos, el registro no se actualizo.', 'error');
                }
            }
        });
    }
}

//Menu Cups
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
                tbl += '<td>' + '<input type="text" id="txtNuevaDescripcion_' + i + '" placeholder="Descripción" class="form-control">' + '</td>';

                tbl += '<td>' + '<select id="ddl_Especialidad_' + i + '" class="js-example-basic-single js-states form-control" style="width:100%"></select>' + '</td>';
                tbl += '<td>' + '<input type="number" id="txtValorCups_' + i + '" placeholder="Ingresa el Valor" class="form-control">' + '</td>';

                tbl += '<td>' + '<label class="switch"><input id="checkPer_' + i + '" type="checkbox" ><span class="slider round"></span></label>' + '</td>';


                tbl += '<td>' + '<button id="btnAsignarCups_' + i +
                        '" class="btn btn-primary" onclick="GuardarCUPS(' + i + ')">Guardar</button>' + '</td>';
                tbl += '</tr>';

                $("#tablaCUPS").append(tbl);

                var Especialidad = $('#ddl_Especialidad_' + i);
                Especialidad.select2({
                    placeholder: "Selecciona"
                });
                llenarCombos(Especialidad, "spGestionOrdenamientos_ObtenerEspecialidades");
            }
        }
    }

    
}

function GuardarCUPS(i) {

    //$('#tablaCUPS td').remove();
    var cups = $('#txtCupss_' + i).val();
    var descripcion = $('#ddlCupsout').val();    
    var nuevadescripcion = $('#txtNuevaDescripcion_' + i).val();
    var especialidad = $('#ddl_Especialidad_' + i).val();
    var valorcups = $('#txtValorCups_' + i).val();
    var per = 'NO';

    var usuariosis = sessionStorage.getItem("UsuarioSistema");

    if (!$('#checkPer_' + i).is(':checked')) {
        per = 'NO';
    } else {
        per = 'SI';
    }

    //console.log(descripcion)
    //console.log(cups)
    //console.log(nuevadescripcion)
    //console.log(especialidad)
    //console.log(valorcups)
    //console.log(per)

    if (cups.length == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar el CUPS de acuerdo a la resolución 1132.', 'warning');
    } else if (nuevadescripcion.length == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar la nueva descripción de acuerdo a la resolución 1132.', 'warning');
    } else if (especialidad == 0 ) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar la especialidad correspondiente.', 'warning');
    } else if (valorcups == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar el valor correspondiente.', 'warning');
    } else {

        $.ajax({
            url: "GestionOrdenamientos.aspx/actualizarCups",
            data: "{ DescripcionCUPS: '" + descripcion + "', CUPS: '" + cups + "', nuevadescripcion: '" + nuevadescripcion + "', especialidad: '" + especialidad + "', valorcups: '" + valorcups + "', per: '" + per + "', usuariosis: '" + usuariosis + "'}",
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
                   
                        //Asigna el nuevo cups ingresado a las ordenes faltantes
                        RepartirOrdenes();
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

//Asignacion de responsables
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
                $("#bodytablaParametros").empty();

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

        var usuariosis = sessionStorage.getItem("UsuarioSistema");
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
                data: "{ IdTipoId: '" + idtipoidaux + "', Identificacion: '" + idresponsable + "', Cups: '" + cups + "', descripcion: '" + descripcion + "', usuariosis: '" + usuariosis + "'}",
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
       
            swal({
                title: swalheadertxt,
                text: "¿Estas segur@ que la Asignación debe ser eliminada?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false
            }, function () {
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
                                //$('#tr_' + idasignacion).html('');
                                $('#tr_' + idasignacion).remove();
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
            }); 
    }
   
//Asignacion de proveedores por cups promedan
    function consultarAsignacionesPromedanCups(spP) {

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

                $('#tablaProveedoresXCupsPromedan td').remove();
                $("#bodytablaProveedoresXCupsPromedan").empty();

                if (listaDatos.Table.length > 0) {

                    for (var i = 0; i < datos.length; i++) {

                        var tbl = '';
                        tbl += '<tr id="trProveCupsProme_' + datos[i].IdAsignacion + '">';
                        tbl += '<td>' + datos[i].NombreCompleto + '</td>';
                        tbl += '<td>' + datos[i].Cups + '</td>';
                        tbl += '<td>' + datos[i].Descripcionnew + '</td>';
                        tbl += '<td>' + '<button id="btnEliminarProme_' + datos[i].IdAsignacion + '" onclick="EliminarProveedorCupsProme(' + datos[i].IdAsignacion + ')" class="btn btn-primary">Eliminar</button>' + '</td>';
                        tbl += '</tr>';

                        $("#tablaProveedoresXCupsPromedan").append(tbl);
                    }
                }
                else {
                    //swal('Evolution Ordenamientos', 'No se encontraron ordenes asignadas al usuario: ' + tipoidoptimizador +': ' + idoptimizador + '.', 'warning');                   
                }
            }

        });

    }

    function AsignarProveedoresCupsProme() {

        var ProveedorProme = $('#ddlPProveedorProm').val();
        var responsable = $("#ddlPProveedorProm :selected").text();
        var cupsProme = $('#ddlProveedoresXCupsProm').val();
        var descripcion = $("#ddlProveedoresXCupsProm :selected").text();

        var usuariosis = sessionStorage.getItem("UsuarioSistema"); 

        if (ProveedorProme.length == 0 || ProveedorProme == 0) {
            swal(swalheadertxt, 'Lo sentimos, debes seleccionar un proveedor de la lista.', 'warning');
        } else if (cupsProme.length = 0 || cupsProme == "null" || cupsProme == 0) {
            swal(swalheadertxt, 'Lo sentimos, debes seleccionar un cups de la lista.', 'warning');
        } else {

            //console.log(ProveedorProme)
            //console.log(cupsProme)

            $.ajax({
                url: "GestionOrdenamientos.aspx/guardarAsignacionProveedoresCupsProme",
                data: "{ ProveedorProme: '" + ProveedorProme + "', cupsProme: '" + cupsProme + "', usuariosis: '" + usuariosis + "'}",
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
                            tbl += '<tr id="trProveCupsProme_' + datos[0].idasignacion + '">';
                            tbl += '<td>' + responsable + '</td>';
                            tbl += '<td>' + cupsProme + '</td>';
                            tbl += '<td>' + descripcion + '</td>';
                            tbl += '<td>' + '<button id="btnEliminarProme_' + datos[0].idasignacion + '" onclick="EliminarProveedorCupsProme(' + datos[0].idasignacion + ')" class="btn btn-primary">Eliminar</button>' + '</td>';
                            tbl += '</tr>';

                            $("#tablaProveedoresXCupsPromedan").append(tbl);

                            swal(swalheadertxt, 'Bien, la asignación se realizó correctamente.', 'success');

                        } else {
                            swal(swalheadertxt, 'Lo sentimos, el CUPS ' + cupsProme + ' ya fue asignado a ' + responsable + '.', 'warning');
                        }
                    }
                    else {
                        swal(swalheadertxt, 'Lo sentimos, el registro no se actualizo.', 'warning');
                    }
                }
            });
        }
    }

    function EliminarProveedorCupsProme(idasignacion) {

        swal({
            title: swalheadertxt,
            text: "¿Estas segur@ que la Asignación debe ser eliminada?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: "GestionOrdenamientos.aspx/eliminarAsignacionProveedoresCupsProme",
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
                            $('#trProveCupsProme_' + idasignacion).remove();
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
        });
    }

//Asignacion de proveedores por cups
    function consultarAsignacionesProveedoresCups(spP) {

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

                $('#tablaProveedoresXCups td').remove();
                $("#bodytablaProveedoresXCups").empty();

                if (listaDatos.Table.length > 0) {

                    for (var i = 0; i < datos.length; i++) {

                        var tbl = '';
                        tbl += '<tr id="trProveCups_' + datos[i].IdAsignacion + '">';
                        tbl += '<td>' + datos[i].RazonSocial + '</td>';
                        tbl += '<td>' + datos[i].Proveedor + '</td>';
                        tbl += '<td>' + datos[i].Cups + '</td>';
                        tbl += '<td>' + datos[i].Descripcion + '</td>';
                        tbl += '<td>' + '<button id="btnEliminar_' + datos[i].IdAsignacion + '" onclick="EliminarProveedorCups(' + datos[i].IdAsignacion + ')" class="btn btn-primary">Eliminar</button>' + '</td>';
                        tbl += '</tr>';

                        $("#tablaProveedoresXCups").append(tbl);
                    }
                }
                else {
                    //swal('Evolution Ordenamientos', 'No se encontraron ordenes asignadas al usuario: ' + tipoidoptimizador +': ' + idoptimizador + '.', 'warning');                   
                }
            }

        });

    }

    function EliminarProveedorCups(idasignacion) {

            swal({
                title: swalheadertxt,
                text: "¿Estas segur@ que la Asignación debe ser eliminada?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false
            }, function () {
                $.ajax({
                    url: "GestionOrdenamientos.aspx/eliminarAsignacionProveedoresCups",
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
                                $('#trProveCups_' + idasignacion).remove();
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
            });
    }

   
    function AsignarProveedoresCups() {

        var Pproveedor = $('#ddlPProveedor').val();
        var responsable = $("#ddlPProveedor :selected").text();
        var cups = $('#ddlProveedoresXCups').val();
        var descripcion = $("#ddlProveedoresXCups :selected").text();

        var usuariosis = sessionStorage.getItem("UsuarioSistema");

        //var rowCount = $('#tablaParametros tr').length;       

        //console.log(Pproveedor)
        //console.log(cups)
        //console.log(descripcion)

        if (Pproveedor.length == 0 || cups == "null" || Pproveedor == 0) {
            swal(swalheadertxt, 'Lo sentimos, debes seleccionar un proveedor de la lista.', 'warning');
        } else if (cups.length = 0 || cups == "null" || cups == 0) {
            swal(swalheadertxt, 'Lo sentimos, debes seleccionar un cups de la lista.', 'warning');
        } else {

            $.ajax({
                url: "GestionOrdenamientos.aspx/guardarAsignacionProveedoresCups",
                data: "{ Pproveedor: '" + Pproveedor + "', cups: '" + cups + "', descripcion: '" + descripcion + "', usuariosis: '" + usuariosis + "'}",
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
                            tbl += '<tr id="trProveCups_' + datos[0].idasignacion + '">';
                            tbl += '<td>' + responsable + '</td>';
                            tbl += '<td>' + Pproveedor + '</td>';
                            tbl += '<td>' + cups + '</td>';
                            tbl += '<td>' + descripcion + '</td>';
                            tbl += '<td>' + '<button id="btnEliminar_aProveedor' + datos[0].idasignacion + '" onclick="EliminarProveedorCups(' + datos[0].idasignacion + ')" class="btn btn-primary">Eliminar</button>' + '</td>';
                            tbl += '</tr>';

                            $("#tablaProveedoresXCups").append(tbl);

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

        function ObtenerReporteCUPSProveedores(spP) {


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
                    $('#tblasignacionesProveedores tbody').html('');

                    if (listaDatos.Table.length > 0) {

                        for (var i = 0; i < datos.length; i++) {

                            var tbl = '';
                            tbl += '<tr>';
                            tbl += '<td>' + datos[i].razonsocial + '</td>';
                            tbl += '<td>' + datos[i].cups + '</td>';
                            tbl += '<td>' + datos[i].descripcionnew + '</td>';
                            tbl += '<td>' + datos[i].servicio + '</td>';
                            tbl += '<td>' + datos[i].nombrecompleto + '</td>';
                            tbl += '<td>' + datos[i].fechaasignacion + '</td>';
                            tbl += '</tr>';

                            $("#tblasignacionesProveedores").append(tbl);
                        }

                        ExportToExcelReports('tblasignacionesProveedores');
                    }
                    else {
                        swal(swalheadertxt, 'Lo sentimos, no se encontraron datos.', 'warning');
                    }
                }
            });
        }

        function ObtenerReporteCUPSProvePROME(spP) {

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
                    $('#tblasignacionesProveedoresPromedan tbody').html('');

                    if (listaDatos.Table.length > 0) {

                        for (var i = 0; i < datos.length; i++) {

                            var tbl = '';
                            tbl += '<tr>';
                            tbl += '<td>' + datos[i].Usuario + '</td>';
                            tbl += '<td>' + datos[i].CUPS + '</td>';
                            tbl += '<td>' + datos[i].Descripcion1132 + '</td>';
                            tbl += '<td>' + datos[i].DescripcionCiklos + '</td>';
                            tbl += '</tr>';

                            $("#tblasignacionesProveedoresPromedan").append(tbl);
                        }

                        ExportToExcelReports('tblasignacionesProveedoresPromedan');
                    }
                    else {
                        swal(swalheadertxt, 'Lo sentimos, no se encontraron datos.', 'warning');
                    }
                }
            });
        }

        function ExportToExcelReports(tabla) {
            var htmltable = document.getElementById(tabla);
            var html = htmltable.outerHTML;
            window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
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

        function obtenerDashboardProveedores(spP,proveedor,tipoid,identificacion) {

            var cups = [];
            var cantidades = [];
            var coloress = [];
            var usuariosis = sessionStorage.getItem("UsuarioSistema");

            $.ajax({
                url: "GestionOrdenamientos.aspx/dashboardProveedor",
                data: "{ sp: '" + spP + "', proveedor: '" + proveedor + "', usuariosis: '" + usuariosis + "'}",
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

                        $("#lblasignadas").html(datos1[0].TotalOrdenes);
                        $("#lblpendientesPro").html(datos2[0].TotalPendientes);
                        $("#lblprogramadas").html(datos3[0].TotalProgramadas);
                        $("#lblengestion").html(datos4[0].TotalNoAdecuadas);

                        pintarGrafico1Proveedores(cups, cantidades, coloress);

                    
                    }
                    else {
                        swal(swalheadertxt, 'Lo sentimos, no se encontraron datos.', 'warning');
                        $("#loaderdashboardProveedores").hide();
                    }
                }
            });
        }

        function pintarGrafico1Proveedores(motivos, cantidades, colores) {

            //console.log(cantidades.map(Number));
            var chart = Highcharts.chart('containerProvee', {

                title: {
                    text: 'TOTAL ORDENES ASIGNADAS'
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
                        text: 'Total por mes'
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

            $("#loaderdashboardProveedores").hide();
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
    
            document.getElementById('ModalGrafico2tittle').innerHTML = 'TOTAL ORDENES EN OPTIMIZACIÓN POR ESPECIALIDAD';
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

            var Responsables = [];
            var Cantidades = [];
            var spP = "spGestionOrdenamientos_ObtenerGrafico";

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
                    var datos = listaDatos.Table;

                    var aux = 0;

                    if (listaDatos.Table.length > 0) {

                        for (var i = 0; i < datos.length; i++) {

                            var responsab = datos[i].Nombre;
                            Responsables.push(responsab);
                            var num = datos[i].TotalOrdenes;                            
                            Cantidades.push(num);
                        }

                        MostrarGrafico3(Responsables, Cantidades);

                    } else {
                        swal(swalheadertxt, 'Lo sentimos, no se encontraron datos', 'warning');
                    }

                }

            });
        
        }

        function MostrarGrafico3(responsables, cantidades) {

            //console.log(responsables)
            //console.log(cantidades)
            
            var responss = [];
            var totales = [];
            var areglodetotales = [];

            var second_data_drilldown = [];

            for (var i = 0; i < responsables.length / 7; i++) {
                responss.push(responsables[i * 7])

                for (var j = i * 7; j < (i * 7) + 7; j++) {
                    totales.push(cantidades[j])                   
                }

                areglodetotales.push(totales)
                totales = [];
            }

            //console.log(responss)
            //console.log(areglodetotales)

            for (var i = 0; i < responss.length; i++) {
                second_data_drilldown.push({
                    name: responss[i],
                    data: areglodetotales[i],
                });
            }

            document.getElementById('ModalGrafico2tittle').innerHTML = 'TOTAL ORDENES OPTIMIZADAS - SEMANA ACTUAL';

            Highcharts.chart('containergrafico2', {
                chart: {
                    type: 'areaspline'
                },
                title: {
                    text: 'Optimizadas por Responsable'
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'top',
                    x: 20,
                    y: -10,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                xAxis: {
                    categories: [
                        'Lunes',
                        'Martes',
                        'Miércoles',
                        'Jueves',
                        'Viernes',
                        'Sábado',
                        'Domingo'
                    ],
                    plotBands: [{ // visualize the weekend
                        from: 4.5,
                        to: 6.5,
                        color: 'rgba(68, 170, 213, .2)'
                    }]
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' ordenes.'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5
                    }
                },
                series: second_data_drilldown
                //    [{
                //    name: 'Isabel',
                //    data: [3, 4, 3, 5, 4, 10, 12]
                //}, {
                //    name: 'Sara',
                //    data: [1, 6, 4, 8, 2, 6, 4]
                //},
                // {
                //     name: 'Angelica',
                //     data: [1, 3, 4, 3, 3, 5, 4]
                // },
                // {
                //     name: 'Sebastian',
                //     data: [5, 1, 5, 3, 5, 5, 4]
                // }]
            });

        }

        function showNotification(from, align,text) {

            //type = ['default','primary', 'info', 'success', 'warning', 'danger'];
            //color = Math.floor((Math.random() * 4) + 1);

            $.notify({
                message: text
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

        function showNotificationOptmizacionsede(from, align) {

            type = ['default','primary', 'success', 'warning', 'danger'];
            color = Math.floor((Math.random() * 4) + 1);

            $.notify({
                message: 'La orden seleccionada se redireccionará a un proveedor externo.'
            }, {
                type: type[color],
                //type: 'danger',
                timer: 2000,
                placement: {
                    from: from,
                    align: align
                }
            });

        }

        function FiltrarTablaProveedor1(txtinput, nombretabla,posiciontabla) {

            var input, filter, table, tr, td, i;
            input = document.getElementById(txtinput);
            filter = input.value.toUpperCase();
            table = document.getElementById(nombretabla);
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[posiciontabla];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }

        }

        $("#txtfiltroCentroGene").keyup(function () {

            var filter = $.trim($(this).val().toLowerCase());
            count = 0;
            var length = $.trim($(this).val().length);
            if (length > 1) {
                var filter_tags = filter.split(" ");
                var filter_tags_length = filter_tags.length;
                $("#tablaAsignar tr:gt(0)").each(function () {
                    count++;
                    i = 0;
                    matches = 0;
                    c = 0;
                    $(this).find('td').each(function () {
                        var $this = $(this);
                        var lenght_td = $this.parents('tr').find('td').length;
                        i++;
                        $.each(filter_tags, function (i, a_filter) {
                            if ($this.text().toLowerCase().indexOf(a_filter) !== -1) {
                                c++;
                                if (c == filter_tags_length) {
                                    matches = 1;
                                }
                            }
                        });
                        // console.log(matches);
                        if (i == lenght_td) {
                            if (matches > 0) {
                                $(this).parents("tr").removeClass("hidden");
                            } else {
                                $(this).parents("tr").addClass("hidden");
                            }
                        }
                    });
                    //console.log('next'+count);
                });
            } else {
                $("#tablaAsignar td").parent("tr").removeClass("hidden");
            }
        });

        $("#txtfiltrosedegenero").keyup(function () {

            var filter = $.trim($(this).val().toLowerCase());
            count = 0;
            var length = $.trim($(this).val().length);
            if (length > 1) {
                var filter_tags = filter.split(" ");
                var filter_tags_length = filter_tags.length;
                $("#tablaProveedores tr:gt(0)").each(function () {
                    count++;
                    i = 0;
                    matches = 0;
                    c = 0;
                    $(this).find('td').each(function () {
                        var $this = $(this);
                        var lenght_td = $this.parents('tr').find('td').length;
                        i++;
                        $.each(filter_tags, function (i, a_filter) {
                            if ($this.text().toLowerCase().indexOf(a_filter) !== -1) {
                                c++;
                                if (c == filter_tags_length) {
                                    matches = 1;
                                }
                            }
                        });
                        // console.log(matches);
                        if (i == lenght_td) {
                            if (matches > 0) {
                                $(this).parents("tr").removeClass("hidden");
                            } else {
                                $(this).parents("tr").addClass("hidden");
                            }
                        }
                    });
                    //console.log('next'+count);
                });
            } else {
                $("#tablaProveedores td").parent("tr").removeClass("hidden");
            }
        });

        function AbrirReporteGeneral() {
            window.open('VisorReporting.aspx?Id=311', '');
        }

        function AbrirReporteUsuarioNoContactados() {
            window.open('VisorReporting.aspx?Id=315', '');
        }