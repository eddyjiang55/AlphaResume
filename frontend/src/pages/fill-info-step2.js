
import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import ResumeNavbar from '../components/resume-navbar';
import { step2Tips } from '../lib/tips';

const Step2Page = () => {

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <Navbar />
      <ResumeNavbar />
      <div className="flex flex-row justify-center items-start h-[calc(100%-170px)]">
        <div className="bg-white w-1/2 h-full flex flex-col justify-around items-stretch pt-8 pb-16 gap-y-4 overflow-y-auto">
          <div className="flex flex-col flex-grow justify-start items-stretch gap-y-16 w-full max-w-[75%] mx-auto">
            <h2 className='text-alpha-blue font-bold text-4xl text-center mx-auto'>请书写您的个人评价</h2>
            <form className='w-full max-w-[75%]  flex items-center justify-start mx-auto'>
              <textarea className='w-full rounded-lg border border-black focus:border-2 p-4' rows={15}></textarea>
            </form>
          </div>
          <div className="w-full max-w-[75%] flex flex-row justify-between items-center mx-auto">
            <button className='form-b'>保存</button>
            <Link href='/fill-info-step3'><button className='form-b' type="button">下一步</button> </Link>
          </div>
        </div>
        <div className='w-1/2 bg-[#EDF8FD] h-full flex flex-col justify-start items-stretch pt-8 pb-16 gap-y-16 px-20 overflow-y-auto'>
          <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">小贴士</h2>
          <div className='flex flex-col gap-y-4'>
            {step2Tips.map((topic, index) => (
              <div className='text-black ' key={index}>
                <h2 className="font-bold text-xl">{topic.title}</h2>
                {topic.subtopics.map((subtopic, subIndex) => (
                  <ol className='list-decimal list-inside' key={subIndex}>
                    {subtopic.title && <li className='font-bold text-lg'>{subtopic.title}</li>}
                    <ul className='list-disc list-inside'>
                      {subtopic.bulletPoints.map((point, pointIndex) => (
                        <li key={pointIndex}>
                          <span className='text-base'><b className='font-bold text-base'>{point.topic}:</b> {point.content}</span>
                        </li>
                      ))}
                    </ul>
                  </ol>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
      .background {
        background-color: #EDF8FD;
        min-height: 100vh;
        display: flex;
        flex-direction: row; /* 水平排列子元素 */
        flex-wrap: wrap; /* 允许子元素在必要时换行 */
        justify-content: center; /* 在主轴上居中对齐子元素 */
        align-items: flex-start; /* 在交叉轴上从顶部对齐子元素 */
      }
      input[type="self"] {
        padding: 300px 0px;
        margin-top: 50px;
        border: 1px solid #ccc;
        border-radius: 10px;
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
          text-align:left;
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

export default Step2Page;



