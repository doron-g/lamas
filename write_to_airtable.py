from airtable import Airtable
import requests
import os

# airtable parm
base_key = 'appp7pcS86xvu5Tyy'
api_key = os.getenv("API_KEY")
print(api_key)
# cbs parm
path_id = "11,5,3,2,2"
number_of_period = "100"
original_data = "1"
output_type = "json"
download = "false"
base_url = "https://apis.cbs.gov.il/series/data/path?"

time_list = [{"period": "month", "period_type": "3", "table_name": "dataByMonth"},
             {"period": "Quarter", "period_type": "2", "table_name": "dataByQuarter"},
             {"period": "year", "period_type": "1", "table_name": "dataByYear"}]


def write_to_airtable():
    for item in time_list:
        airtable = Airtable(base_key, item["table_name"], api_key)
        data_from_air_table = airtable.get_all()
        time = item["period_type"]
        url = f"{base_url}id={path_id}&last={number_of_period}&format={output_type}&download={download}&data={original_data}&time={time}"
        response = requests.request("GET", url)
        res = response.json()
        data_from_cbs = res['DataSet']['Series'][0]['obs']

        for record in data_from_cbs:
            check_list = list(
                filter(lambda period: period['fields']["TimePeriod"] == record["TimePeriod"], data_from_air_table))
            print(check_list)
            time_period = record["TimePeriod"]
            employee = record["Value"]
            # print(employee)
            new_record = {"TimePeriod": time_period, "employee": employee}
            if not check_list:
                airtable.insert(new_record)
            else:
                airtable.update_by_field("TimePeriod", time_period, new_record)


write_to_airtable()


