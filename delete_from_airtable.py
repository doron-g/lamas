from airtable import Airtable
import os
base_key = 'appp7pcS86xvu5Tyy'
api_key = os.getenv("API_KEY")

tables = ["dataByMonth", "dataByQuarter", "dataByYear"]




# print(data)
def delete_all_from_airtable():
    for table in tables:
        airtable = Airtable(base_key, table, api_key)
        data = airtable.get_all()
        # for item in data:
        #     record = item['id']
        #     print(record)
        print(data)
        print("finish table " + table)


# delete_all_from_airtable()
