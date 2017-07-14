<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GestionOrdenamientos.aspx.cs" Inherits="GestionOrdenamientos.GestionOrdenamientos" %>

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

</head>

<body>
	<div class="logo_alp">
		<img src="images/LogoNuevo.png" alt="Promedan">

	</div>

    
	<div class="usuario_name">
		<h4 class="link">¡Bienvenido!</h4>
		<span id="lblUsuario" class="nombre_usuario"></span>
		<span id="cargo" class="cargo_lab"></span>
        <span id="Csambiar contraseña" class="cargo_lab"></span>
         <input type="button" id="btnSalir"  class="btn btn-danger" value="Salir" />
		
	</div>
        
	<!-- navigation -->
	<nav class="pages-nav">
     <%--   <div class="pages-nav__item bg-primary" id="Parametrizacion" style="display:none"><a class="link link--page" href="#page-parametrizacion"><span class="icon-graph-8"></span>Parametrización</a></div>
        <div class="pages-nav__item bg-primary" id="ParametrizacionJefe" style="display:none"><a id="pgParametrizacionVisualizacion" class="link link--page" href="#parametrizacion_jefe"><span class="icon-settings-1"></span>Administrar Usuarios</a></div>
     --%>   <div class="pages-nav__item"><a id="pgEvaluarAutoevaluacion" class="link link--page" href="#page-ImportarArchivo"><span class="icon-upload"></span>Importar Archivo</a></div>
		<div class="pages-nav__item"><a id="pgEvaluarIndividual" class="link link--page" href="#page-AsignarAT4"><span class="icon-check"></span>Asignar AT4 </a></div>
        <div class="pages-nav__item"><a id="pgEvaluarGrupal" class="link link--page" href="#page-Proveedores"><span class="icon-record "></span>Proveedores</a></div>
        <div class="pages-nav__item" id="Resultado1"><a id="btnGrafico"  class="link link--page" href="#page-Resultado1"><span class="icon-stats"></span>Reportes</a></div>
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
		<!-- page -->
		<div class="page" id="page-home">
			<!-- Header -->
			<header class="bp-header cf">		
				<p class="bp-header__present">Gestion Ordenamientos bienvenidos, <b>inicia sesión</b></p>
				<!--<nav class="bp-nav">
					<a class="bp-nav__item bp-icon bp-icon--prev" href="#" data-info="previous Blueprint"><span>Previous Blueprint</span></a>
					a class="bp-nav__item bp-icon bp-icon--next" href="" data-info="next Blueprint"><span>Next Blueprint</span></a
					<a class="bp-nav__item bp-icon bp-icon--drop" href="#" data-info="back to the Codrops article"><span>back to the Codrops article</span></a>
					<a class="bp-nav__item bp-icon bp-icon--archive" href="#" data-info="Blueprints archive"><span>Go to the archive</span></a>
				</nav>-->
			</header>
			<div class="mylogin_eval">
				<%--<img class="eval_360_logo" src="images/logoNuevo.png" alt="Promedan">--%>
                <br />
                <br /><br />
                <br /><br />
                <br />

				<div class="login">
						<div class="login-screen">

							<div class="login-form" id="login_alp">
								<div class="control-group">
								<input type="text" id="txtUsuario" class="login-field" value="123" placeholder="Usuario" >
								<label class="login-field-icon fui-user" for="login-name"></label>
								</div>
								<div class="control-group">
								<input type="password" id="txtContraseña" class="login-field" value="12345" placeholder="Contraseña">
								<label class="login-field-icon fui-lock" for="login-pass"></label>
								</div>
								<a id="btnLogin" class="btn btn-primary btn-large btn-block" href="#">Iniciar sesión</a>
                            <%--    <div class="accion_form_login">
                                    <a href="#" id="olvide_pass"><span class="icon-unlock"></span> ¿Olvidaste tu contraseña?</a>
                                </div>--%>
							</div>

						

						</div>
				</div>

			</div>
		</div>
		<!-- /page -->      
  <div class="page" id="page-ImportarArchivo">
	<header class="bp-header cf">
				<h1 class="bp-header__title">Importar Archivo</h1>
			
                <p>
					Importar archivo de ordenes generadas para los prestadores
				</p>
			</header>    
            
    <div class="container">
              
             <div class="col-lg-3 col-md-3">
                                    <label>Arrastre Archivo con las ordenes</label>
                                    <div id="mydropzone" action="/uploads" title="Importar" class="dropzone"></div>
                                <br />
                                </div>
         </div>
             </div>      
                       
      <div class="page" id="page-AsignarAT4">
			<header class="bp-header cf">
				<h1 class="bp-header__title">Asignar Orden Liberada</h1>			
                <p>
					Favor consultar la orden y asignarle el provedor correspondiente
				</p>
			</header>    
            
        <div class="container">
               <div class="scroll_header_fixed">                 
                            
                 <table id="tablaAsignar" class="table table-hover table-action">
                       <thead>
                        <tr>   
                             <th>Fecha Solicitud</th>
                             <th>Fecha Esperada</th>
                             <th>Estado Soli</th>
                             <th>Solicitante</th>
                             <th>Cups</th> 
                             <th>Descripción</th>                            
                             <th>Afiliado</th>        
                             <th>Optimizador</th>
                             <th>Asignar Proveedor</th>                             
                        </tr>
                    </thead>
                      <tbody></tbody>
                    </table>
             </div>
		          </div>
         </div>
             </div>       
        
        <div class="page" id="page-Proveedores">
			<header class="bp-header cf">
				<h1 class="bp-header__title">Proveedores</h1>			
                <p>
                    Favor confirmar las ordenes realizadas a los pacientes, e incluir soportes de ejecucion
				</p>
			</header>    
            
         <div class="container">
             <div class="col-lg-12 col-md-12">
                         <label class="s16 color-white">Confirmar Ordenes Proveedor</label>
                       
                    </div>  


              <%-- <div class="scroll_header_fixed">--%>
                   <div class="col-lg-12 col-md-12 form-horizontal">
                                           
         
                  <label class="s16 color-white">Seleccione Proveedor</label>
                 <select id="ddlProveedores" class="form-control color-blue per70"></select>
                       
                  <label class="s16 color-white">Ingrese Contraseña</label>
                    <input type="password"  placeholder="Ingrese su Contraseña" class="form-control per70  "/>
         
                        <br />
                       <button id="btnProveedor" class="btn btn-success per70" value="Consultar Ordenes">Consultar Ordenes</button>
                    </div>
		          <%--</div>--%>

             <div class="col-lg-12 col-md-12">
                 
                 <table id="tablaProveedores" class="table table-hover table-action">
                       <thead>
                        <tr>   
                            <th>Cups</th> 
                            <th>Descripcion</th>  
                            <th>Proveedor</th>    
                            <th>Accion</th>                                                     
                            
                        </tr>
                    </thead>
                      <tbody></tbody>
                    </table>
             </div>

         </div>
             </div>      

           <div class="page" id="page-Resultado1">
           <input type="hidden" id="IdUsuario" value="0"/>
			<header class="bp-header cf">
				<h1 class="bp-header__title">Resultados – Líder Clave</h1>
                <p>A continuación, encontraras tus resultados.<br />
                    No olvides que la retroalimentación es un regalo y es la clave del éxito está en que construyas y ejecutes tu plan de desarrollo tomando en cuenta esta información.
                </p>
			</header>   
                
            <div class="container">
                  <div class="scroll_header_fixed">
                    <div class="col-lg-12 col-md-12">
                    </div>           
                    <div class="col-lg-12 col-md-12">
                        <div id="tablaReporte">
                        </div>
                    </div>
		          </div>
            </div>

            <div class="share">
                <p class="tile_hover_btn">Compartir Resultados</p>
                <div class="modal_share_container">
                    <div class="box_down_pdf">
                        <h3>Descargar PDF</h3>
                        <a href="#" id="btnGetPDF" class="btn_down_circle">
                            <img src="images/pdf_icon_download_color.png" class="circle_btn" alt="PDF" />
                        </a>
                    </div>
                    <div class="box_share_result">
                        <div class="share_place_type">
                            <img src="images/icon_mail_color_compartir.png" alt="E-mail" />
                            <h3>Compartir Resultados</h3>
                            <input type="email" name="name" id="email_resultados" value="" placeholder="E-mail" />
                            <a href="#" id="btnEnviarResultados" class="btn_submit_share">Enviar</a>
                        </div>
                        <div class="share_sendsi_type none_this">
                            <img src="images/icon_ready_send.png" alt="Listo" />
                            <h3>Los resultados fueron<br>enviados con éxito.</h3>
                            <a href="javascript:newEnviarResultados()" class="btn_submit_share">Enviar otro</a>
                        </div>
                    </div>
                </div>
            </div>
       </div>
      
	 
    </div>
	
	<!-- /pages-stack -->
	<button class="menu-button" id="btnMenu" style="display:none"><span>Menu</span></button>
   
   <%-- <script src="js/jquery-2.1.1.min.js"></script>--%>
   <script src="js/select2.js"></script>
	<script src="js/classie.js"></script>
	<script src="js/main.js"></script>    
    <script src="js/sweet-alert.js"></script>
    <script src="js/progressbar.js"></script>
    <script src="js/highcharts.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/jspdf.min.js"></script>
    <script src="js/dropzone.js"></script>
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
</body>

</html>
