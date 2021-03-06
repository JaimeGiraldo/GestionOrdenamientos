﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GestionOrdenamientos.aspx.cs" Inherits="GestionOrdenamientos.GestionOrdenamientos" %>

<!DOCTYPE html>
<html lang="en" class="no-js">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Optimización</title>
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
    <link href="css/select2.min.css" rel="stylesheet" />
    <script src="js/modernizr-custom.js"></script>
    <link href="css/bootstrap-datetimepicker.css" rel="stylesheet" />

    <!-- jQuery -->
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/bootstrap-notify.js"></script>
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

            <div class="col-lg-2 col-md-2">
                <img src="images/LogoNuevo.png" alt="Promedan" class="logo_promedan_app">
            </div>

            <div class="col-lg-3 col-md-4">
                <h4 id="lblNombreUsuario" class="nombre_usuario"></h4>
            </div>

            <div class="col-lg-2 col-md-2">
                <h4 id="lblUsuario" class="nombre_usuario"></h4>
            </div>

            <div class="col-lg-3 col-md-3">
                <h4 id="lblProveedor" class="nombre_usuario"></h4>
            </div>

            <div class="col-lg-2 col-md-2" style="padding-right: 11px">
                <input type="button" id="btnSalir" value="Salir" />
            </div>

        </div>

    </div>

    <!-- navigation -->

    <nav class="pages-nav">
        <div id="MenuCargaArchivo" class="pages-nav__item" style="display: none"><a id="pgEvaluarAutoevaluacion" class="link link--page" href="#page-ImportarArchivo"><span class="icon-upload"></span>Importar</a></div>
        <div id="MenuResponsables" class="pages-nav__item" style="display: none"><a id="pgResponsables" class="link link--page" href="#page-Responsables"><span class="icon-profile"></span>Responsables</a></div>       
        <div id="MenuOptimizador" class="pages-nav__item" style="display: none"><a id="pgEvaluarIndividual" class="link link--page" href="#page-AsignarAT4"><span class="icon-safebox"></span>Optimización </a></div>
        <div id="MenuProveedoresCups" class="pages-nav__item" style="display: none"><a id="pgProveedoresCups" class="link link--page" href="#page-ProveedoresCups"><span class="icon-edit"></span>Cups-Prove</a></div>
        <div id="MenuProveedor" class="pages-nav__item" style="display: none"><a id="pgEvaluarGrupal" class="link link--page" href="#page-Proveedores"><span class="icon-headphones"></span>Contacto</a></div>
        <div id="MenuProveedor2" class="pages-nav__item" style="display: none"><a id="pgProveedores2" class="link link--page" href="#page-Proveedores2"><span class="icon-clock"></span>Asistencia</a></div>
        <div id="MenuProveedor3" class="pages-nav__item" style="display: none"><a id="pgProveedores3" class="link link--page" href="#page-Proveedores3"><span class="icon-record"></span>Ejecución</a></div>
        
        <div id="MenuProveedoresProm" class="pages-nav__item" style="display: none"><a id="btnProveedoresProm" class="link link--page" href="#page-CUPSProveedoresProm"><span class="icon-settings-1"></span>CUPS-Prome</a></div>
        <div id="MenuGuias" class="pages-nav__item" style="display: none"><a id="btnGuias" class="link link--page" href="#page-Guias"><span class="icon-settings"></span>Guias</a></div>
        
         <div id="MenuBuscarOrden" class="pages-nav__item" style="display: none"><a id="btnBuscarOrden" class="link link--page" href="#page-BuscarOrden"><span class="icon-search"></span>Buscar-Orden</a></div>

        <div id="MenuOrdenamiento" class="pages-nav__item" style="display: none"><a id="btnBuscarOrdenamiento" class="link link--page" href="#page-Ordenamiento"><span class="icon-check"></span>Ordenamiento</a></div>

        <div id="MenuCUPS" class="pages-nav__item" style="display: none"><a id="btnCUPS" class="link link--page" href="#page-CUPS"><span class="icon-calculator"></span>Gestión CUPS</a></div>
        <div id="MenuReportes" class="pages-nav__item" style="display: none"><a id="btnGrafico" class="link link--page" href="#page-DashBoard"><span class="icon-stats"></span>Dashboard</a></div>
        <div id="MenuDashProveedor" class="pages-nav__item" style="display: none"><a id="pgDashProveedores" class="link link--page" href="#page-DashBoardProveedores"><span class="icon-stats"></span>Dashboard</a></div>
       

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
               <%-- <nav class="bp-nav">
					<a class="bp-nav__item bp-icon bp-icon--prev" href="#" data-info="previous Blueprint"><span>Previous Blueprint</span></a>
					<a class="bp-nav__item bp-icon bp-icon--next" href="" data-info="next Blueprint"><span>Next Blueprint</span></a
					<a class="bp-nav__item bp-icon bp-icon--drop" href="#" data-info="back to the Codrops article"><span>back to the Codrops article</span></a>
					<a class="bp-nav__item bp-icon bp-icon--archive" href="#" data-info="Blueprints archive"><span>Go to the archive</span></a>
				</nav>--%>
            </header>
            <div class="mylogin_eval">
                <div class="login">
                    <div class="login-screen">
                        <div class="logo_alp">
                            <img src="images/LogoNuevo.png" alt="Promedan">
                        </div>
                        <div class="intro_log">
                            <p>OPTIMIZACIÓN</p>
                        </div>
                        <div class="login-form" id="login_pro">
                            <div class="control-group">
                                <input type="text" id="txtUsuario" class="login-field"  placeholder="Usuario">
                                <label class="login-field-icon fui-user" for="login-name"></label>
                            </div>
                            <div class="control-group">
                                <input type="password" id="txtContraseña" class="login-field"  placeholder="Contraseña">
                                <label class="login-field-icon fui-lock" for="login-pass"></label>
                            </div>
                            <a id="btnLogin" class="btn btn-primary btn-large btn-block" href="#">Iniciar sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page" id="page-DashBoardProveedores" style="display: none">
            <%-- <input type="hidden" id="IdUsuario" value="0" />--%>
            <header class="bp-header cf">
                <h1 class="bp-header__title">Análisis y Reportes</h1>
                <p>Información detallada sobre la prestación del servicio por parte del proveedor.</p>

                <!-- indicador de wait -->
                <div class="col-lg-6 col-md-4"></div>
                <div class="col-lg-2 col-md-2">
                    <div class="loader" id="loaderdashboardProveedores"></div>
                </div>

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
                                <p class="category">Total Ordenes Asignadas</p>
                                <h3 class="title" id="lblasignadas">0</h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">receipt</i> Asignadas por Prestador
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
                                <p class="category">Total Ordenes Pendientes</p>
                                <h3 class="title" id="lblpendientesPro">0</h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">alarm</i> En espera de Ejecución
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
                                <p class="category">Total Ordenes en Gestión</p>
                                <h3 class="title" id="lblprogramadas">0</h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">date_range</i> Programadas con Usuario
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="card card-stats">
                            <div class="card-header" data-background-color="orange">
                                <i class="material-icons">info_outline</i>
                            </div>
                            <div class="card-content">
                                <p class="category">Total Ordenes Represadas</p>
                                <h3 class="title" id="lblengestion">0</h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">report_problem</i> Sin contacto o Impresas 
                                </div>
                            </div>
                        </div>
                    </div>
                               
                    <div class="col-lg-6 col-md-6 col-sm-6" style="text-align: center">
                        <button id="btnreporteprovee" class="btn btn-primary">Reporte Ordenes</button>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6" style="text-align: center">
                        <button id="btnreportegeneralprovee" class="btn btn-primary">Reporte General</button>
                    </div>

                </div>

                <div class="col-lg-6 col-md-6">
                    <div id="containerProvee" style="height: 400px"></div>
                </div>

            </div>
        </div>
        
        <div class="page" id="page-DashBoard" style="display: none">
            <%-- <input type="hidden" id="IdUsuario" value="0" />--%>
            <header class="bp-header cf">
                <h1 class="bp-header__title">Análisis y Reportes</h1>
                <p>Información detallada sobre la cantidad de ordenes y el proceso de optimización.</p>

                <!-- indicador de wait -->
                <div class="col-lg-6 col-md-4"></div>
                <div class="col-lg-2 col-md-2">
                    <div class="loader" id="loaderdashboard"></div>
                </div>

            </header>

            <div class="container" >

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
                            <div class="card-header" data-background-color="orange">
                                <i class="material-icons">info_outline</i>
                            </div>
                            <div class="card-content">
                                <p class="category">Aprobadas sin Proveedor</p>
                                <h3 class="title" id="lblnoadecuadas">0</h3>
                            </div>
                            <div class="card-footer">
                                <div class="stats">
                                    <i class="material-icons">report_problem</i> Sin asignación de Proveedor
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-4" style="text-align: center">
                        <button id="btngrafico2" class="btn btn-primary">Grafico 2</button>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-4" style="text-align: center">
                        <button id="btngrafico3" class="btn btn-primary">Grafico 3</button>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-4" style="text-align: center">
                        <button id="btnreportes" class="btn btn-primary">Reportes</button>
                    </div>

                </div>

                <div class="col-lg-6 col-md-6">

                    <div id="container" style="height: 400px"></div>
                    <div class="col-lg-12 col-md-12 col-sm-12" style="text-align: end">
                        <label onclick="ExportToExcel()" style="font: menu"><u>Ver detalle</u></label>
                    </div>
                </div>

            </div>

            <div class="modal fade" id="ModalGrafico2" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content" style="padding:0px">
                        <div class="modal-header">
                            <h4 id="ModalGrafico2tittle"></h4>
                            <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        
                        <div class="modal-body">
                            <div id="containergrafico2"></div>
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
                                        <th>DESCRIPCION CIKLOS</th>
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
                            <h4 id="ModalReportestittle">GESTIÓN DE REPORTES</h4>
                            <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>

                        <section id="services">
                            <div class="row">
                                 <div class="col-md-12 service-item">
                                    <div class="service-icon"><i class="fa fa-bar-chart" id="reportecups"></i></div>
                                    <h4 class="service-title"><a href="#" onclick=" ObtenerReporteCUPS('spGestionOrdenamientos_ReporteCups');">Reporte de CUPS</a></h4>
                                    <p class="service-description">Informe detallado de los CUPS ingresados al sistema.</p>
                                </div>
                                <div class="col-md-12 service-item">
                                    <div class="service-icon"><i class="fa fa-users" id="reporteasignaciones"></i></div>
                                    <h4 class="service-title"><a href="#" onclick=" ObtenerResponsablesAsignaciones('spGestionOrdenamientos_ObtenerReporteResponsables');">Asignación de Responsables por Cups</a></h4>
                                    <p class="service-description">Ordenes asignadas a cada responsable, CUPS y total gestionado.</p>
                                </div>
                                <div class="col-md-12 service-item">
                                    <div class="service-icon"><i class="fa fa-truck" id="reporteasignacionesProve"></i></div>
                                    <h4 class="service-title"><a href="#" onclick=" ObtenerReporteCUPSProveedores('spGestionOrdenamientos_ReporteAsigProveedores');">Asignación de Proveedores por Cups</a></h4>
                                    <p class="service-description">Informe detallado de los CUPS asignados a cada Proveedor.</p>
                                </div>

                                 <div class="col-md-12 service-item">
                                    <div class="service-icon"><i class="fa fa-sitemap" id="rptAsigProvePromedan"></i></div>
                                    <h4 class="service-title"><a href="#" onclick="ObtenerReporteCUPSProvePROME('spGestionOrdenamientos_ReporteProvedoresPromedan');">Asignaciónes Proveedor Promedan</a></h4>
                                    <p class="service-description">CUPS asignados a cada responsable en Sede.</p>
                                </div>
                               
                                <div class="col-md-12 service-item">
                                    <div class="service-icon"><i class="fa fa-area-chart" id="reportegeneral"></i></div>
                                    <h4 class="service-title"><a href="#" onclick="AbrirReporteGeneral();">Reporte General</a></h4>
                                    <p class="service-description">Informe general de ordenes ingresadas y su estado actual.</p>
                                </div>
                                 <div class="col-md-12 service-item">
                                    <div class="service-icon"><i class="fa fa-user-times" id="reportefaltantescontacto"></i></div>
                                    <h4 class="service-title"><a href="#" onclick="AbrirReporteUsuarioNoContactados();">Reporte de Usuarios no contactados</a></h4>
                                    <p class="service-description">Pacientes sin contacto o registro en el sistema.</p>
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

             <div class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <%--tabla para generar el reporte de asignaciones, se oculta dentro de un modal--%>
                            <table id="tblasignacionesProveedores" class="table table-hover table-action">
                                <thead>
                                    <tr>
                                        <th>Proveedor</th>                                        
                                        <th>Cups</th>
                                        <th>Descripcion 1132</th>
                                        <th>Descripcion Ciklos</th>
                                        <th>Persona Asigno</th>
                                        <th>Fecha Asigancion</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <%--tabla para generar el reporte de asignaciones, se oculta dentro de un modal--%>
                            <table id="tblasignacionesProveedoresPromedan" class="table table-hover table-action">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>                                        
                                        <th>Cups</th>
                                        <th>Descripcion 1132</th>
                                        <th>Descripcion Ciklos</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <%--tabla para generar el reporte de asignaciones, se oculta dentro de un modal--%>
                            <table id="tablacupsreporte" class="table table-hover table-action">
                                <thead>
                                    <tr>
                                        <th>CUPS</th>
                                        <th>Descripcion</th>
                                        <th>Descripcion Ciklos</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="page" id="page-AsignarAT4" style="display: none">
            <div class="col-lg-12 col-md-12 helpicon">
                <img src="images/icons8-Idea-40.png" onclick="showNotification('top','right','<b>Optimización</b><p>- Se muestran 40 ordenes en pantalla, cuando sean todas auditadas es necesario listar de nuevo (Botón Listar).</p><p>- Las ordenes se organizan en función de la fecha que se subió al sistema, primero las más antiguas.</p><p>- En el detalle de la orden se pueden visualizar datos importantes como la fecha de nacimiento del usuario, entre otros.</p>')" style="width: 30px; height: 30px" />
            </div>
            <header class="bp-header cf">
                <h1 id="headeroptimizacion" class="bp-header__title">Asignar Orden Liberada - Optimización</h1>
                <p id="optimi">Favor consultar las ordenes asignadas y realizar el proceso de Optimización.</p>
                <%--<button type="button" id="SendEmail" class="btn btn-success">Email</button>--%>                            
            </header>
            <div class="container">
               <%-- <div class="scroll_header_fixed">   --%>                

                    <div class="col-lg-12 col-md-12">
                        <div class="card">

                            <div class="col-lg-12 col-md-12" data-background-color="bluee" style="margin: -20px 5px 0; padding: 8px; border-radius: 3px">

                                <div class="col-md-1">
                                    <label>ASIGNADAS:</label>
                                    <label id="lbltotalasignados"></label>
                                </div>

                                <div class="col-md-1">
                                    <label>PENDIENTES:</label>
                                    <label id="lbltotalpendientes"></label>
                                </div>

                                  <div class="col-md-1">
                                    <label>VENCIDAS:</label>
                                    <label id="lbltotalvencidas"></label>
                                </div>

                                <div class="col-md-2">
                                    <label>FILTRAR:</label>
                                    <input class="myinput" type="text" id="txtfiltroips" placeholder="IPS Usuario" onkeyup="FiltrarTablaProveedor1('txtfiltroips','tablaAsignar','4')">
                                </div>
                                
                                <div class="col-md-2">
                                    <label>FILTRAR:</label>
                                    <input class="myinput" type="text" id="txtfiltroCentroGene" placeholder="Centro Generó" <%--onkeyup="FiltrarTablaProveedor1('txtfiltroCentroGene','tablaAsignar','5')"--%>>
                                </div>

                                <div class="col-md-2">
                                    <label>FILTRAR:</label>
                                    <input class="myinput" type="text" id="txtfiltroDescripcin" placeholder="Descripción" onkeyup="FiltrarTablaProveedor1('txtfiltroDescripcin','tablaAsignar','6')"">
                                </div>

                                  <div class="col-md-2">
                                    <label>FILTRAR:</label>
                                    <input class="myinput" type="text" id="txtfiltrdsoespecialidadd" placeholder="Especialidad" onkeyup="FiltrarTablaProveedor1('txtfiltrdsoespecialidadd','tablaAsignar','7')"">
                                </div>

                                <div class="col-md-1" style="text-align: end; padding-top: 25px">
                                    <button id="btnActualizartabla">Listar</button>
                                </div>

                            </div>
                            <div class="card-content table-responsive">
                                <%-- <div class="scroll_header_fixed">--%>
                                <div class="table-wrapper">
                                    <div class="table-scroll">
                                        <table id="tablaAsignar" class="table table-hover table-action">
                                            <thead>
                                                <tr>
                                                    <th><span class="text">Codigo S. Ciklos</span></th>
                                                    <th><span class="text">Fecha Sistema</span></th>
                                                    <th><span class="text">Dias Espera</span></th>
                                                    <th><span class="text">Usuario</span></th>     
                                                    <th><span class="text">IPS Usuario (EVO)</span></th>
                                                    <th><span class="text">Centro Generó</span></th>
                                                    <th><span class="text">Descripción</span></th>                                                   
                                                    <th><span class="text">Especialidad</span></th>
                                                    <th><span class="text">Detalle</span></th>
                                                    <th><span class="text">Acción</span></th>
                                                </tr>
                                            </thead>
                                            <tbody id="bodytablaAsignar"></tbody>
                                        </table>
                                        <%-- </div>--%>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                <%-- </div>--%>
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
                                    <span>Fecha Registro Ciklos:</span>
                                    <label id="lblfechacicklos"></label>
                                </div>
                                <div class="cinta_whit_sh">
                                    <span>Paciente:</span>
                                    <label id="lblpaciente"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Fecha Nacimiento Paciente:</span>
                                    <label id="lblFechanacimiento"></label>
                                </div>
                                                                
                                <div class="cinta_whit_sh">
                                    <span>Ciudad:</span>
                                    <label id="lblciudad"></label>
                                </div>
                                <div class="cinta_whit_sh">
                                    <span>Fecha Registro Ciklos:</span>
                                    <label id="lblestadoserv"></label>
                                </div>
                                <div class="cinta_whit_sh">
                                    <span>Centro Generador de la Autorización:</span>
                                    <label id="lbltiposerv"></label>
                                </div>

                                <div style="text-align:center" >
                                    <span>Servicio CIKLOS:</span>
                                    <label id="lbltiposervicio" style="color:#00bdda"></label>
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
                <!-- Modal para ingresar al detalle de una orde repetida -->
                <div class="modal fade" id="ModalOrdenRepetida" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header" style="padding-bottom: 0px">
                                <h4 id="ModaltittleOrdenRepetida">Detalle de la Orden ya Optimizada</h4>
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">

                                <div class="cinta_whit_sh">
                                    <span>Codigo Ciklos:</span>
                                    <label id="lblcodigo"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Fecha Registro:</span>
                                    <label id="lblFecha"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Fecha Optimización:</span>
                                    <label id="lblFechaOpt"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Persona Optimizó:</span>
                                    <label id="lblresponsable"></label>
                                </div>

                                 <div class="cinta_whit_sh">
                                    <span>Estado Orden:</span>
                                    <label id="lblestadoorden"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Paciente:</span>
                                    <label id="lblpacientet"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Cups:</span>
                                    <label id="lblCups"></label>
                                </div>

                                <div>
                                    <label id="lbldetalle" style="text-align: center"></label>
                                </div>



                            </div>
                            <div class="modal-footer">
                                <button type="button" id="btnOmitirOrden" class="btn btn-success">Omitir Orden</button>
                                <button type="button" id="btnAuditarOrden" class="btn btn-success">Auditar Orden</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="ModalAcciones" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header" style="padding: 0px">
                            <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 id="ModaltittleAcciones"></h4>
                        </div>
                        <div class="modal-body" style="padding-top: 5px">
                        </div>
                        <div class="modal-footer" style="padding-top: 0px; padding-bottom: 0px">
                        </div>
                    </div>
                </div>
            </div>


            <div class="container">
                <!-- Modal para ingresar al detalle -->
                <div class="modal fade" id="Modalnoadecuado" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header" style="padding-bottom: 0px">
                                <h4 id="Modalnoadecuadotittle"></h4>
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body" style="padding-top: 0px">
                            </div>
                            <div class="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        <div class="page" id="page-Responsables" style="display: none">
           <div class="col-lg-12 col-md-12 helpicon">
                <img src="images/icons8-Idea-40.png" onclick="showNotification('top','right','<b>Responsables</b><p>- Se debe seleccionar el responsable y el cups para realizar las asignaciones.</p><p>- Algunos cups están duplicados pero tienen descripciones diferentes y solo se asignara en función del cups.</p><p>- Solo es posible asignar un cups una única vez a un responsable sin importar que sus descripciones sean diferentes.</p>')" style="width: 30px; height: 30px" />
            </div>
            <header class="bp-header cf">

                <div class="col-md-10" style="padding-left: 0">
                    <h1 class="bp-header__title">Asignación de Responsables</h1>
                    <p>Seleccione el personal que va a realizar la optimización.</p>
                </div>

                <div class="col-md-2" style="text-align: end; padding-right: 0; padding-top: 30px">
                    <button id="btnListResponsables">Listar</button>
                </div>


                <%-- <div class="col-md-3">
                    <label class="s16">Responsable:</label>
                    <select id="selecttest" class="js-example-basic-single js-states form-control" multiple="multiple">
                        <option value="AL">Alabama</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>--%>
            </header>
            <div class="container" style="width:90%">
              <div class="scroll_header_fixed">
                <div class="card" style="margin: 0">
                    <div class="col-lg-12 col-md-12" data-background-color="bluee" style="padding: 15px; border-radius: 3px">

                        <div class="col-md-2">
                            <label class="s16 color-white">Responsable:</label>
                            <select id="ddlEmpleado" class="form-control color-blue" style="width: 100%"></select>
                        </div>

                        <div class="col-md-4">
                            <label class="s16 color-white">Cups:</label>
                            <select id="ddlCups" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                        </div>

                        <div class="col-md-2">
                            <label>FILTRAR:</label>
                            <input type="text" class="myinput1" id="txtfiltroRespon" placeholder="Responsable" onkeyup="FiltrarResponsables()">
                        </div>

                          <div class="col-md-2">
                            <label>FILTRAR:</label>
                            <input type="text" class="myinput1" id="txtfiltroDescri" placeholder="Descripción"onkeyup="FiltrarTablaProveedor1('txtfiltroDescri','tablaParametros','3')">
                        </div>

                        <div class="col-md-2" style="text-align: end; padding-top: 25px">
                            <button id="btnAdd">Adicionar</button>
                        </div>

                    </div>
                </div>
               
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
                                <tbody  id="bodytablaParametros"></tbody>
                            </table>
                        </div>
                    </div>
               

              </div>

            </div>
        </div>

        <div class="page" id="page-ProveedoresCups" style="display: none">
           <div class="col-lg-12 col-md-12 helpicon">
                <img src="images/icons8-Idea-40.png" onclick="showNotification('top','right','<b>Responsables</b><p>- Se debe seleccionar el proveedor y el cups para realizar las asignaciones.</p><p>- Algunos cups están duplicados pero tienen descripciones diferentes y solo se asignara en función del cups.</p><p>- Solo es posible asignar un cups una única vez a un proveedor sin importar que sus descripciones sean diferentes.</p>')" style="width: 30px; height: 30px" />
            </div>
            <header class="bp-header cf">

                <div class="col-md-10" style="padding-left: 0">
                    <h1 class="bp-header__title">Parametrización Proveedores - Cups</h1>
                    <p>Asigne por cada proveedor los cups o servicios que prestara cada uno de ellos.</p>
                </div>

                <div class="col-md-2" style="text-align: end; padding-right: 0; padding-top: 30px">
                    <button id="btnListProveCups">Listar</button>
                </div>

            </header>
            <div class="container" style="width:90%">
              <div class="scroll_header_fixed">
                <div class="card" style="margin: 0">
                    <div class="col-lg-12 col-md-12" data-background-color="bluee" style="padding: 15px; border-radius: 3px">

                        <div class="col-md-2">
                            <label class="s16 color-white">Proveedor:</label>
                            <select id="ddlPProveedor" class="form-control color-blue" style="width: 100%"></select>
                        </div>

                        <div class="col-md-4">
                            <label class="s16 color-white">Cups:</label>
                            <select id="ddlProveedoresXCups" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                        </div>

                        <div class="col-md-2">
                            <label>FILTRAR:</label>
                            <input type="text" class="myinput1" id="txtfiltroProve" placeholder="Proveedor" onkeyup="FiltrarTablaProveedor1('txtfiltroProve','tablaProveedoresXCups','0')">
                        </div>

                        <div class="col-md-2">
                            <label>FILTRAR:</label>
                            <input type="text" class="myinput1" id="txtfiltroPrDes" placeholder="Descripción" onkeyup="FiltrarTablaProveedor1('txtfiltroPrDes','tablaProveedoresXCups','3')">
                        </div>
                        
                        <div class="col-md-2" style="text-align: end; padding-top: 25px">
                            <button id="btnAddPx">Adicionar</button>
                        </div>

                    </div>
                </div>
               
                    <div class="col-lg-12 col-md-12">
                        <div class="card-content table-responsive">
                            <table id="tablaProveedoresXCups" <%--style="visibility:hidden"--%> class="table table-hover table-action">
                                <thead>
                                    <tr>
                                        <th>Proveedor</th>
                                        <th>Identificación</th>
                                        <th>Cups</th>
                                        <th>Descripción</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody id="bodytablaProveedoresXCups"></tbody>
                            </table>
                        </div>
                    </div>
               

              </div>

            </div>
        </div>

        <div class="page" id="page-ImportarArchivo" style="display: none">
              <div class="col-lg-12 col-md-12 helpicon">
                <img src="images/icons8-Idea-40.png" onclick="showNotification('top','right','<b>Importar</b><p>- Se debe adjuntar el archivo una única vez por día y en el formato de Excel especificado.</p><p>- Después de adjuntar el archivo se debe presionar en el botón PROCESAR ARCHIVO para actualizar la base de datos y luego en DISTRIBUIR CUPS para completar el proceso.</p><p>- Al mismo tiempo, se repartirán automáticamente las ordenes en función de los responsables y se muestra el resultado en la tabla.</p>')" style="width: 30px; height: 30px" />
            </div>
            <header class="bp-header cf">
                <h1 class="bp-header__title">Importar Archivo</h1>
                <p>Ingresar el archivo de ordenes generadas para los prestadores al sistema.</p>
            </header>

            <div class="container" style="width:90%">
               <div class="scroll_header_fixed">
                <div class="col-lg-6 col-md-6">
                    <label>Arrastra o selecciona el archivo en formato Excel.</label>
                    <div id="mydropzone" action="/uploads" title="Importar" class="dropzone"></div>
                    <br />
                </div>
                <div class="col-lg-3 col-md-3" style="text-align: center; padding-top: 50px">
                    <%-- <input type="button" id="btnProcesarArchivo" class="btn btn-primary" value="Procesar Archivo" onclick="procesarArchivo();" />--%>
                    <button id="btnProcesarArchivo" class="btn btn-primary" onclick="procesarArchivo();">Procesar Archivo</button>
                </div>
                <div class="col-lg-3 col-md-3" style="text-align: center; padding-top: 50px">
                    <button id="btnRepartir" class="btn btn-primary">Distribuir Cups</button>
                </div>

                <div class="col-lg-12 col-md-12"></div>
                <!-- indicador de wait -->
                <div class="col-lg-6 col-md-6"></div>
                <div class="col-lg-4 col-md-4">
                    <div class="loader" id="loaderepartir" style="display: none"></div>
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
        </div>

        <div class="page" id="page-Proveedores" style="display: none">
            <div class="col-lg-12 col-md-12 helpicon">
                 <img id="optionsmenu" src="images/icons8-settings.png" onclick="AgendasDisponibilidad()" style="width: 30px; height: 30px" />
                <img src="images/icons8-Idea-40.png" onclick="showNotification('top','right','<b>Proveedores - Contacto</b><p>- Se muestran las ordenes organizadas por fecha de asignación.</p><p>- Las ordenes donde el usuario no pudo ser contactado se deben gestionar igualmente, pero se siguen mostrando de color rojo hasta lograr el contacto.</p><p>- Si se logra el contacto con el usuario, la fecha de asignación es la fecha para la que usted programó la prestación del servicio.</p>')" style="width: 30px; height: 30px" />
            </div>
            <header class="bp-header cf">
                <h1 id="headerproveedor" class="bp-header__title">Proveedores - Contacto</h1>
                <p id="lblheaderproveedor">Favor validar las ordenes asignadas, contactar con el paciente para programar la atención y guardar la gestión realizada.</p>

                <%--                 <div class="col-md-3">
                    <label>Estado de la Orden:</label>
                    <select id="ddlEstadoOrden" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                </div>--%>

                <div class="col-md-2">
                    <label>Fecha Inicial:</label>
                    <input type="date" id="ProveedorFechaInicial" class="form-control color-dark" />
                </div>

                <div class="col-md-2">
                    <label>Fecha Final:</label>
                    <input type="date" id="ProveedorFechaFinal" class="form-control color-dark" />
                </div>

                <div class="col-md-2">
                    <label>Filtrar Especialidad:</label>
                    <select id="ddlespecialidadproveedor1" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                </div>

                 <div class="col-md-2">
                    <label>Filtrar Estado:</label>
                    <select id="ddlestadodelaorden" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                </div>

                 <div class="col-md-2" >
                    <label>Filtrar por:</label>
                    <input type="text" id="txtfiltrosede" class="form-control search-key" placeholder="Descripción" onkeyup="FiltrarTablaProveedor1('txtfiltrosede','tablaProveedores','4')" />
                </div>

                 <div class="col-md-2" id="div_filtrosede1">
                    <label>Filtrar por:</label>
                    <input id="txtfiltrosedegenero" class="form-control search-key" placeholder="Centro Generó" onkeyup="FiltrarTablaProveedor1('txtfiltrosedegenero','tablaProveedores','2')"/>
                </div>
                                      

              

            </header>
            <div class="container" style="width:90%">
                <div class="scroll_header_fixed">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="card-header" data-background-color="bluee">
                                <div class="col-md-12" style="text-align: end; margin-bottom: -45px">
                                    <button id="btnConsultarOrdenesProveedor">Consultar</button>
                                </div>
                                <h4 class="title">Listado de Ordenes</h4>
                                <p class="category">Ordenes pendientes por gestión del proveedor - contacto con el usuario.</p>

                            </div>

                            <div class="card-content table-responsive">
                                <div class="table-wrapper">
                                    <div class="table-scroll">
                                        <table id="tablaProveedores" class="table table-hover table-action">
                                            <thead>
                                                <tr>
                                                    <th><span class="text">Fecha Asignacion</span></th>
                                                    <th id="th_Sede1"><span class="text">IPS Usuario</span></th>
                                                    <th id="th_CentroGenera"><span class="text">Centro Generó</span></th>
                                                    <th><span class="text">Especialidad</span></th>
                                                    <th><span class="text">Descripción</span></th>
                                                    <th><span class="text">Paciente</span></th>
                                                    <th><span class="text">Detalle</span></th>
                                                    <th><span class="text">Orden</span></th>
                                                    <th><span class="text">Acción</span></th>
                                                </tr>
                                            </thead>
                                            <tbody id="bodyproveedores"></tbody>
                                        </table>
                                    </div>
                                </div>
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
                                    <h4 id="DetalleModalProveedortitle"><span class="glyphicon glyphicon-plus"></span>Detalle de la Orden</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body" style="padding-top: 0px">

                                    <div class="cinta_whit_sh">
                                        <span>ID Paciente:</span>
                                        <label id="lblpacientePro"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Nombre Paciente:</span>
                                        <label id="lblpacientenombre"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Contacto:</span>
                                        <label id="lblcontacto"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Estado de la Orden:</span>
                                        <label id="lblestado"></label>
                                    </div>

                                     <div class="cinta_whit_sh">
                                        <span>Fecha Ciklos:</span>
                                        <label id="lblfechaciklos"></label>
                                    </div>

                                     <div class="cinta_whit_sh">
                                        <span>Profesional Solicita:</span>
                                        <label id="lblprofesionalsol"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Detalle Ciklos:</span>
                                        <label id="lbldetalleciklos"></label>
                                    </div>
                                                                       

                                    <div style="text-align:center">
                                        <span>Observaciones:</span>
                                        <label id="lblobgene"></label>
                                    </div>

                                   <%-- <div class="cinta_whit_sh">
                                        <span>Observaciones Auditoria:</span>
                                        <label id="lblobaud"></label>
                                    </div>--%>

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
                    <div class="modal fade" id="ModalDisponibilidadAgenda" role="dialog">
                        <div class="modal-dialog">
                            <!-- Modal content-->
                            <div class="modal-content" style="padding:15px">
                                <div class="modal-header">
                                   <%-- <h4><span class="glyphicon glyphicon-plus"></span>Disponibilidad de Agendas por Especialidad</h4>--%>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body">

                                    <div class="col-md-12">
                                        <div class="card card-plain">
                                            <div class="card-header" data-background-color="bluee">
                                                <h4 class="title">Disponibilidad de Agendas por Especialidad</h4>
                                                <p class="category">Favor configurar según sea el caso.</p>
                                            </div>
                                            <div class="card-content table-responsive">
                                                <table id="tablaDisponibilidadAgenda" class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Especialidad</th>
                                                            <th>Disponible</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id ="bodytablaDisponibilidadAgenda"></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success" data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span>Volver</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="ModalAccionesProveedor1" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 id="ModaltittleAccionesProveedor1">Gestión de Contacto</h4>
                            </div>
                            <div class="modal-body">
                            </div>
                            <div class="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
                
        <div class="page" id="page-Proveedores2" style="display: none">
            <header class="bp-header cf">
                <h1 id="headerproveedor2" class="bp-header__title">Proveedores - Asistencia</h1>
                <p id="lblheaderproveedor2">Favor confirmar la asistencia o no del paciente al servicio programado e incluir soportes si es el caso.</p>

                <div class="col-md-3">
                    <label>Fecha Inicial:</label>
                    <input type="date" id="ProveedorFechaInicial2" class="form-control color-dark" />
                </div>

                <div class="col-md-3">
                    <label>Fecha Final:</label>
                    <input type="date" id="ProveedorFechaFinal2" class="form-control color-dark" />
                </div>

                <div class="col-md-2">
                    <label>Filtrar por:</label>
                    <input id="txtfiltroespecialidad2" class="form-control" placeholder="Paciente" onkeyup="FiltrarTablaProveedor1('txtfiltroespecialidad2','tablaProveedores2','4')" />
                </div>

                <div class="col-md-2" id="div_filtrosede2">
                    <label>Filtrar por:</label>
                    <input type="text" id="txtfiltrosede2" class="form-control" placeholder="Sede" onkeyup="FiltrarTablaProveedor1('txtfiltrosede2','tablaProveedores2','1')" />
                </div>

                <div class="col-md-2" style="text-align: end; padding-top: 25px">
                    <button id="btnConsultarOrdenesProveedor2">Consultar</button>
                </div>

            </header>
            <div class="container" style="width:90%">
                <div class="scroll_header_fixed">

                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="card-header" data-background-color="bluee">
                                <h4 class="title">Listado de Ordenes</h4>
                                <p class="category">Ordenes pendientes por gestión del proveedor para registrar la asistencia del paciente.</p>
                            </div>
                            <div class="card-content table-responsive">
                                <table id="tablaProveedores2" class="table table-hover table-action">
                                    <thead>
                                        <tr>
                                            <th>Fecha Asignación</th>
                                            <th id="th_Sede2">Sede</th>
                                            <th>Especialidad</th>
                                            <th>Descripción</th>
                                            <th>Paciente</th>
                                            <th>Detalle</th>
                                            <th>Orden</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodyproveedores2"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="container">
                    <!-- Modal para ingresar en la pantalla detalle de la orden -->
                    <div class="modal fade" id="DetalleModalProveedor2" role="dialog">
                        <div class="modal-dialog">
                            <!-- Modal content-->
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 id="DetalleModalProveedortitle2"><span class="glyphicon glyphicon-plus"></span>Detalle de la Orden</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body" style="padding-top: 0px">

                                    <div class="cinta_whit_sh">
                                        <span>ID Paciente:</span>
                                        <label id="lblpacientePro2"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Nombre Paciente:</span>
                                        <label id="lblpacientenombre2"></label>
                                    </div>
                                    
                                    <div class="cinta_whit_sh">
                                        <span>Estado de la Orden:</span>
                                        <label id="lblestado2"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Observaciones Contacto:</span>
                                        <label id="lblcontacto2"></label>
                                    </div>

                                     <div class="cinta_whit_sh">
                                        <span>Fecha esperada de Ejecución:</span>
                                        <label id="lblfechaeje"></label>
                                    </div>

                                    <div style="text-align:center">
                                        <span>Observaciones Generales:</span>
                                        <label id="lblobgene2"></label>
                                    </div>
                                                                        
                                    <%--<div class="cinta_whit_sh">
                                        <span>Observaciones Auditoria:</span>
                                        <label id="lblobaud2"></label>
                                    </div>--%>

                                   

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success" data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="ModalAccionesProveedor2" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header" style="padding-bottom: 0px">
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 id="ModaltittleAccionesProveedor2">Gestión de Contacto</h4>
                            </div>
                            <div class="modal-body" style="padding-top: 0px">
                            </div>
                            <div class="modal-footer" style="padding-bottom: 7px">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="page" id="page-Proveedores3" style="display: none">
            <header class="bp-header cf">
                <h1 id="headerproveedor3" class="bp-header__title">Proveedores - Ejecución</h1>
                <p id="lblheaderproveedor3">Favor confirmar las ordenes ejecutadas e incluir los soportes correspondientes.</p>

                <%--                 <div class="col-md-3">
                    <label>Estado de la Orden:</label>
                    <select id="ddlEstadoOrden" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                </div>--%>

