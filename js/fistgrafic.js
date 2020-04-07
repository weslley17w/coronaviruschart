let DataGrafic = new Array;
let WordXBrasil = new Array;
DataGrafic.push(['Data', 'Casos Confirmados', 'Óbitos', 'Recuperados']);
WordXBrasil.push(['Data', 'Brasil', 'China', 'Itália', 'Estados Unidos']);
let Country = new Array;
//

$(document).ready(() =>{
    fetch("https://corona.lmao.ninja/v2/historical")
        .then(response => response.json())
        .then(data => {
            data.forEach(a=> {
                Country.push(a.country);
            });

            Country = Country.filter(function(este, i) {
                return Country.indexOf(este) === i;
            });

            Country.forEach(a => {
                if(a === 'brazil'){
                    $('#Country_S').append('<option value="'+a+'" selected>'+B+'</option>');
                }else{
                    $('#Country_S').append('<option value="'+a+'">'+a+'</option>');
                }

            });
        });


    fetch("https://corona.lmao.ninja/v2/historical/brazil")
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

    fetch("https://corona.lmao.ninja/v2/historical/brazil")
        .then(response => response.json())
        .then(data_br => {
            fetch("https://corona.lmao.ninja/v2/historical/usa")
                .then(response => response.json())
                .then(data_eua => {
                    fetch("https://corona.lmao.ninja/v2/historical/Italy")
                        .then(response => response.json())
                        .then(data_italy => {
                            fetch("https://corona.lmao.ninja/v2/historical/China")
                                .then(response => response.json())
                                .then(data_china => {
                                    console.log()
                                    datecorona.forEach(a => {
                                        year = a.split('/');
                                        year[0] = year[0] < 10 ? "0" + year[0].toString() : year[0];
                                        year = year[1] + "/" + year[0] + "/" + (parseInt(year[2]) + 2000);
                                        if(data_br.timeline.cases[a] !== undefined){
                                            WordXBrasil.push([year, data_br.timeline.cases[a], data_china.timeline.cases[a], data_italy.timeline.cases[a], data_eua.timeline.cases[a]]);
                                        }
                                    });
                                    google.charts.load('current', {'packages':['corechart']});
                                    google.charts.setOnLoadCallback(drawChartWord);

                                    function drawChartWord() {
                                        var dataWord = google.visualization.arrayToDataTable(WordXBrasil);

                                        var optionsWord = {
                                            title: "Comparativos de casos confirmados",
                                            curveType: 'function',
                                            legend: { position: 'bottom' }
                                        };

                                        var chart = new google.visualization.LineChart(document.getElementById('word_data'));

                                        chart.draw(dataWord, optionsWord);
                                    }
                                });
                        });
                });
        });

    $("select#Country_S").change(function(){
        let AnyGrafic = new Array;
        AnyGrafic.push(['Data', 'Casos Confirmados', 'Óbitos', 'Recuperados']);
        value = this.value;
        fetch("https://corona.lmao.ninja/v2/historical/" +value)
            .then(response => response.json())
            .then(data_any => {
                datecorona.forEach(a => {
                    yeara = a.split('/');
                    yeara[0] = yeara[0] < 10 ? "0" + yeara[0].toString() : yeara[0];
                    yeara = yeara[1] + "/" + yeara[0] + "/" + (parseInt(yeara[2]) + 2000);
                    AnyGrafic.push([yeara, data_any.timeline.cases[a], data_any.timeline.deaths[a], data_any.timeline.recovered[a]]);
                });
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(drawChartAny);

                function drawChartAny() {
                    var dataAny = google.visualization.arrayToDataTable(AnyGrafic);

                    var optionsAny = {
                        title: value.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }),
                        curveType: 'function',
                        legend: { position: 'bottom' }
                    };

                    var chart = new google.visualization.LineChart(document.getElementById('Any_data'));

                    chart.draw(dataAny, optionsAny);
                }

            });
        $('#brasil_data').remove();
        $('.anyc').html("<div id=\"Any_data\" style=\"width: 100%; height: 100; min-height: 500px;\"></div>")
    });
});