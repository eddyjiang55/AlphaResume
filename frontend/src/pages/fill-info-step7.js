
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';
import ResumeNavbar from "../components/resume-navbar";
import { processTimeStr, fetchPartData } from '../utils/fetchResumePartData';

export async function getServerSideProps(context) {
  let dbFormData = {};
  if (context.query.id) {
    // Fetch dbFormData from external API
    const preformattedData = await fetchPartData(context.query.id, 'researchPapersAndPatents');
    // console.log(preformattedData.data);
    if (preformattedData.data) {
      const displayPaperData = preformattedData.data.科研论文.map((data) => ({
        title: data.论文标题,
        authors: data.作者顺序,
        journal: data["期刊/会议"],
        date: processTimeStr(data.出版时间, "year"),
        doi: data["DOI/链接"],
        description: data.研究描述,
        contribution: data.个人贡献,
      }));
      const displayPatentData = preformattedData.data.知识产权.map((data) => ({
        title: data.专利名称,
        number: data.专利号,
        date: processTimeStr(data["申请/授权日期"], "year"),
        description: data.描述,
      }));
      dbFormData = { _id: preformattedData._id, data: { papers: displayPaperData, patents: displayPatentData } };
    } else {
      dbFormData = { _id: preformattedData._id, data: { papers: null, patents: null } };
    }
  } else {
    return { redirect: { destination: `/fill-info-step1`, permanent: false } }
  }
  // Pass data to the page via props
  return { props: { dbFormData } }
}

