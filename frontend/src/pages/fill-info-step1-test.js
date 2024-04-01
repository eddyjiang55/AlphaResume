import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const router = useRouter();

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
          firstName: data.name.firstName,
          lastName: data.name.lastName,
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

  const buttons = [
    { name: "基础信息", path: "/fill-info-step1" },
    { name: "个人评价", path: "/fill-info-step2" },
    { name: "教育经历", path: "/fill-info-step3" },
    { name: "职业经历", path: "/fill-info-step4" },
    { name: "项目经历", path: "/fill-info-step5" },
    { name: "获奖与证书", path: "/fill-info-step6" },
    { name: "科研论文与知识产权", path: "/fill-info-step7" },
    { name: "技能", path: "/fill-info-step8" },
    { name: "语言", path: "/fill-info-step9" },
    { name: "结束", path: "/fill-info-step10" }
  ];

  return (
    <div>
      <Navbar />
      {/* 导航栏和其他 UI 元素 */}
      <div className="form-body">
        <form>
          {/* 省略其他表单元素... */}
          <input type="text" name="firstName" placeholder="名" value={form.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="姓" value={form.lastName} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="请输入手机号码" value={form.phone} onChange={handleChange} />
          <input type="email" name="email" placeholder="请输入邮箱地址" value={form.email} onChange={handleChange} />
          {/* 其他表单元素 */}
        </form>
      </div>
    </div>
  );
};

export default HomePage;
