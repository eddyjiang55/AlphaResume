import base64
import hashlib
import hmac
import json
import os
import time
import requests
import urllib

lfasr_host = 'https://raasr.xfyun.cn/v2/api'
# 请求的接口名
api_upload = '/upload'
api_get_result = '/getResult'


class RequestApi(object):
    def __init__(self, appid, secret_key, upload_file_path):
        self.appid = appid
        self.secret_key = secret_key
        self.upload_file_path = upload_file_path
        self.ts = str(int(time.time()))
        self.signa = self.get_signa()

    def get_signa(self):
        appid = self.appid
        secret_key = self.secret_key
        m2 = hashlib.md5()
        m2.update((appid + self.ts).encode('utf-8'))
        md5 = m2.hexdigest()
        md5 = bytes(md5, encoding='utf-8')
        # 以secret_key为key, 上面的md5为msg， 使用hashlib.sha1加密结果为signa
        signa = hmac.new(secret_key.encode('utf-8'), md5, hashlib.sha1).digest()
        signa = base64.b64encode(signa)
        signa = str(signa, 'utf-8')
        return signa

    def upload(self):
        upload_file_path = self.upload_file_path
        # upload_file_path is already a wav base64 string
        file_len = len(upload_file_path)

        param_dict = {}
        param_dict['appId'] = self.appid
        param_dict['signa'] = self.signa
        param_dict['ts'] = self.ts
        param_dict["duration"] = "200"

        response = requests.post(url=lfasr_host + api_upload + "?" + urllib.parse.urlencode(param_dict),
                                 headers={"Content-type": "application/json"}, data=upload_file_path)
        result = json.loads(response.text)
        return result

    def get_result(self):
        uploadresp = self.upload()
        orderId = uploadresp['content']['orderId']
        param_dict = {}
        param_dict['appId'] = self.appid
        param_dict['signa'] = self.signa
        param_dict['ts'] = self.ts
        param_dict['orderId'] = orderId
        param_dict['resultType'] = "transfer,predict"
        status = 3
        # 建议使用回调的方式查询结果，查询接口有请求频率限制
        while status == 3:
            response = requests.post(url=lfasr_host + api_get_result + "?" + urllib.parse.urlencode(param_dict),
                                     headers={"Content-type": "application/json"})
            # print("get_result_url:",response.request.url)
            result = json.loads(response.text)
            status = result['content']['orderInfo']['status']
            if status == 4:
                break
            time.sleep(5)
        # 提取orderResult字段的值，并将其转换为字典
        order_result_dict = json.loads(result['content']['orderResult'])

        # 提取lattice字段中每个json_1best的值，并拼接w对应的字符
        concatenated_text = ''
        for lattice_entry in order_result_dict['lattice']:
            json_1best_value = json.loads(lattice_entry['json_1best'])
            ws_list = json_1best_value['st']['rt'][0]['ws']
            for word in ws_list:
                concatenated_text += word['cw'][0]['w']


        return concatenated_text


# 输入讯飞开放平台的appid，secret_key和待转写的文件路径
if __name__ == '__main__':
    api = RequestApi(appid="80922260",
                     secret_key="84268ea312aee377ace0b8468633bd0a",
                     upload_file_path=r"test1-1.wav")

    result = api.get_result()
    print(result)
