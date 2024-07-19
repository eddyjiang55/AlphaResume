import requests
import json
import re
from http import HTTPStatus
import os
import ast
import time
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import qwen

def get_personal_cv(user_id):
    cv_url = f'https://be.alpharesumeai.com/api/improved-users/{user_id}'
    response = requests.get(cv_url)
    text = response.text
    personal_cv = json.loads(text)
    personal_cv = personal_cv['personal_data']
    return personal_cv

def get_positions_list():
    url = 'https://be.alpharesumeai.com/api/job-titles'
    response = requests.get(url)
    text = response.text
    positions_list = eval(text)
    return positions_list

def get_job_information(apply_position, most_similar_position, marched):
    jobinfo_url = f'https://be.alpharesumeai.com/api/job-information/{most_similar_position}'
    response = requests.get(jobinfo_url)
    text = response.text
    similar_jobinfo_json = json.loads(text)
    del similar_jobinfo_json['_id']

    if marched:
        return similar_jobinfo_json
    else:
        jobinfo_json = qwen.generate_job_information(apply_position, similar_jobinfo_json)
        jobinfo_json = re.sub(r'```json','',jobinfo_json)
        jobinfo_json = re.sub(r'```','',jobinfo_json)
        jobinfo_json = json.loads(jobinfo_json)
        return jobinfo_json

def get_resume_guidence(apply_position, job_information, most_similar_position, marched):
    resumeguidence_url = f'https://be.alpharesumeai.com/api/resume-guidance/{most_similar_position}'
    response = requests.get(resumeguidence_url)
    text = response.text
    similar_resumeguidence_json = json.loads(text)
    similar_resumeguidence_json['应聘岗位'] = similar_resumeguidence_json['position']
    similar_resumeguidence_json['简历指导'] = similar_resumeguidence_json['guidance']
    del similar_resumeguidence_json['_id'], similar_resumeguidence_json['position'], similar_resumeguidence_json['guidance']

    if marched:
        return similar_resumeguidence_json
    else:
        keywords = job_information['工作内容关键词']
        resumeguidence_json = qwen.generate_resume_guidence(apply_position, keywords, similar_resumeguidence_json)
        resumeguidence_json = re.sub(r'```json','',resumeguidence_json)
        resumeguidence_json = re.sub(r'```','',resumeguidence_json)
        resumeguidence_json = json.loads(resumeguidence_json)
        return resumeguidence_json

def get_resume_template(template_id):
    template_url = f'https://be.alpharesumeai.com/api/resume-template/{template_id}'
    response = requests.get(template_url)
    return response.text

def get_resume_templateNull(template_id):
    templateNull_url = f'https://be.alpharesumeai.com/api/resume-template-null/{template_id}'
    response = requests.get(templateNull_url)
    return response.text



def get_improved_cv_json(personal_cv, job_information, guidence):
    target_list = ["项目经历","技能","科研论文与知识产权"]
    notarget_list = ['基本信息','教育经历',"获奖与证书","语言"]
    keywords_target_list = ["职业经历"]
    cv_key_order = ['基本信息','教育经历','职业经历','项目经历','科研论文与知识产权','技能','获奖与证书','语言']
    improved_cv_json = {}
    for key in cv_key_order:
        if key in notarget_list:
            improved_cv_json[key] = personal_cv[key]
        elif key in target_list:
            improved_cv_json[key] = qwen.QA(key, personal_cv, job_information)
            time.sleep(5)
        elif key in keywords_target_list:
            improved_cv_json[key] = qwen.QAKeywords(key, personal_cv, job_information, guidence)
            time.sleep(5)
    return improved_cv_json

def split_cv_into_twoparts(improved_cv_json):
    key_list = list(improved_cv_json.keys())
    first_cv_part = key_list[:4]
    second_cv_part = key_list[4:]
    first_cv_json = {}
    second_cv_json = {}
    for key, value in improved_cv_json.items():
        if key in first_cv_part:
            first_cv_json[key] = value
        elif key in second_cv_part:
            second_cv_json[key] = value
    
    return (first_cv_json, second_cv_json)

def send_cv_to_mongodb(db, markdownData, resumeHistoryId):
    collection_name = "resumeHistories"
    collection = db[collection_name]

    # try:
    #     record_id = ObjectId(record_id)
    # except InvalidId:
    #     return 'Error: Invalid _id format.'

    result = collection.update_one({'_id': resumeHistoryId}, {'$set': {'markdownData': markdownData}})

    if result.matched_count == 0:
        return 'No record found with the specified _id.'
    elif result.modified_count == 0:
        return 'No changes were made to the existing record.'
    else:
        return 'Update successfully!'
