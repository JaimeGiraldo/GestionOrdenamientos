using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace GestionOrdenamientos.BD
{
    public class Reporte
    {
        public void FillReport(List<ReportDataSource> listaReportes, List<ReportParameter> listaParametros, ReportViewer visor, string nombreReporte)
        {
            
            visor.LocalReport.DataSources.Clear();
            //visor.LocalReport.EnableExternalImages = true;
            visor.LocalReport.EnableHyperlinks=true;

            visor.LocalReport.ReportPath = "Reports\\" + nombreReporte;
            visor.LocalReport.SetParameters(listaParametros);
            

            foreach (var rpt in listaReportes)
            {
                
                visor.LocalReport.DataSources.Add(rpt);
            }

            visor.LocalReport.Refresh();
        }
            
    }
}