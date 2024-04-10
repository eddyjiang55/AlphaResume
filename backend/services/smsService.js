// services/smsService.js

const SMSClient = require('@alicloud/sms-sdk');

// 初始化SMSClient
const smsClient = new SMSClient({
  accessKeyId: '',
  secretAccessKey: '',
});

// 发送短信的函数
function sendSms(phoneNumbers, signName, templateCode, templateParam) {
  return smsClient.sendSMS({
    PhoneNumbers: phoneNumbers,
    SignName: signName,
    TemplateCode: templateCode,
    TemplateParam: templateParam,
  });
}
function generateVerificationCode(length = 6) {
    // 生成六位数的验证码
    const code = Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
    return code;
  }
  

module.exports = { sendSms,generateVerificationCode };