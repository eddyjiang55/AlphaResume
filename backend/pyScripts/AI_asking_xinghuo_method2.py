import json
from http import HTTPStatus
import dashscope
import time
import base64
import hashlib
import hmac
import json
import os
import time
import requests
import urllib
import audio_to_text

from sparkai.llm.llm import ChatSparkLLM, ChunkPrintHandler
from sparkai.core.messages import ChatMessage

from xinghuo_model import generate_response

lfasr_host = 'https://raasr.xfyun.cn/v2/api'
# 请求的接口名
api_upload = '/upload'
api_get_result = '/getResult'

dashscope.api_key = 'sk-3c43423c9fee4af8928fd8bc647291ee'
import re
from pymongo import MongoClient
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
MONGODB_URL = "mongodb+srv://leoyuruiqing:WziECEdgjZT08Xyj@airesume.niop3nd.mongodb.net/?retryWrites=true&w=majority&appName=AIResume"
DB_NAME = "airesumedb"
COLLECTION_NAME = "resumeChats"
COLLECTION_NAME_1 = "improvedUsers"
COLLECTION_NAME_2 = "resumeAudios"
client = MongoClient(MONGODB_URL)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]
collection_1 = db[COLLECTION_NAME_1]
collection_2 = db[COLLECTION_NAME_2]


chatId = sys.argv[1]
resumeId = sys.argv[2]


# chatId = 'a4e6762c-b26d-4619-92dd-2bd660adae5f'
# resumeId = 'a4e6762c-b26d-4619-92dd-2bd660adae5f'
# section_id = 1


keys_list = ['基本信息', '个人评价', '教育经历', '职业经历', '项目经历', '获奖', '证书', '语言', '技能', '科研论文', '知识产权']


# 判断是否是有效的UUID格式
def is_valid_uuid(uuid_string):
    uuid_regex = re.compile(r'^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$')
    return bool(uuid_regex.match(uuid_string))


def get_chat_from_mongodb(chat_id, resume_id):
    # 假设你已经知道如何定位到特定用户的聊天记录，这里用一个示例查询

    # 查询特定用户的聊天记录
    chat_record = collection.find_one({"_id": chat_id})
    user_record = collection_1.find_one({"_id": resume_id})

    chat_messages = chat_record['messages']

    standard_json = user_record['personal_data']

    # 获取最后一条消息. 格式是mock_qa.json里的格式
    last_message = chat_messages[-1]

    print(last_message)

    last_answer = last_message['answer']
    # check if it is an id, ie, no chinese characters
    try:
        if is_valid_uuid(last_answer):
            audio_id = last_answer
            audio_record = collection_2.find_one({"_id": audio_id})

            if audio_record is None:
                raise ValueError("No audio record found for the given UUID.")

            audio_data = audio_record['audio']  # assuming this is a .wav file

            try:
                # Convert the audio to text
                api = audio_to_text.RequestApi(
                    appid="80922260",
                    secret_key="84268ea312aee377ace0b8468633bd0a",
                    upload_file_path=audio_record['audio']
                )
                result = api.get_result()
                last_message['answer'] = result

            except Exception as e:
                print(f"Error during audio-to-text conversion: {e}")
                last_message['answer'] = "Error during audio-to-text conversion."

    except Exception as e:
        print(f"An error occurred: {e}")
        last_message['answer'] = "An error occurred while processing the request."



    return last_message, standard_json





def update_json(original_json, last_chat):
    prompt = (
        f"你是一位专业的数据分析师，你的专长在于理解对话内容并将相关信息映射到JSON结构中。\n"
        f"你将收到一段对话和一个部分已填充的JSON文件。\n"
        f"你的任务是分析这段对话，确定其中包含的信息能够填入JSON文件的哪些部分，并更新这个JSON文件。\n\n"

        f"如果对话的回答中明确指示跳过某一部分，或者特别说明并无这部分的信息，\n"
        f"请在JSON相应字段中填入'无'。\n"
        f"然而，如果某个字段在问题中没有被提及，而且回答中没有特别说明并无这部分信息，\n"
        f"则不应擅自填充'无'，而应保持该字段为空。\n\n"

        f"你需要返回一个完整的JSON文件，不需要添加任何注释。\n"
        f"以下是对话内容：\n{last_chat}\n"
        f"以下是JSON文件内容：\n{original_json}\n"
    )

    response = generate_response(prompt)
    return response


