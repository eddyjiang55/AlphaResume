import io
from google.oauth2 import service_account
from google.cloud import speech

# Instantiates a client
client_file = 'speech_test.json'
credentials = service_account.Credentials.from_service_account_file(client_file)
client = speech.SpeechClient(credentials=credentials)


# configure gemini api key
import os
os.environ['GOOGLE_API_KEY'] = 'AIzaSyB7SJgchIkpYEADFgGYKXTIm9QH0VUIfpQ'


from google.cloud import speech

def speech_to_text(
    config: speech.RecognitionConfig,
    audio: speech.RecognitionAudio,
    client: speech.SpeechClient = client,
) -> speech.RecognizeResponse:

    # Synchronous speech recognition request
    response = client.recognize(config=config, audio=audio)

    return response

def print_response(response: speech.RecognizeResponse):
    for result in response.results:
        print_result(result)

def print_result(result: speech.SpeechRecognitionResult):
    best_alternative = result.alternatives[0]
    print("-" * 80)
    print(f"language_code: {result.language_code}")
    print(f"transcript:    {best_alternative.transcript}")
    print(f"confidence:    {best_alternative.confidence:.0%}")

# config for speech recognition; modify language here & other params
config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=16000,
    language_code="zh",
    enable_automatic_punctuation=True,
)



# record audio
import pyaudio

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
    return b"".join(frames)


# test recording
audio = record_audio(10, 16000, 1024)
# with a dict: google.cloud.speech.v1.RecognizeRequest, so need to convert to bytes
audio = io.BytesIO(audio).read()
audio = speech.RecognitionAudio(content=audio)

processing_results = speech_to_text(config, audio, client=client)
audio_text = processing_results.results[0].alternatives[0].transcript



# save audio to file
import wave

def save_audio_to_file(audio: bytes, filename: str, rate: int):
    with wave.open(filename, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(rate)
        wf.writeframes(audio)

#save_audio_to_file(audio, "test.wav", 16000)





import google.generativeai as genai


try:
  GOOGLE_API_KEY=os.environ.get('GOOGLE_API_KEY')
  genai.configure(api_key=GOOGLE_API_KEY)
except Exception as e:
    raise e

model = genai.GenerativeModel('gemini-pro')



response = model.generate_content(audio_text)
# from IPython.display import Markdown
# import textwrap
# def to_markdown(text):
#   text = text.replace('•', '  *')
#   return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))
#
# result = to_markdown(response['content'])

print(response.text)
print(audio_text)