
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import ResumeNavbar from "../components/resume-navbar";
import { step6Tips } from '../lib/tips';

const Step6Page = () => {
  const [awardFormData, setAwardFormData] = useState([]);
  const [certificateFormData, setCertificateFormData] = useState([]);

  const [activeAwardIndex, setActiveAwardIndex] = useState(-1);
  const [activeCertificateIndex, setActiveCertificateIndex] = useState(-1);

  const AddAward = () => {
    if (awardFormData.length >= 5) {
      alert("最多添加5个获奖经历");
      return;
    };
    setAwardFormData([
      ...awardFormData,
      {
        awardName: "",
        awardTime: "",
        awardOrg: "",
        awardLevel: "",
        awardRank: "",
        awardDescription: "",
      },
    ]);
    setActiveAwardIndex((prevIndex) => prevIndex + 1);
  };

  const RemoveAward = (index) => {
    if (awardFormData.length <= 1) {
      setAwardFormData([]);
      setActiveAwardIndex(-1);
      return;
    };
    setAwardFormData(awardFormData.filter((_, i) => i !== index));
    if (activeAwardIndex === index) {
      setActiveAwardIndex(0);
    } else if (activeAwardIndex > index) {
      setActiveAwardIndex(activeAwardIndex - 1);
    }
  };

  const AddCertificate = () => {
    if (certificateFormData.length >= 5) {
      alert("最多添加5个证书经历");
      return
    };
    setCertificateFormData([
      ...certificateFormData,
      {
        certificateName: "",
        certificateTime: "",
        certificateOrg: "",
        certificateDescription: "",
      },
    ]);
    setActiveCertificateIndex((prevIndex) => prevIndex + 1);
  };

  const RemoveCertificate = (index) => {
    if (certificateFormData.length <= 1) {
      setCertificateFormData([]);
      setActiveCertificateIndex(-1);
      return;
    };
    setCertificateFormData(certificateFormData.filter((_, i) => i !== index));
    if (activeCertificateIndex === index) {
      setActiveCertificateIndex(0);
    } else if (activeCertificateIndex > index) {
      setActiveCertificateIndex(activeCertificateIndex - 1);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <Navbar />
      <ResumeNavbar />
      <div className="flex flex-row justify-center items-start h-[calc(100%-170px)]">
        <div className="bg-white w-1/2 h-full flex flex-col justify-around items-stretch pt-8 pb-16 gap-y-4 overflow-y-auto">
          <div className="flex flex-col flex-grow justify-start items-stretch gap-y-8 w-full max-w-[75%] mx-auto">
            <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">获奖与证书</h2>
            {awardFormData.length > 0 &&
              <>
                <div className="flex flex-row justify-start items-center text-alpha-blue mx-auto">
                  {awardFormData.map((data, index) => (
                    <>
                      <button
                        key={index}
                        className={`${activeAwardIndex === index
                          ? "underline underline-offset-2"
                          : ""
                          }`}
                        onClick={() => setActiveAwardIndex(index)}
                      >
                        获奖经历 {index + 1}
                      </button>
                      {index !== awardFormData.length - 1 && (
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
                  <label>奖项名称</label>
                  <input type="text"
                    placeholder='请输入奖项名称'
                    value={awardFormData[activeAwardIndex].awardName}
                    onChange={(e) => {
                      const newFormData = [...awardFormData];
                      newFormData[activeAwardIndex].awardName = e.target.value;
                      setAwardFormData(newFormData);
                    }}
                  />
                  <label>获奖时间</label>
                  <input type="date"
                    value={awardFormData[activeAwardIndex].awardTime}
                    onChange={(e) => {
                      const newFormData = [...awardFormData];
                      newFormData[activeAwardIndex].awardTime = e.target.value;
                      setAwardFormData(newFormData);
                    }}
                  />
                  <label>颁奖机构</label>
                  <input type="text"
                    placeholder='请输入颁奖机构'
                    value={awardFormData[activeAwardIndex].awardOrg}
                    onChange={(e) => {
                      const newFormData = [...awardFormData];
                      newFormData[activeAwardIndex].awardOrg = e.target.value;
                      setAwardFormData(newFormData);
                    }}
                  />
                  <div className="w-full flex flex-row justify-between items-center gap-x-16">
                    <div className="w-full flex flex-col justify-start items-stretch">
                      <label>获奖级别</label>
                      <input type="text" placeholder="请输入获奖级别"
                        value={awardFormData[activeAwardIndex].awardLevel}
                        onChange={(e) => {
                          const newFormData = [...awardFormData];
                          newFormData[activeAwardIndex].awardLevel = e.target.value;
                          setAwardFormData(newFormData);
                        }}
                      />
                    </div>
                    <div className="w-full flex flex-col justify-start items-stretch">
                      <label>获奖名次</label>
                      <input type="text" placeholder="请输入获奖名次"
                        value={awardFormData[activeAwardIndex].awardRank}
                        onChange={(e) => {
                          const newFormData = [...awardFormData];
                          newFormData[activeAwardIndex].awardRank = e.target.value;
                          setAwardFormData(newFormData);
                        }}
                      />
                    </div>
                  </div>
                  <label>奖项描述</label>
                  <textarea type="text" rows={3} placeholder='请输入奖项描述'
                    value={awardFormData[activeAwardIndex].awardDescription}
                    onChange={(e) => {
                      const newFormData = [...awardFormData];
                      newFormData[activeAwardIndex].awardDescription = e.target.value;
                      setAwardFormData(newFormData);
                    }}
                  />
                  {/* ... 其他表单元素 ... */}
                  <div className="w-full flex flex-row justify-end items-center mt-1">
                    <button
                      className="text-gray-500 hover:text-red-500"
                      title="删除这段经历"
                      type="button"
                      onClick={() => RemoveAward(activeAwardIndex)}
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
              onClick={AddAward}
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
              增加获奖经历
            </button>
            {certificateFormData.length > 0 &&
              <>
                <div className="flex flex-row justify-start items-center text-alpha-blue mx-auto">
                  {certificateFormData.map((data, index) => (
                    <>
                      <button
                        key={index}
                        className={`${activeCertificateIndex === index
                          ? "underline underline-offset-2"
                          : ""
                          }`}
                        onClick={() => setActiveCertificateIndex(index)}
                      >
                        证书经历 {index + 1}
                      </button>
                      {index !== certificateFormData.length - 1 && (
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
                  <label>证书名称</label>
                  <input type="text"
                    placeholder='请输入证书名称'
                    value={certificateFormData[activeCertificateIndex].certificateName}
                    onChange={(e) => {
                      const newFormData = [...certificateFormData];
                      newFormData[activeCertificateIndex].certificateName = e.target.value;
                      setCertificateFormData(newFormData);
                    }}
                  />
                  <label>取得时间</label>
                  <input type="date"
                    value={certificateFormData[activeCertificateIndex].certificateTime}
                    onChange={(e) => {
                      const newFormData = [...certificateFormData];
                      newFormData[activeCertificateIndex].certificateTime = e.target.value;
                      setCertificateFormData(newFormData);
                    }}
                  />
                  <label>颁发机构</label>
                  <input type="text"
                    placeholder='请输入颁发机构'
                    value={certificateFormData[activeCertificateIndex].certificateOrg}
                    onChange={(e) => {
                      const newFormData = [...certificateFormData];
                      newFormData[activeCertificateIndex].certificateOrg = e.target.value;
                      setCertificateFormData(newFormData);
                    }}
                  />
                  <label>描述</label>
                  <textarea type="text"
                    rows={3}
                    placeholder='请输入证书描述'
                    value={certificateFormData[activeCertificateIndex].certificateDescription}
                    onChange={(e) => {
                      const newFormData = [...certificateFormData];
                      newFormData[activeCertificateIndex].certificateDescription = e.target.value;
                      setCertificateFormData(newFormData);
                    }}
                  />
                  <div className="w-full flex flex-row justify-end items-center mt-1">
                    <button
                      className="text-gray-500 hover:text-red-500"
                      title="删除这段经历"
                      type="button"
                      onClick={() => RemoveCertificate(activeCertificateIndex)}
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
              onClick={AddCertificate}
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
              增加证书经历
            </button>
          </div>
          <div className="w-full max-w-[75%] flex flex-row justify-between items-center mx-auto">
            <button className="form-b">保存</button>
            <Link href="/fill-info-step7">
              <button className="form-b" type="button">
                下一步
              </button>{" "}
            </Link>
          </div>
        </div>
        <div className='w-1/2 bg-[#EDF8FD] h-full pt-8 pb-16 gap-y-16 px-20 flex flex-col justify-start items-stretch overflow-y-auto'>
          <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">小贴士</h2>
          <div className='flex flex-col gap-y-4'>
            {step6Tips.map((topic, index) => (
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
        input[type="date"],
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
      `}</style>
    </div >
  );
};

export default Step6Page;



