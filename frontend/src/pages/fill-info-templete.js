import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // 导入 useRouter 钩子
import Navbar from '../components/Navbar';

const HomePage = () => {
  const router = useRouter(); // 使用 useRouter 钩子获取当前路由信息
  const buttons = [
    { name: "基础信息", path: "/fill-info-step1" },
    { name: "个人评价", path: "/fill-info-step2" },
    { name: "教育经历", path: "/fill-info-step3" },
    { name: "项目经历", path: "/fill-info-step4" },
  ];

  return (
    <div>
      <Navbar />
      <div className="secondNavbar">
        {buttons.map((button) => (
          <Link key={button.name} href={button.path} passHref>
            <button className={router.pathname === button.path ? 'active' : ''}>
              {button.name}
            </button>
          </Link>
        ))}
      </div>
      <div className="form-container">
        <div className="form-heading">
          <h2>请输入以下内容：</h2>
        </div>
        <div className="form-description">
          <p>在填写信息时，请核对入户表格内容是否准确，错误信息将造成相关影响。</p>
        </div>
        <div className="form-body">
          <form>
            <label>用户名</label>
            <input type="text" placeholder="请输入用户名" />
            
            <label>手机号码</label>
            <input type="tel" placeholder="请输入手机号码" />

            <label>邮箱</label>
            <input type="email" placeholder="请输入邮箱地址" />

            {/* ... 其他表单元素 ... */}

            <div className="form-buttons">
              <button type="submit">保存</button>
              <button type="button">下一步</button>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
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
        }
        .secondNavbar button:hover, .secondNavbar button:focus {
          background-color: #1D80A7;
        }
        .secondNavbar .active {
          background-color: #1D80A7; /* 激活按钮的背景颜色 */
          color: white; /* 激活按钮的文本颜色 */
        }
      `}</style>
    </div>
  );
};

export default HomePage;



