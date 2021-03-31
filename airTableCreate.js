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
