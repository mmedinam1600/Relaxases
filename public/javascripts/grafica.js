
function init() {
    const socket = io();
    let counter=0;
    socket.on('Grafica:data', function(dataSerial){
        console.log(dataSerial);
        myChart.data.labels.push("counter");
        myChart.data.datasets.forEach(dataset => {
            dataset.data.push(dataSerial.value);
        });
        counter++;
        myChart.update();
    });

    var ctx = document.getElementById('myCanvas').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Serial'],
            datasets: [{
                label: 'Serial',
                backgroundColor: '#FFFFFF',
                borderColor: '#FF0000',
                data:[],
                pointRadius: 0
            }]
        },
        options: {}
    });
}

document.addEventListener('DOMContentLoaded', init);