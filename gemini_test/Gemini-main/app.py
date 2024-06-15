from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, emit
import io
from google.oauth2 import service_account
from google.cloud import speech

app = Flask(__name__)
socketio = SocketIO(app, async_mode='eventlet')  # Use eventlet as the async_mode


# Instantiates a client
client_file = 'speech_test.json'
credentials = service_account.Credentials.from_service_account_file(client_file)
client = speech.SpeechClient(credentials=credentials)


from google.cloud import speech

def speech_to_text(
    config: speech.RecognitionConfig,
    audio: speech.RecognitionAudio,
    client: speech.SpeechClient = client,
) -> speech.RecognizeResponse:

    # Synchronous speech recognition request
    response = client.recognize(config=config, audio=audio)

    return response

def record_audio(seconds: int, rate: int, chunk: int) -> bytes:
    audio = pyaudio.PyAudio()
    stream = audio.open(format=pyaudio.paInt16, channels=1,
                        rate=rate, input=True,
                        frames_per_buffer=chunk)
    print("recording...")
    frames = []
    for i in range(0, int(rate / chunk * seconds)):
        data = stream.read(chunk)
        frames.append(data)
    print("finished recording")
    stream.stop_stream()
    stream.close()
    audio.terminate()
    return b''.join(frames)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('start_voice_chat')
def handle_start_voice_chat():
    global currentQuestionIndex
    global questions_and_answers
    global response

    if currentQuestionIndex < len(questions_and_answers):
        question = questions_and_answers[currentQuestionIndex]['question']
        emit('update_chat', {'message': f'Question: {question}'}, broadcast=True)

        recognition = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=16000,
            language_code="zh",
            enable_automatic_punctuation=True,
        )

        audio_data = record_audio(5, 16000, 1024)
        audio_data = io.BytesIO(audio_data).read()
        audio = speech.RecognitionAudio(content=audio_data)

        processing_results = speech_to_text(recognition, audio, client=client)
        audio_text = processing_results.results[0].alternatives[0].transcript

        questions_and_answers[currentQuestionIndex]['answer'] = audio_text
        emit('update_chat', {'message': f'Your Answer: {audio_text}'}, broadcast=True)

        if currentQuestionIndex < len(questions_and_answers) - 1:
            currentQuestionIndex += 1
            handle_start_voice_chat()
        else:
            import google.generativeai as genai

            try:
                GOOGLE_API_KEY = 'AIzaSyB7SJgchIkpYEADFgGYKXTIm9QH0VUIfpQ'
                genai.configure(api_key=GOOGLE_API_KEY)
            except Exception as e:
                raise e
            import logging
            logging.basicConfig(level=logging.DEBUG)  # Add this line at the beginning of your script

            model = genai.GenerativeModel('gemini-pro')
            prompt = '''You are an experienced HR. Now you will receive a bunch of questions and answers from a 
            candidate. Your task is to evaluate the candidate's answers and provide feedback. The candidate's answers 
            are as follows:'''
            var = "\n\n".join([f"Question: {qa['question']}\nAnswer: {qa['answer']}" for qa in questions_and_answers])
            prompt = f"{prompt}\n\n{var}\n\nFeedback:"
            print("Before setting response:", response)
            response = model.generate_content(prompt).text
            print("After setting response:", response)
            emit('show_results', {'questions_and_answers': questions_and_answers, 'response': response}, broadcast=True)
            emit('disable_voice_chat', broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)

