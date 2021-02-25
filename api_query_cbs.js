const cbsDataOptions = {
    'path': 'https://apis.cbs.gov.il/series/data/path?', //constant path for the data, there is a different path for the tittles
    'last': '12', //number of month
    'data': '1', //1=original data
    'time': '3', //1=year, 2= quarters,3=months
    'id': '11,5,3,2,2', //well....
    'format': 'json', //xml or json
    'download': 'false' // if you want to download the file
}


async function fetchData() {
    const url = `${cbsDataOptions.path}id=${cbsDataOptions.id}&last=${cbsDataOptions.last}&format=${cbsDataOptions.format}&download=${cbsDataOptions.download}&data=${cbsDataOptions.data}&time=${cbsDataOptions.time}`
    const result = await fetch(url)
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
                backgroundColor: 'blue',
                borderColor: 'rgb(255,92,75)',
                borderWidth: 5,
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

