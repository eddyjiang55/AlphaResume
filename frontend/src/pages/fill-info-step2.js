
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
      <div className='background'>
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
        <div className='tip-info'>
            <div className="form-heading">
              <h2>小贴士</h2>
            </div>
            <div className='tip-context'>
              <p>
              Tips（未完善）
              If you are mid-level or in a managerial role, your educational credentials will hold less weight than your work history. If you are a new graduate, however, crafting your first shiny new resume can pose some particular challenges.
              We've got you covered in our post The New Grad's Map to Resume Writing.
              </p>
            </div>
        </div>
      </div>
      </div>
      <style jsx>{`
        .background{
          background-color: #EDF8FD;
          min-height:100vh;
          display: flex;
          justify-content: center;
          align-items: start; // 从顶部开始对齐
          flex-wrap: wrap; // 允许容器内的项目换行
          gap: 20px; // 两个容器之间的间距
          padding:20px;
        }
        .tip-info, .form-container {
          width:50%;
        }
        .form-container {
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



