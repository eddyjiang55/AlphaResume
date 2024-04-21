import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import ResumeNavbar from '../components/resume-navbar';

const Step1Page = () => {

  // 使用 useState 钩子初始化表单状态
  const [form, setForm] = useState({
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    wechat: ''
  });

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      uploadFile(files[0]);
    }
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('pdfFile', file);

    fetch('http://localhost:8000/api/resume-info', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Upload successful:', data);
        // 使用上传成功的数据更新表单状态
        setForm({
          ...form, // 保留其他表单项
          firstName: data.givenName,
          lastName: data.surname,
          phone: data.phones[0],
          email: data.emails[0],
          wechat: data.wechats[0]
        });
      })
      .catch(error => {
        console.error('Upload error:', error);
      });
  };

  // 更新表单字段的处理函数
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className='bg-[#EDF8FD] w-full h-screen flex flex-col'>
      <Navbar />
      <ResumeNavbar />
      <div className="flex-grow w-full max-w-[960px] mx-auto flex flex-col justify-between">
        <div>
          <div className="w-full mt-8">
            <div className='w-auto mx-auto flex flex-row justify-center items-center gap-x-10'>
              <span className="info-text">若已有简历，上传简历我们帮您解析：</span>
              <button className="info-button" onDragOver={handleDragOver} onDrop={handleDrop}>
                <img src="/img/upload.svg" alt="Icon" className="button-icon" /> {/* 图片图标 */}
                拖曳文件到此处上传
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-6">
            <div className='flex flex-col justify-center items-center gap-y-6 my-4'>
              <h2 className='text-alpha-blue font-bold text-4xl'>请输入以下空格</h2>
              <p className='text-base text-black'>在填写简历时，若您认为某些内容非必要，请自由选择性省略。</p>
            </div>
            <form className='h-full flex-grow flex flex-col justify-between'>
              <label>简历标题</label>
              <input type="title" placeholder="请输入简历标题" />
              <div className='text-black text-base'>
                此项内容不会出现在简历上，仅用于后续识别您的简历
              </div>
              <div className="w-full flex flex-row justify-between items-center gap-x-16">
                <div className="w-full flex flex-col justify-start items-stretch">
                  <label>姓</label>
                  <input type="text" name="lastName" placeholder="请输入姓氏" value={form.lastName} onChange={handleChange} />
                </div>
                <div className="w-full flex flex-col justify-start items-stretch">
                  <label>名</label>
                  <input type="text" name="firstName" placeholder="请输入名字" value={form.firstName} onChange={handleChange} />
                </div>
              </div>

              <label>手机号码</label>
              <input type="tel" name="phone" placeholder="请输入手机号码" value={form.phone} onChange={handleChange} />

              <label>邮箱</label>
              <input type="email" name="email" placeholder="请输入邮箱地址" value={form.email} onChange={handleChange} />

              {/* ... 新增 ... */}
              <label>微信号</label>
              <input type="text" name="wechatId" placeholder="请输入微信号" value={form.email} onChange={handleChange} />
              {/* ... 其他表单元素 ... */}
            </form>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-x-20 p-4 mb-28">
          <button className='form-b'>保存</button>
          <Link href='/fill-info-step2'><button className='form-b' type="button">下一步</button> </Link>
        </div>
      </div>
      <style jsx>{`
        .background{
          background-color: #EDF8FD;
          min-height:100vh;
          display: flex;
          flex-direction: column; // 设置 flex 方向为垂直
          align-items: center; // 水平居中对齐子元素
          padding:20px;
        }
        .form-container {
          width:100%;
          max-width:500px;
        }
        .form-heading h2,
        .form-description p {
          text-align: center;
        }
        .form-heading h2 {
          color: #1D80A7;
          font-weight:bold;
          font-size:40px;
        }
        .form-description{
          padding-bottom:20px;
        }
        .form-body form {
          display: flex;
          flex-direction: column;
        }
        .input-group {
          display: flex;
          justify-content: center;
          gap:100px;
        }
        .ps{
          color:grey;
          padding-bottom:10px;
        }
        .input-item {
        }
        .input-item:last-child {
        }
        label {
          margin-top: 10px;
          font-weight:bold;
        }
        input[type="title"],
        input[type="text"],
        input[type="tel"],
        input[type="email"] {
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        .form-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .form-b {
          padding: 10px 100px;
          border: none;
          border-radius: 30px;
          color: white;
          background-color: #1D80A7; /* Bootstrap 蓝色按钮颜色 */
          cursor: pointer;
        }
        .form-b:hover {
          background-color: #B2DDEE;
          color:black;
        }
        .secondNavbar {
          display: flex;
          justify-content: space-around;
          padding: 20px 0;
          background-color: #B2DDEE;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
        }
        .secondNavbar button {
          flex-grow: 1;
          padding: 10px 20px;
          border-radius: 15px;
          background: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          color:black;
        }
        .secondNavbar button:hover, .secondNavbar button:focus {
          background-color: #1D80A7;
          color:white;
        }
        .secondNavbar .active {
          background-color: #1D80A7; /* 激活按钮的背景颜色 */
          color: white; /* 激活按钮的文本颜色 */
          font-weight:bold;
        }
        .info-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px
          border-radius: 4px;
          margin: 10px 0;
          width:100%;
          max-width:800px;
          color:#1D80A7;
        }
        .info-text {
          font-weight:bold;
        }
        .info-button {
          display: flex;
          align-items: center;
          padding: 0 50px;
          border: #1D80A7 1px solid;
          border-radius: 4px;
          cursor: pointer;
        }
        .button-icon {
          margin-right: 8px;
          width: 50px; // 调整图标大小
          height: 50px; // 调整图标大小
        }
      `}</style>
    </div>
  );
};

export default Step1Page;



