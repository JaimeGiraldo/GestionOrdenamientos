using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GestionOrdenamientos
{
    /// <summary>
    /// Descripción breve de ImportarArchivo
    /// </summary>
    public class ImportarArchivo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "texto/normal";
            context.Response.Write("Hola a todos");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}