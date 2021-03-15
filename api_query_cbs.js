

const periodElm = document.getElementById("period")
periodElm.addEventListener('change', () => {
    const period = periodElm.value
    console.log(period)
    cbsDataOptions.time = period
    fetchData()
})
const lastElm = document.getElementById("last")
lastElm.addEventListener('change', () => {
    const last = lastElm.value
    console.log(last)
    cbsDataOptions.last = last
    fetchData()
})


const cbsDataOptions = {
    'path': 'https://apis.cbs.gov.il/series/data/path?', //constant path for the data, there is a different path for the tittles
    'last': '12', //number of periods
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
    }
    // const mohData = await fetchMohData()
    makeChart(labels.reverse(), chartData.reverse())
}

let data = fetchData()

async function fetchMohData() {
    const url = "https://datadashboardapi.health.gov.il/api/queries/deadPatientsPerDate"
    const result = await fetch(url)
    const res = await result.json()
    const data = res
    let startMonth = (new Date(data[0]['date'])).getUTCMonth() + 1
    console.log(startMonth)
    let startYear = (new Date(data[0]['date'])).getUTCFullYear()
    let cumulativeDeadsForMonth = 0
    const deadPerMonth = []
    const months = []
    const years = []
    for (line in data) {
        let date = new Date(data[line]['date'])
        month = date.getUTCMonth() + 1  //get the month
        year = date.getUTCFullYear()
        if (year == startYear) {
            if (month == startMonth) {
                const dailyDeads = data[line]['amount']
                cumulativeDeadsForMonth = cumulativeDeadsForMonth + dailyDeads
            } else {
                deadPerMonth.push(cumulativeDeadsForMonth)
                months.push(startMonth)
                cumulativeDeadsForMonth = data[line]['amount']
                startMonth = month
            }
        } else {
            deadPerMonth.push(cumulativeDeadsForMonth)
            months.push(month)
            years.push(startYear)
            startYear = year
            startMonth = month
            cumulativeDeadsForMonth = data[line]['amount']
        }
    }
    deadPerMonth.push(cumulativeDeadsForMonth)
    months.push(month)
    years.push(startYear)
    console.log(deadPerMonth)
    console.log(months)
    console.log(years)
    return deadPerMonth

}


function makeChart(labels, lamasData, mohData) {
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
                // steppedLine: 'middle'

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
                        labelString: 'חודש'
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

