let DataGrafic = new Array;
DataGrafic.push(['Data', 'Casos Confirmados', 'Óbitos', 'Curados'])
let sla;
//

$(document).ready(() =>{

    fetch("https://corona.lmao.ninja/historical/brazil")
        .then(response => response.json())
        .then(data => {
            datecorona.forEach(a => {
                year = a.split('/');
                year[0] = year[0] < 10 ? "0" + year[0].toString() : year[0];
                year = year[1] + "/" + year[0] + "/" + (parseInt(year[2]) + 2000);
                if(data.timeline.cases[a] > 0){
                    DataGrafic.push([year, data.timeline.cases[a], data.timeline.deaths[a], data.timeline.recovered[a]]);
                }

            });

            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable(DataGrafic);

                var options = {
                    title: 'Brasil: Paciente 0 confirmado dia 26 de fevereiro de 2020',
                    curveType: 'function',
                    legend: { position: 'bottom' }
                };

                var chart = new google.visualization.LineChart(document.getElementById('brasil_data'));

                chart.draw(data, options);
            }


    });

});