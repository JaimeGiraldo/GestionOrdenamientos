using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI.WebControls;
using System.Data;

namespace GestionOrdenamientos.BD
{
    public class clsLlenarCombos
    {

        AccesoDatos objRetornarDatos = new AccesoDatos();

        public DropDownList llenarCombos(DropDownList combo, string sp)
        {
            try
            {
                DataSet dsCombo = new DataSet();
                dsCombo = objRetornarDatos.llenarDataSet(sp);
                combo.DataSource = dsCombo.Tables[0];
                combo.DataTextField = dsCombo.Tables[0].Columns[1].ToString();
                combo.DataValueField = dsCombo.Tables[0].Columns[0].ToString();
                combo.DataBind();

                return combo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DropDownList llenarCombos(DropDownList combo, DataTable dt)
        {
            try
            {
                combo.DataSource = dt;
                combo.DataTextField = dt.Columns[1].ToString();
                combo.DataValueField = dt.Columns[0].ToString();
                combo.DataBind();

                return combo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DropDownList llenarCombosMySql(DropDownList combo, string sp)
        {
            try
            {
                DataSet dsCombo = new DataSet();
                dsCombo = objRetornarDatos.llenarDataSet(sp);
                combo.DataSource = dsCombo.Tables[0];
                combo.DataTextField = dsCombo.Tables[0].Columns[1].ToString();
                combo.DataValueField = dsCombo.Tables[0].Columns[0].ToString();
                combo.DataBind();

                return combo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
