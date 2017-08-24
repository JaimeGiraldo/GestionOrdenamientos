<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="VisorOrdenes.aspx.cs" Inherits="GestionOrdenamientos.VisorOrdenes" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">

        <asp:ScriptManager ID="ScriptManager1" runat="server" EnableScriptGlobalization="true"></asp:ScriptManager>

        <div class="col-lg-12 col-md-12 mt20">
            <rsweb:reportviewer id="ReportViewer1" runat="server" font-names="Calibri Light" font-size="8pt" height="1000px" waitmessagefont-names="Calibri Light" waitmessagefont-size="14pt" width="700px">
                        </rsweb:reportviewer>
        </div>
    </form>
</body>
</html>
