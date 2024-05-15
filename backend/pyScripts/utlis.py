from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import qwen
import time



def get_cv_from_mongodb(db, resume_id):  # user's id
    collection_name = "improvedUsers"
    collection = db[collection_name]
    query = {'resumeId': resume_id}
    cv_cursor = collection.find(query)
    results = [doc for doc in cv_cursor]
    return results[0]['personal_data']

def get_job_info_from_mongodb(db, job_name): # job's id
    collection_name = "jobInformation"
    collection = db[collection_name]
    query = {'岗位名称': job_name}
    job_cursor = collection.find(query)
    results = [doc for doc in job_cursor]
    return results[0]

def get_improved_cv_json(information, cv_key_order, notarget_list, target_list, keywords_target_list, job_keywords):
    improved_cv_json = {}
    for key in cv_key_order:
        if key in notarget_list:
            improved_cv_json[key] = information['用户信息'][key]
        if key in target_list:
            improved_cv_json[key] = qwen.QA(key,information)
            time.sleep(10)
        if key in keywords_target_list:
            improved_cv_json[key] = qwen.QAKeywords(key,job_keywords,information)
            time.sleep(10)
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

def sent_cv_to_mongodb(db, insert_data): # usr's id and job's id
    collection_name = "improvedUsers"
    collection = db[collection_name]
    result = collection.insert_one(insert_data)
    return 'Insert successfully!'