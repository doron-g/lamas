# this is the api from the CBS
# id is the data
# last is num of last records
# time = 3 is for months
# data = 1 is for original data
import requests

path_id = "11,5,3,2,2"
number_of_month = "24"
original_data = "1"
time = "3"
output_type = "json"
download = "false"
base_url = "https://apis.cbs.gov.il/series/data/path?"

url1 = f"{base_url}id={path_id}&last={number_of_month}&format={output_type}&download={download}&data={original_data}&time={time}"

url = "https://apis.cbs.gov.il/series/data/path?id=11,5,3,2,2&last=24&format=json&download=false&data=1&time=3"
response = requests.request("GET", url1)
res = response.json()
data = res['DataSet']['Series'][0]['obs']
