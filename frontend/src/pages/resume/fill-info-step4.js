
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
<<<<<<< HEAD:frontend/src/pages/fill-info-step4.js
<<<<<<< Updated upstream:frontend/src/pages/fill-info-step4.js
import Navbar from '../components/navbar';
import ResumeNavbar from "../components/resume-navbar";
import { step4Tips } from '../lib/tips';
import { extractDateRange, fetchPartData } from '../utils/fetchResumePartData';
import SaveToast from '../components/Toast/SaveToast';
=======
import { step4Tips } from '@/lib/tips';
import { extractDateRange, fetchPartData } from '@/utils/fetchResumePartData';
import SaveToast from '@/components/Toast/SaveToast';
import Link from 'next/link';
>>>>>>> Stashed changes:frontend/src/pages/resume/fill-info-step4.js
=======
import { step4Tips } from '@/lib/tips';
import { extractDateRange, fetchPartData } from '@/utils/fetchResumePartData';
import SaveToast from '@/components/Toast/SaveToast';
>>>>>>> e03e4d3935c0164da6460473b509f952b11adaa1:frontend/src/pages/resume/fill-info-step4.js

export async function getServerSideProps(context) {
  let dbFormData = {};
  if (context.query.id) {
    // Fetch dbFormData from external API
    const preformattedData = await fetchPartData(context.query.id, 'professionalExperience');
    // console.log(preformattedData);
    if (preformattedData.data) {
      const displayData = preformattedData.data.map((data) => {
        const [formattedStart, formattedEnd] = extractDateRange(data.起止时间);
        let tillPresent = false;
        if (formattedEnd === "至今") {
          tillPresent = true;
        }
        return {
          company: data.公司名称,
          city: data.城市,
          country: data.国家,
          startDate: formattedStart,
          endDate: formattedEnd,
          tillPresent: tillPresent,
          department: data.部门,
          position: data.职位,
          description: data["职责/业绩描述"],
        };
      });
      dbFormData = { _id: preformattedData._id, data: displayData };
    } else {
      dbFormData = { _id: preformattedData._id, data: null };
    }
  } else {
    return { redirect: { destination: `/resume/fill-info-step1`, permanent: false } }
  }
  // Pass data to the page via props
  return { props: { dbFormData } }
}

