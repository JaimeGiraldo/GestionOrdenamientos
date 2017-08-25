<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="VisorReporting.aspx.cs" Inherits="GestionOrdenamientos.VisorReporting" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Optimización-Reportes</title>

    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/bootstrap.js"></script>
    <link href="css/visorreport.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">

    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>

        <div class="panel panel-default">
            <div class="panel-heading headvisor">
                <div class="panel-title">
                <h1 class="bp-header__title">Gestión de Reportes</h1>
                <p class="bp-body__title ">Favor ingresar los parámetros que requiere el informe y generar el reporte sobre el proceso de optimización en el formato deseado</p>
                </div>
            </div>
            <div class="panel-body panel-bodybackgroud">

                <div class="col-lg-12">
                      <p class="title_parameters">Parametros</p>
                </div>

                 <div class="col-lg-2 label_placeholder" >
                     <asp:PlaceHolder  ID="PlaceHolder1" runat="server"></asp:PlaceHolder>
                </div>

                <div class="col-lg-4 ">
                    <asp:PlaceHolder ID="PlaceHolder2" runat="server"></asp:PlaceHolder>
                </div>

                <div class="col-lg-2 label_placeholder">
                     <asp:PlaceHolder ID="PlaceHolder3" runat="server"></asp:PlaceHolder>
                </div>

                <div class="col-lg-4">
                    <asp:PlaceHolder ID="PlaceHolder4" runat="server"></asp:PlaceHolder>
                    <br />
                </div>

                <div class="col-lg-2 label_placeholder">
                     <asp:PlaceHolder ID="PlaceHolder5" runat="server"></asp:PlaceHolder>
                </div>

                <div class="col-lg-4">
                    <asp:PlaceHolder ID="PlaceHolder6" runat="server"></asp:PlaceHolder>
                </div>

                <div class="col-lg-2 label_placeholder">
                     <asp:PlaceHolder ID="PlaceHolder7" runat="server"></asp:PlaceHolder>
                </div>

                <div class="col-lg-4">
                    <asp:PlaceHolder ID="PlaceHolder8" runat="server"></asp:PlaceHolder>
                    <br />
                </div>

                <div class="col-lg-2 label_placeholder">
                     <asp:PlaceHolder ID="PlaceHolder9" runat="server"></asp:PlaceHolder>
                </div>

                <div class="col-lg-4">
                    <asp:PlaceHolder ID="PlaceHolder10" runat="server"></asp:PlaceHolder>
                </div>

                <div class="col-lg-2 label_placeholder">
                     <asp:PlaceHolder ID="PlaceHolder11" runat="server"></asp:PlaceHolder>
                </div>

                <div class="col-lg-4">
                    <asp:PlaceHolder ID="PlaceHolder12" runat="server"></asp:PlaceHolder>
                    <br />
                </div>

                <div class="col-lg-12" style="text-align:center">
                    <asp:Button CssClass="mybutton" ID="btnConsultar" Text="Generar Reporte"  runat="server" OnClick="btnConsultar_Click"/>
                    <br />
                </div>

                <div class="col-lg-12" style="padding-top:3px">
                    <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Calibri Light" Font-Size="8pt" Height="500px" WaitMessageFont-Names="Calibri Light" WaitMessageFont-Size="14pt" Width="100%" style="margin-right: 32px" OnLoad="ReportViewer_OnLoad">
                    </rsweb:ReportViewer>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
