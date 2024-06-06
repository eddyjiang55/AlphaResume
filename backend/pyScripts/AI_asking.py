import json
from http import HTTPStatus
import dashscope
import time
dashscope.api_key='sk-3c43423c9fee4af8928fd8bc647291ee'
import re
from pymongo import MongoClient






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

    chat_messages = chat_record['messages']

    standard_json = chat_record['personal_info']

    # 获取最后一条消息. 格式是mock_qa.json里的格式
    last_message = chat_messages['questions'][-1]


    return last_message, standard_json

last_message, standard_json = get_chat_from_mongodb()

def qwen_asking():
    prompt = f"我有一段对话和一个有一部分填空的json文件。请你判断这段对话中包含的信息能填入json文件的哪里,然后更新这个json。你需要返回一个完整的json文件。以下是对话内容：{last_message}"
    prompt += f"以下是json文件内容：{standard_json}"

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


json_update = qwen_asking()
json_update = re.sub(r"```json",'',json_update)
json_update = re.sub(r"```",'',json_update)


def extract_json(data_str):
    # 使用正则表达式找到最外层的大括号
    matches = re.search(r'{.*}', data_str, re.S)
    if matches:
        json_str = matches.group(0)
        print(json_str)
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

# json_update dtype: str
# 只保留str最外层的两个{}之内的内容，删除其他内容
json_update = extract_json(json_update)





print(json_update)



def update_mongodb():
    uri = "mongodb+srv://leoyuruiqing:WziECEdgjZT08Xyj@airesume.niop3nd.mongodb.net/?retryWrites=true&w=majority&appName=AIResume"
    # Create a new client and connect to the server
    client = MongoClient(uri)
    database_name = "airesumedb"
    collection_name = "resumeChats"

    db = client[database_name]
    collection = db[collection_name]

    user_account = "+8613387543505"

    chat_record = collection.find_one({"userAccount": user_account})

    chat_record['personal_info'] = json_update

    collection.update_one({"userAccount": user_account}, {"$set": chat_record})

    client.close()


#update_mongodb()

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



def new_question():
    prompt = f"你是一个面试官，现在我给你一个json文件，是一个求职者的个人信息json文档。里面有一些信息是不完整的。"
    prompt += f"我还有一个优先级列表，包含了所有是必填项的key的名字。"
    prompt += f"请你根据优先级列表，从json文件中找到优先级最高的key，然后提出一个问题，让求职者填写这个key。"
    prompt += f"你只需要返回问题本身，不需要任何其他内容，比如解释。"
    prompt += f"以下是json文件内容：{json_update}"
    prompt += f"以下是优先级顺序：{priority}"

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


new_question = new_question()
print(new_question)


