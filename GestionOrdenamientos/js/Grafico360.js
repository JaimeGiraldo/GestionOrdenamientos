var evaluadores = [];
var cantidades = [];

$(document).ready(function () {
    ObtenerGrafico('spObtenerGrafico', usuario);
    //pintarGrafico();
});

function ObtenerGrafico(spP, evaluado) {

    $.ajax({
        url: "Grafico360.aspx/obtenerDatos",
        data: "{ sp: '" + spP + "',evaluado: '" + evaluado + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        type: 'POST'
    }).done(function (rest) {

        var resultado = rest.d;

        if (resultado != '') {

            var datos = JSON.parse(resultado);
            var datos = datos.Table;        

            for (var i = 0; i < datos.length; i++) {
                var eva = datos[i].Evaluador;
                var cantidad = datos[i].Resultado;
                evaluadores.push(eva);
                cantidades.push(cantidad);
            }
           
           // console.log(evaluadores);
            //console.log(cantidades);            
            pintarGrafico(evaluadores, cantidades);
        }
        else {
            alert('No hay datos');
        }
    });
}

function pintarGrafico(categorias,valores) {

    Highcharts.chart('container', {
        
        xAxis: {
            colorByPoint: true,
            categories: categorias
        },
        yAxis: {
            min: 0,
            max: 4
        },
        title: {
            text: 'Promedio de Calificación'
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">Promedio</span><br>',
            pointFormat: '<b>{point.y:.2f}</b>'
        },
        series: [{
            type: 'scatter',
            name: 'Evaluadores',
            colorByPoint: true,          
            data: valores,
            marker: {
                radius: 15
            }
        }]
    });
}
