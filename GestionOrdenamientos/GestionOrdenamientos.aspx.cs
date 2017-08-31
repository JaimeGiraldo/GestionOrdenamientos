using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Newtonsoft;
using Newtonsoft.Json;
using System.Net.Mail;
using GestionOrdenamientos.BD;
using System.IO;
using System.Data.OleDb;
using System.Data.SqlClient;

namespace GestionOrdenamientos
{
    public partial class GestionOrdenamientos : System.Web.UI.Page
    {
        AccesoDatos objRetornarDatos = new AccesoDatos();
        String archivo;

        protected void Page_Load(object sender, EventArgs e)
        {

        }        

        //control de usuarios e inicio de sesion
        public string ValidarUsuario(string UsuarioSistema, string Clave)
        {
            try
            {
                var dtUsuario = objRetornarDatos.llenarDataSet("spValidarUsuarioSistema" + "'" + UsuarioSistema + "','" + Clave + "'");
                if (dtUsuario.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtUsuario);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string validarUsuario(string UsuarioSistema, string Clave)
        {
            try
            {
                GestionOrdenamientos objLogin = new GestionOrdenamientos();
                return objLogin.ValidarUsuario(UsuarioSistema, Clave);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        //Obtiene las ordenes asignadas por optimizador a partir del usuario logueado
        public string ConsultarOrdenesxOptimizador(string tipoidoptimizador,string idoptimizador)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_ObtenerRepresaxFecha" + "'" + tipoidoptimizador + "','" + idoptimizador + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string consultarOrdenesxOptimizador(string tipoidoptimizador, string idoptimizador)
        {
            try
            {
                GestionOrdenamientos objOrdenesOptimizador = new GestionOrdenamientos();
                return objOrdenesOptimizador.ConsultarOrdenesxOptimizador(tipoidoptimizador, idoptimizador);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
                       
        //Actualiza los datos de las ordenes optimizadas por el usuario tipo 1 (optmizador)
        public string ActualizarOrdenes(string tipoidoptimizador,string optimizador, string idconsecutivo, string proveedorasignado, string observacionesaudit,string observacionesagen, string at4, string cie10,string adecuado,string profesional,string sedepromedan,string noAt4motivo,string motivonadecuado)
        {
            var dt = objRetornarDatos.llenarDataSet("spOrdenamientos_gestionarOrdenes" + "'" + tipoidoptimizador + "','" + optimizador + "','" + idconsecutivo + "','" + proveedorasignado + "','" + observacionesaudit + "','" + observacionesagen + "','" + at4 + "','" + cie10 + "','" + adecuado + "','" + profesional + "','" + sedepromedan + "','" + noAt4motivo + "','" + motivonadecuado + "'");
            if (dt.Tables.Count > 0)
            {
                return JsonConvert.SerializeObject(dt);
            }
            else
            {
                return string.Empty;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string actualizarOrdenes(string tipoidoptimizador, string optimizador, string idconsecutivo, string proveedorasignado, string observacionesaudit,string observacionesagen, string at4, string cie10, string adecuado, string profesional,string sedepromedan,string noAt4motivo,string motivonadecuado)
        {
            GestionOrdenamientos objUsuario = new GestionOrdenamientos();
            return objUsuario.ActualizarOrdenes(tipoidoptimizador,optimizador, idconsecutivo, proveedorasignado, observacionesaudit, observacionesagen, at4, cie10, adecuado, profesional, sedepromedan, noAt4motivo, motivonadecuado);
        }
        
        //Obtiene las ordenes por proveedor ya optimizadas para el usuario tipo 2 (proveedor)
        public string ConsultarOrdenesxProveedor(string proveedor,string estado,string idtipoid,string identificacion,string fechainicial,string fechafinal)
        {
            try
            {

                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_ObtenerOrdenesXProveedor" + "'" + proveedor + "','" + estado + "','" + idtipoid + "','" + identificacion + "','" + fechainicial + "','" + fechafinal + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string consultarOrdenesxProveedor(string proveedor, string estado, string idtipoid,string identificacion, string fechainicial, string fechafinal)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.ConsultarOrdenesxProveedor(proveedor, estado, idtipoid, identificacion, fechainicial,fechafinal);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //Obtiene las ordenes por proveedor ya optimizadas para el usuario tipo 2 (proveedor)
        public string ConsultarOrdenesxProveedor2(string proveedor, string estado, string idtipoid, string identificacion, string fechainicial, string fechafinal)
        {
            try
            {

                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_ObtenerOrdenesXProveedor_2" + "'" + proveedor + "','" + estado + "','" + idtipoid + "','" + identificacion + "','" + fechainicial + "','" + fechafinal + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string consultarOrdenesxProveedor2(string proveedor, string estado, string idtipoid, string identificacion, string fechainicial, string fechafinal)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.ConsultarOrdenesxProveedor2(proveedor, estado, idtipoid, identificacion, fechainicial, fechafinal);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Obtiene las ordenes por proveedor ya optimizadas para el usuario tipo 2 (proveedor)
        public string ConsultarOrdenesxProveedor3(string proveedor, string estado, string idtipoid, string identificacion, string numorden)
        {
            try
            {

                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_ObtenerOrdenesXProveedor3" + "'" + proveedor + "','" + estado + "','" + idtipoid + "','" + identificacion + "','" + numorden + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string consultarOrdenesxProveedor3(string proveedor, string estado, string idtipoid, string identificacion, string numorden)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.ConsultarOrdenesxProveedor3(proveedor, estado, idtipoid, identificacion, numorden);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //Guarda el responsable asignado
        public string GuardarAsignacionResponsable(string IdTipoId, string Identificacion, string Cups,string descripcion)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_insertarAsignacionResponsable" + "'" + IdTipoId + "','" + Identificacion + "','" + Cups + "','" + descripcion + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string guardarAsignacionResponsable(string IdTipoId, string Identificacion, string Cups, string descripcion)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.GuardarAsignacionResponsable(IdTipoId, Identificacion, Cups, descripcion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        //Elimina el responsable asignado
        public string EliminarAsignacionResponsable(string idasignacion)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_EliminarAsignacionResponsable" + "'" + idasignacion + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string eliminarAsignacionResponsable(string idasignacion)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.EliminarAsignacionResponsable(idasignacion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Elimina el Proveedor asignado
        public string EliminarAsignacionProveedoresCups(string idasignacion)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_EliminarAsignacionProveedoresXCups" + "'" + idasignacion + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string eliminarAsignacionProveedoresCups(string idasignacion)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.EliminarAsignacionProveedoresCups(idasignacion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Guarda el proveedor asignado
        public string GuardarAsignacionProveedoresCups(string Pproveedor, string cups, string descripcion)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_insertarAsignacionProveedoresXCups" + "'" + Pproveedor + "','" + cups + "','" + descripcion + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string guardarAsignacionProveedoresCups(string Pproveedor, string cups, string descripcion)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.GuardarAsignacionProveedoresCups(Pproveedor, cups, descripcion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Busca los diagnostico
        public string BuscarDiagnostico(string diagnostico)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_ObtenerDiagnosticos" + "'" + diagnostico + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string buscarDiagnostico(string diagnostico)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.BuscarDiagnostico(diagnostico);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //Distribuye las ordenes
        public string ActualizarDistribuir_Ordenes(string IdtipoOpt,string IdOpt)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_asignarCUPSResposables" + "'" + IdtipoOpt + "','" + IdOpt + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string actualizarDistribuir_Ordenes(string IdtipoOpt,string IdOpt)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.ActualizarDistribuir_Ordenes(IdtipoOpt, IdOpt);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //Acttualiza los cups
        public string ActualizarCups(string DescripcionCUPS, string CUPS,string nuevadescripcion,string especialidad,string valorcups,string per)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionordenamientos_GuardarCUPSSinAsignar" + "'" + DescripcionCUPS + "','" + CUPS + "','" + nuevadescripcion + "','" + especialidad + "','" + valorcups + "','" + per + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string actualizarCups(string DescripcionCUPS, string CUPS,string nuevadescripcion,string especialidad,string valorcups,string per)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.ActualizarCups(DescripcionCUPS, CUPS, nuevadescripcion, especialidad, valorcups, per);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //Validar Orden
        public string ValidarOrden(string Id)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_ValidarOrden" + "'" + Id + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string validarOrden(string Id)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.ValidarOrden(Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Guardar Orden Repetida
        public string GuardarOrdenrepetida(string Id)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_GuardarOrdenrepetida" + "'" + Id + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string guardarOrdenrepetida(string Id)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.GuardarOrdenrepetida(Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Enviar Email cuando la orden es no adecuada
        public string EnviarEmail(string posicion)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_EnviarEmailNoAdecuadas" + "'" + posicion + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string enviarEmail(string posicion)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.EnviarEmail(posicion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //carga los datos de los combos
        public string CargarDatos(string sp)
        {
            try
            {
                var dt = objRetornarDatos.llenarDataSet(sp);

                if (dt.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dt);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string cargarDatos(string sp)
        {
            try
            {
                GestionOrdenamientos objCombos = new GestionOrdenamientos();
                return objCombos.CargarDatos(sp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //procesa el archivo excel adjunto
        public string  ProcesarArchivo(string Archivo)
        {
            string SaveLocation = Server.MapPath(@"~\Documentos") + "\\" + Archivo;
            DataSet dsImportar = new DataSet();
            string Sql = @"Select * From [Hoja1$]";
            OleDbConnection cnn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source= " + SaveLocation + "; Extended Properties=Excel 8.0");
            OleDbDataAdapter da = new OleDbDataAdapter(Sql, cnn);
            cnn.Open();
            da.Fill(dsImportar);
            if (dsImportar.Tables.Count > 0)
            {
                using (SqlBulkCopy bulkcopy = new SqlBulkCopy(objRetornarDatos.retonarStringConexion(),SqlBulkCopyOptions.KeepIdentity & SqlBulkCopyOptions.KeepNulls))
                {
                    bulkcopy.DestinationTableName = "A_estructura_carge_represa_Ciklos";
                    bulkcopy.WriteToServer(dsImportar.Tables[0]);
                    bulkcopy.Close();
                }
            }
            return "OK";
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string procesarArchivo(string Archivo)
        {
            try
            {
                GestionOrdenamientos objProcesar = new GestionOrdenamientos();
                return objProcesar.ProcesarArchivo(Archivo);
            }
            catch (Exception ex)
            {
                throw ex;
                //return "KO";
            }
        }


        //Hace la gestion del proveedor para contactar al usuario y programar el servicio o atencion
        public string ContactoProveedor(string idorden, string contactousuario, string fechaasigncion, string observacionescontacto, string profesional,string usuario,string sedeasignada)
        {
            try
            {

                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_ContactoUsuarioProveedor" + "'" + idorden + "','" + contactousuario + "','" + fechaasigncion + "','" + observacionescontacto + "','" + profesional + "','" + usuario + "','" + sedeasignada + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string contactoProveedor(string idorden, string contactousuario, string fechaasigncion, string observacionescontacto, string profesional,string usuario,string sedeasignada)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.ContactoProveedor(idorden, contactousuario, fechaasigncion, observacionescontacto, profesional, usuario, sedeasignada);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Guarda el estado de las ordenes cuando el paciente contactado asiste al servicio
        public string GuardarGestionProveedor2(string idorden, string asistiousuario, string observaciones, string adjunto, string usuario)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_AsistenciaProveedor" + "'" + idorden + "','" + asistiousuario + "','" + observaciones + "','" + adjunto + "','" + usuario + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string guardarGestionProveedor2(string idorden, string asistiousuario, string observaciones, string adjunto,string usuario)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.GuardarGestionProveedor2(idorden, asistiousuario, observaciones, adjunto, usuario);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Guarda el estado de las ordenes ya gestionadas por el proveedor depues de la asitencia del usuario (Ejecucion Final)
        public string GuardarGestionProveedor3(string idorden, string observaciones, string adjunto,string usuario)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_EjecucionProveedor" + "'" + idorden + "','" + observaciones + "','" + adjunto + "','" + usuario + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string guardarGestionProveedor3(string idorden, string observaciones, string adjunto,string usuario)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.GuardarGestionProveedor3(idorden, observaciones, adjunto, usuario);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Obtiene el dashboard de proveedores por proveedor
        public string DashboardProveedor(string proveedor)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_ObtenerDashboardProveedores" + "'" + proveedor + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string dashboardProveedor(string proveedor)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.DashboardProveedor(proveedor);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }





    }
}