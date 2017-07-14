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
using System.Data.SqlClient;
using System.Data.OleDb;

namespace GestionOrdenamientos
{
    public partial class GestionOrdenamientos : System.Web.UI.Page
    {
        AccesoDatos objRetornarDatos = new AccesoDatos();       
        
        public string validarUsuario(string UsuarioSistema, string Clave)
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
        public static string InicioSesion(string UsuarioSistema, string Clave)
        {
            try
            {
                GestionOrdenamientos objLogin = new GestionOrdenamientos();
                return objLogin.validarUsuario(UsuarioSistema, Clave);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //Obtiene las ordenes asignadas por usuario
        public string consultarOrdenesxFecha(string Optimizador)
        {
            try
            {

                var dtUsuario = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_ObtenerRepresaxFecha" + "'" + Optimizador + "'");
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
        public static string ConsultarOrdenesxFecha(string Optimizador)
        {
            try
            {
                GestionOrdenamientos objLogin = new GestionOrdenamientos();
                return objLogin.consultarOrdenesxFecha(Optimizador);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string ProcesarArchivo(string Archivo)
        {

            string SaveLocation = Server.MapPath(@"~\Documentos") + "\\" + Archivo;
            DataSet dsImportar = new DataSet();
            string Sql = @"Select * From [" + Archivo + "$]";
            OleDbConnection cnn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source= " + SaveLocation + "; Extended Properties=Excel 8.0");
            OleDbDataAdapter da = new OleDbDataAdapter(Sql, cnn);
            cnn.Open();
            da.Fill(dsImportar);            
            if (dsImportar.Tables.Count > 0)
            {
                using (SqlBulkCopy bulkcopy = new SqlBulkCopy(objRetornarDatos.retonarStringConexion()))
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
                GestionOrdenamientos objOrdenes = new GestionOrdenamientos();
                return objOrdenes.ProcesarArchivo(Archivo);
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



    }
}