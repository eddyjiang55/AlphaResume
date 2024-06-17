from pymongo import MongoClient
import requests
from markdownify import markdownify as md
import os
import json
from http import HTTPStatus
import dashscope
import time
import re
dashscope.api_key='sk-3c43423c9fee4af8928fd8bc647291ee'

def get_chat_from_mongodb():
    uri = "mongodb+srv://leoyuruiqing:WziECEdgjZT08Xyj@airesume.niop3nd.mongodb.net/?retryWrites=true&w=majority&appName=AIResume"
    # Create a new client and connect to the server
    client = MongoClient(uri)
    database_name = "airesumedb"
    collection_name = "resumeChats"

    db = client[database_name]
    collection = db[collection_name]

    # 假设你已经知道如何定位到特定用户的聊天记录，这里用一个示例查询
    user_account = "+8613387543505"

    # 查询特定用户的聊天记录
    chat_record = collection.find_one({"userAccount": user_account})

    chat_messages = chat_record['personal_info']

    return chat_messages

chat_json = get_chat_from_mongodb()

with open("scoring_system.json", "r", encoding='Utf-8') as f:
    scoring_system = json.load(f)


def calculate_score(data, scoring):
    total_score = 0

    def score_item(item, scoring):
        score = 0
        if isinstance(item, dict):
            for key in item:
                if key in scoring:
                    score += score_item(item[key], scoring[key])
        elif isinstance(item, list):
            if isinstance(scoring, list):
                scoring_template = scoring[0]
            else:
                scoring_template = scoring
            for sub_item in item:
                score += score_item(sub_item, scoring_template)
        elif item:
            score = scoring
        return score

    for key in data:
        if key in scoring:
            total_score += score_item(data[key], scoring[key])

    return total_score


# 调用函数计算总分
total_score = calculate_score(chat_json, scoring_system)
complete_percent = total_score / 424


def upload_score_to_mongodb(score):
    uri = "mongodb+srv://leoyuruiqing:WziECEdgjZT08Xyj@airesume.niop3nd.mongodb.net/?retryWrites=true&w=majority&appName=AIResume"
    # Create a new client and connect to the server
    client = MongoClient(uri)
    database_name = "airesumedb"
    collection_name = "resumeChats"

    db = client[database_name]
    collection = db[collection_name]

    # 假设你已经知道如何定位到特定用户的聊天记录，这里用一个示例查询
    user_account = "+8613387543505"

    # 查询特定用户的聊天记录
    chat_record = collection.find_one({"userAccount": user_account})

    chat_record['completePercent'] = score

    # 更新数据
    collection.update_one({"userAccount": user_account}, {"$set": chat_record})

    client.close()

upload_score_to_mongodb(complete_percent)


