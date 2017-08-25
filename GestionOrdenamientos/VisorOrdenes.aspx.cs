using GestionOrdenamientos.BD;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace GestionOrdenamientos
{
    public partial class VisorOrdenes : System.Web.UI.Page
    {
        AccesoDatos oRetornarDatos = new AccesoDatos();

        String tipoControl = string.Empty;
        List<Object> listaControles = new List<object>();
        Reporte oReport = new Reporte();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string idMenu = string.Empty;

                if (Request.QueryString["Id"] != null)
                {
                    idMenu = Request.QueryString["Id"].ToString();
                }

                DataSet dsMenu = oRetornarDatos.llenarDataSet("spGestionOrdenamientos_ObtenerReportesxid" + "'" + idMenu + "'");
                DataTable menu = dsMenu.Tables[0];
                DataTable parametros = dsMenu.Tables[1];
                string procedimiento = menu.Rows[0]["Procedimiento"].ToString();
                string nombreReporte = menu.Rows[0]["Reporte"].ToString();
                Session["dtParametros1"] = parametros;
                int numeroParametros = parametros.Rows.Count;
                Session["sp1"] = procedimiento;
                Session["nombreReporte1"] = nombreReporte;

                DataView dv = new DataView(parametros);
                dv.RowFilter = "Tipo = 'Interno'";
                DataTable dtInternos = dv.ToTable();

                DataView dv2 = new DataView(parametros);
                dv2.RowFilter = "Tipo <> 'Interno'";
                DataTable dtAfuera = dv2.ToTable();

                SqlParameter[] parametrosSql = new SqlParameter[parametros.Rows.Count];

                if (parametros.Rows.Count > 0)
                {
                    List<ReportParameter> listaParametros = new List<ReportParameter>();

                    if (dtInternos.Rows.Count > 0)
                    {
                        string nombreParametro = string.Empty;
                        string valorParametro = string.Empty;

                        for (int i = 0; i < dtInternos.Rows.Count; i++)
                        {
                            nombreParametro = parametros.Rows[0]["Parametro"].ToString();
                            nombreParametro = nombreParametro.Substring(1, nombreParametro.Length - 1);
                            valorParametro = Request.QueryString[nombreParametro].ToString();//aca obtiene el valor por url

                            if (Request.QueryString[nombreParametro] != null)
                            {
                                ReportParameter parametro = new ReportParameter(nombreParametro, valorParametro);
                                listaParametros.Add(parametro);
                            }

                            SqlParameter pSql = new SqlParameter(nombreParametro, valorParametro);
                            parametrosSql[i] = pSql;
                        }
                    }

                    if (dtAfuera.Rows.Count > 0)
                    {
                        // btnConsultar.Visible = true;
                        //PintarControles(parametros);
                    }
                    else
                    {
                        //btnConsultar.Visible = false;
                        LlenarDatos(listaParametros, parametrosSql);
                    }
                }
                else
                {
                    LlenarDatos(null, null);
                }
            }
        }


        #region Llenar Datos

        public void LlenarDatos(List<ReportParameter> parametrosReporte, SqlParameter[] listaParametros)
        {
            try
            {

                string sp = Session["sp1"].ToString();
                string nombreReporte = Session["nombreReporte1"].ToString();

                DataTable dtParametros = (DataTable)Session["dtParametros1"];
               
                for (int i = 0; i < dtParametros.Rows.Count; i++)
                {
                    //Obtiene el nombre del parametro
                    string nombreParametro = dtParametros.Rows[i]["Parametro"].ToString();      
                }

                //se llena el dataset o datos a mostrar desde un procedimiento almacenado que recibe 2 parametros en este caso
                DataSet dsDatos = oRetornarDatos.llenarDataSet(sp, listaParametros);

                List<DataTable> listaTablas = new List<DataTable>();
                List<ReportDataSource> lista = new List<ReportDataSource>();

                for (int i = 0; i < dsDatos.Tables.Count; i++)
                {
                    listaTablas.Add(dsDatos.Tables[i]);

                    ReportDataSource rs = new ReportDataSource();
                    rs.Name = "DataSet" + (i + 1).ToString();
                    rs.Value = dsDatos.Tables[i];
                    lista.Add(rs);
                }

                oReport.FillReport(lista, parametrosReporte, ReportViewer1, nombreReporte);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

   
        protected void ReportViewer_OnLoad(object sender, EventArgs e)
        {
            string exportOption = "EXCELOPENXML";
            string exportOption1 = "WORDOPENXML";
            //string exportOption = "PDF";
            RenderingExtension extension = ReportViewer1.LocalReport.ListRenderingExtensions().ToList().Find(x => x.Name.Equals(exportOption, StringComparison.CurrentCultureIgnoreCase));
            if (extension != null)
            {
                System.Reflection.FieldInfo fieldInfo = extension.GetType().GetField("m_isVisible", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);
                fieldInfo.SetValue(extension, false);
            }

            RenderingExtension extension1 = ReportViewer1.LocalReport.ListRenderingExtensions().ToList().Find(x => x.Name.Equals(exportOption1, StringComparison.CurrentCultureIgnoreCase));
            if (extension1 != null)
            {
                System.Reflection.FieldInfo fieldInfo = extension1.GetType().GetField("m_isVisible", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);
                fieldInfo.SetValue(extension1, false);
            }
        }

        #endregion
    }
}