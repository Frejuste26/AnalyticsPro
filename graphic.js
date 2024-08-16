Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

let Unite = require('../../Models/unite.model');
let Productions = require('../../Models/production.model');

let data = [];
let myUnite = [];
Unite.selectAll(
    function (unites){
        Productions.selectAll(
            function (productions){
                unites.forEach(unite => {
                    productions.forEach(result => {
                        if(result.idUnite == unite.id){
                            const taux = math.floor((result.resultat * 100)/result.objectif);
                            data.push(taux);
                            myUnite.push(unite.name);
                        }
                    });
                });
            }
        );
    }
);

//create a new histogram for this object using chart js 

let ctx = document.getElementById('histogram').getContext('2d');
let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: myUnite,
        datasets: [{
            label: 'Taux de réussite',
            backgroundColor: "#4e73df",
            hoverBackgroundColor: "#2e59d9",
            borderColor: "#4e73df",
            borderWidth: 1,
            data: data
        }]
    },

    // Configuration options for the chart
    options: {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
            },
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: '#858796',
                    fontSize: 14
                },
                boxWidth: 'auto',
                padding: 10
            },
        },
        scales: {
            x: {
                fontColor: '#858796',
                fontSize: 14,
                padding: 20,
                maxBarThickness: 50,
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                beginAtZero: true,
                max: 100,
                stepSize: 20,
                ticks: {
                    fontColor: '#858796',
                    fontSize: 14,
                    callback: function (value, index, values) {
                        return value + '%';
                    }
                }
            },
            gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
        },
        tooltips: {
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
            callbacks: {
                label: function(tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ':'+ tooltipItem.yLabel + '%';
                }
            }
          }
    }
});
