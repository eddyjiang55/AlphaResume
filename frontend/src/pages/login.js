import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setPhoneNumber, setId } from '../store/slices/userSlice';
import bgImg from '../../public/img/background.jpg';
import logo from '../../public/img/logo_y.jpg';
import { backIcon } from '../lib/iconLab';

const LoginPage = () => {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+86');
  const [verificationCode, setVerificationCode] = useState('');
  const [receivedCode, setReceivedCode] = useState('');
  const [message, setMessage] = useState('未注册的手机号验证后自动创建账号');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const dispatch = useDispatch();

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
        body: JSON.stringify({ phoneNumber: countryCode + phone, code: verificationCode }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Store phone number in localStorage
        dispatch(setPhoneNumber(data.phoneNumber));
        dispatch(setId(data.id));
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
    <div className="flex justify-between h-screen">
      <div className="w-1/2 bg-alpha-blue">
        <Link href='/'>
          <div className='flex items-center fixed left-0 top-0 pl-8 pt-5 text-white'>
            <div className="w-8 h-8">{backIcon}</div>
            <p className='text-lg'>返回</p>
          </div>
        </Link>
        <div className="flex flex-col justify-center items-center h-full w-full max-w-[50%] mx-auto">
          <div className="text-4xl font-bold py-8 text-white">登陆</div>
          <div className="relative mb-4">
            <select className='absolute inset-y-0 left-0 px-4 py-3 w-28 bg-white text-black rounded-l-md cursor-pointer' value={countryCode} onChange={e => setCountryCode(e.target.value)}>
              <option value="+86">+86</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input type="text" placeholder="手机号码" className="text-black pl-32 pr-4 py-3 w-full rounded-md border border-gray-300" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="relative mb-4">
            <input type="text" placeholder="验证码" className="text-black pl-4 pr-32 py-3 w-full rounded-md border border-gray-300" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            <button className={`absolute inset-y-0 right-0 px-6 text-white rounded-r-md ${phone !== "" ? "bg-blue-400" : "bg-blue-200"} transition-colors duration-100`} onClick={handleSendCode}>发送验证码</button>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-white" onClick={() => setAgreedToTerms(!agreedToTerms)}>
              同意并阅读 <Link href="/terms" className="underline">XX协议</Link>
            </label>
          </div>
          <button className='px-20 py-2 mb-5 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-50' onClick={handleLogin}>
            登录
          </button>
          <p className="text-sm mb-10 text-white">{message}</p>

          <div className="w-full border-b border-gray-300 " />
          <div className='flex flex-col items-center p-4 gap-8'>
            <span className="text-white">第三方账号快速登录</span>
            <Image src='/img/wechat.svg' width={50} height={50} alt="WeChat Login" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 bg-white">
        <Image src={logo} alt="Logo" style={{
          width: '190px',
          height: 'auto',
        }} />
        <div className='flex flex-col justify-center text-center p-24 gap-8 text-lg'>
          <p className='text-custom-blue'>从简历到面试，每一步都需精心准备，确保领先在起跑线！简历和面试是求职关键，充足准备才能脱颖而出。别小看每一步，从展现经历到面试应对，都至关重要。</p>
          <p className='text-custom-blue'>放心，我们全程陪伴，助你求职之路更顺畅简单！</p>
        </div>
        <Image src={bgImg} alt="Background" />
      </div>
    </div>
  );
};

export default LoginPage;
