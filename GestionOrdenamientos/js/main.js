

var usuario,IdtipoOpt,IdOpt,datosorden,totalpendientes; 

var archivos = [];
; (function (window) {
   
    
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


     
    $("#form_usuario_sede").change();   



    $("#btnSalir").on("click", function (e) {
        location.reload();
    });
      


    //Llama a el metodo para filtrar los usuarios
    $('#busqueda_usuario').change(function () {
        var nombre = $('#busqueda_usuario').val();
        obtenerUsuarios(nombre);
    });

   
    
	//share button
	$(".share").on('click', function (e) {
		$(".fab").removeClass("no");
		if (e.target != this) return;
		$('.share, .fab').toggleClass("active");
	});


    $("#btnAdicionarParametrizacion").on("click", function (e) {
        var evaluador = $('#ddlEvaluador').val();
        if (evaluador.length == 0)
        {
            swal('Autoevaluación', 'debe Seleccionar Evaluador.!!', 'warning');
            return;

        }

        var evaluado = $('#ddlEvaluado').val();
        if (evaluado.length == 0) {
            swal('Autoevaluación', 'debe Seleccionar Evaluado.!!', 'warning');
            return;

        }

        var roles = $('#ddlRoles').val();
        if (roles.length == 0) {
            swal('Autoevaluación', 'debe Seleccionar Rol.!!', 'warning');
            return;

        }

        //if (evaluador == evaluado)
        //{
        //    swal('Autoevaluacion', 'NO se permite evaluarse a si mismo.!!', 'warning');
        //    return;
        //}

        $.ajax({
            url: "GestionOrdenamientos.aspx/parametrizacion",
            data: "{ Evaluador: '" + evaluador + "',Evaluado:'" + evaluado +"',Rol:'"+ roles +"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            type: 'POST'
        }).done(function (rest) {
            if (rest.Error != undefined) {
                swal('AutoEvaluación', 'Ocurrio un error favor informar a sistemas', 'error');
            } else {

                var lista = JSON.parse(rest.d); 

                if (lista != '') {
                    

                    if (lista.Table[0].Rta == 'Ya Existe') {
                        swal('AutoEvaluación', 'Esta parametrizacion ya se realizo', 'info');
                        return;
                    }
                    else {
                        swal('Evaluación', 'Parametros Guardados con Éxito', 'success');
                        var evaluador = $('#ddlEvaluador').val();
                        obtenerParametrizacion(evaluador);
                        FiltrarTabla(evaluador);
                    }
                }
            }
        });
    });

    
	'use strict';

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

	                    IdtipoOpt = lista.Table[0].idtipoid;
	                    IdOpt = lista.Table[0].identificacion;

	                    if (lista.Table[0].idtipousuario == "0") {
	                        //si es un tipo usu o admin, vera todo el menu
	                        openMenu();
	                        consultarOrdenesFecha(lista.Table[0].idtipoid, lista.Table[0].identificacion);
	                        $('#lblUsuario').html(lista.Table[0].idtipoid + ': ' + lista.Table[0].identificacion);
	                        $('#btnMenu').removeAttr('style');
	                    }else  if (lista.Table[0].idtipousuario == "1") {
	                        //si es un tipo usu 1 optimizador, solo vera menu asignar y reportes
	                        $('#MenuCargaArchivo').hide();
	                        $('#MenuProveedor').hide();
	                        openMenu();
	                        consultarOrdenesFecha(lista.Table[0].idtipoid, lista.Table[0].identificacion);
	                        $('#lblUsuario').html(lista.Table[0].idtipoid +': '+ lista.Table[0].identificacion);
	                        $('#btnMenu').removeAttr('style');
	                    } else {
	                       //si es un tipo usu 2 proveedor, solo vera el menu de proveedor y reportes
	                        $('#MenuOptimizador').hide();
	                        $('#MenuCargaArchivo').hide();
	                        openMenu();
	                        consultarOrdenesProveedor(lista.Table[0].identificacion);
	                        $('#lblUsuario').html(lista.Table[0].idtipoid + ': ' + lista.Table[0].identificacion);
	                        $('#btnMenu').removeAttr('style');
	                    }
	                    
	                } else {
	                    swal('Evolution Ordenamientos', 'Lo sentimos, no tienes permisos para ingresar.', 'warning');
	                }
	            }
	            else {
	                swal('Evolution Ordenamientos', 'Lo sentimos, no tienes permisos para ingresar.', 'warning');
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
	                        tbl += '<td>' + datos[i].Fecha_Registro_Solicitud + '</td>';
	                        tbl += '<td>' + datos[i].Fecha_Esperada_de_Respuesta + '</td>';
	                        tbl += '<td>' + datos[i].Estado_Solicitud + '</td>';
	                        tbl += '<td>' + datos[i].Prestador_Solicitante + '</td>';
	                        tbl += '<td>' + datos[i].Cups + '</td>';
	                        tbl += '<td>' + datos[i].Descripcion + '</td>';
	                        tbl += '<td>' + datos[i].Id_Afiliado + '</td>';
	                        tbl += '<td>' + '<button id="btninfo_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="MasInformacion(' + i + ')">Ver</button>' + '</td>';
	                        tbl += '<td>' + '<select id="ddl_Proveedoress_' + datos[i].idConsecutivo + '" class="form-control color-blue per70"></select>' + '</td>';
	                        tbl += '<td>' + '<input type="text" id="txtObservaciones_' + datos[i].idConsecutivo + '" placeholder="Ingresa tus observaciones">' + '</td>';
	                        tbl += '<td>' + '<button id="btnAsignarProveedor_' + datos[i].idConsecutivo +
                                '" class="btn btn-primary" onclick="GuardarProovedor(' + datos[i].idConsecutivo + ',' + (i + 1) + ')">Asignar</button>' + '</td>';
	                        tbl += '</tr>';	                        
                           //cuando se pasan parametros en este boton string saca error           
	                      
	                        $("#tablaAsignar").append(tbl);
                            	                        
	                        var combo = $('#ddl_Proveedoress_' + datos[i].idConsecutivo);
	                        llenarCombos(combo, "spsuministros_Proveedores_ObtenerNew");
	                        //llenarCombos(combo, "spsuministros_Proveedores_Obtener");
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

function FiltrarTablaSede() {
    var input, filter, table, tr, td, i;
    table = document.getElementById("tablaCasos");
    tr = table.getElementsByTagName("tr");
    var sede = $('#ddlSedes option:selected').text().toUpperCase();

    for (i = 0; i < tr.length; i++) {
        tdSede = tr[i].getElementsByTagName("td")[2];
        if (td) {
            if (tdSede.innerHTML.toUpperCase().indexOf(sede) > -1) {
                tr[i].style.display = "";
            }
            else {
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
    var observaciones = $('#txtObservaciones_' + posicion).val();

    if (proveedorasignado == "0") {
        swal('Evolution Ordenamientos', 'Lo sentimos, debes seleccionar un proveedor de la lista', 'warning');
    } else {

        $.ajax({
            url: "GestionOrdenamientos.aspx/actualizarOrdenes",
            data: "{ tipoidoptimizador: '" + IdtipoOpt + "', optimizador: '" + IdOpt + "', idconsecutivo: '" + idconsecutivo + "', proveedorasignado: '" + proveedorasignado + "', observaciones: '" + observaciones + "'}",
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
                        swal('Autoevaluacion', 'Bien, el proveedor se asigno correctamente.', 'success');
                        tr[posiciontabla].style.display = "none";
                        totalpendientes = totalpendientes - 1;
                        document.getElementById('lbltotalpendientes').innerHTML = totalpendientes;
                    } else {
                        swal('Evolution Ordenamientos', 'Lo sentimos, el proveedor no se asigno correctamente.', 'warning');
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
   
    document.getElementById('lblsolicitud').innerHTML = datosorden[posicion].Codigo_Solicitud_Ciklos;
    document.getElementById('lblpaciente').innerHTML = datosorden[posicion].Id_Afiliado;
    document.getElementById('lblusuregistro').innerHTML = datosorden[posicion].Ciklos_Usuario_que_Registro;
    document.getElementById('lblestadosoli').innerHTML = datosorden[posicion].Estado_Solicitud;
    document.getElementById('lblestadoserv').innerHTML = datosorden[posicion].Estado_servicio; 
    document.getElementById('lbltiposerv').innerHTML = datosorden[posicion].Tipo_de_servicio;
    
    $("#myModal").modal();   
}

function GuardarAdjuntoProveedor(id) {
    
    archivos = [];
    $("#ModalAdjuntoProveedor .modal-body").html('');
   
    var zona;
    zona += '<div class="col-lg-12 col-md-12"><label>Arrastra el archivo o toca para seleccionar</label><div id="mydropzone1_' + id + '" class="dropzone"></div></div>';
    $("#ModalAdjuntoProveedor .modal-body").append(zona);
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
    document.getElementById('lbltiposervPro').innerHTML = datosorden[posicion].Observaciones;

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

//Obtiene todos los resultados
function obtenerResultadosTodos() {
    $.ajax({
        url: "GestionOrdenamientos.aspx/obtenerResultadosTodos",
        data: "{}",
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

                for (var i = 0; i < lista.Table.length; i++) {                    
                    var td = '';
                    td += '<tr><td>' + lista.Table[i].Codigo + '</td><td>' + lista.Table[i].Cedula + '</td><td>' + lista.Table[i].Nombre + '</td><td>' + lista.Table[i].Email + '</td><td>' + lista.Table[i].Evaluado + '</td>';
                    td += '<td>' + lista.Table[i].Evaluador + '</td><td>' + lista.Table[i].Rol + '</td><td>' + lista.Table[i].a + '</td><td>' + lista.Table[i].b + '</td><td>' + lista.Table[i].c + '</td>'; 
                    td += '<td>' + lista.Table[i].d + '</td><td>' + lista.Table[i].e + '</td><td>' + lista.Table[i].f + '</td><td>' + lista.Table[i].g + '</td><td>' + lista.Table[i].h + '</td>'; 
                    td += '<td>' + lista.Table[i].i + '</td><td>' + lista.Table[i].j + '</td><td>' + lista.Table[i].k + '</td><td>' + lista.Table[i].l + '</td><td>' + lista.Table[i].m + '</td>';
                    td += '<td>' + lista.Table[i].n + '</td><td>' + lista.Table[i].o + '</td><td>' + lista.Table[i].p + '</td><td>' + lista.Table[i].q + '</td><td>' + lista.Table[i].r + '</td>';
                    td += '<td>' + lista.Table[i].s + '</td><td>' + lista.Table[i].t + '</td><td>' + lista.Table[i].u + '</td><td>' + lista.Table[i].v + '</td><td>' + lista.Table[i].w + '</td>';
                    td += '<td>' + lista.Table[i].x + '</td><td>' + lista.Table[i].y + '</td><td>' + lista.Table[i].Fortaleza1 + '</td><td>' + lista.Table[i].Fortaleza2 + '</td><td>' + lista.Table[i].Oportunidad1 + '</td><td>' + lista.Table[i].Oportunidad2 + '</td></tr>'; 
                    $("#ResultadosTodos tbody").append(td);
                }

            }
        }
    });
}

//Exportar a excel
function ExportToExcel() {    
    var htmltable = document.getElementById('ResultadosTodos');
    var html = htmltable.outerHTML;
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
}

//Obtiene todos los usuarios
function obtenerUsuarios(nombre) {
    $('#ParametrizacionAdmin').html('');
    $.ajax({
        url: "GestionOrdenamientos.aspx/ObtenerUsuarios",
        data: "{ Nombre: '" + nombre + "'}",
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

                for (var i = 0; i < lista.Table.length; i++) {
                    var Permisos = '';
                    if (lista.Table[i].Permiso == 1) {
                        Permisos = 'checked';
                    } else {
                        var Permisos = '';
                    }
                    var div = '';
                    div += '<div  class="box_display_list_user">';
                    div += '<div class="name_user_cargo_list_boox">';

                    div += '<h6>' + lista.Table[i].Nombre + '</h6>';
                    div += '<span>' + lista.Table[i].Cargo + '</span>';

                    div += '</div>';

                    div += ' <div class="tools_right_cta">';
                    div += '    <div class="permi_no_per">';
                    div += '     <form action="" class="toggle_permitir">';
                    div += '       <input type="checkbox" id="toogle_' + lista.Table[i].CedulaEvaluado + '" ' + Permisos + '/>';
                    div += '      <label for="toogle2" id="lbl_toogle_' + lista.Table[i].CedulaEvaluado + '" onclick="cambiarPermisos(' + lista.Table[i].CedulaEvaluado + ')"></label>';
                    div += '  </form>';
                    div += ' </div>';

                    div += ' <a href="#" class="icon_fold"><span class="icon-folder"></span></a>';
                    div += ' <a class="btn_full_he_blu" href="javascript:getResultadosIndividual(' + lista.Table[i].CedulaEvaluado + ')" style="cursor:pointer">Ver calificación</a>';
                    div += '</div>';
                    div += '</div>';
                    $("#ParametrizacionAdmin").append(div);
                }

            }
        }
    });
}

//Obtiene la evaluacion del usuario
function obtenerEvaluacion() {


    $.ajax({
        url: "GestionOrdenamientos.aspx/obtenerPreguntas",
        data: null,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        type: 'POST'
    }).done(function (rest) {

        var lista = rest.d;

        if (lista != '') {

            var listaDatos = JSON.parse(lista);

            //if (listaDatos[0].realizada > 0) {
            //    swal('EvolutionNet', 'El empleado seleccionado ya fue evaluado..!!', 'info');
            //    return;
            //}

            //Recorremos la lista con los datos 
            for (var i = 0; i < listaDatos.Table.length; i++) {
                var tbl = '';
                var id = listaDatos.Table[i].IdPregunta;
                tbl += '<tr>';
                //if (listaDatos.Table[i].Letra == 'x' || listaDatos.Table[i].Letra == 'Y' || listaDatos.Table[i].Letra == 'z' || listaDatos.Table[i].Letra == 'z1') {
                //    tbl += '<td></td>';
                //}
                //else {
                tbl += '<td id=' + id + '>' + listaDatos.Table[i].Letra + '</td>';
                // }
                tbl += '<td id=Descripcion' + id + '>' + listaDatos.Table[i].Descripcion + '</td>';
                tbl += '<td><select  id=ddlCalificacionJefe' + id + ' class="form-control color-blue" onchange="calificarJefe(' + id + ')"><option value="1">Nunca</option><option value="2">Pocas veces</option><option value="3">Frecuentemente</option><option value="4">Siempre</option></select></td>';
                // tbl += '<td> <div  class="progress animated-bar"><div id=progresoJefe' + id + ' class="progress-bar progress-bar-danger" role="progressbar" data-transitiongoal="0" aria-valuenow="0" style="width: 25%;">0%</div></div></td>';	                
                tbl += '</tr>';

                $("#tablaPreguntas").append(tbl);

            }

        }
    });

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
            }
            // });
        }

    });
}

