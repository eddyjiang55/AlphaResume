import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const LoginPage = () => {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+86');
  const [verificationCode, setVerificationCode] = useState('');
  const [receivedCode, setReceivedCode] = useState('');
  const [message, setMessage] = useState('未注册的手机号验证后自动创建账号');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSendCode = async () => {
    if (phone.length === 0) {
      setMessage('请输入手机号');
      return;
    }
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: countryCode + phone }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('验证码已发送，请查收');
        setReceivedCode(data.response);
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
    if (!agreedToTerms) {
      setMessage('请先阅读并同意相关条款');
      return;
    }
    // Check if entered code matches the received code
    //if (verificationCode !== receivedCode) {
    //  setMessage('验证码错误');
    //  return;
    //}

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: countryCode + phone }),
      });
      const data = await response.json();
      if (response.ok) {
        // Store phone number in localStorage
        localStorage.setItem('phoneNumber', countryCode + phone);
        setMessage('登录成功');
        // Redirect to home page
        router.push('/');
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
        <div className="flex flex-col justify-center items-center w-1/2 bg-alpha-blue text-white">
          <div className='flex items-center fixed left-0 top-0 pl-8 pt-5'>
            <Image src='/img/back.svg' width={40} height={40} alt="Back" />
            <a href='/' className="text-white">返回</a>
          </div>
          <div className="text-4xl font-bold py-8">登陆</div>
          <div className="relative mb-4">
            <select className='absolute inset-y-0 left-0 px-4 py-3 w-28 bg-white text-black rounded-l-md cursor-pointer' value={countryCode} onChange={e => setCountryCode(e.target.value)}>
              <option value="+86">+86</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input type="text" placeholder="手机号码" className="text-black pl-32 pr-4 py-3 w-full rounded-md border border-gray-300" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="relative mb-4">
            <input type="password" placeholder="验证码" className="text-black pl-4 pr-32 py-3 w-full rounded-md border border-gray-300" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            <button className="absolute inset-y-0 right-0 px-6 bg-blue-200 text-white rounded-r-md" onClick={handleSendCode}>发送验证码</button>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-white" onClick={() => setAgreedToTerms(!agreedToTerms)}>
              同意并阅读 <a href="/terms" className="underline">XX协议</a>
            </label>
          </div>
          <button className='px-20 py-2 mb-5 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-50' onClick={handleLogin}>
            登录
          </button>
          <p className="text-sm mb-10 border-b border-gray-300 pb-10">{message}</p>
          <div className='flex flex-col items-center p-4 gap-8'>
            <span>第三方账号快速登录</span>
            <Image src='/img/wechat.svg' width={50} alt="WeChat Login" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-1/2 bg-white">
          <Image src='/img/Logo_y.jpg' width={190} alt="Logo" />
          <div className='flex flex-col justify-center text-center p-24 gap-8 text-lg'>
            <p className='text-custom-blue'>从简历到面试，每一步都需精心准备，确保领先在起跑线！简历和面试是求职关键，充足准备才能脱颖而出。别小看每一步，从展现经历到面试应对，都至关重要。</p>
            <p className='text-custom-blue'>放心，我们全程陪伴，助你求职之路更顺畅简单！</p>
          </div>
          <Image src='/img/background.jpg' alt="Background" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
