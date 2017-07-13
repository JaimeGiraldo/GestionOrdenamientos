

$(document).ready(function () {

    var urlc = $('#txturl').val();
    //Funcion Cerrar Historia Clinica
    $('#consumir').click(function () {
        
    

$.ajax({
    url: 'http://www.simiinmobiliarias.com/ApiSimiweb/response/inmueble/codInmueble?id=1206',
    type: 'GET',
    beforeSend: function (xhr) {
        xhr.setRequestHeader(
          'Authorization',
          'Basic ' + btoa('Authorization:9bNNsBH606gQZ33Xz14QOsQIWIncAtPovXpCD9rt-643'));
    },
    'dataType': "html",
    success: function (data) {

        $('#txtresultado').text(data);
        console.log(data);
    }

});

    });

});
