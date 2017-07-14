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

namespace GestionOrdenamientos
{
    public partial class GestionOrdenamientos : System.Web.UI.Page
    {
        AccesoDatos objRetornarDatos = new AccesoDatos();
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        
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


        //Actualiza los datos de usuario
        public string ActualizarOrdenes(string optimizador, string idconsecutivo, string proveedorasignado, string observaciones)
        {
            var dt = objRetornarDatos.llenarDataSet("spOrdenamientos_gestionarOrdenes" + "'" + optimizador + "','" + idconsecutivo + "','" + proveedorasignado + "','" + observaciones + "'");
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
        public static string actualizarOrdenes(string optimizador, string idconsecutivo, string proveedorasignado, string observaciones)
        {
            GestionOrdenamientos objUsuario = new GestionOrdenamientos();
            return objUsuario.ActualizarOrdenes(optimizador, idconsecutivo, proveedorasignado, observaciones);
        }



        public string ObtenerPreguntas()
        {
            try
            {
                var dt = objRetornarDatos.llenarDataSet("spObtenerPreguntas");

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
        public static string obtenerPreguntas()
        {
            try
            {
                GestionOrdenamientos objOrdenes = new GestionOrdenamientos();
                return objOrdenes.ObtenerPreguntas();
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