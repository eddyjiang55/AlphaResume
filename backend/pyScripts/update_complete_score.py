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
        try:
            personal_data = resume_record['personal_data']
            return personal_data, resume_record
        except KeyError as e:
            #print(f"KeyError: {e}, no personal_data found in resume_record for resume_id: {resume_id}", file=sys.stderr)
            return None, None
    else:
        #print(f"No record found for resume_id: {resume_id}", file=sys.stderr)
        return None, None

def calculate_score(data, scoring):
    def get_score(item, scoring_item):
        score = 0
        if isinstance(item, dict):
            for key, value in item.items():
                if value and (key in scoring_item):
                    if isinstance(scoring_item[key], list):
                        for sub_item in scoring_item[key]:
                            score += get_score(value, sub_item)
                    else:
                        score += scoring_item[key]
        elif isinstance(item, list):
            if len(item) == 1:
                score += get_score(item[0], scoring_item)
            else:
                max_score = 0
                for sub_item in item:
                    if isinstance(scoring_item, dict):
                        max_score = max(max_score, get_score(sub_item, scoring_item))
                    else:
                        max_score = max(max_score, get_score(sub_item, scoring_item[0]))
                score += max_score
        return score

    total_score = 0
    for key, value in data.items():
        if key in scoring:
            try:
                total_score += get_score(value, scoring[key])
            except Exception as e:
                #print(f"Error calculating score for key: {key}, value: {value}, error: {e}", file=sys.stderr)

    return total_score

def upload_score_to_mongodb(resume_id, score):
    client = MongoClient(MONGODB_URL)
    db = client[DB_NAME]
    improved_collection = db[IMPROVED_COLLECTION_NAME]

    resume_record = improved_collection.find_one({"_id": resume_id})

    if resume_record:
        try:
            improved_collection.update_one({"_id": resume_id}, {"$set": {"completePercent": score}})
            #print(f"Updated completePercent for resume_id: {resume_id}", file=sys.stderr)
        except Exception as e:
            #print(f"Error updating completePercent for resume_id: {resume_id}, error: {e}", file=sys.stderr)
    else:
        try:
            improved_collection.insert_one({"_id": resume_id, "completePercent": score})
            #print(f"Inserted new record with completePercent for resume_id: {resume_id}", file=sys.stderr)
        except Exception as e:
            #print(f"Error inserting new record for resume_id: {resume_id}, error: {e}", file=sys.stderr)

    client.close()

def main(resume_id):
    personal_info, resume_record = get_resume_from_mongodb(resume_id)

    if personal_info:
        # 使用相对路径读取 scoring_system.json 文件
        script_dir = os.path.dirname(__file__)
        scoring_system_path = os.path.join(script_dir, "scoring_system.json")
        
        try:
            with open(scoring_system_path, "r", encoding='utf-8') as f:
                scoring_system = json.load(f)
        except json.JSONDecodeError as e:
            #print(f"JSONDecodeError: {e} while reading {scoring_system_path}", file=sys.stderr)
            return
        except Exception as e:
            #print(f"Error reading scoring_system.json: {e}", file=sys.stderr)
            return

        total_score = calculate_score(personal_info, scoring_system)
        completeness = total_score / 424
        #print(json.dumps({"completeness": completeness}))  # 输出 JSON 格式的结果
        upload_score_to_mongodb(resume_id, completeness)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        #print("Usage: python update_complete_score.py <resume_id>", file=sys.stderr)
        sys.exit(1)
    resume_id = sys.argv[1]
    main(resume_id)
