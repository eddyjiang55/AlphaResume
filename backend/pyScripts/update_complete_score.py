from pymongo import MongoClient
import json
import dashscope
import re
import os
import sys

dashscope.api_key = 'sk-3c43423c9fee4af8928fd8bc647291ee'

MONGODB_URL = "mongodb+srv://leoyuruiqing:WziECEdgjZT08Xyj@airesume.niop3nd.mongodb.net/?retryWrites=true&w=majority&appName=AIResume"
DB_NAME = "airesumedb"
IMPROVED_COLLECTION_NAME = "improvedUsers"

def get_resume_from_mongodb(resume_id):
    client = MongoClient(MONGODB_URL)
    db = client[DB_NAME]
    improved_collection = db[IMPROVED_COLLECTION_NAME]

    resume_record = improved_collection.find_one({"_id": resume_id})
    client.close()

    if resume_record:
        return resume_record['personal_data'], resume_record
    else:
        print(f"No record found for resume_id: {resume_id}", file=sys.stderr)
        return None, None

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

def upload_score_to_mongodb(resume_id, score):
    client = MongoClient(MONGODB_URL)
    db = client[DB_NAME]
    improved_collection = db[IMPROVED_COLLECTION_NAME]

    resume_record = improved_collection.find_one({"_id": resume_id})

    if resume_record:
        improved_collection.update_one({"_id": resume_id}, {"$set": {"completePercent": score}})
        print(f"Updated completePercent for resume_id: {resume_id}", file=sys.stderr)
    else:
        improved_collection.insert_one({"_id": resume_id, "completePercent": score})
        print(f"Inserted new record with completePercent for resume_id: {resume_id}", file=sys.stderr)

    client.close()

def main(resume_id):
    personal_info, resume_record = get_resume_from_mongodb(resume_id)

    if personal_info:
        # 使用相对路径读取 scoring_system.json 文件
        script_dir = os.path.dirname(__file__)
        scoring_system_path = os.path.join(script_dir, "scoring_system.json")
        
        with open(scoring_system_path, "r", encoding='utf-8') as f:
            scoring_system = json.load(f)

        total_score = calculate_score(personal_info, scoring_system)
        complete_percent = total_score / 424
        print(json.dumps({"completePercent": complete_percent}))  # 输出 JSON 格式的结果
        upload_score_to_mongodb(resume_id, complete_percent)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python update_complete_score.py <resume_id>", file=sys.stderr)
        sys.exit(1)
    resume_id = sys.argv[1]
    main(resume_id)