def extract_json(data_str):
    # 使用正则表达式找到最外层的大括号
    matches = re.search(r'{.*}', data_str, re.S)
    if matches:
        json_str = matches.group(0)
        # print(json_str)
        try:
            # 尝试解析 JSON，确保它是有效的
            json_data = json.loads(json_str)
            return json_data
        except json.JSONDecodeError as e:
            print("找到的字符串不是有效的 JSON。",e)
            return None
    else:
        print("没有找到符合 JSON 格式的内容。")
        return None


def update_mongodb(chat_id, new_question, resume_id, updated_json):
    chat_record = collection.find_one({"_id": chat_id})
    resume_record = collection_1.find_one({"_id": resume_id})

    if chat_record:
        # Get the current length of the messages array
        messages_length = len(chat_record.get('messages', []))

        # Create the new message with id and question
        new_message = {"id": messages_length + 1, "question": new_question}

        # Add the new message to the messages array
        collection.update_one(
            {"_id": chat_id},
            {"$push": {"messages": new_message}}
        )

        print(json.dumps({"status": "success", "id": messages_length + 1, "message": new_message}))
    else:
        print(json.dumps({"status": "error", "message": "Chat record not found"}))

    if resume_record:
        collection_1.update_one(
            {"_id": resume_id},
            {"$set": {"personal_data": updated_json}}
        )
        print(json.dumps({"status": "success", "message": "Resume record updated"}))
    else:
        print(json.dumps({"status": "error", "message": "Resume record not found"}))



def process_asking(json_str):
    prompt = (
        f"你是一个友好的面试官，正在审查一份求职者的个人信息JSON文件。\n"
        f"你的任务是：\n"
        f"1. 遍历整个JSON文件，找出所有value为\"\"的字段，这意味着求职者尚未填写这些信息。\n"
        f"2. 采用鼓励和支持的语气，向求职者指出哪些部分尚未完成，并指导他们如何补充这些信息。\n"
        f"3. 如果发现有很多字段未填写，可以只告诉求职者大类别，而不必逐一列出所有字段。\n"
        f"4. 用你的面试官的专业知识，适当提示求职者，告诉他们哪些信息对于他们的简历至关重要。\n"
        f"5. 注意，如果某些字段的value为\"无\"，这表明求职者已经回答了相关问题，因此不需要再次询问。\n"
        f"6. 请直接列出你提出的问题，不需要任何其他的内容。\n"
        f"以下是JSON文件内容：\n{json_str}\n"
    )

    response = generate_response(prompt)
    return response





def concat_question(lastmessage, new_question):
    # first, use dashscope to generate a summary of the last message
    prompt = f"你是一个面试官，正在询问求职者的个人信息。"
    prompt += f"你刚刚问了这个问题：{lastmessage['question']}。"
    prompt += f"求职者的回答是：{lastmessage['answer']}。"
    prompt += f"现在你需要总结一下从这个问题和相应的回答中获得的信息。"
    prompt += f"你需要以面试官的口吻，用友好的语气，简洁地总结这个问题的回答。"
    prompt += f"请注意，你只需要返回总结的内容，不需要任何其他内容，比如解释。"

    summary = generate_response(prompt)

    # then, concatenate the summary with the new question
    summary += "接下来："
    summary += new_question
    return summary




def close_mongodb():
    client.close()





last_message, standard_json = get_chat_from_mongodb(chatId, resumeId)
json_update = update_json(standard_json, last_message)
json_update = re.sub(r"```json", '', json_update)
json_update = re.sub(r"```", '', json_update)
# json_update dtype: str
# 只保留str最外层的两个{}之内的内容，删除其他内容
json_update = extract_json(json_update)
new_query = process_asking(json_update)
final_question = concat_question(last_message, new_query)
update_mongodb(chatId, final_question, resumeId, json_update)
close_mongodb()
print(new_query)

