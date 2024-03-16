import Qwen
import re
import json
from http import HTTPStatus
import dashscope
import time

dashscope.api_key='sk-3c43423c9fee4af8928fd8bc647291ee'

# construct database
job = '软件工程师'
with open('new\personal_data.json',encoding='utf-8',mode='r') as f:
    personal_information = json.load(f)
with open('new\job_data.json',encoding='utf-8',mode='r') as f:
    job_information = json.load(f)
information = {
    '用户信息':personal_information,
    '应聘岗位':job,
    '岗位信息':job_information
    }


text_keywords = ['设计规划','编码测试','调试优化','协作交付']
target_list = ["工作/实习经历","项目经历","技能"]
notarget_list = ['基本信息','教育经历',"获奖信息","语言能力",]
keywords_target_list = ["工作/实习经历"]
improved_information = {}

# retain text for notarget_list
for target in notarget_list:
    improved_information[target] = information['用户信息'][target]
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

origin_mkd_cv = Qwen.writeCV(information=information['用户信息'])
improved_mkd_cv = Qwen.writeCV(information=improved_information)

origin_mkd_cv = re.sub(r"```markdown",'',origin_mkd_cv)
origin_mkd_cv = re.sub(r'```','',origin_mkd_cv)
improved_mkd_cv = re.sub(r'```markdown','',improved_mkd_cv)
improved_mkd_cv = re.sub(r'```','',improved_mkd_cv)

with open('improved_cv.md',mode='w',encoding='utf-8') as f:
    f.write(improved_mkd_cv)
with open('origin_cv.md',mode='w',encoding='utf-8') as f:
    f.write(origin_mkd_cv)
