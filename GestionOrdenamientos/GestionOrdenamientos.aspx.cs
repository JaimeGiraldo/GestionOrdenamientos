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
        public string ConsultarOrdenesxProveedor(string proveedor)
        {
            try
            {

                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_ObtenerOrdenesXProveedor" + "'" + proveedor + "'");
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
        public static string consultarOrdenesxProveedor(string proveedor)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.ConsultarOrdenesxProveedor(proveedor);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Guarda el estado de las ordenes gestionadas por el proveedor
        public string GuardarOrdenesEstadoProveedor(string proveedor, string idorden, string orden, string adjunto)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spOrdenamientos_gestionarOrdenes_Proveedor" + "'" + proveedor + "','" + idorden + "','" + orden + "','" + adjunto + "'");
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
        public static string guardarOrdenesEstadoProveedor(string proveedor, string idorden, string orden,string adjunto)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.GuardarOrdenesEstadoProveedor(proveedor, idorden, orden, adjunto);
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


        //Elimina el responsable asignado
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
        public string ActualizarCups(string DescripcionCUPS, string CUPS,string nuevadescripcion)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionordenamientos_GuardarCUPSSinAsignar" + "'" + DescripcionCUPS + "','" + CUPS + "','" + nuevadescripcion + "'");
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
        public static string actualizarCups(string DescripcionCUPS, string CUPS,string nuevadescripcion)
        {
            try
            {
                GestionOrdenamientos objOrdenesProveedor = new GestionOrdenamientos();
                return objOrdenesProveedor.ActualizarCups(DescripcionCUPS, CUPS, nuevadescripcion);
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
        
    }
}