export default function step4Page({ dbFormData }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState(dbFormData.data || []);
  const [saveState, setSaveState] = useState(false);
  const [message, setMessage] = useState('');
  const [activeIndex, setActiveIndex] = useState(dbFormData.data && dbFormData.data.length > 0 ? 0 : -1);

  const AddJob = () => {
    if (formData.length >= 5) {
      alert("最多只能添加5个实习经历");
      return
    };
    setFormData([
      ...formData,
      {
        company: "",
        city: "",
        country: "",
        startDate: "",
        endDate: "",
        department: "",
        position: "",
        description: "",
      },
    ]);
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const RemoveJob = (index) => {
    if (formData.length <= 1) {
      setFormData([]);
      setActiveIndex(-1);
      return;
    }
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
    if (index === activeIndex) {
      const newActiveIndex = activeIndex === 0 ? 0 : activeIndex - 1;
      setActiveIndex(newActiveIndex);
    } else if (activeIndex > index) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  }

  const handleSubmit = () => {
    for (let i = 0; i < formData.length; i++) {
      if (formData[i].company === "" || formData[i].city === "" || formData[i].startDate === "" || formData[i].endDate === "" || formData[i].position === "" || formData[i].description === "") {
        setError(true);
        return;
      }
    }
    const translatedData = formData.map((data) => {
      return {
        公司名称: data.company,
        城市: data.city,
        国家: data.country,
        起止时间: data.startDate + "-" + data.endDate,
        部门: data.department,
        职位: data.position,
        "职责/业绩描述": data.description,
      };
    });
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/save-data', {
      method: 'POST',
      body: JSON.stringify({
        id: dbFormData._id,
        type: 'professionalExperience',
        data: translatedData
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Save successful:', data);
      })
      .catch(error => {
        console.error('Save error:', error);
      });
    router.push(`/resume/fill-info-step5?id=${dbFormData._id}`);
  }

  const handleSave = async () => {
    for (let i = 0; i < formData.length; i++) {
      if (formData[i].company === "" || formData[i].city === "" || formData[i].startDate === "" || formData[i].endDate === "" || formData[i].position === "" || formData[i].description === "") {
        setError(true);
        return;
      }
    }
    const translatedData = formData.map((data) => {
      return {
        公司名称: data.company,
        城市: data.city,
        国家: data.country,
        起止时间: data.startDate + "-" + data.endDate,
        部门: data.department,
        职位: data.position,
        "职责/业绩描述": data.description,
      };
    });
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/save-data', {
      method: 'POST',
      body: JSON.stringify({
        id: dbFormData._id,
        type: 'professionalExperience',
        data: translatedData
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status !== 200) {
      const data = await response.json();
      setSaveState(true);
      setMessage(data.error);
    } else {
      setSaveState(true);
      setMessage('保存成功');
    }
  }

  useEffect(() => {
    if (!saveState) return;
    const timer = setTimeout(() => {
      setSaveState(false);
      setMessage('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [saveState]);

  return (
    <>
      <div className="flex flex-row justify-center items-start h-full">
        <div className="bg-white w-1/2 h-full flex flex-col justify-around items-stretch pt-8 pb-16 gap-y-4 overflow-y-auto">
          <div className="flex flex-col flex-grow justify-start items-stretch gap-y-8 w-full max-w-[75%] mx-auto">
            <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">职业经历</h2>
            {formData.length > 0 && <>
              <div className="flex flex-row justify-start items-center text-alpha-blue mx-auto">
                {formData.map((data, index) => (
                  <section className='flex flex-row justify-start items-center gap-x-2' key={index}>
                    <button
                      key={index}
                      className={`${activeIndex === index
                        ? "underline underline-offset-2"
                        : ""
                        }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      实习经历 {index + 1}
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
                  </section>
                ))}
              </div>
              <form className="w-full max-w-[960px] flex flex-col items-stretch justify-start mx-auto">
                <label>*公司名称</label>
                <input type="text"
                  placeholder="请输入公司名称"
                  value={formData[activeIndex].company}
                  onChange={(e) => {
                    const newFormData = [...formData];
                    newFormData[activeIndex].company = e.target.value;
                    setFormData(newFormData);
                  }}
                />
                <div className="w-full flex flex-row justify-between items-center gap-x-16">
                  <div className="w-full flex flex-col justify-start items-stretch">
                    <label>*城市</label>
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
                <div className="w-full flex flex-row justify-between items-center gap-x-16">
                  <div className="w-4/5 flex flex-col justify-start items-stretch">
                    <label>*起止时间</label>
                    <div className="w-full p-2.5 mt-1.5 rounded-xl border border-[#ccc] flex flex-row justify-between items-center gap-x-6">
                      <input
                        className="flex-grow"
                        type="month"
                        max="3000-12"
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
                        max="3000-12"
                        disabled={formData[activeIndex].tillPresent}
                        value={formData[activeIndex].endDate}
                        onChange={(e) => {
                          const newFormData = [...formData];
                          newFormData[activeIndex].endDate = e.target.value;
                          setFormData(newFormData);
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-1/5 flex flex-col justify-start items-center">
                    <label>仍然在职</label>
                    <div className="w-full p-2.5 mt-1.5 flex flex-row justify-center items-center">
                      <input
                        type="checkbox"
                        checked={formData[activeIndex].tillPresent}
                        onChange={(e) => {
                          const newFormData = [...formData];
                          newFormData[activeIndex].tillPresent = e.target.checked;
                          newFormData[activeIndex].endDate = e.target.checked ? "至今" : "";
                          setFormData(newFormData);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <label>*职位</label>
                <input type="text" placeholder="请输入实习职位"
                  value={formData[activeIndex].position}
                  onChange={(e) => {
                    const newFormData = [...formData];
                    newFormData[activeIndex].position = e.target.value;
                    setFormData(newFormData);
                  }}
                />
                <label>部门</label>
                <input type="text" placeholder="请输入实习部门"
                  value={formData[activeIndex].department}
                  onChange={(e) => {
                    const newFormData = [...formData];
                    newFormData[activeIndex].department = e.target.value;
                    setFormData(newFormData);
                  }}
                />
                <label>*职责/业务描述</label>
                <textarea
                  type="text"
                  placeholder="请输入实习经历描述"
                  rows={3}
                  value={formData[activeIndex].description}
                  onChange={(e) => {
                    const newFormData = [...formData];
                    newFormData[activeIndex].description = e.target.value;
                    setFormData(newFormData);
                  }}
                />
                {/* ... 其他表单元素 ... */}
                <div className="w-full flex flex-row justify-end items-center mt-1">
                  <button
                    className="text-gray-500 hover:text-red-500"
                    title="删除这段经历"
                    type="button"
                    onClick={() => RemoveJob(activeIndex)}
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
              className="rounded-full border-4 border-alpha-blue px-4 py-2 flex flex-row justify-center items-center gap-y-2 w-40 mx-auto text-alpha-blue font-bold transition-colors duration-100 hover:bg-alpha-blue hover:text-white whitespace-nowrap"
              onClick={AddJob}
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
              增加实习经历
            </button>
          </div>
          <div className="w-full max-w-[75%] flex flex-row justify-between items-center mx-auto">
            <Link href={`/resume/fill-info-step3?id=${dbFormData._id}`}><button className="form-b" type="button" >
              上一步
            </button></Link>
            <button className="form-b" onClick={handleSave}>保存</button>
            <button className="form-b" type="button" onClick={handleSubmit}>
              下一步
            </button>
          </div>
        </div>
        <div className=' w-1/2 bg-[#EDF8FD] h-full flex flex-col justify-start items-stretch pt-8 pb-16 gap-y-16 px-20 overflow-y-auto'>
          <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">小贴士</h2>
          <div className='flex flex-col gap-y-4'>
            {step4Tips.map((topic, index) => (
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
      {error && <div className='fixed left-[calc(50%-20px)] top-1/2 w-80 h-auto rounded-lg bg-white border border-alpha-blue flex flex-col justify-center items-stretch -translate-x-1/2 -translate-y-1/2'>
        <p className='text-base font-bold text-wrap text-center py-4 px-4'>本页存在必填项未填写，请检查并完成所有*标记项后重试。</p>
        <div className='w-full border border-alpha-blue ' />
        <button className='py-2 px-4 text-base' onClick={() => setError(false)}>了解</button>
      </div>}
      {
        saveState && (
          <SaveToast message={message} />
        )
      }
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
          padding: 10px 200px;
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
    </>
  );
}



