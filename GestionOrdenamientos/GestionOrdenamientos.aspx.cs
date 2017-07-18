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
        public string ActualizarOrdenes(string tipoidoptimizador,string optimizador, string idconsecutivo, string proveedorasignado, string observaciones)
        {
            var dt = objRetornarDatos.llenarDataSet("spOrdenamientos_gestionarOrdenes" + "'" + tipoidoptimizador + "','" + optimizador + "','" + idconsecutivo + "','" + proveedorasignado + "','" + observaciones + "'");
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
        public static string actualizarOrdenes(string tipoidoptimizador, string optimizador, string idconsecutivo, string proveedorasignado, string observaciones)
        {
            GestionOrdenamientos objUsuario = new GestionOrdenamientos();
            return objUsuario.ActualizarOrdenes(tipoidoptimizador,optimizador, idconsecutivo, proveedorasignado, observaciones);
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
        public string GuardarOrdenesEstadoProveedor(string proveedor, string idorden, string orden,string adjunto)
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



    }
}