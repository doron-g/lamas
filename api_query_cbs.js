const cbsDataOptions = {//sets the data from cbs
    'path': 'https://apis.cbs.gov.il/series/data/path?', //constant path for the data, there is a different path for the tittles
    'last': '100', //number of periods
    'data': '1', //1=original data
    'time': '3', //period type: 1=year, 2= quarters,3=months
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
        TimePeriod = data[line]['TimePeriod']
        Value = data[line]['Value']
        // console.log(TimePeriod)
        // console.log(Value)
        // createRecord(TimePeriod,Value) //writes the data to airtable
    }
    const mohData = await fetchMohData()
    makeChart(labels.reverse(), chartData.reverse())

}


// let data = fetchData()


function makeChart(labels, lamasData, labelstring) {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        maintainAspectRatio: false,
        data: {
            labels: labels,
            datasets: [{
                label: 'אחוז מועסקים',
                data: lamasData,
                backgroundColor: 'blue',
                borderColor: 'rgb(255,92,75)',
                borderWidth: 5,
                fill: false,


            }],
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            xAxisId: "חודש",
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: labelstring
                    },
                    gridLines: {
                        display: false
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
