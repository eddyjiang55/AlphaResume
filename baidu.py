# coding=utf-8
import sys
import json
from urllib.request import urlopen, Request
from urllib.error import URLError
from urllib.parse import urlencode, quote_plus


class BaiduTTS:
    API_KEY = 'yckSmD10DlnowvSsp5nX0wzW'
    SECRET_KEY = 'Rfr42a8QgzaQvWxj3bwp19Mfy5bAZocZ'
    TTS_URL = 'http://tsn.baidu.com/text2audio'
    TOKEN_URL = 'http://aip.baidubce.com/oauth/2.0/token'
    SCOPE = 'audio_tts_post'  # Scope needed for TTS capability
    CUID = "123456PYTHON"

    def __init__(self, text, per=111, spd=5, pit=5, vol=5, aue=3):
        self.text = text
        self.per = per
        self.spd = spd
        self.pit = pit
        self.vol = vol
        self.aue = aue
        self.format = {3: "mp3", 4: "pcm", 5: "pcm", 6: "wav"}[aue]

    def fetch_token(self):
        print("Fetching token...")
        params = {'grant_type': 'client_credentials', 'client_id': self.API_KEY, 'client_secret': self.SECRET_KEY}
        post_data = urlencode(params).encode('utf-8')
        req = Request(self.TOKEN_URL, post_data)
        try:
            f = urlopen(req, timeout=5)
            result_str = f.read().decode()
        except URLError as err:
            print('Token HTTP response HTTP code: ' + str(err.code))
            result_str = err.read().decode()

        result = json.loads(result_str)
        if 'access_token' in result and 'scope' in result and self.SCOPE in result['scope'].split(' '):
            print('Token fetched successfully.')
            return result['access_token']
        else:
            raise Exception('Error fetching token.')

    def synthesize(self):
        token = self.fetch_token()
        tex = quote_plus(self.text)  # Text must be URL-encoded twice
        params = {'tok': token, 'tex': tex, 'per': self.per, 'spd': self.spd, 'pit': self.pit, 'vol': self.vol,
                  'aue': self.aue, 'cuid': self.CUID, 'lan': 'zh', 'ctp': 1}
        data = urlencode(params)

        req = Request(self.TTS_URL, data.encode('utf-8'))
        try:
            f = urlopen(req)
            result_str = f.read()
            headers = {name.lower(): value for name, value in f.headers.items()}
            has_error = 'content-type' not in headers or 'audio/' not in headers['content-type']
        except URLError as err:
            print('TTS HTTP response HTTP code: ' + str(err.code))
            result_str = err.read()
            has_error = True

        save_file = "error.txt" if has_error else 'result.' + self.format
        with open(save_file, 'wb') as of:
            of.write(result_str)

        if has_error:
            print("TTS API error: " + result_str.decode('utf-8'))
        else:
            print("Result saved as: " + save_file)


if __name__ == '__main__':
    text = "接下来我们开始面试。"
    tts = BaiduTTS(text)
    tts.synthesize()
