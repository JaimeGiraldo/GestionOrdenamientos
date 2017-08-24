using AjaxControlToolkit;
using GestionOrdenamientos.BD;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace GestionOrdenamientos
{
    public partial class VisorReporting : System.Web.UI.Page
    {
        AccesoDatos oRetornarDatos = new AccesoDatos();

        clsLlenarCombos oCombos = new clsLlenarCombos();
        Reporte oReport = new Reporte();

        String tipoControl = string.Empty;
        List<Object> listaControles = new List<object>();

        #region Page_PreInit

        protected void Page_PreInit(object sender, EventArgs e)
        {
            string idMenu = string.Empty;

            //idMenu = "311";

            if (Request.QueryString["Id"] != null)
            {
                idMenu = Request.QueryString["Id"].ToString();
            }

            //DataSet dsMenu = oRetornarDatos.llenarDataSet("sp_menu_obtenerxid" + "'311'");

            DataSet dsMenu = oRetornarDatos.llenarDataSet("sp_menu_obtenerxid" + "'" + idMenu + "'");
            DataTable menu = dsMenu.Tables[0];
            DataTable parametros = dsMenu.Tables[1];
            string procedimiento = menu.Rows[0]["Procedimiento"].ToString();
            string nombreReporte = menu.Rows[0]["Reporte"].ToString();
            Session["dtParametros"] = parametros;
            int numeroParametros = parametros.Rows.Count;
            Session["sp"] = procedimiento;
            Session["nombreReporte"] = nombreReporte;
            PintarControles(parametros);
        }
        #endregion

        #region Pintar Controles

        public void PintarControles(DataTable dt)
        {
            //Lista para agregar los controles que se crean
            List<Object> listaControles = new List<object>();

            int contador = 0;


            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow fila = dt.Rows[i];

                contador = contador + 1;
                var placeHolder = Page.FindControl("PlaceHolder" + contador.ToString());

                Label lblSede = new Label();
                lblSede.Text = fila["Nombre"].ToString();
                lblSede.CssClass = "control-label";
                placeHolder.Controls.Add(lblSede);

                contador = contador + 1;
                var placeHolder2 = Page.FindControl("PlaceHolder" + contador.ToString());
                switch (fila["Tipo"].ToString())
                {

                    case "DropDownList":
                        DropDownList ddl = new DropDownList();
                        ddl.CssClass = "form-control";
                        placeHolder2.Controls.Add(ddl);
                        oCombos.llenarCombos(ddl, fila["ProcedimientoTipo"].ToString());
                        listaControles.Add(ddl);
                        break;

                    case "TextBox":
                        TextBox txt = new TextBox();
                        txt.CssClass = "form-control";
                        placeHolder2.Controls.Add(txt);
                        listaControles.Add(txt);
                        break;

                    case "CalendarExtender":
                        TextBox txtcalendar = new TextBox();
                        var id = "txtCalendar" + (i + 1).ToString();
                        txtcalendar.ID = id;
                        txtcalendar.CssClass = "form-control";
                        placeHolder2.Controls.Add(txtcalendar);
                        listaControles.Add(txtcalendar);

                        CalendarExtender calendar = new CalendarExtender();
                        calendar.TargetControlID = id;
                        calendar.Format = "yyyy-MM-dd";
                        calendar.TodaysDateFormat = "yyyy-mm-dd";
                        placeHolder2.Controls.Add(calendar);
                        break;

                    case "TextBoxNum":
                        TextBox txtnum = new TextBox();
                        txtnum.TextMode = TextBoxMode.Number;
                        txtnum.CssClass = "form-control";
                        placeHolder2.Controls.Add(txtnum);
                        listaControles.Add(txtnum);
                        break;
                }
            }

            Session["listaControles"] = listaControles;
        }
        #endregion

        #region Llenar Datos

        public void LlenarDatos()
        {
            try
            {

                string sp = Session["sp"].ToString();
                string nombreReporte = Session["nombreReporte"].ToString();

                //Lista de parametros para el reporte rdlc
                List<ReportParameter> parametrosReporte = new List<ReportParameter>();

                DataTable dtParametros = (DataTable)Session["dtParametros"];
                SqlParameter[] listaParametros = new SqlParameter[dtParametros.Rows.Count];

                //Recuperar la lista de controles
                List<Object> listaControles = Session["listaControles"] as List<object>;

                for (int i = 0; i < dtParametros.Rows.Count; i++)
                {
                    //Obtiene el nombre del parametro
                    string nombreParametro = dtParametros.Rows[i]["Parametro"].ToString();
                    string tipo = listaControles.ElementAt(i).GetType().ToString();

                    if (tipo.Equals("System.Web.UI.WebControls.DropDownList"))
                    {
                        DropDownList ddl = listaControles.ElementAt(i) as DropDownList;
                        SqlParameter p = new SqlParameter(nombreParametro, ddl.SelectedValue);
                        listaParametros[i] = p;

                        ReportParameter rp = new ReportParameter(nombreParametro.Replace("@", ""), ddl.SelectedValue);
                        parametrosReporte.Add(rp);
                    }
                    else if (tipo.Equals("System.Web.UI.WebControls.TextBox"))
                    {
                        TextBox txt = listaControles.ElementAt(i) as TextBox;
                        SqlParameter p = new SqlParameter(nombreParametro, txt.Text);
                        listaParametros[i] = p;

                        ReportParameter rp = new ReportParameter(nombreParametro.Replace("@", ""), txt.Text);
                        parametrosReporte.Add(rp);
                    }

                }


                List<ReportDataSource> lista = new List<ReportDataSource>();

                //se llena el dataset o datos a mostrar desde un procedimiento almacenado que recibe 2 parametros en este caso
                DataSet dsDatos = oRetornarDatos.llenarDataSet(sp, listaParametros);

                List<DataTable> listaTablas = new List<DataTable>();

                for (int i = 0; i < dsDatos.Tables.Count; i++)
                {
                    listaTablas.Add(dsDatos.Tables[i]);

                    ReportDataSource rs = new ReportDataSource();
                    rs.Name = "DataSet" + (i + 1).ToString();
                    rs.Value = dsDatos.Tables[i];
                    lista.Add(rs);
                }



                /*
                DataTable dt = dsDatos.Tables[0];

                ReportDataSource rdsData1 = new ReportDataSource();
                rdsData1.Name = "DataSet1";
                rdsData1.Value = dt;*/
                ReportViewer1.LocalReport.EnableExternalImages = true;
                oReport.FillReport(lista, parametrosReporte, ReportViewer1, nombreReporte);
            }
            catch (Exception oException)
            {

            }
        }
        #endregion

        #region Load

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
            }
        }
        #endregion


        protected void btnConsultar_Click(object sender, EventArgs e)
        {
            LlenarDatos();
        }

  
    }
}