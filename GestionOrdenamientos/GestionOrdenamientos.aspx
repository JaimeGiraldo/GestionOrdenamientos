﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GestionOrdenamientos.aspx.cs" Inherits="GestionOrdenamientos.GestionOrdenamientos" %>

<!DOCTYPE html>
<html lang="en" class="no-js">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Ordenamientos</title>
    <meta name="description" content="Confirmamos tus fortalezas y actuamos con respecto a las necesidades más apremiantes." />
    <meta name="author" content="Intelsa.co" />
    <link rel="shortcut icon" href="favicon.ico">

    <!-- Latest compiled and minified CSS -->
    <%--link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">--%>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/helpers.css" rel="stylesheet" />
    <link href="css/plugins.css" rel="stylesheet" />
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/demo.css" />
    <link rel="stylesheet" type="text/css" href="css/component.css" />
    <link rel="stylesheet" type="text/css" href="fonts/alpina-dashicons/style.css" />
    <script src="js/modernizr-custom.js"></script>
    <!-- jQuery -->
    <script src="js/jquery-2.1.1.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>--%>
    <!-- jQuery easing plugin -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js" type="text/javascript"></script>

   <!-- Cards dashboard-->
   <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300|Material+Icons' rel='stylesheet' type='text/css'>  
   <link href="css/cards.css" rel="stylesheet" />

   <!-- Graficos-->
    <script src="js/highcharts.js"></script>
    <script src="js/exporting.js"></script>
    <script src="js/drilldown.js"></script>

