from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, emit
import io
from google.oauth2 import service_account
from google.cloud import speech


from google.cloud import speech

import google.generativeai as genai

try:
    GOOGLE_API_KEY = 'AIzaSyB7SJgchIkpYEADFgGYKXTIm9QH0VUIfpQ'
    genai.configure(api_key=GOOGLE_API_KEY)
except Exception as e:
    raise e
import logging

logging.basicConfig(level=logging.DEBUG)  # Add this line at the beginning of your script

model = genai.GenerativeModel('gemini-pro')

# from folder Interview_score read improved_cv.md, interview_data.json and interview_scoring_criteria.json
import os
import json


with open('Interview_score/improved_cv.md', encoding='utf-8') as file:
    improved_cv = file.read()

# read interview_data.json as a dictionary, using gbk encoding
with open('Interview_score/interview_data.json', encoding='utf-8') as json_file:
    interview_data = json.load(json_file)

# read interview_scoring_criteria.json as a dictionary
with open('Interview_score/interview_scoring_criteria.json', encoding='utf-8') as json_file:
    interview_scoring_criteria = json.load(json_file)

# read interview_report.json as a dictionary
with open('Interview_score/interview_report.json', encoding='utf-8') as json_file:
    interview_report = json.load(json_file)

prompt = '''
你是一位经验丰富的HR。现在，根据一位求职者的面试回答、简历，以及面试评分标准，你需要撰写一份详细的面试报告。

首先，我将向你提供该求职者的简历。
''' + str(improved_cv) + '''
接下来，我将呈现求职者的面试问答表现。
''' + str(interview_data) + '''
然后，我会提供面试评分标准。除了按照标准中的每一项对求职者进行评分外，你还需要根据面试问答表现，对求职者进行不少于三点的综合评价，和对他面试技巧，过往经历的不少于5点的建议。
''' + str(interview_scoring_criteria) + '''
现在，你可以开始撰写面试报告了。你的反馈将是json格式的。
'''


response = model.generate_content(prompt).text
print(response)
# convert response to a json
response = json.loads(response)
# save response to interview_report.json
with open('Interview_score/interview_report_gemini.json', 'w', encoding='utf-8') as json_file:
    json.dump(response, json_file, ensure_ascii=False, indent=4)



#response = model.generate_content(prompt).text


