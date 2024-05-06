const express = require('express');
const router = express.Router();
const { sendSms, generateVerificationCode } = require('../services/smsService');

// 假设你有一个用于发送验证码的路由
router.post('/send-verification-code', async (req, res) => {
  const { phoneNumber } = req.body;
  // 这里填写你的签名和模板信息
  const signName = '智芝全AI简历';
  const templateCode = 'SMS_465423748';
  const verificationCode = generateVerificationCode();
  console.log(verificationCode);
  const templateParam = JSON.stringify({ code: verificationCode }); // 你的验证码
  console.log("Sending SMS to phone number:", phoneNumber);

  try {
    const response = await sendSms(phoneNumber, signName, templateCode, templateParam);
    res.status(200).json({ message: '验证码已发送', response });
  } catch (error) {
    res.status(500).json({ message: '发送验证码失败', error: error.toString() });
  }
});

module.exports = router;