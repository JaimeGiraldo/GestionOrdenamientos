using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace GestionOrdenamientos
{
    /// <summary>
    /// Descripción breve de ImportarArchivo
    /// </summary>
    public class ImportarArchivo : IHttpHandler
    {

        string carpeta = "~/Documentos/";

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            string dirFullPath = HttpContext.Current.Server.MapPath(carpeta);
            string[] files;
            int numFiles;
            files = System.IO.Directory.GetFiles(dirFullPath);
            numFiles = files.Length;
            numFiles = numFiles + 1;

            string pathToSave_100 = string.Empty;
            string fileName = string.Empty;
            string fileExtension = string.Empty;

            foreach (string s in context.Request.Files)
            {
                HttpPostedFile file = context.Request.Files[s];
                fileName = file.FileName;
                fileExtension = file.ContentType;

                if (!string.IsNullOrEmpty(fileName))
                {
                    try
                    {
                        fileExtension = Path.GetExtension(fileName);
                        pathToSave_100 = HttpContext.Current.Server.MapPath(carpeta) + fileName;
                        file.SaveAs(pathToSave_100);
                    }
                    catch (Exception ex)
                    {
                        context.Response.Write("error");
                    }

                  
                }
            }

            context.Response.Write(fileName);
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