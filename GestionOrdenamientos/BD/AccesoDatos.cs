using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.ApplicationBlocks.Data;

namespace GestionOrdenamientos.BD
{
    public class AccesoDatos
    {

        private string cnxSqlServer;
        DataTable dtDatos = new DataTable();

        public string retonarStringConexion()
        {
            cnxSqlServer = System.Configuration.ConfigurationManager.ConnectionStrings["CnxSqlServer"].ConnectionString;
            return cnxSqlServer;
        }

        /// <summary>
        /// Permite Ejecutar un Sp y retornar un dt
        /// </summary>
        /// <param name="sp">Procedimiento Almacenado</param>
        /// <returns></returns>
        public DataSet llenarDataSet(string sp)
        {
            try
            {
                return SqlHelper.ExecuteDataset(retonarStringConexion(), System.Data.CommandType.Text, sp);
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }

       




        /// <summary>
        /// Permite ejecutar una procedimiento almacenado y devolver un true o false segun se cumpla
        /// </summary>
        /// <param name="sp">Procedimiento Almacenado</param>
        /// <returns></returns>
        public bool ejecutarSentencia(string sp)
        {
            try
            {
                SqlHelper.ExecuteNonQuery(retonarStringConexion(), System.Data.CommandType.Text, sp);
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }
}