//Cambia los permisos del usuario
function cambiarPermisos(IdUsuario) {
    var permiso = 0;
    if (!$('#toogle_' + IdUsuario).is(':checked')) {
        permiso = 1;
    } else {
        permiso = 0;
    }
    $.ajax({
        url: "GestionOrdenamientos.aspx/cambiarPermisos",
        data: "{ Usuario: '" + IdUsuario + "',Permiso:'" + permiso + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        type: 'POST'
    }).done(function (rest) {
        if (rest.d != '') {
            var listaDatos = JSON.parse(rest.d);
            if (listaDatos.Table.length > 0) {
                var respuesta = listaDatos.Table[0].respuesta;

                if (respuesta == "OK") {
                    $('#toogle_' + IdUsuario).prop('checked', true);
                } else {
                    $('#toogle_' + IdUsuario).prop('checked', false);
                }

            } else {
                swal('Autoevaluación 360', 'Ocurrio un error favor informar a sistemas', 'error');
            }

        } else {
            swal('Autoevaluación 360', 'Ocurrio un error favor informar a sistemas', 'error');
        }
    });


}

//Crea un usuario nuevo
function setUsuario() {
    var codigoAlpina = $('#form_usuario_codigo').val();
    var cedula = $('#form_usuario_cedula').val();
    var nombre = $('#form_usuario_nombre').val();
    var email = $('#form_usuario_email').val();
    var cargo = $('#form_usuario_cargo').val();
    var sede = $('#form_usuario_sede').val();
    var user = $('#form_usuario_user').val();
    var clave = $('#form_usuario_clave').val();

    if (codigoAlpina.length == 0 || cedula.length == 0 || nombre.length == 0 || email.length == 0 || user.length == 0 || clave.length == 0) {
        swal('Autoevaluación 360', 'Falta información para el cambio..!', 'warning');
        return false;
    } else {
        $.ajax({
            url: "GestionOrdenamientos.aspx/setUsuario",
            data: "{ CodigoAlpina: '" + codigoAlpina + "',Cedula:'" + cedula + "',Nombre:'" + nombre + "',Email:'" + email + "',User:'" + user + "',Clave:'" + clave + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            type: 'POST'
        }).done(function (rest) {
            if (rest.d != '') {
                var listaDatos = JSON.parse(rest.d);
                if (listaDatos.Table.length > 0) {
                    var respuesta = listaDatos.Table[0].respuesta;
                    if (respuesta == "OK") {
                        var asunto = "Autoevaluación 360 - Usuario de ingreso";
                        var mensaje = "Tu usuario es: " + user + " y Password: " + clave;
                        enviarCorreo(email, asunto, mensaje, 0);
                        swal('Autoevaluación 360', 'Usuario creado con exito!', 'success');

                    } else {
                        swal('Autoevaluación 360', 'Codigo, Cedula, Email o Usuario ya existe en el sistema!', 'error');
                    }

                } else {
                    swal('Autoevaluación 360', 'Ocurrio un error favor informar a sistemas', 'error');
                }
            } else {
                swal('Autoevaluación 360', 'Ocurrio un error favor informar a sistemas', 'error');
            }
        });
    }

}