</head>
<body>
    <div class="usuario_name">

        <div class="col-lg-12 col-md-12">
              <div class="col-lg-3 col-md-3">   
               <%-- <span id="lblNombreUsuario" class="nombre_usuario"></span> --%>
                <img src="images/LogoNuevo.png" alt="Promedan" class="logo_promedan_app">   
            </div>
            <div class="col-lg-4 col-md-4"> 
                <span id="lblNombreUsuario" class="nombre_usuario"></span>       
            </div>
            <div class="col-lg-3 col-md-3">
                 <h4 id="lblUsuario" class="nombre_usuario"></h4>  
            </div>
            <div class="col-lg-2 col-md-2">
                <input type="button" id="btnSalir" value="Salir" />
            </div>
        </div>



        <%--<span id="Csambiar contraseña" class="cargo_lab"></span>--%>
        
    </div>

    <!-- navigation -->
   
    <nav class="pages-nav">
        <%--   <div class="pages-nav__item bg-primary" id="Parametrizacion" style="display:none"><a class="link link--page" href="#page-parametrizacion"><span class="icon-graph-8"></span>Parametrización</a></div>
        <div class="pages-nav__item bg-primary" id="ParametrizacionJefe" style="display:none"><a id="pgParametrizacionVisualizacion" class="link link--page" href="#parametrizacion_jefe"><span class="icon-settings-1"></span>Administrar Usuarios</a></div>
        --%>
        
        <div id="MenuCargaArchivo" class="pages-nav__item"><a id="pgEvaluarAutoevaluacion" class="link link--page" href="#page-ImportarArchivo"><span class="icon-upload"></span>Importar Archivo</a></div>
        <div id="MenuResponsables" class="pages-nav__item"><a id="pgResponsables" class="link link--page" href="#page-Responsables"><span class="icon-profile"></span>Configurar Responsables</a></div>
        <div id="MenuOptimizador" class="pages-nav__item"><a id="pgEvaluarIndividual" class="link link--page" href="#page-AsignarAT4"><span class="icon-check"></span>Asignar AT4 </a></div>
        <div id="MenuProveedor" class="pages-nav__item"><a id="pgEvaluarGrupal" class="link link--page" href="#page-Proveedores"><span class="icon-record "></span>Proveedores</a></div>
        <div id="MenuReportes" class="pages-nav__item"><a id="btnGrafico" class="link link--page" href="#page-Resultado1"><span class="icon-stats"></span>Reportes</a></div>
        <%--<div class="pages-nav__item"><a id="pgJefe" class="link link--page" href="#jefe_cargo"><span class="icon-diagram-1"></span>Jefe a Cargo</a></div>		       
        <div class="pages-nav__item" id="Resultado2" style="display:none"><a id="btnGrafico1"  class="link link--page" href="#page-Resultado2"><span class="icon-pie-chart-1"></span>Resultados 2</a></div>
        <div class="pages-nav__item" id="Fortalezas" style="display:none"><a id="btnGrafico2" class="link link--page" href="#page-Fortalezas"><span class="icon-padnote"></span>Fortalezas - Oportunidad Mejora</a></div>
        <div class="pages-nav__item"><a id="btnPlanDesarrollo"  class="link link--page" href="#page-plan-desarrollo"><span class="icon-screen"></span>Plan de Desarrollo</a></div>
        <div class="pages-nav__item"><a id="btnPerfil"  class="link link--page" href="#page-perfil"><span class="icon-profile"></span>Perfil</a></div>
        <div class="pages-nav__item"><a id="btnAyuda" class="link link--page" href="#ayuda_user"><span class="icon-info"></span>Instrucciones</a></div>--%>
    </nav>
   
    <!-- /navigation-->
	<!-- pages stack -->
	<div class="pages-stack">
		<div class="page" id="page-home">
			<!-- Header -->
			<header class="bp-header cf">					
				<!--<nav class="bp-nav">
					<a class="bp-nav__item bp-icon bp-icon--prev" href="#" data-info="previous Blueprint"><span>Previous Blueprint</span></a>
					a class="bp-nav__item bp-icon bp-icon--next" href="" data-info="next Blueprint"><span>Next Blueprint</span></a
					<a class="bp-nav__item bp-icon bp-icon--drop" href="#" data-info="back to the Codrops article"><span>back to the Codrops article</span></a>
					<a class="bp-nav__item bp-icon bp-icon--archive" href="#" data-info="Blueprints archive"><span>Go to the archive</span></a>
				</nav>-->
			</header>
            <div class="mylogin_eval">
                <div class="login">
                    <div class="login-screen">
                        <div class="logo_alp">
                            <img src="images/LogoNuevo.png" alt="Promedan">
                        </div>
                        <div class="intro_log">
                            <p>GESTIÓN DE ORDENAMIENTOS</p>
                        </div>
                        <div class="login-form" id="login_pro">
                            <div class="control-group">
                                <input type="text" id="txtUsuario" class="login-field" value="admin" placeholder="Usuario">
                                <label class="login-field-icon fui-user" for="login-name"></label>                                
                            </div>
                            <div class="control-group">
                                <input type="password" id="txtContraseña" class="login-field" value="12345" placeholder="Contraseña">
                                <label class="login-field-icon fui-lock" for="login-pass"></label>
                            </div>
                            <a id="btnLogin" class="btn btn-primary btn-large btn-block" href="#">Iniciar sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	   
        
        <div class="page" id="page-Resultado1">
           <%-- <input type="hidden" id="IdUsuario" value="0" />--%>
            <header class="bp-header cf">
                <h1 class="bp-header__title">Análisis y Reportes</h1>
                <p>Información detallada sobre la cantidad de ordenes y el proceso de optimización.</p>
                
                <!-- indicador de wait -->  
                 <div class="col-lg-6 col-md-4" ></div>
                 <div class="col-lg-2 col-md-2" >
                     <div class="loader" id="loaderdashboard" ></div>
                 </div>
                 

                <%-- <p>A continuación, encontraras tus resultados.<br />
                    No olvides que la retroalimentación es un regalo y es la clave del éxito está en que construyas y ejecutes tu plan de desarrollo tomando en cuenta esta información.
                </p>--%>                
            </header>
                      
                <div class="container">                   
                  
                        <div class="col-lg-12 col-md-12"></div>                     
                        
                        <div class="col-lg-6 col-md-6 sortable-layout ui-sortable">

                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="card card-stats">
                                    <div class="card-header" data-background-color="green">
                                        <i class="material-icons">assignment</i>
                                    </div>
                                    <div class="card-content">
                                        <p class="category">Ingresadas al Sistema</p>
                                        <h3 class="title" id="lblgeneradas">0</h3>
                                    </div>
                                    <div class="card-footer">
                                        <div class="stats">
                                            <i class="material-icons">receipt</i> Importadas desde Excel
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="card card-stats">
                                    <div class="card-header" data-background-color="red">
                                        <i class="material-icons">help</i>
                                    </div>
                                    <div class="card-content">
                                        <p class="category">Pendientes de Optimización</p>
                                        <h3 class="title" id="lblpendientes">0</h3>
                                    </div>
                                    <div class="card-footer">
                                        <div class="stats">
                                            <i class="material-icons">date_range</i> En espera de Optimización
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="card card-stats">
                                    <div class="card-header" data-background-color="blue">
                                        <i class="material-icons">comment</i>
                                    </div>
                                    <div class="card-content">
                                        <p class="category">Asignadas a Responsable</p>
                                        <h3 class="title" id="lbladecuadas">0</h3>
                                    </div>
                                    <div class="card-footer">
                                        <div class="stats">
                                            <i class="material-icons">check_circle</i> Personal de optimización
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="card card-stats">
                                    <div class="card-header"  data-background-color="orange">
                                        <i class="material-icons">info_outline</i>
                                    </div>
                                    <div class="card-content">
                                        <p class="category">Asignadas Faltantes</p>
                                        <h3 class="title" id="lblnoadecuadas">0</h3>
                                    </div>
                                    <div class="card-footer">
                                        <div class="stats">
                                            <i class="material-icons">report_problem</i> Asignadas sin optimizar 
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-4" style="text-align:center">
                                <button id="btngrafico2" class="btn btn-primary">Grafico 2</button>
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-4" style="text-align:center">
                                <button id="btngrafico3" class="btn btn-primary">Grafico 3</button>
                            </div>

                             <div class="col-lg-4 col-md-4 col-sm-4" style="text-align:center">
                                <button id="btnreportes" class="btn btn-primary">Reportes</button>
                            </div>

                        </div>

                        <div class="col-lg-6 col-md-6">
                           
                            <div id="container" style="height:400px"></div>
                             <div class="col-lg-12 col-md-12 col-sm-12" style="text-align: end">
                                <label onclick="ExportToExcel()" style="font:menu"><u>Ver detalle</u></label>
                            </div>
                        </div>                   

                </div>       
            
              <div class="modal fade" id="ModalGrafico2" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 id="ModalGrafico2tittle">TITULO</h4>
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">
                                 <div id="containergrafico2" style="width:472px"></div>                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>

            <div class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">                       
                        <div class="modal-body">
                            <%--tabla para generar el archivo excel del graficio icianial en el dashboard, se oculta dentro de un modal--%>
                            <table id="tbldetallegraficodash" class="table table-hover table-action">
                                <thead>
                                    <tr>
                                        <th>CUPS</th>
                                        <th>DESCRIPCION</th>
                                        <th>CANTIDAD</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>                       
                    </div>
                </div>
            </div>     
            
             <div class="modal fade" id="ModalReportes" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 id="ModalReportestittle">REPORTES</h4>
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            
                            <section id="services">         
                                    <div class="row">
                                        <div class="col-md-12 service-item">
                                            <div class="service-icon"><i class="fa fa-desktop" id="reporteasignaciones"></i></div>
                                            <h4 class="service-title"><a href="">Reporte de Asignaciones</a></h4>
                                            <p class="service-description">Informe detallado del número de ordenes asignadas por cada persona responsable de la gestión.</p>
                                        </div>
                                        <div class="col-md-12 service-item">
                                            <div class="service-icon"><i class="fa fa-bar-chart" id="reporte2"></i></div>
                                            <h4 class="service-title"><a href="">Reporte 2</a></h4>
                                            <p class="service-description">Descripción reporte 2.</p>
                                        </div>                                        
                                    </div>                               
                            </section>
                            
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>

            <div class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <%--tabla para generar el reporte de asignaciones, se oculta dentro de un modal--%>
                            <table id="tblasignacionesresponsables" class="table table-hover table-action">
                                <thead>
                                    <tr>
                                        <th>TipoId</th>
                                        <th>Identificacion</th>
                                        <th>Nombre Completo</th>
                                        <th>Cups</th>
                                        <th>Ordenes Asignadas</th>
                                        <th>Ordenes Auditadas</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
       <%-- pagina para optimizacion--%>
        <div class="page" id="page-AsignarAT4">
            <header class="bp-header cf">
                <h1 id="headeroptimizacion" class="bp-header__title">Asignar Orden Liberada</h1>
                <p id="optimi">Favor consultar la orden y asignarle el provedor correspondiente.</p>
            </header>
            <div class="container">
                <div class="scroll_header_fixed">
                  <%-- <div class="listar_nambers">
                        <div class="col-md-2">
                            <label>TOTAL<br>
                                ASIGNADO:</label>
                            <label id="lbltotalasignados"></label>
                        </div>
                        <div class="col-md-2">
                            <label>TOTAL<br>
                                PENDIENTES:</label>
                            <label id="lbltotalpendientes"></label>
                        </div>
                        <div class="col-md-2 col-md-offset-6">
                            <button id="btnActualizartabla" class="btn btn-primary">Listar</button>
                        </div>
                    </div>--%>

                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                           
                            <div class="col-lg-12 col-md-12"  data-background-color="bluee" style="margin:-20px 5px 0; padding:15px; border-radius:3px">
                              
                                <div class="col-md-3" >
                                    <label>TOTAL ASIGNADO:</label>
                                    <label id="lbltotalasignados"></label>
                                </div>

                                <div class="col-md-3">
                                    <label>TOTAL PENDIENTES:</label>
                                    <label id="lbltotalpendientes"></label>
                                </div>

                                <div class="col-md-3">
                                    <label>FILTRAR:</label>
                                    <input class="myinput" type="text" id="txtfiltro"  placeholder="Ingresa el número de CUPS" onkeyup="FiltrarTablaSede()">
                                </div>

                                <div class="col-md-3" style="text-align:end;padding-top:25px">
                                      <button id="btnActualizartabla">Listar</button>
                                </div>

                            </div>
                            <div class="card-content table-responsive">
                                <table id="tablaAsignar" class="table table-hover table-action">
                                    <thead>
                                        <tr>
                                            <th>Codigo S. Ciklos</th>
                                            <th>Fecha Registro</th>
                                            <th>Fecha Esperada</th>
                                            <th>IPS Solicitante</th>
                                            <th>CUPS</th>
                                            <th>Descripción</th>
                                            <th>Detalle</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
       
                    
                </div>
            </div>

            <div class="container">
                <!-- Modal para ingresar al detalle -->
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 id="myModaltittle"></h4>
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">
                                <div class="cinta_whit_sh">
                                    <span>Cups:</span>
                                    <label id="lblsolicitud"></label>
                                </div>
                                <div class="cinta_whit_sh">
                                    <span>Paciente:</span>
                                    <label id="lblpaciente"></label>
                                </div>
                                <div class="cinta_whit_sh">
                                    <span>Tipo Servicio:</span>
                                    <label id="lbltiposervicio"></label>
                                </div>
                                <div class="cinta_whit_sh">
                                    <span>Estado Servicio:</span>
                                    <label id="lblestadoservicio"></label>
                                </div>
                                <div class="cinta_whit_sh">
                                    <span>Nivel Autorización:</span>
                                    <label id="lblestadoserv"></label>
                                </div>
                                <div class="cinta_whit_sh">
                                    <span>Centro Generador de la Autorización:</span>
                                    <label id="lbltiposerv"></label>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="ModalAcciones" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 id="ModaltittleAcciones"></h4>
                            <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body" style="padding: 0px;">
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--Pagina de asignacion de responsables--%>
        <div class="page" id="page-Responsables">
            <header class="bp-header cf">
                <h1 class="bp-header__title">Parametrización Responsable</h1>
                <p>Seleccione el personal que va a realizar la optimización.</p>
            </header>
            <div class="container">
                <div class="card" style="margin:0">
                    <div class="col-lg-12 col-md-12" data-background-color="bluee" style="padding: 15px; border-radius: 3px">

                        <div class="col-md-3">
                            <label class="s16 color-white">Responsable:</label>
                            <select id="ddlEmpleado" class="form-control color-blue"></select>
                        </div>

                        <div class="col-md-5">
                            <label class="s16 color-white">Cups:</label>
                            <select id="ddlCups"  class="form-control color-blue"></select>
                        </div>

                        <div class="col-md-2">
                            <label>FILTRAR:</label>
                            <input type="text" class="myinput1" id="txtfiltroRespon" placeholder="Responsable" onkeyup="FiltrarResponsables()" style="height: 35px">
                        </div>

                        <div class="col-md-2" style="text-align: end; padding-top: 25px">
                            <button id="btnAdd">Adicionar</button>
                        </div>

                    </div>
                </div>
                <div class="scroll_header_fixed">
                    <div class="col-lg-12 col-md-12">
                        <div class="card-content table-responsive">
                            <table id="tablaParametros" <%--style="visibility:hidden"--%> class="table table-hover table-action">
                                <thead>
                                    <tr>
                                        <th>Responsable</th>
                                        <th>Identificación</th>
                                        <th>Cups</th>
                                        <th>Descripción </th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       <%-- pagina para importacion de archivo--%>
        <div class="page" id="page-ImportarArchivo">
            <header class="bp-header cf">
                <h1 class="bp-header__title">Importar Archivo</h1>
                <p>Ingresar el archivo de ordenes generadas para los prestadores al sistema.</p>
            </header>

            <div class="container">
                <div class="col-lg-6 col-md-6">
                    <label>Arrastra o selecciona el archivo en formato Excel.</label>
                    <div id="mydropzone" action="/uploads" title="Importar" class="dropzone"></div>
                    <br />
                </div>
                <div class="col-lg-3 col-md-3" style="text-align:center;padding-top:50px">
                   <%-- <input type="button" id="btnProcesarArchivo" class="btn btn-primary" value="Procesar Archivo" onclick="procesarArchivo();" />--%>
                    <button id="btnProcesarArchivo" class="btn btn-primary" onclick="procesarArchivo();">Procesar Archivo</button>
                </div>
                 <div class="col-lg-3 col-md-3" style="text-align:center;padding-top:50px">
                    <button id="btnRepartir" class="btn btn-primary">Distribuir Cups</button>
                </div>

                <div class="col-lg-12 col-md-12"></div>
                 <!-- indicador de wait -->  
                 <div class="col-lg-6 col-md-6" ></div>
                 <div class="col-lg-4 col-md-4" >
                     <div class="loader" id="loaderepartir" style="display:none" ></div>
                 </div>
                


                <div class="col-lg-12 col-md-12 col-sm-12" style="text-align: end">
                    <label onclick="ExportToExcelRepartir()" style="font: menu"><u>Ver detalle</u></label>
                </div>


                <div class="col-lg-12 col-md-12">
                    <div class="card">
                        <div class="card-header" data-background-color="bluee">
                            <h4 class="title">Listado de Asignaciones</h4>
                            <p class="category">Asignaciones realizadas después de realizar la actualización de nuevas ordenes y responsables.</p>
                        </div>
                        <div class="card-content table-responsive">
                            <table id="tablaRepartir" class="table table-hover table-action">
                                <thead>
                                    <tr>
                                        <th>Tipo ID</th>
                                        <th>Identificacion</th>
                                        <th>Nombre Completo</th>
                                        <th>CUPS</th>
                                        <th>Total Asignado</th>
                                        <th>Total Ordenes</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    </div>

            </div>
        </div>

        <div class="page" id="page-Proveedores">
            <header class="bp-header cf">
                <h1 id="headerproveedor" class="bp-header__title">Proveedores</h1>
                <p id="lblheaderproveedor">Favor confirmar las ordenes realizadas a los pacientes e incluir soportes de ejecución.</p>
            </header>
            <div class="container">
                <div class="scroll_header_fixed">

                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="card-header" data-background-color="bluee">
                                <h4 class="title">Listado de Ordenes</h4>
                                <p class="category">Ordenes pendientes por gestión del proveedor</p>
                            </div>
                            <div class="card-content table-responsive">
                                <table id="tablaProveedores" class="table table-hover table-action">
                                    <thead>
                                        <tr>
                                            <th>Fecha Asignacion</th>
                                            <th>Cups</th>
                                            <th>Descripción</th>
                                            <th>Detalle</th>
                                            <th>Orden</th>
                                            <th>Soporte</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="container">
                    <!-- Modal para ingresar en la pantalla detalle de la orden -->
                    <div class="modal fade" id="DetalleModalProveedor" role="dialog">
                        <div class="modal-dialog">
                            <!-- Modal content-->
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4><span class="glyphicon glyphicon-plus"></span>Detalle de la Orden</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body" style="padding: 40px 50px;">
                                    <div class="cinta_whit_sh">
                                        <span>Cups:</span>
                                        <label id="lblcupsPro"></label>
                                    </div>
                                    <div class="cinta_whit_sh">
                                        <span>Paciente:</span>
                                        <label id="lblpacientePro"></label>
                                    </div>
                                    <div class="cinta_whit_sh">
                                        <span>Usuario Asigno:</span>
                                        <label id="lblusuregistroPro"></label>
                                    </div>
                                    <div class="cinta_whit_sh">
                                        <span>Estado Solicitud:</span>
                                        <label id="lblestadosoliPro"></label>
                                    </div>
                                    <div class="cinta_whit_sh">
                                        <span>Estado Servicio:</span>
                                        <label id="lblestadoservPro"></label>
                                    </div>
                                    <div class="cinta_whit_sh">
                                        <span>Observaciones:</span>
                                        <label id="lbltiposervPro"></label>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success" data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <!-- Modal para ingresar en la pantalla de adjunto proveedor-->
                    <div class="modal fade" id="ModalAdjuntoProveedor" role="dialog">
                        <div class="modal-dialog">
                            <!-- Modal content-->
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4><span class="glyphicon glyphicon-plus"></span>Soporte de la Orden</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success" data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span>Volver</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- /pages-stack -->
    <button class="menu-button" id="btnMenu" style="display: none"><span>Menu</span></button>

    <%-- <script src="js/jquery-2.1.1.min.js"></script>--%>
    <script src="js/select2.js"></script>
    <script src="js/classie.js"></script>
    <script src="js/main.js"></script>
    <script src="js/sweet-alert.js"></script>
    <script src="js/progressbar.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/jspdf.min.js"></script>
    <script src="js/dropzone.js"></script>


    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
    <script type="text/javascript">
        subirArchivos();
    </script>
</body>

</html>
