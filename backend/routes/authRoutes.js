const express = require('express');
const router = express.Router();
const { sendSms, generateVerificationCode } = require('../services/smsService');
const Account= require('../mongodb/models/Account'); 

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

router.post('/login', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
      let account = await Account.findByPhoneNumber(phoneNumber);
      if (!account) {
          // 如果没有找到账户，创建一个新的账户
          const newAccountId = await Account.create({
              phoneNumber,
              nickname: '新用户', // 默认昵称，可以根据需要修改
              avatar: '', // 默认头像为空
              improvedUsers: [] // 新账户没有改进的用户数据
          });
          // account = await Account.findById(newAccountId);
          res.status(201).json({ message: '新账户已创建'});
      } else {
          res.status(200).json({ message: '成功登录', account });
      }
  } catch (error) {
      console.error('登录失败:', error);
      res.status(500).json({ message: '登录失败', error: error.toString() });
  }
});

module.exports = router;