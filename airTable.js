const periodElm = document.getElementById("period")
periodElm.addEventListener('change', () => {
    dataOptions.period = periodElm.value
    let periodType = document.getElementById("periodType")

    if (periodElm.value === "dataByYear") {
        dataOptions.title = "שנים"
        periodType.innerText = "בחר מספר שנים"

    } else if (periodElm.value === "dataByQuarter") {
        dataOptions.title = "רבעונים"
        periodType.innerText = "בחר מספר רבעונים"
    } else {
        dataOptions.title = "חודשים"
        periodType.innerText = "בחר מספר חודשים"
    }

    getRecordsFromAirTable()
})

const records = document.getElementById("maxRecord")
records.addEventListener("change", () => {
    const recordSelector = parseInt(records.value)
    dataOptions.records = recordSelector
    getRecordsFromAirTable()
})

const dataOptions = {
    "period": "dataByMonth",
    "records": 12,
    "title": "חודשים"

}


let Airtable = require('airtable');
let base = new Airtable({apiKey: 'keyZMxI9gHCuXqsiL'}).base('appp7pcS86xvu5Tyy');//readonly


function getRecordsFromAirTable() {


    const labels = []
    const chartData = []
    base(dataOptions.period).select({

        view: "Grid view",
        sort: [{field: "TimePeriod", direction: "desc"}],
        maxRecords: dataOptions.records
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {

            labels.push(record.get("TimePeriod"))
            chartData.push(record.get('employee'))

        });
        console.log(labels)
        console.log(chartData)

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        makeChart(labels.reverse(), chartData.reverse(), dataOptions.title)
    }, function done(err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}

getRecordsFromAirTable()

