const periodElm = document.getElementById("period")
periodElm.addEventListener('change', () => {
    let periodSelector = periodElm.value
    console.log(periodSelector)
    getRecordsFromAirTable(periodSelector, maxRecords)
})

const records = document.getElementById("maxRecord")
records.addEventListener("change", () => {
    let recordSelector = parseInt(records.value)
    console.log(recordSelector)
    getRecordsFromAirTable(period,recordSelector)
})


let Airtable = require('airtable');
let base = new Airtable({apiKey: 'keyZMxI9gHCuXqsiL'}).base('appp7pcS86xvu5Tyy');//readonly
let byMonth = "dataByMonth"
let byYear = "dataByYear"
let byQuarter = "dataByQuarter"
let maxRecords = 6
let period = byMonth

function getRecordsFromAirTable(period, maxRecords) {


    const labels = []
    const chartData = []
    base(period).select({

        view: "Grid view",
        sort: [{field: "TimePeriod", direction: "desc"}],
        maxRecords: maxRecords
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
            // console.log('month ', record.get("TimePeriod"));
            // console.log('employee ', record.get('employee'))
            labels.push(record.get("TimePeriod"))
            chartData.push(record.get('employee'))

        });
        console.log(labels)
        console.log(chartData)
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        makeChart(labels.reverse(), chartData.reverse())
    }, function done(err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}

getRecordsFromAirTable(period, maxRecords)


function createRecord(TimePeriod, Value) {
    base(period).create([
        {
            "fields": {
                "TimePeriod": TimePeriod,
                "employee": Value
            }
        }
    ], function (err, records) {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function (record) {
            console.log(record.getId());
        });
    });
}
