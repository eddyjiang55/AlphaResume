import sys
import re
import json
import time
from pymongo import MongoClient
from bson.json_util import dumps
import Qwen
from http import HTTPStatus
import dashscope
import markdown
from weasyprint import HTML

dashscope.api_key='sk-3c43423c9fee4af8928fd8bc647291ee'

host = 'localhost'
port = 27017
database_name = 'airesumedb'
collection_name = 'users'

userId = sys.argv[1]
print(userId)

def read_data_from_mongodb(userId):
    # Connect to MongoDB
    client = MongoClient(host, port)

    # Select the database and collection
    db = client[database_name]
    collection = db[collection_name]

    # Query data (modify this query as needed)
    data = collection.find({"userId": userId})  # This retrieves all documents from the collection
    # Convert MongoDB documents to JSON (or any other format you prefer)
    matching_document = [doc for doc in data]
    # print(matching_document)
    # Close the MongoDB connection
    client.close()

    return matching_document[0]

matching_document = (read_data_from_mongodb(userId))

byte_string = dumps(matching_document, ensure_ascii=False, indent=4).encode('utf-8')

# with open('./lib/personal_data.json',encoding='utf-8',mode='r') as f:
#     personal_information = json.load(f)
job = '软件工程师'
with open('./lib/job_data.json',encoding='utf-8',mode='r') as f:
    job_information = json.load(f)
information = {
    '用户信息':dumps(matching_document, ensure_ascii=False, indent=4),
    '应聘岗位':job,
    '岗位信息':job_information
    }

text_keywords = ['设计规划','编码测试','调试优化','协作交付']
target_list = ["工作/实习经历","项目经历","技能"]
notarget_list = ['基本信息','教育经历',"获奖信息","语言能力",]
keywords_target_list = ["工作/实习经历"]
improved_information = {}

json_obj = json.loads(information['用户信息'])
# retain text for notarget_list
for target in notarget_list:
    improved_information[target] = json_obj[target]
    # print(improved_information[target])
# generate text for target_list
for target in target_list:
    result = Qwen.QA(target=target,info_dict=information)
    improved_information[target] = result
    time.sleep(3)
# generate text with keywords for kewords_target_list
for target in keywords_target_list:
    result = Qwen.QAKeywords(target=target,keywords=text_keywords,info_dict=improved_information)
    improved_information[target] = result
    time.sleep(3)

origin_mkd_cv = Qwen.writeCV(information=json_obj)
improved_mkd_cv = Qwen.writeCV(information=improved_information)

origin_mkd_cv = re.sub(r"```markdown",'',origin_mkd_cv)
origin_mkd_cv = re.sub(r'```','',origin_mkd_cv)
improved_mkd_cv = re.sub(r'```markdown','',improved_mkd_cv)
improved_mkd_cv = re.sub(r'```','',improved_mkd_cv)

with open('./outputResume/imporved_cv.json', model ='w', encoding='utf-8')as f:
    json.dump(improved information,f)
with open(f'./outputResume/{userId}.md',mode='w',encoding='utf-8') as f:
    f.write(improved_mkd_cv)
with open('./outputResume/origin_cv.md',mode='w',encoding='utf-8') as f:
    f.write(origin_mkd_cv)

# # Convert Markdown to HTML
html_text = markdown.markdown(improved_mkd_cv)

# # Convert the HTML to a PDF file
HTML(string=html_text).write_pdf(f'./outputResume/{userId}.pdf')