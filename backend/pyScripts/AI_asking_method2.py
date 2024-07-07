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



    return last_message, standard_json, section_id


def ask_new_question(updated_json):
    prompt = f"你是一个面试官，正在询问求职者的个人信息。"
    prompt += f'现在你正在询问的是有关求职者{keys_list[section_id]}这一块的内容。'
    #prompt += f"我还有一个优先级列表，包含了这一部分里所需必填项的信息。"
    prompt += f"目前，你发现这个求职者的当前栏目下的{current_key}是空的。请你提出一个问题，告诉求职者这些栏目是空的，需要他们填写。"
    prompt += f"请在这个问题中包含目前询问的是哪一块的内容，和对这几个空缺值的具体描述。"
    prompt += f"你只需要返回问题本身，不需要任何其他内容，比如解释。"
    #prompt += f"以下是json文件内容：{updated_json}"
    #prompt += f"以下是优先级顺序：{priority_json[list(priority_json.keys())[section_id]]}"

    response = dashscope.Generation.call(
        model=dashscope.Generation.Models.qwen_max,
        prompt=prompt,
        seed=1234,
        top_p=0.2,
        result_format='text',
        enable_search=False,
        max_tokens=2000,
        temperature=0.1,
        repetition_penalty=1.0
    )

    if response.status_code == HTTPStatus.OK:
        #print(response.usage)  # The usage information
        return response.output['text']  # The output text
    else:
        print(response.code)  # The error code.
        print(response.message)  # The error message.


def find_all_empty(updated_json):



    return empty_keys

def process_asking(json_datastandard_json):
    current_key, section_new = find_all_empty(standard_json, json_data, section_id)
    new_question = ask_new_question(section_new, keys_list[section_id], section_id, current_key)
    return new_question 







def update_json(original_json, last_chat):
    prompt = (f"我有一段对话和一个有一部分填空的json文件。请你判断这段对话中包含的信息能填入json文件的哪里,然后更新这个json。''"
              f"如果对话的回答中希望跳过某一个部分，或者特别说明并无这部分的信息，请在这个部分的值中填入'无'，而不是空字符串。"
              f"请注意，如果问题中没有提到的键，和回答中没有特别说明并无这部分信息的键，请不要擅自填充无，而是保持为空。"
              f"你需要返回一个完整的json文件。不需要加任何注释。以下是对话内容：{last_chat}")
    prompt += f"以下是json文件内容：{original_json}"

    response = dashscope.Generation.call(
        model=dashscope.Generation.Models.qwen_max,
        prompt=prompt,
        seed=1234,
        top_p=0.2,
        result_format='text',
        enable_search=False,
        max_tokens=2000,
        temperature=0.1,
        repetition_penalty=1.0
    )

    if response.status_code == HTTPStatus.OK:
        # print(response.usage)  # The usage information
        #print(response.output['text'])
        return response.output['text']  # The output text
    else:
        print(response.code)  # The error code.
        print(response.message)  # The error message.


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







def close_mongodb():
    client.close()





last_message, standard_json, section_id = get_chat_from_mongodb(chatId, resumeId)
json_update = update_json(standard_json, last_message)
json_update = re.sub(r"```json", '', json_update)
json_update = re.sub(r"```", '', json_update)
# json_update dtype: str
# 只保留str最外层的两个{}之内的内容，删除其他内容
json_update = extract_json(json_update)
new_query = process_asking(json_update)
update_mongodb(chatId, new_query, resumeId, json_update)
close_mongodb()
print(new_query)

