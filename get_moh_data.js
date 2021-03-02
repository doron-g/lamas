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
    // makeChart(deadPerMonth)
}

fetchMohData()