//Recordar Contraseña
function recordarContraseña(usuario, email) {
    $.ajax({
        url: "GestionOrdenamientos.aspx/recordarContraseña",
        data: "{ Usuario: '" + usuario + "',Email:'" + email + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        type: 'POST'
    }).done(function (rest) {
        if (rest.d != '') {
            var listaDatos = JSON.parse(rest.d);
            if (listaDatos.Table.length > 0) {
                var respuesta = listaDatos.Table[0].respuesta;
                var nombre = listaDatos.Table[0].Nombre;
                var clave = listaDatos.Table[0].Clave;
                if (respuesta == "OK") {
                    var asunto = 'Autoevaluación 360 - Recuerda tu clave';
                    var mensaje = JSON.stringify("<div style='background-color:#013064;max-width:500px;text-align:center;color:#fff;font-family:Helvetica,Sans Serif;padding:4em 2em 6em;margin: 0 auto;'><img src = 'http://i.imgur.com/qYa31JP.png' alt = 'Logo Alpina'><h1>¡Hola <span style = 'color:#3498DB;'>" + nombre + "</span>!</h1><p>Recuerda que tu contraseña de<br>ingreso para la encuesta 360 es:</p><h2>" + clave + "</h2></div>");
                    enviarCorreo(email, asunto, mensaje, 0);
                    swal('Autoevaluación 360', 'Contraseña enviada con exito', 'success');
                } else {
                    swal('Autoevaluación 360', 'Ocurrio un error favor informar a sistemas', 'error');
                }

            } else {
                swal('Autoevaluación 360', 'Ocurrio un error favor informar a sistemas', 'error');
            }

        } else {
            swal('Autoevaluación 360', 'Ocurrio un error favor informar a sistemas', 'error');
        }
    });
}

