async function fetchData() {
    const result = await fetch("https://apis.cbs.gov.il/series/data/path?id=11,5,3,2,2&last=12&format=json&download=false&data=1&time=3")
    const res = await result.json()
    const data = res['DataSet']['Series'][0]['obs']
    console.log(data)
    const labels = []
    const chartData = []
    for (line in data) {
        labels.push(data[line]['TimePeriod'])
        chartData.push(data[line]['Value'])
    }
    makeChart(labels, chartData)
}

fetchData()


function makeChart(labels, chartData) {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'אחוז מועסקים',
                data: chartData,
                backgroundColor: 'red',
                borderColor: 'blue',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {

            xAxisId: "חודש",

            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'חודש'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'אחוז מועסקים'
                    },
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}

