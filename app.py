from flask import Flask, render_template, request, jsonify
import speech_recognition as sr
import pyttsx3

app = Flask(__name__)

# 语音识别函数
def listen_to_audio(audio_file):
    r = sr.Recognizer()
    with sr.AudioFile(audio_file) as source:
        audio = r.record(source)

    try:
        text = r.recognize_google(audio, language='zh-CN')  # 使用Google语音识别API
        return text
    except sr.UnknownValueError:
        return "对不起，无法理解您说的话。"
    except sr.RequestError:
        return "抱歉，无法连接到Google API。"

# 语音合成函数
def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/process_audio', methods=['POST'])
def process_audio():
    data = request.get_json()

    if 'answers' in data:
        answers = data['answers']
        # Process answers as needed
        # You can access individual answers like: answers['question1'], answers['answer1'], etc.

        # For demonstration purposes, let's just return a JSON string containing the answers
        response_data = {'text': json.dumps(answers)}
        return jsonify(response_data)
    else:
        return jsonify({'text': 'Invalid data format'})

if __name__ == '__main__':
    app.run(debug=True)
