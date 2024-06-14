import json
from http import HTTPStatus
import dashscope
import time
dashscope.api_key='sk-3c43423c9fee4af8928fd8bc647291ee'
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
client = MongoClient(MONGODB_URL)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]
collection_1 = db[COLLECTION_NAME_1]

priority = {
    "基础信息": {
        "简历标题": "简历标题",
        "姓名": "姓名",
        "手机号码": "手机号码",
        "邮箱": "邮箱"
    },
    "教育经历": {
        "学历": "学历",
        "学校名称": "学校名称",
        "起止时间": "起止时间",
        "院系": "院系",
        "专业": "专业"
    },
    "职业经历": {
        "公司名称": "公司名称",
        "城市": "城市",
        "起止时间": "起止时间",
        "职位": "职位",
        "职责": "职责"
    },
    "项目经历": {
        "项目名称": "项目名称",
        "城市": "城市",
        "起止时间": "起止时间",
        "角色": "角色",
        "项目成就": "项目成就",
        "项目描述": "项目描述",
        "项目职责": "项目职责"
    },
    "获奖与证书": {
        "奖项名称": "奖项名称",
        "获奖时间": "获奖时间",
        "颁奖机构": "颁奖机构",
        "证书名称": "证书名称",
        "颁发机构": "颁发机构",
        "取得时间": "取得时间"
    },
    "科研论文与知识产权": {
        "论文标题": "论文标题",
        "作者排序": "作者排序",
        "期刊/会议": "期刊/会议",
        "出版时间": "出版时间",
        "专利名称": "专利名称",
        "专利号": "专利号",
        "申请/授权日期": "申请/授权日期"
    },
    "技能": {
        "技能名称": "技能名称",
        "熟练度": "熟练度"
    },
    "语言": {
        "语言": "语言",
        "熟练度": "熟练度"
    }
}

chatId = sys.argv[1]
resumeId = sys.argv[2]

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

    return last_message, standard_json

def qwen_asking(original_json, last_chat):
    prompt = f"我有一段对话和一个有一部分填空的json文件。请你判断这段对话中包含的信息能填入json文件的哪里,然后更新这个json。你需要返回一个完整的json文件。以下是对话内容：{last_chat}"
    prompt += f"以下是json文件内容：{original_json}"

    response = dashscope.Generation.call(
        model=dashscope.Generation.Models.qwen_max,
        prompt= prompt,
        seed = 1234,
        top_p = 0.2,
        result_format = 'text',
        enable_search = False,
        max_tokens = 2000,
        temperature = 0.1,
        repetition_penalty = 1.0
    )

    if response.status_code == HTTPStatus.OK:
        # print(response.usage)  # The usage information
        print(response.output['text'])
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
        except json.JSONDecodeError:
            print("找到的字符串不是有效的 JSON。")
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

def new_question(updated_json, priority_json):
    prompt = f"你是一个面试官，现在我给你一个json文件，是一个求职者的个人信息json文档。里面有一些信息是空的。"
    prompt += f"我还有一个优先级列表，包含了所有是必填项的json的键名。"
    prompt += f"请你从头开始遍历优先级列表，并查看json中对应的值是否是空值。找到第一个对应值为空的键，然后提出一个针对性的问题，让求职者填写这个空缺值。"
    prompt += f"你只需要返回问题本身，不需要任何其他内容，比如解释。"
    prompt += f"以下是json文件内容：{updated_json}"
    prompt += f"以下是优先级顺序：{priority_json}"

    response = dashscope.Generation.call(
        model=dashscope.Generation.Models.qwen_max,
        prompt= prompt,
        seed = 1234,
        top_p = 0.2,
        result_format = 'text',
        enable_search = False,
        max_tokens = 2000,
        temperature = 0.1,
        repetition_penalty = 1.0
    )

    if response.status_code == HTTPStatus.OK:
        print(response.usage)  # The usage information
        return response.output['text']  # The output text
    else:
        print(response.code)  # The error code.
        print(response.message)  # The error message.
        
def close_mongodb():
    client.close()

last_message, standard_json = get_chat_from_mongodb(chatId, resumeId)
json_update = qwen_asking(standard_json, last_message)
json_update = re.sub(r"```json",'',json_update)
json_update = re.sub(r"```",'',json_update)
# json_update dtype: str
# 只保留str最外层的两个{}之内的内容，删除其他内容
json_update = extract_json(json_update)
new_question = new_question(json_update, priority)
update_mongodb(chatId, new_question, resumeId, json_update)
close_mongodb()
print(new_question)