<%--                <div class="col-md-3">
                    <label>Tipo ID:</label>
                    <select id="ddlTipoID" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                </div>--%>


                <div class="col-md-3">
                    <label>Nº de Solicitud:</label>
                    <input type="number" id="Proveedor3numsolicitud" class="form-control color-dark" />
                </div>
             
                

                <div class="col-md-9" style="text-align: end; padding-top: 25px">
                    <button id="btnConsultarOrdenesProveedor3">Consultar</button>
                </div>

            </header>
            <div class="container" style="width:90%">
                <div class="scroll_header_fixed">

                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="card-header" data-background-color="bluee">
                                <h4 class="title">Detalle de la Orden</h4>
                                <p class="category">Ingrese los soportes de ejecución del servicio según el caso.</p>
                            </div>
                            <div class="card-content table-responsive">
                                <table id="tablaProveedores3" class="table table-hover table-action">
                                    <thead>
                                        <tr>
                                            <th>Fecha Asignación</th>
                                            <th id="th_Sede3">Sede</th>
                                            <th>Especialidad</th>
                                            <th>Descripción</th>
                                            <th>Paciente</th>
                                            <th>Detalle</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodyproveedores3"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="container">
                    <!-- Modal para ingresar en la pantalla detalle de la orden -->
                    <div class="modal fade" id="DetalleModalProveedor3" role="dialog">
                        <div class="modal-dialog">
                            <!-- Modal content-->
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 id="DetalleModalProveedortitle3"><span class="glyphicon glyphicon-plus"></span>Detalle de la Orden</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body" style="padding-top: 0px">

                                    <div class="cinta_whit_sh">
                                        <span>ID Paciente:</span>
                                        <label id="lblpacientePro3"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Nombre Paciente:</span>
                                        <label id="lblpacientenombre3"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Contacto:</span>
                                        <label id="lblcontacto3"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Estado de la Orden:</span>
                                        <label id="lblestado3"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Observaciones Asistencia:</span>
                                        <label id="lblobgene3"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Fecha esperada de Ejecución:</span>
                                        <label id="lblfechaeje3"></label>
                                    </div>

                                    <div class="cinta_whit_sh">
                                        <span>Fecha Asistencia Usuario:</span>
                                        <label id="lblfechaasisusu"></label>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success" data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="ModalAccionesProveedor3" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header" style="padding-bottom: 0px">
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 id="ModaltittleAccionesProveedor3">Gestión de Contacto</h4>
                            </div>
                            <div class="modal-body" style="padding-top: 0px">
                            </div>
                            <div class="modal-footer" style="padding-bottom: 7px">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="page" id="page-BuscarOrden" style="display: none">
            <header class="bp-header cf">
                <h1 class="bp-header__title">Consultar Ordenes</h1>
                <p>Ingrese los datos del paciente para rastrear en el sistema la existencia de alguna orden asociada al mismo y al proceso de Optimización.</p>
            </header>
            <div class="container" style="width:90%">
                <div class="card" style="margin: 0">
                    <div class="col-lg-12 col-md-12" data-background-color="bluee" style="padding: 15px; border-radius: 3px">


                        <div class="col-md-3">
                            <label class="s16 color-white">Tipo Identificación:</label>
                            <select id="ddlTipoid" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                        </div>

                         <div class="col-md-3">
                            <label class="s16 color-white">Identificación:</label>
                            <input type="text" id="Identificacion" placeholder="Identificación del Paciente" style="height:28px" class="form-control color-dark" />
                        </div>


                        <div class="col-md-6" style="text-align: end; padding-top: 25px">
                            <button id="btnSearchOrden">Buscar</button>
                        </div>

                    </div>
                </div>
                <div class="scroll_header_fixed">
                    <div class="col-lg-12 col-md-12">
                        <div class="card-content table-responsive">
                            <table id="tablarastrearorden" <%--style="visibility:hidden"--%> class="table table-hover table-action" style="word-wrap:break-word">
                                <thead>
                                    <tr>
                                        <th>Id Orden</th>
                                        <th>Fecha Sistema</th>
                                        <th>Fecha Ciklos</th>
                                        <th>Paciente</th>
                                        <th>Procedimiento C.</th>
                                        <th>Procedimiento 1132</th>
                                        <th>Estado</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody id="bodytablarastrearorden"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                  <div class="container">
                <!-- Modal para ingresar al detalle -->
                <div class="modal fade" id="ModalOrdenesXusuario" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 id="ModalOrdenesXusuariotittle"></h4>
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">

                                  
                                <div class="cinta_whit_sh">
                                    <span>Responsable Optimización:</span>
                                    <label id="lblrespon"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Fecha Optimización:</span>
                                    <label id="lblFechaopt"></label>
                                </div>

                                <div <%--class="cinta_whit_sh"--%> style="text-align:center">
                                    <span>Observaciones Inadecuada:</span>
                                    <label id="lblinnadecuado" style="color:#00c3e1"></label>
                                </div>

                                   <div <%--class="cinta_whit_sh"--%> style="text-align:center">
                                    <span>Observaciones AT4:</span>
                                    <label id="lblObservacionesat4" style="color:#00c3e1"></label>
                                </div>

                                   <div class="cinta_whit_sh">
                                    <span>Proveedor Asignado:</span>
                                    <label id="lblProveedorAsignado"></label>
                                </div>

                                 <div <%--class="cinta_whit_sh"--%> style="text-align:center">
                                    <span>Observaciones Contacto:</span>
                                    <label id="lblObservacionesContacto" style="color:#00c3e1"></label>
                                </div>

                                 <div class="cinta_whit_sh">
                                    <span>Fecha Cita:</span>
                                    <label id="lblFechaCita"></label>
                                </div>

                                 <div <%--class="cinta_whit_sh"--%> style="text-align:center">
                                    <span>Observaciones Asistencia:</span>
                                    <label id="lblObservAsistencia" style="color:#00c3e1"></label>
                                </div>

                                  <div <%--class="cinta_whit_sh"--%> style="text-align:center">
                                    <span>Observaciones Ejecución:</span>
                                    <label id="lblObservEjecucion" style="color:#00c3e1"></label>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>

        <div class="page" id="page-Ordenamiento" style="display: none">
            <header class="bp-header cf">
                <h1 class="bp-header__title">Generar Ordenamiento</h1>
                <p>Ingrese los datos del paciente para generar una orden.</p>
            </header>
            <div class="container" style="width: 90%">

                <div class="col-lg-12 col-md-12">
                    <div class="panel panel-default toggle panelMove">
                        <!-- Start .panel -->
                        <div class="panel-heading">

                            <h4 class="panel-title">Información del Paciente</h4>
                        </div>
                        <div class="panel-body">

                            <div class="row profile">
                                <!-- Start .row -->
                                <div class="col-lg-6 col-md-6">
                                    <div class="profile-avatar">

                                        <div class="col-lg-6 col-lm-6">
                                            <i class="material-icons">face</i><span>Tipo de Identificación:</span>
                                            <select id="ddlTipoIdPaciente" class="form-control"></select>
                                        </div>

                                        <div class="col-lg-6 col-lm-6">
                                            <i class="material-icons">fingerprint</i><span>Identificación:</span>
                                            <input type="text" id="txtCedula" placeholder="Enter para buscar" class="form-control" style="height:90%" />
                                        </div>

                                         <div class="col-lg-12 col-lm-12">
                                            <div class="nombreusuario">                                           
                                                <label id="lbl_nombreusuario">NOMBRE USUARIO</label>
                                            </div>
                                        </div>


                                        <div class="col-lg-12 col-lm-12" style="text-align:center">
                                            <div class="panelusuario">
                                                <span>RED SUMATE:</span>
                                                <label id="lbl_redsumate" class="lblusuario"></label>
                                            </div>
                                        </div>

                                        
                                         <div class="col-lg-6 col-lm-6" style="text-align:center;margin-top:15px;color:white">
                                           <button id="btngenerarorden">Generar Orden</button>
                                        </div>

                                         <div class="col-lg-6 col-lm-6 " style="text-align:center;margin-top:15px;color:white">
                                           <button id="btnnuevaconsulta">Nueva Consulta</button>
                                        </div>

                                      
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6">
                                    <div class="profile-name">
                                      
                                         <div class="panelusuario">
                                            <span>Genero:</span>
                                            <label id="lbl_genero" class="lblusuario"></label>
                                        </div>

                                         <div class="panelusuario">
                                            <span>Fecha de Nacimiento:</span>
                                            <label id="lbl_fechanacimiento" class="lblusuario"></label>
                                        </div>

                                        <div class="panelusuario">
                                            <span>Dirección:</span>
                                            <label id="lbl_direccion" class="lblusuario"></label>
                                        </div>

                                        <div class="panelusuario">
                                            <span>Contacto:</span>
                                            <label id="lbl_contacto" class="lblusuario"></label>
                                        </div>

                                         <div class="panelusuario">
                                            <span>Rango:</span>
                                            <label id="lbl_rango" class="lblusuario"></label>
                                        </div>

                                        <div class="panelusuario">
                                            <span>Tipo Afiliado:</span>
                                            <label id="lbl_tipoafiliado" class="lblusuario"></label>
                                        </div>
                                       
                                          <div class="panelusuario">
                                            <span>Estado:</span>
                                            <label id="lbl_estado" class="lblusuario"></label>
                                        </div>
                                       
                                          <div class="panelusuario">
                                            <span>EPS:</span>
                                            <label id="lbl_eps" class="lblusuario"></label>
                                        </div>

                                        
                                          <div class="panelusuario">
                                            <span>IPS:</span>
                                            <label id="lbl_ips" class="lblusuario"></label>
                                        </div>

                                        
                                          <div class="panelusuario">
                                            <span>Centro de Atención:</span>
                                            <label id="lbl_centroatencion" class="lblusuario"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-12 col-md-12">
                    <div class="panel panel-default toggle panelMove" id="panelgenerarorden" style="display:none">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 id="headerordentitle" class="panel-title">Datos de la Orden</h4>
                        </div>
                        <div class="panel-body">

                            <div class="row profile">

                                <div class="col-lg-12 col-lm-12">

                                    <div class="col-lg-2 col-lm-2">
                                        <i class="material-icons">vpn_key</i><span>Numero AT Ciklos:</span>
                                        <input type="number" id="txtnumat" class="form-control" style="height: 90%" />
                                    </div>

                                    <div class="col-lg-2 col-lm-2">                                         
                                        <i class="material-icons">dns</i><span>CUPS:</span><i class="material-icons" onclick="listarcups()" style="margin-left:3em;cursor:pointer">search</i>
                                        <input type="text" id="txtcups" class="form-control" style="height: 90%" />                                                                              
                                    </div>

                                    <div class="col-lg-5 col-lm-5">
                                        <i class="material-icons">description</i><span>CUPS Descripción:</span>
                                        <input type="text" id="txtcupsdetalle" class="form-control" style="height: 90%" />
                                    </div>

                                    <div class="col-lg-3 col-lm-3">
                                        <i class="material-icons">domain</i><span>Proveedor:</span>
                                        <select id="ddlProveedororden" class="form-control" style="height: 90%"></select>
                                    </div>

                                </div>

                                <div class="col-lg-12 col-lm-12" style="padding-top:10px">

                                    <div class="col-lg-2 col-lm-2">
                                        <i class="material-icons">local_hospital</i><span>Diagnóstico:</span>
                                        <input type="text" id="txtdiagnostico" placeholder="Enter para buscar" class="form-control" style="height: 90%" />
                                    </div>

                                    <div class="col-lg-4 col-lm-4">
                                        <i class="material-icons">description</i><span>Diagnóstico Descripción:</span>
                                        <input type="text" id="txtdiagdetalle" class="form-control" style="height: 90%" />
                                    </div>

                                     <div class="col-lg-3 col-lm-3">
                                        <i class="material-icons">wc</i><span>Profesional Solicita:</span>
                                        <input type="text" id="txtprofesionalorden" class="form-control" style="height: 90%" />
                                    </div>

                                     <div class="col-lg-3 col-lm-3">
                                        <i class="material-icons">textsms</i><span>Observaciones Generales:</span>
                                        <input type="text" id="txtobservaorden" class="form-control" style="height: 90%" />
                                    </div>

                                </div>
                                

                                <div class="col-lg-12 col-lm-12" style="text-align: center; margin-top: 15px; color: white">
                                    <button id="btnguardarorden">Guardar</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div class="container">
                    <!-- Modal para ingresar al detalle -->
                    <div class="modal fade" id="ModalCUPS" role="dialog">
                        <div class="modal-dialog">
                            <!-- Modal content-->
                            <div class="modal-content" style="padding:0 1em;background-image:none">
                                <div class="modal-header" style="padding-bottom:0">
                                    <h4 id="myModaltittleCUPS">Buscar CUPS - Descripción</h4>
                                    <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body" style="padding-top:0">

                                    <div class="col-lg-10 col-lm-10">
                                        <i class="material-icons">textsms</i><span>CUPS Descripción:</span>
                                        <input type="text" id="txtdescrbuscarcups" placeholder="Ingresa el detalle del procedimiento" class="form-control" style="height: 90%" />
                                    </div>

                                    <div class="col-lg-2 col-lm-2" style="text-align: center; margin-top: 2em; color: white">
                                        <button id="btnbuscarcupsdesc">Buscar</button>
                                    </div>
                                    

                                    <div class="col-lg-12 col-lm-12" style="padding-top:1em;padding-bottom:1em">
                                        <div class="card-content table-responsive" style="overflow-x: auto; max-height: 400px">
                                            <table class="table table-responsive s12" id="tablaCUPSdesc">
                                                <thead>
                                                    <tr>
                                                        <th>CUPS
                                                        </th>
                                                        <th>Descripción
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody id="bodytablaCUPSdesc"></tbody>
                                            </table>
                                        </div>
                                    </div>



                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success" data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span>Cerrar</button>                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>

        <div class="page" id="page-CUPSProveedoresProm" style="display: none">
           <div class="col-lg-12 col-md-12 helpicon">
                <img src="images/icons8-Idea-40.png" onclick="showNotification('top','right','<b>Responsables</b><p>- Se debe seleccionar el proveedor y el cups para realizar las asignaciones.</p><p>- Algunos cups están duplicados pero tienen descripciones diferentes y solo se asignara en función del cups.</p><p>- Solo es posible asignar un cups una única vez a un proveedor sin importar que sus descripciones sean diferentes.</p>')" style="width: 30px; height: 30px" />
            </div>
            <header class="bp-header cf">
               

                <div class="col-md-10" style="padding-left:0">
                    <h1 class="bp-header__title">Asignación Cups - Promedan</h1>
                    <p>Asigne por cada proveedor Promedan (sede o dependencia), los servicios que prestara cada uno de ellos en base al CUPS.</p>
                </div>

                <div class="col-md-2" style="text-align: end;padding-right:0;padding-top:30px">
                     <button id="btnListaCupsProme">Listar</button>
                </div>

            </header>
            <div class="container" style="width:90%">
              <div class="scroll_header_fixed">
                <div class="card" style="margin: 0">
                    <div class="col-lg-12 col-md-12" data-background-color="bluee" style="padding: 15px; border-radius: 3px">

                        <div class="col-md-2">
                            <label class="s16 color-white">Proveedor:</label>
                            <select id="ddlPProveedorProm" class="form-control color-blue" style="width: 100%"></select>
                        </div>

                        <div class="col-md-4">
                            <label class="s16 color-white">Cups:</label>
                            <select id="ddlProveedoresXCupsProm" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                        </div>

                        <div class="col-md-2">
                            <label>FILTRAR:</label>
                            <input type="text" class="myinput1" id="txtfiltroProveeProm" placeholder="Proveedor" onkeyup="FiltrarTablaProveedor1('txtfiltroProveeProm','tablaProveedoresXCupsPromedan','0')">
                        </div>

                        <div class="col-md-2">
                            <label>FILTRAR:</label>
                            <input type="text" class="myinput1" id="txtfiltroPrDessProm" placeholder="Descripción" onkeyup="FiltrarTablaProveedor1('txtfiltroPrDessProm','tablaProveedoresXCupsPromedan','2')">
                        </div>
                        
                        <div class="col-md-2" style="text-align: end; padding-top: 25px">
                            <button id="btnAddPromeCups">Adicionar</button>
                        </div>

                    </div>
                </div>
               
                    <div class="col-lg-12 col-md-12">
                        <div class="card-content table-responsive">
                            <table id="tablaProveedoresXCupsPromedan" <%--style="visibility:hidden"--%> class="table table-hover table-action">
                                <thead>
                                    <tr>
                                        <th>Proveedor</th>
                                        <th>Cups</th>
                                        <th>Descripción</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody id="bodytablaProveedoresXCupsPromedan"></tbody>
                            </table>
                        </div>
                    </div>
               

              </div>

            </div>
        </div>

        <div class="page" id="page-Guias" style="display: none">
           <%--<div class="col-lg-12 col-md-12 helpicon">
                <img src="images/icons8-Idea-40.png" onclick="showNotification('top','right','<b>Responsables</b><p>- Se debe seleccionar el proveedor y el cups para realizar las asignaciones.</p><p>- Algunos cups están duplicados pero tienen descripciones diferentes y solo se asignara en función del cups.</p><p>- Solo es posible asignar un cups una única vez a un proveedor sin importar que sus descripciones sean diferentes.</p>')" style="width: 30px; height: 30px" />
            </div>--%>
            <header class="bp-header cf">
                <h1 class="bp-header__title">Guias de Apoyo</h1>
                <p>Utilice este material como base para realizar una buena optimización en función de los lineamientos definidos por cada procedimiento.</p>
              
            </header>
            <div class="container" style="width:90%">
              <div class="scroll_header_fixed">
                <div class="card" style="margin: 0">
                    <div class="col-lg-12 col-md-12" data-background-color="bluee" style="padding: 15px; border-radius: 3px">

                      

                    </div>
                </div>
               
                   
               

              </div>

            </div>
        </div>

        <div class="page" id="page-CUPS" style="display: none">
            <header class="bp-header cf">
                <h1 class="bp-header__title">Administrar CUPS</h1>
                <p>Sistema para administración y control de los CUPS que usa el programa en general y su parametrización.</p>
            </header>
            <div>
                <div class="card" style="margin: 0">
                    <div class="col-lg-12 col-md-12" data-background-color="bluee" style="padding: 15px; border-radius: 3px">


                        <div class="col-md-10">
                            <label class="s16 color-white">Cups:</label>
                            <select id="ddlCupsout" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                        </div>


                        <div class="col-md-2" style="text-align: end; padding-top: 25px">
                            <button id="btnAddcups">Seleccionar</button>
                        </div>

                    </div>
                </div>
                <div class="scroll_header_fixed">
                    <div class="col-lg-12 col-md-12">
                        <div class="card-content table-responsive">
                            <table id="tablaCUPS" <%--style="visibility:hidden"--%> class="table table-hover table-action">
                                <thead>
                                    <tr>
                                        <th>Descripción </th>
                                        <th>Cups</th>
                                        <th>Nueva Descripción</th>
                                        <th>Especialidad</th>
                                        <th>Valor</th>
                                        <th>Per o NC</th>
                                        <th>Acción </th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       
    </div>

    <!-- /pages-stack -->
    <button class="menu-button" id="btnMenu" style="display: none"><span>Menu</span></button>

    <%-- <script src="js/jquery-2.1.1.min.js"></script>--%>
<%--    <script src="js/select2.js"></script>--%>

    <script src="js/moment.js"></script>
    <script src="js/select2.full.js"></script>
    <script src="js/bootstrap-datetimepicker.min.js"></script>
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
