import sys
import io
import re
import dashscope
from http import HTTPStatus
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
# from dotenv import load_dotenv
import os
import time
import qwen
import utlis as ut

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

dashscope.api_key='sk-3c43423c9fee4af8928fd8bc647291ee'

userId = sys.argv[1]
resumeHistoryId = sys.argv[2]
# print(userId, flush=True)

# apply_position 需要修改为前端填入的应聘岗位字符串
apply_position = '软件工程师'
# template 目前数据库中只有一个模板，故这里是固定id，后期完成模板功能后需修改为前端用户选择id
template_id = '9b7ba048-9cdb-49d0-8160-af05a0ef0658'

# get original personal cv json
personal_json = ut.get_personal_information(userId)
print(f'PROGRESS: {10}', flush=True)

# get job imformation josn
similarity_results = qwen.get_most_similar_position(apply_position, similarity_threshold=0.8)
time.sleep(3)
most_similar_position, marched = similarity_results[0], similarity_results[1]
job_information = ut.get_job_information(apply_position, most_similar_position, marched)
time.sleep(3)
print(f'PROGRESS: {15}', flush=True)

# get resume guidence json
resume_guidence = ut.get_resume_guidence(apply_position, job_information, most_similar_position, marched)
time.sleep(3)
print(f'PROGRESS: {20}', flush=True)

# get template
resume_template = ut.get_resume_template(template_id)
resume_templateNull = ut.get_resume_templateNull(template_id)
print(f'PROGRESS: {30}', flush=True)

# get improved personal cv json
improved_cv_json = ut.get_improved_cv_json(personal_json, job_information, resume_guidence)
time.sleep(3)
print(f'PROGRESS: {50}', flush=True)

# turn json cv into markdown
first_cv_json, second_cv_json = ut.split_cv_into_twoparts(improved_cv_json)
print(f'PROGRESS: {55}', flush=True)
improved_cv_first_md = qwen.writeCV_first(first_cv_json)
time.sleep(3)
print(f'PROGRESS: {60}', flush=True)
improved_cv_second_md = qwen.wirteCV_second(improved_cv_first_md, second_cv_json)
time.sleep(3)
print(f'PROGRESS: {65}', flush=True)

improved_cv_first_md = re.sub(r'```markdown','',improved_cv_first_md)
improved_cv_first_md = re.sub(r'---\n\n','',improved_cv_first_md)
improved_cv_first_md = re.sub(r'```','',improved_cv_first_md)

improved_cv_second_md = re.sub(r'```markdown','',improved_cv_second_md)
improved_cv_second_md = re.sub(r'---\n\n','',improved_cv_second_md)
improved_cv_second_md = re.sub(r'```','',improved_cv_second_md)

improved_cv_md = improved_cv_first_md + '\n\n' +improved_cv_second_md
print(f'PROGRESS: {70}', flush=True)

# get standard cv markdown
standard_cv_md = qwen.wirteCV(resume_templateNull, resume_template, improved_cv_md)
time.sleep(3)
print(f'PROGRESS: {90}', flush=True)

standard_cv_md = re.sub(r'```markdown\n','',standard_cv_md)
standard_cv_md = re.sub(r'```','',standard_cv_md)



# get database
# load_dotenv()
mongodb_url = os.getenv('MONGODB_URL')
client = MongoClient(mongodb_url)
database_name = "airesumedb"
db = client[database_name]
# print(f'PROGRESS: {5}', flush=True)

# sent generated resume to database
ut.send_cv_to_mongodb(db, standard_cv_md, resumeHistoryId)
print(f'PROGRESS: {100}', flush=True)
print('generate and send resume successfully!')