//Funcion envio de correo
function enviarCorreo(email, asunto, mensaje, adjunto, notificacion) {
    //var email = 'sebastianceballos@intelsa.co';
    //var asunto = "correo prueba";
    //var mensaje = JSON.stringify("<div style='background-color:#013064;max-width:500px;text-align:center;color:#fff;font-family:Helvetica,Sans Serif;padding:4em 2em 6em;'><img src = 'http://i.imgur.com/qYa31JP.png' alt = 'Logo Alpina'><h1>¡Hola <span style = 'color:#3498DB;'>Jaime</span>!</h1><p>Recuerda que tu contraseña de<br>ingreso para la encuesta 360 es:</p><h2>% oid234$b1</h2></div>");

    $.ajax({
        url: "GestionOrdenamientos.aspx/EnviarCorreo",
        data: "{ emails: '" + email + "',asunto:'" + asunto + "',cuerpomensaje:" + mensaje + ",adjunto:'" + adjunto + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        type: 'POST'
    }).done(function (rest) {
        if (notificacion == 1) {
            swal('Autoevaluación 360', 'Correo enviado con exito!', 'success');
        } else if (notificacion == 2) {
            $('.share_place_type').addClass('none_this');
            $('.share_sendsi_type').removeClass('none_this');
        }
    });
}