export default function Step7Page({ dbFormData }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [paperFormData, setPaperFormData] = useState(dbFormData.data.papers || []);

  const [patentFormData, setPatentFormData] = useState(dbFormData.data.patents || []);

  const [activePaperIndex, setActivePaperIndex] = useState(dbFormData.data.papers && dbFormData.data.papers.length > 0 ? 0 : -1);
  const [activePatentIndex, setActivePatentIndex] = useState(dbFormData.data.patents && dbFormData.data.patents.length > 0 ? 0 : -1);

  const AddPaper = () => {
    if (paperFormData.length >= 5) {
      alert("最多添加5个论文经历");
      return;
    };
    setPaperFormData([...paperFormData, {
      title: "",
      authors: "",
      journal: "",
      date: "",
      doi: "",
      description: "",
      contribution: "",
    }]);
    setActivePaperIndex((prevIndex) => prevIndex + 1);
  };

  const RemovePaper = (index) => {
    if (paperFormData.length <= 1) {
      setPaperFormData([]);
      setActivePaperIndex(-1);
      return;
    };
    setPaperFormData(paperFormData.filter((_, i) => i !== index));
    setActivePaperIndex((prevIndex) => Math.min(prevIndex, paperFormData.length - 2));
  };

  const AddPatent = () => {
    if (patentFormData.length >= 5) {
      alert("最多添加5个专利经历");
      return;
    };
    setPatentFormData([...patentFormData, {
      title: "",
      number: "",
      date: "",
      description: "",
    }]);
    setActivePatentIndex((prevIndex) => prevIndex + 1);
  };

  const RemovePatent = (index) => {
    if (patentFormData.length <= 1) {
      setPatentFormData([]);
      setActivePatentIndex(-1);
      return;
    };
    setPatentFormData(patentFormData.filter((_, i) => i !== index));
    setActivePatentIndex((prevIndex) => Math.min(prevIndex, patentFormData.length - 2));
  };

  const handleSave = () => {
    const translatedPaperFormData = paperFormData.map((data) => ({
      论文标题: data.title,
      作者顺序: data.authors,
      "期刊/会议": data.journal,
      出版时间: data.date,
      "DOI/链接": data.doi,
      研究描述: data.description,
      个人贡献: data.contribution,
    }));
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/save-data', {
      method: 'POST',
      body: JSON.stringify({
        id: dbFormData._id,
        type: 'researchPapersAndPatents',
        data: { "科研论文": translatedPaperFormData },
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
    const translatedPatentFormData = patentFormData.map((data) => ({
      专利名称: data.title,
      专利号: data.number,
      "申请/授权日期": data.date,
      描述: data.description,
    }));
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/save-data', {
      method: 'POST',
      body: JSON.stringify({
        id: dbFormData._id,
        type: 'researchPapersAndPatents',
        data: { "知识产权": translatedPatentFormData },
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
  }

  const handleSubmit = () => {
    for (const paper of paperFormData) {
      if (!paper.title || !paper.authors || !paper.journal || !paper.date) {
        setError(true);
        return;
      }
    }
    const translatedPaperFormData = paperFormData.map((data) => ({
      论文标题: data.title,
      作者顺序: data.authors,
      "期刊/会议": data.journal,
      出版时间: data.date,
      "DOI/链接": data.doi,
      研究描述: data.description,
      个人贡献: data.contribution,
    }));
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/save-data', {
      method: 'POST',
      body: JSON.stringify({
        id: dbFormData._id,
        type: 'researchPapersAndPatents',
        data: { "科研论文": translatedPaperFormData },
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
    for (const patent of patentFormData) {
      if (!patent.title || !patent.number || !patent.date) {
        setError(true);
        return;
      }
    }
    const translatedPatentFormData = patentFormData.map((data) => ({
      专利名称: data.title,
      专利号: data.number,
      "申请/授权日期": data.date,
      描述: data.description,
    }));
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/save-data', {
      method: 'POST',
      body: JSON.stringify({
        id: dbFormData._id,
        type: 'researchPapersAndPatents',
        data: { "知识产权": translatedPatentFormData },
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
    router.push(`/fill-info-step8?id=${dbFormData._id}`);
  }

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <Navbar />
      <ResumeNavbar currentIndex={dbFormData._id} />
      <div className="flex flex-row justify-center items-start h-[calc(100%-170px)]">
        <div className="bg-white w-1/2 h-full flex flex-col justify-around items-stretch pt-8 pb-16 gap-y-4 overflow-y-auto">
          <div className="flex flex-col flex-grow justify-start items-stretch gap-y-8 w-full max-w-[75%] mx-auto">
            <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">科研论文与知识产权</h2>
            {paperFormData.length > 0 &&
              <>
                <div className="flex flex-row justify-start items-center text-alpha-blue mx-auto">
                  {paperFormData.map((data, index) => (
                    <>
                      <button
                        key={index}
                        className={`${activePaperIndex === index
                          ? "underline underline-offset-2"
                          : ""
                          }`}
                        onClick={() => setActivePaperIndex(index)}
                      >
                        论文经历 {index + 1}
                      </button>
                      {index !== paperFormData.length - 1 && (
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
                  <label>*论文标题</label>
                  <input type="text"
                    placeholder='请输入论文标题'
                    value={paperFormData[activePaperIndex].title}
                    onChange={(e) => {
                      const newPaperFormData = [...paperFormData];
                      newPaperFormData[activePaperIndex].title = e.target.value;
                      setPaperFormData(newPaperFormData);
                    }}
                  />
                  <label>*作者顺序</label>
                  <input type="text"
                    placeholder='请输入作者顺序'
                    value={paperFormData[activePaperIndex].authors}
                    onChange={(e) => {
                      const newPaperFormData = [...paperFormData];
                      newPaperFormData[activePaperIndex].authors = e.target.value;
                      setPaperFormData(newPaperFormData);
                    }}
                  />
                  <label>*期刊/会议</label>
                  <input type="text"
                    placeholder='请输入期刊/会议'
                    value={paperFormData[activePaperIndex].journal}
                    onChange={(e) => {
                      const newPaperFormData = [...paperFormData];
                      newPaperFormData[activePaperIndex].journal = e.target.value;
                      setPaperFormData(newPaperFormData);
                    }}
                  />
                  <label>*出版时间</label>
                  <input type="date"
                    max="3000-12-31"
                    value={paperFormData[activePaperIndex].date}
                    onChange={(e) => {
                      const newPaperFormData = [...paperFormData];
                      newPaperFormData[activePaperIndex].date = e.target.value;
                      setPaperFormData(newPaperFormData);
                    }}
                  />
                  <label>DOI/链接</label>
                  <input type="text"
                    placeholder='请输入DOI/链接'
                    value={paperFormData[activePaperIndex].doi}
                    onChange={(e) => {
                      const newPaperFormData = [...paperFormData];
                      newPaperFormData[activePaperIndex].doi = e.target.value;
                      setPaperFormData(newPaperFormData);
                    }}
                  />
                  <label>研究描述</label>
                  <textarea type="text"
                    rows={3}
                    placeholder='请输入研究描述'
                    value={paperFormData[activePaperIndex].description}
                    onChange={(e) => {
                      const newPaperFormData = [...paperFormData];
                      newPaperFormData[activePaperIndex].description = e.target.value;
                      setPaperFormData(newPaperFormData);
                    }}
                  />
                  <label>个人贡献</label>
                  <textarea type="text"
                    rows={3}
                    placeholder='请输入个人贡献'
                    value={paperFormData[activePaperIndex].contribution}
                    onChange={(e) => {
                      const newPaperFormData = [...paperFormData];
                      newPaperFormData[activePaperIndex].contribution = e.target.value;
                      setPaperFormData(newPaperFormData);
                    }}
                  />
                  {/* ... 其他表单元素 ... */}
                  <div className="w-full flex flex-row justify-end items-center mt-1">
                    <button
                      className="text-gray-500 hover:text-red-500"
                      title="删除这段经历"
                      type="button"
                      onClick={() => RemovePaper(activePaperIndex)}
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
              type='button'
              onClick={AddPaper}
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
              增加论文经历
            </button>
            {patentFormData.length > 0 &&
              <>
                <div className="flex flex-row justify-start items-center text-alpha-blue mx-auto">
                  {patentFormData.map((data, index) => (
                    <>
                      <button
                        key={index}
                        className={`${activePatentIndex === index
                          ? "underline underline-offset-2"
                          : ""
                          }`}
                        onClick={() => setActivePaperIndex(index)}
                      >
                        专利经历 {index + 1}
                      </button>
                      {index !== patentFormData.length - 1 && (
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
                  <label>*专利名称</label>
                  <input type="text"
                    placeholder='请输入专利名称'
                    value={patentFormData[activePatentIndex].title}
                    onChange={(e) => {
                      const newPatentFormData = [...patentFormData];
                      newPatentFormData[activePatentIndex].title = e.target.value;
                      setPatentFormData(newPatentFormData);
                    }}
                  />
                  <label>*专利号</label>
                  <input type="text"
                    placeholder='请输入专利号'
                    value={patentFormData[activePatentIndex].number}
                    onChange={(e) => {
                      const newPatentFormData = [...patentFormData];
                      newPatentFormData[activePatentIndex].number = e.target.value;
                      setPatentFormData(newPatentFormData);
                    }}
                  />
                  <label>*申请/授权日期</label>
                  <input type="date"
                    max="3000-12-31"
                    value={patentFormData[activePatentIndex].date}
                    onChange={(e) => {
                      const newPatentFormData = [...patentFormData];
                      newPatentFormData[activePatentIndex].date = e.target.value;
                      setPatentFormData(newPatentFormData);
                    }}
                  />
                  <label>描述</label>
                  <textarea type="text"
                    rows={3}
                    placeholder='请输入描述'
                    value={patentFormData[activePatentIndex].description}
                    onChange={(e) => {
                      const newPatentFormData = [...patentFormData];
                      newPatentFormData[activePatentIndex].description = e.target.value;
                      setPatentFormData(newPatentFormData);
                    }}
                  />
                  <div className="w-full flex flex-row justify-end items-center mt-1">
                    <button
                      className="text-gray-500 hover:text-red-500"
                      title="删除这段经历"
                      type="button"
                      onClick={() => RemovePatent(activePatentIndex)}
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
              type='button'
              onClick={AddPatent}
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
              增加专利经历
            </button>
          </div>
          <div className="w-full max-w-[75%] flex flex-row justify-between items-center mx-auto">
            <button className="form-b" onClick={handleSave}>保存</button>
            <button className="form-b" type="button" onClick={handleSubmit}>
              下一步
            </button>
          </div>
        </div>
        <div className='w-1/2 bg-light-blue h-full pt-8 pb-16 gap-y-16 px-20 flex flex-col justify-start items-stretch '>
          <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">小贴士</h2>
          <p className='text-black text-base font-normal'>
            Tips（未完善）
            If you are mid-level or in a managerial role, your educational credentials will hold less weight than your work history. If you are a new graduate, however, crafting your first shiny new resume can pose some particular challenges.
            We've got you covered in our post The New Grad's Map to Resume Writing.
          </p>
        </div>
      </div>
      {error && <div className='fixed left-[calc(50%-20px)] top-1/2 w-80 h-auto rounded-lg bg-white border border-alpha-blue flex flex-col justify-center items-stretch -translate-x-1/2 -translate-y-1/2'>
        <p className='text-base font-bold text-wrap text-center py-4 px-4'>本页存在必填项未填写，请检查并完成所有*标记项后重试。</p>
        <div className='w-full border border-alpha-blue ' />
        <button className='py-2 px-4 text-base' onClick={() => setError(false)}>了解</button>
      </div>}
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
    </div>
  );
}



