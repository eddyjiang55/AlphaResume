import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';
import ResumeNavbar from '../components/resume-navbar';

export async function getServerSideProps(context) {
  let dbFormData = {};
  if (context.query.id) {
    // Fetch dbFormData from external API
    const res = await fetch(`http://localhost:8000/api/improved-users/${context.query.id}/basicInformation`)
    dbFormData = await res.json();
  } else {
    const res = await fetch('http://localhost:8000/api/improved-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
    dbFormData = await res.json()
    return { redirect: { destination: `/fill-info-step1?id=${data._id}`, permanent: false } }
  }
  // Pass data to the page via props
  return { props: { dbFormData } }
}

export default function Step1Page({ dbFormData }) {
  const router = useRouter();

  // 使用 useState 钩子初始化表单状态
  const [form, setForm] = useState(dbFormData.data || {
    title: '',
    名: '',
    姓: '',
    电话号码: '',
    邮箱地址: '',
    微信号: ''
  });

  const [error, setError] = useState(false);

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
          名: data.givenName,
          姓: data.surname,
          电话号码: data.phones[0],
          邮箱地址: data.emails[0],
          微信号: data.wechats[0]
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

  const handleSubmit = () => {
    // 检查是否有必填项未填写
    if (!form.title || !form.名 || !form.姓 || !form.电话号码 || !form.邮箱地址 || !form.微信号) {
      setError(true);
      return;
    }

    // 发送表单数据到后端
    fetch('http://localhost:8000/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: dbFormData._id,
        type: 'basicInformation',
        data: form,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Save successful:', data);
        router.push(`/fill-info-step2?id=${dbFormData._id}`);
      })
      .catch(error => {
        console.error('Save error:', error);
      });
  }

  const handleSave = () => {
    // 发送表单数据到后端
    fetch('http://localhost:8000/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: '6621e0f77b5f95efede7b4fc',
        type: 'basicInformation',
        data: form,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Save successful:', data);
      })
      .catch(error => {
        console.error('Save error:', error);
      });
  }

  return (
    <div className='bg-[#EDF8FD] w-full h-screen flex flex-col relative'>
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
              <label>*简历标题</label>
              <input type="title" name="title" placeholder="请输入简历标题" value={form.title} onChange={handleChange} />
              <div className='text-black text-base'>
                此项内容不会出现在简历上，仅用于后续识别您的简历
              </div>
              <div className="w-full flex flex-row justify-between items-center gap-x-16">
                <div className="w-full flex flex-col justify-start items-stretch">
                  <label>*姓</label>
                  <input type="text" name="姓" placeholder="请输入姓氏" value={form.姓} onChange={handleChange} />
                </div>
                <div className="w-full flex flex-col justify-start items-stretch">
                  <label>*名</label>
                  <input type="text" name="名" placeholder="请输入名字" value={form.名} onChange={handleChange} />
                </div>
              </div>

              <label>*手机号码</label>
              <input type="tel" name="电话号码" placeholder="请输入手机号码" value={form.电话号码} onChange={handleChange} />

              <label>*邮箱</label>
              <input type="email" name="邮箱地址" placeholder="请输入邮箱地址" value={form.邮箱地址} onChange={handleChange} />

              {/* ... 新增 ... */}
              <label>*微信号</label>
              <input type="text" name="微信号" placeholder="请输入微信号" value={form.微信号} onChange={handleChange} />
              {/* ... 其他表单元素 ... */}
            </form>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-x-20 p-4 mb-28">
          <button className='form-b' onClick={handleSave}>保存</button>
          <button className='form-b' type="button" onClick={handleSubmit}>下一步</button>
        </div>
      </div>
      {error && <div className='fixed left-[calc(50%-20px)] top-1/2 w-80 h-auto rounded-lg bg-white border border-alpha-blue flex flex-col justify-center items-stretch -translate-x-1/2 -translate-y-1/2'>
        <p className='text-base font-bold text-wrap text-center py-4 px-4'>本页存在必填项未填写，请检查并完成所有*标记项后重试。</p>
        <div className='w-full border border-alpha-blue ' />
        <button className='py-2 px-4 text-base' onClick={() => setError(false)}>了解</button>
      </div>}
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
}