//Cargar el perfil de el usuario
function cargarPerfil(idUsuario) {
    $.ajax({
        url: "GestionOrdenamientos.aspx/cargarPerfil",
        data: "{ Usuario: '" + idUsuario + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        type: 'POST'
    }).done(function (rest) {
        var lista = rest.d;
        if (lista != '') {
            var listaDatos = JSON.parse(lista);
            if (listaDatos.Table.length > 0) {
                $('#perfil_nombre').text(listaDatos.Table[0].Nombre);
                $('#perfil_cedula').text(listaDatos.Table[0].Cedula);
                $('#perfil_email').text(listaDatos.Table[0].Email);
                $('#perfil_cargo').text(listaDatos.Table[0].Cargo);
                $('#perfil_sede').text(listaDatos.Table[0].Sede);
                $('#perfil_usuario').val(listaDatos.Table[0].Usuario);
            }
        }
    });

}


//Grafico PDF
function getPDF(evaluado) {

    $.ajax({
        url: "GestionOrdenamientos.aspx/obtenerDatos",
        data: "{ sp: 'spObtenerGrafico',evaluado: '" + evaluado + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        type: 'POST'
    }).done(function (rest) {

        var resultado = rest.d;

        if (resultado != '') {

            var lista = JSON.parse(resultado);

            var doc = new jsPDF();
            doc.setProperties({
                title: 'Resultados'
            });
            var back = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QA6RXhpZgAATU0AKgAAAAgAA1EQAAEAAAABAQAAAFERAAQAAAABAAAAAFESAAQAAAABAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAD6AfQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8V6KKK/qw+DCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA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oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPoD/glP490L4X/wDBSj4G6/4muLaz0PTPGemy3VzcbRDaDz1VZnLcKqMVcsfuhSe1fot+3b8CfG37IP8AwT//AG65Piu32GD40fGGwuPAMNxcK76syam97NfQkMS6SWZQYIUr5LA88V+NNaWt+MdX8TWOn2upapqWoW2kw/Z7KK5uXljs4+PkjViQi8DhcDivDx+USxGKhiFOyXLdWu3yy51Z3010ej0OqliFCDg13/FWM2iiivcOUKKKKACvYf2Fv2jPHH7Nn7ROj3/gTxLqXhe+8SSReHtSnsXCSXNhcXEPnQFsEqGKIcrhgVBBBGa8eorGvRjVpulNXTVtdSoycXzI+1P+DiX/AJTMfG7/AK/tO/8ATVZ18V0UVngcN9Ww1PD3vyRUb7Xskr2Kq1Oebn3dwooorqMwooooA/U//ggF+w38Sv2ivh9qvxMvNW8c+Ivg38J/Ekeqaf8ADfRddMMfjHxNarb3MKGCWVLaJU32zvPJgkYVc4bb8Z/8FVfF3xI8ff8ABQj4oa18WvDcXg7x/qWqJPqOhx3EdwulIbeL7NAJI2KybbbyRvB+bqQCSB8+UV5GHy2dPHTxk5J8ysly2cVo9+azu1dvlu9NbKx0TrJ0lTS289/w/UKKKK9c5wooooAK/dL/AIJNfss/Er9nn4SeKpviD4faPTvGfwu1G70f49WXjY6rp/hPRZrSOSHS0tJS1thJkllJUAgykAlQCPwtrUTxvrUfhdtDXV9UXRZHEjaeLp/srMDkMY87c55zjrXj51llTHUVRjJRXW6b+6zX3O6fVHRhqypS5mrmXRRRXsHOFFFFABXp37GHh/4Z+KP2pfBNn8ZNfuPDPwwbUVl8R38NrcXMi2satIYglurS5lZVi3IpKebu/hrzGis61Png4JtXTV1ur9V5roVGVnc/br/gr98UfhX+15/wSR8QeMPD3x10vXvC+k/F7b4K0+y8Fanp1rZiDQoLeDw7CkyqYvLtiblrllWFnkdQqsdo/EWiivNyfKll9F0ITcle6ukreWiV/XqbYiv7WXM1YKKKK9Y5wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q==";

            var logo = 'data:image/png;base64,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';

            var encabezado = '<div style="background-color:#fff ;text-align:left;color:#013064;font-family:Helvetica,Sans Serif;padding: 4em;margin: 0 auto;"><div ><h1 style="margin-left:380px;margin-bottom:10px;">RESULTADOS</h1></div><div><p style="margin-left:450px;margin-bottom:30px">Calificación por <span style="color:#3498DB;font-weight:bold;">ROL</span>.</p></div>';
                        

            doc.addImage(logo, 'PNG', 88, 15, 35, 25);
            doc.fromHTML(encabezado, 15, 35, {
                'width': 100
            });
            //posicion Y pregunta
            var Yp = 45;
            var setYp = 60;
            //posicion Y grafico
            var Yg = 45;
            var setYg = 64;
            //posicion Y respuesta grafico
            var Yrg = 45;
            var setYrg = 79;
            //posicion Y respuesta
            var Yr = 5;
            var setYr = 75;
            //Contador
            var countP = 0;
            var countPg = 0;
            var countR = 0;
            for (var i = 0; i < lista.Table.length; i++) {
                if (countP == 0) {
                    //Grafico
                    doc.addImage(back, 'JPG', 115, setYg, 75, 38);
                    setYg += Yg;
                    //Pregunta
                    var pregunta = lista.Table[i].Pregunta;
                    var letra = pregunta.substr(0, 2);
                    var pg = pregunta.substr(3);
                    var cuerpo = '<div style="width:100%;height:200px;border: 1px solid #013064;color:#013064;position:relative;text-transform:capitalize;margin-bottom:10px;font-family:Helvetica,Sans Serif;padding: 4em;"><div style="padding: 2em 3em; position: absolute;"><h3><span style="color:#00b322;">' + letra.toUpperCase() + '</span> ' + pg + '</h3></div></div></div>';
                    doc.fromHTML(cuerpo, 15, setYp, {
                        'width': 100
                    });
                    setYp += Yp;

                    //Respuesta                    
                    Yr = 5;
                    Yrg = 5;                    
                    /*
                    0=146,
                    1=154,
                    2=162,
                    3=170,
                    4=178
                    */
                    var res = 0;
                    switch (parseInt(lista.Table[i].Resultado)) {
                        case 0:
                            res = 146;
                            break;
                        case 1:
                            res = 154;
                            break;
                        case 2:
                            res = 162;
                            break;
                        case 3:
                            res = 170;
                            break;
                        case 4:
                            res = 178;
                            break;
                    }
                    var respuestas = '<ul style="font-family:Helvetica,Sans Serif;padding: 4em;"><li>' + lista.Table[i].Evaluador + ': <b>' + lista.Table[i].Resultado + '</b></li></ul>';
                    doc.fromHTML(respuestas, 15, setYr, {
                        'width': 100
                    });
                    doc.setFillColor(0, 179, 34)
                    doc.circle(res, setYrg, 2, 'F')
                    setYr += Yr;
                    setYrg += Yrg;
                    
                } else {
                    
                    /*
                    0=146,
                    1=154,
                    2=162,
                    3=170,
                    4=178
                    */
                    var res = 0;
                    switch (parseInt(lista.Table[i].Resultado)) {
                        case 0:
                            res = 146;
                            break;
                        case 1:
                            res = 154;
                            break;
                        case 2:
                            res = 162;
                            break;
                        case 3:
                            res = 170;
                            break;
                        case 4:
                            res = 178;
                            break;
                    }
                    if (countR == 1) {
                        Yr = 35;
                        Yrg = 35;
                        countR = 0;
                    } else {
                        countR++;
                    }
                    var respuestas = '<ul style="font-family:Helvetica,Sans Serif;padding: 4em;"><li>' + lista.Table[i].Evaluador + ': <b>' + lista.Table[i].Resultado + '</b></li></ul>';
                    doc.fromHTML(respuestas, 15, setYr, {
                        'width': 100
                    });
                    //Pintamos los circulos
                    doc.setFillColor(0, 179, 34)
                    doc.circle(res, setYrg, 2, 'F')
                    setYr += Yr;
                    setYrg += Yrg;
                    
                }                
                //Para una nueva pagina
                if (countPg == 14) {
                    Yp = 45;
                    setYp = 25;
                    Yg = 45;
                    setYg = 25;
                    Yrg = 45;
                    setYrg = 40;
                    Yr = 5;
                    setYr = 40;
                    countPg = 0;
                    doc.addPage();
                } else {
                    countPg++;
                }
                if (countP == 2) {
                    countP = 0;
                } else {
                    countP++;
                }

            }
            
            var obj = doc.output('datauristring');
           // doc.save('resultados_'+evaluado+'.pdf');
            var email = 'sebastianceballos@intelsa.co';
            var mensaje = JSON.stringify("<p>prueba<p>");
            var asunto = 'Prueba';
            enviarCorreo(email, asunto, mensaje, obj, 0);

        }
        else {
            alert('No hay datos');
        }
    });
}

