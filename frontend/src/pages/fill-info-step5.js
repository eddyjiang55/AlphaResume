
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import ResumeNavbar from "../components/resume-navbar";

const Step5Page = () => {
  const [formData, setFormData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const AddProject = () => {
    if (formData.length >= 5) {
      alert('最多只能添加5个项目经历');
      return;
    };
    setFormData([
      ...formData,
      { name: '', city: '', country: '', startDate: '', endDate: '', role: '', link: '', achievement: '', description: '', responsibility: '' }
    ]);
    setActiveIndex((prevIndex) => prevIndex + 1);
  }

  const RemoveProject = (index) => {
    if (formData.length <= 1) {
      setFormData([]);
      setActiveIndex(-1);
      return;
    };
    setFormData(formData.filter((_, i) => i !== index));
    if (activeIndex === index) {
      const newIndex = index === 0 ? 0 : index - 1;
      setActiveIndex(newIndex);
    } else if (activeIndex > index) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <Navbar />
      <ResumeNavbar />
      <div className="flex flex-row justify-center items-start h-[calc(100%-170px)]">
        <div className="bg-white w-1/2 h-full flex flex-col justify-around items-stretch pt-8 pb-16 gap-y-4 overflow-y-auto">
          <div className="flex flex-col flex-grow justify-start items-stretch gap-y-8 w-full max-w-[75%] mx-auto">
            <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">项目经历</h2>
            {formData.length > 0 && <>
              <div className="flex flex-row justify-start items-center text-alpha-blue mx-auto">
                {formData.map((data, index) => (
                  <>
                    <button
                      key={index}
                      className={`${activeIndex === index
                        ? "underline underline-offset-2"
                        : ""
                        }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      项目经历 {index + 1}
                    </button>
                    {index !== formData.length - 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-right w-4 h-4"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l6 6l-6 6" />
                      </svg>
                    )}{" "}
                  </>
                ))}
              </div>

              <form className="w-full max-w-[960px] flex flex-col items-stretch justify-start mx-auto">
                <label>项目名称</label>
                <input type="text"
                  placeholder="请输入项目名称"
                  value={formData[activeIndex].name}
                  onChange={(e) => {
                    const newFormData = [...formData];
                    newFormData[activeIndex].name = e.target.value;
                    setFormData(newFormData);
                  }}
                />
                <div className="w-full flex flex-row justify-between items-center gap-x-16">
                  <div className="w-full flex flex-col justify-start items-stretch">
                    <label>城市</label>
                    <input type="text" placeholder="请输入城市"
                      value={formData[activeIndex].city}
                      onChange={(e) => {
                        const newFormData = [...formData];
                        newFormData[activeIndex].city = e.target.value;
                        setFormData(newFormData);
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-col justify-start items-stretch">
                    <label>国家</label>
                    <input type="text" placeholder="请输入国家"
                      value={formData[activeIndex].country}
                      onChange={(e) => {
                        const newFormData = [...formData];
                        newFormData[activeIndex].country = e.target.value;
                        setFormData(newFormData);
                      }}
                    />
                  </div>
                </div>
                <label>起止时间</label>
                <div className="w-full p-2.5 mt-1.5 rounded-xl border border-[#ccc] flex flex-row justify-between items-center gap-x-6">
                  <input
                    className="flex-grow"
                    type="month"
                    value={formData[activeIndex].startDate}
                    onChange={(e) => {
                      const newFormData = [...formData];
                      newFormData[activeIndex].startDate = e.target.value;
                      setFormData(newFormData);
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-arrow-narrow-right w-6 h-6"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#000000"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M15 16l4 -4" />
                    <path d="M15 8l4 4" />
                  </svg>
                  <input
                    className="flex-grow"
                    type="month"
                    value={formData[activeIndex].endDate}
                    onChange={(e) => {
                      const newFormData = [...formData];
                      newFormData[activeIndex].endDate = e.target.value;
                      setFormData(newFormData);
                    }}
                  />
                </div>
                <label>项目角色</label>
                <input type="text"
                  placeholder="请输入项目角色"
                  value={formData[activeIndex].role}
                  onChange={(e) => {
                    const newFormData = [...formData];
                    newFormData[activeIndex].role = e.target.value;
                    setFormData(newFormData);
                  }}
                />
                <label>项目链接</label>
                <input type="text"
                  placeholder="请输入项目链接"
                  value={formData[activeIndex].link}
                  onChange={(e) => {
                    const newFormData = [...formData];
                    newFormData[activeIndex].link = e.target.value;
                    setFormData(newFormData);
                  }}
                />
                <label>项目成就</label>
                <textarea type="text"
                  rows={3}
                  placeholder="请输入项目成就"
                  value={formData[activeIndex].achievement}
                  onChange={(e) => {
                    const newFormData = [...formData];
                    newFormData[activeIndex].achievement = e.target.value;
                    setFormData(newFormData);
                  }}
                />

                <label>项目描述</label>
                <textarea type="text"
                  rows={3}
                  placeholder="请输入项目描述"
                  value={formData[activeIndex].description}
                  onChange={(e) => {
                    const newFormData = [...formData];
                    newFormData[activeIndex].description = e.target.value;
                    setFormData(newFormData);
                  }}
                />

                <label>项目职责</label>
                <textarea type="text"
                  rows={3}
                  placeholder="请输入项目职责"
                  value={formData[activeIndex].responsibility}
                  onChange={(e) => {
                    const newFormData = [...formData];
                    newFormData[activeIndex].responsibility = e.target.value;
                    setFormData(newFormData);
                  }}
                />
                {/* ... 其他表单元素 ... */}
                <div className="w-full flex flex-row justify-end items-center mt-1">
                  <button
                    className="text-gray-500 hover:text-red-500"
                    title="删除这段经历"
                    type="button"
                    onClick={() => RemoveProject(activeIndex)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-trash w-8 h-8"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                </div>
              </form>
            </>}
            <button
              className="rounded-full border-4 border-alpha-blue px-4 py-2 flex flex-row justify-center items-center gap-y-2 w-40 mx-auto text-alpha-blue font-bold transition-colors duration-100 hover:bg-alpha-blue hover:text-white"
              onClick={AddProject}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-plus w-6 h-6"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
              增加项目经历
            </button>
          </div>
          <div className="w-full max-w-[75%] flex flex-row justify-between items-center mx-auto">
            <button className="form-b">保存</button>
            <Link href="/fill-info-step6">
              <button className="form-b" type="button">
                下一步
              </button>{" "}
            </Link>
          </div>
        </div>
        <div className=' w-1/2 bg-[#EDF8FD] h-full flex flex-col justify-start items-stretch pt-8 pb-16 gap-y-16 px-20'>
          <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">小贴士</h2>
          <p className='text-black text-base font-normal'>
            Tips（未完善）
            If you are mid-level or in a managerial role, your educational credentials will hold less weight than your work history. If you are a new graduate, however, crafting your first shiny new resume can pose some particular challenges.
            We've got you covered in our post The New Grad's Map to Resume Writing.
          </p>
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
        textarea[type="text"],
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

export default Step5Page;



