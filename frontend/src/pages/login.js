import React from 'react';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  return (
    <>
    <div>
        <div className="container">
            <div className="login-form">
            <div className='backward'>
                    <img src='/img/back.svg'width={40} height={40} ></img>
                    <a href='/'>返回</a>
            </div>
                <div className="text-title">登陆</div>
                <input type="text" placeholder="手机号码" />
                <input type="password" placeholder="验证码" />
                <button className='action-button'>登录</button>
                <p className="hint">未注册的手机号验证后自动创建账号</p>
                <div className='third-party'>
                  <span>第三方账号快速登录</span>
                  <img src='/img/wechat.svg' width={50}></img>
                </div>
            </div>
            <div className="info-section">
                <img src='/img/logo_y.jpg' width={190}></img>
                <div className='text-container'>
                  <div className='para'>从简历到面试，每一步都需精心准备，确保领先在起跑线！简历和面试是求职关键，充足准备才能脱颖而出。别小看每一步，从展现经历到面试应对，都至关重要。</div>
                  <div className='para'>放心，我们全程陪伴，助你求职之路更顺畅简单！</div>
                </div>
                <img src='/img/background.jpg'></img>
            </div>
        </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          min-height:100vh;
          min-width:100vw;
        }
        .third-party{
          display: flex;
          justify-content: center;
          flex-direction: column; 
          align-items: center;
          padding:10px;
          gap:20px;
        }
        .text-container{
          display: flex;
          justify-content: center;
          flex-direction: column; 
          text-align: center;
          padding:100px;
          gap:30px;
          font-size:24px;
        }
        .para{
          color:#1D80A7;
        }
        .backward {
            display: flex;
            position:fixed;
            align-items: center;
            padding-left:30px;
            padding-top:20px;
            color:white;
            left:0;
            top:0;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 50%;
          background-color: #1D80A7;
          color:white;
        }
        .text-title{
            font-size: 36px;
            font-weight:bold;
            padding: 30px;
            color:white;
        }
        input {
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 10px;
          background-color: blue;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .hint {
          font-size: 12px;
          color: white;
          border-bottom:1px solid grey;
          padding-bottom:30px;
        }
        .info-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 50%;
          align-items: center;
          background-color: white;
        }
        .info-section h1 {
          color: #333;
        }
        .info-section p {
          color: #666;
        }
        .action-button {
            padding: 8px;
            border: 1px solid #1D80A7;
            background-color: white;
            color: #1D80A7;
            cursor: pointer;
            border-radius: 10px;
            padding-left: 50px;
            padding-right: 50px;
            margin-top:100px;
            margin-bottom:20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .action-button:hover {
            background-color: #EDF8FD;
        }
      `}</style>
    </div>
    </>
  );
};

export default LoginPage;