function borrar(id) {

    swal({
        title: "Esta seguro que desea Eliminar Registro?",
        text: "Eliminar Registro!",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        confirmButtonText: "SI, Confirmar!",
        cancelButtonText: "No, Cancelar!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function (isConfirm) {
        if (isConfirm) {


            $.ajax({
                url: "GestionOrdenamientos.aspx/eliminarRegistro",
                data: "{ Id: '" + id + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                type: 'POST'
            }).done(function (rest) {
                swal("Parametros", "Eliminado con Éxito", "success");
                var evaluador = $('#ddlEvaluador').val();
                obtenerParametrizacion(evaluador);              
            });
                      
        }
        else {
            swal("Cancelar", "Cancelada", "error");
        }
    });
}

function FiltrarTabla(evaluador) {

    var evaluador = $('#ddlEvaluador').val();
    obtenerParametrizacion(evaluador);


  //  $('#tablaParametros').removeAttr('style');

    // Declare variables 
    var input, filter, table, tr, td, i;
    //input = document.getElementById("ddlEvaluador");
    filter = evaluador;
        //input.value.toUpperCase();
    table = document.getElementById("tablaParametros");
    tr = table.getElementsByTagName("tr");
    //Filtro x especialidad     
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }


    }


}

function obtenerParametrizacion(cedula) {

    $.ajax({
        url: "GestionOrdenamientos.aspx/obtenerParametrizacion",
        data: "{ cedula: '" + cedula + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        type: 'POST'
    }).done(function (rest) {
        if (rest.Error != undefined) {
            swal('AutoEvaluacion', 'Ocurrio un error favor informar a sistemas', 'error');
        } else {

            var lista = rest.d;

            if (lista != '') {

                var listaDatos = JSON.parse(lista);

                //if (listaDatos[0].realizada > 0) {
                //    swal('EvolutionNet', 'El empleado seleccionado ya fue evaluado..!!', 'info');
                //    return;
                //}
                $('#tablaParametros td').remove();
                //Recorremos la lista con los datos 
                for (var i = 0; i < listaDatos.Table.length; i++) {
                    var tbl = '';
                    var id = listaDatos.Table[i].Id;
                    tbl += '<tr>';
                    tbl += '<td id=Evaluador' + id + '>' + listaDatos.Table[i].Evaluador + '</td>';
                    tbl += '<td id=Evaluado' + id + '>' + listaDatos.Table[i].Evaluado + '</td>';
                    tbl += '<td id=Rol' + id + '>' + listaDatos.Table[i].Rol + '</td>';
                    tbl += "<td><input type='button' class='btn btn-danger' value='Eliminar' onClick='borrar(" + id + ")'</td>";
                    tbl += '<td style="visibility:hidden" id=Cedula' + id + '>' + listaDatos.Table[i].Cedula + '</td>';
                    tbl += '</tr>';

                    $("#tablaParametros").append(tbl);

                }
            }
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




function procesarArchivo()
{
    

    $.ajax({
        url: "GestionOrdenamientos.aspx/procesarArchivo",
        data: "{ Archivo: '" + archivos + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        type: 'POST'
    }).done(function (rest) {
        if (rest.Error != undefined) {
            alert(rest.Error);
        } else {
            swal('GestionOrdenamiento', 'Proceso realizado con exito..', 'success');
        }
    });


}