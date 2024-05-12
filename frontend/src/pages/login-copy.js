import React, { useState } from 'react';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+86');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('未注册的手机号验证后自动创建账号');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSendCode = async () => {
    if (phone.length === 0) {
      setMessage('请输入手机号');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: countryCode + phone }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('验证码已发送，请查收');
      } else {
        setMessage(data.message || '发送验证码失败');
      }
    } catch (error) {
      setMessage('网络错误，请稍后重试');
    }
  };

  const handleLogin = async () => {
    if (!verificationCode) {
      setMessage('请输入验证码');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: countryCode + phone, verificationCode: verificationCode }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('登录成功');
        // Here you might handle further logic such as redirection or storing tokens
      } else {
        setMessage(data.message || '登录失败');
      }
    } catch (error) {
      setMessage('网络错误，请稍后重试');
    }
  };

  return (
    <>
      <div className="flex justify-between min-h-screen">
        ...
        <button className='px-20 py-2 mb-5 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-50' onClick={handleLogin}>
          登录
        </button>
        <p className="text-sm mb-10 border-b border-gray-300 pb-10">{message}</p>
        ...
      </div>
    </>
  );
};

export default LoginPage;
