import React, { useState } from 'react'; // Import useState here
import Link from 'next/link';
import { useRouter } from 'next/router'; // 导入 useRouter 钩子
import Navbar from '../components/Navbar';

const HomePage = () => {
  const router = useRouter(); // 使用 useRouter 钩子获取当前路由信息
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
  const [selectedImage, setSelectedImage] = useState('');
  const images = [
    '/img/result-1.jpg',
    '/img/result-2.png',
    '/img/result-3.png',
    '/img/result-4.png'
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
            <h2>意向岗位</h2>
          </div>
          <div className="form-body">
            <form>
              <input type="email"/>
            </form>
            <div className="form-heading">
                <h2>选择简历模板</h2>
              </div>
            <div className="template-container">
                {images.map((image, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={image}
                      alt={`Result ${index + 1}`}
                      className={`image ${selectedImage === image ? 'selected' : ''}`}
                      onClick={() => setSelectedImage(image)}
                    />
                  </div>
                ))}
              </div>
            <div className="form-buttons-new">
                <button className='form-b' type="button"><a href='/fill-info-step11'>生成简历</a></button>
              </div>
          </div>
      </div>
      <div className='tip-info'>
            <div className="form-heading">
              <h2>预览</h2>
            </div>
            <div className="tip-context">
              {selectedImage && <img src={selectedImage} alt="Preview" />}
            </div>
        </div>
      </div>
      <style jsx>{`
      
      .smallTitle{
        color:#1D80A7;
        font-size:20px;
        padding-buttom:10px;
      }
      .background {
        background-color: #EDF8FD;
        min-height: 100vh;
        display: flex;
        flex-direction: row; /* 水平排列子元素 */
        flex-wrap: wrap; /* 允许子元素在必要时换行 */
        justify-content: center; /* 在主轴上居中对齐子元素 */
        align-items: flex-start; /* 在交叉轴上从顶部对齐子元素 */
      }

      .tip-info, .form-container {
        flex: 1 1 50%; /* 设置子元素基础大小为50%，允许它们增长和缩小 */
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        text-align: center;
        padding: 20px;
        box-sizing: border-box; /* 包括padding和border在内的宽度计算方式 */
      }
        .tip-info{
        }
        .tip-context{
          padding:100px;
        }
        .form-container {
          min-width:500px;
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
          padding:0 100px;
        }
        .input-group {
          display: flex;
          justify-content: center;
          gap:100px;
          padding:10px;
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
          text-align: left;
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
        input[type="long"] {
          padding: 20px 10px;
          margin-top: 50px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        .form-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .form-b {
          padding: 10px 50px;
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
          font-weight:bold;
          margin: 30px 0;
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
          padding: 0 30px;
          border: #1D80A7 3px solid;
          border-radius: 30px;
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
        .AddMore{
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
        .template-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* 创建两列，每列占用可用空间的一半 */
          gap: 10px; /* 设置网格之间的空隙 */
          width: 100%; /* 或者指定一个具体的宽度 */
        }
        
        .image-container {
          overflow: hidden; /* 防止图片溢出容器 */
          aspect-ratio: 1 / 1; /* 使每个容器的宽高比为1:1，也可以调整为其他比例 */
        }
        
        .image {
          width: 100%; /* 使图片宽度填满容器 */
          height: 100%; /* 使图片高度填满容器 */
          object-fit: cover; /* 裁剪图片以填充容器，不改变其宽高比 */
        }
        
        .selected {
          border: 2px solid blue; /* 选中图片的边框样式 */
        }
        
        
        
        
        
      `}</style>
    </div>
  );
};

export default HomePage;



