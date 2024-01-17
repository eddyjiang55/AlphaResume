import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import Navbar from '../components/navbar'
import Cards from '../components/cards'

const FillInfoManualy = (props) => {
  const router = useRouter();
  // Bio part state
  const [bio, setBio] = useState({
    lastName: '',
    firstName: '',
    phoneNumber: '',
    emailAddress: '',
    wechatId: ''
  });

  // Education history part state
  const [educationHistory, setEducationHistory] = useState([{
    degree: '',
    schoolName: '',
    city: '',
    state: '',
    enrolledTime: '',
    department: '',
    major: '',
    gpa: '',
    awards: '',
    courses: ''
  }]);

  const handleEducationChange = (index, field, value) => {
    const newEducationHistory = [...educationHistory];
    newEducationHistory[index] = { ...newEducationHistory[index], [field]: value };
    setEducationHistory(newEducationHistory);
  };

  // Job/Intern history part state
  const [jobHistory, setJobHistory] = useState([{
    jobType: '',
    position: '',
    enrolledTime: '',
    jobContent: '',
    achievement: ''
  }]);

  const handleJobChange = (index, field, value) => {
    const newJobHistory = [...jobHistory];
    newJobHistory[index] = { ...newJobHistory[index], [field]: value };
    setJobHistory(newJobHistory);
  };

  // Project part state
  const [projects, setProjects] = useState([{
    projectName: '',
    projectLink: '',
    startTime: '',
    endTime: '',
    projectRole: '',
    details: ''
  }]);

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  // Award part state
  const [awards, setAwards] = useState([{
    awardType: '',
    awardName: '',
    timeReceived: '',
    details: ''
  }]);

  const handleAwardChange = (index, field, value) => {
    const newAwards = [...awards];
    newAwards[index] = { ...newAwards[index], [field]: value };
    setAwards(newAwards);
  };

  // Language part state
  const [languages, setLanguages] = useState([{
    languageName: '',
    proficiency: '',
    license: '',
    score: ''
  }]);

  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    setLanguages(newLanguages);
  };

  // Skills part state
  const [skills, setSkills] = useState([{
    skillName: '',
    proficiency: ''
  }]);

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setSkills(newSkills);
  };

  // Unified function to add more inputs
  const addMore = (section) => {
    switch (section) {
      case 'education':
        setEducationHistory([...educationHistory, {
          degree: '',
          schoolName: '',
          city: '',
          state: '',
          enrolledTime: '',
          department: '',
          major: '',
          gpa: '',
          awards: '',
          courses: ''
        }]);
        break;
      case 'job':
        setJobHistory([...jobHistory, {
          jobType: '',
          position: '',
          enrolledTime: '',
          jobContent: '',
          achievement: ''
        }]);
        break;
      case 'project':
        setProjects([...projects, {
          projectName: '',
          projectLink: '',
          timeRange: '',
          projectRole: '',
          details: ''
        }]);
        break;
      case 'award':
        setAwards([...awards, {
          awardName: '',
          awardType: '',
          timeReceived: '',
          details: ''
        }]);
        break;
      case 'language':
        setLanguages([...languages, {
          languageName: '',
          proficiency: '',
          license: '',
          score: ''
        }]);
        break;
      case 'skill':
        setSkills([...skills, {
          skillName: '',
          proficiency: ''
        }]);
        break;
      default:
        break;
    }
  };

  const reduceOne = (section) => {
    switch (section) {
      case 'education':
        if (educationHistory.length > 1) {
          const newEducationHistory = [...educationHistory];
          newEducationHistory.pop();
          setEducationHistory(newEducationHistory);
        }
        break;
      case 'job':
        if (jobHistory.length > 1) {
          const newJobHistory = [...jobHistory];
          newJobHistory.pop();
          setJobHistory(newJobHistory);
        }
        break;
      case 'project':
        if (projects.length > 1) {
          const newProjects = [...projects];
          newProjects.pop();
          setProjects(newProjects);
        }
        break;
      case 'award':
        if (awards.length > 1) {
          const newAwards = [...awards];
          newAwards.pop();
          setAwards(newAwards);
        }
        break;
      case 'language':
        if (languages.length > 1) {
          const newLanguages = [...languages];
          newLanguages.pop();
          setLanguages(newLanguages);
        }
        break;
      case 'skill':
        if (skills.length > 1) {
          const newSkills = [...skills];
          newSkills.pop();
          setSkills(newSkills);
        }
        break;
    }
  };

  const sendFormDataToBackend = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/api/resume', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Data successfully sent to the backend', responseData);
      router.push('/resume-preview');
    } catch (error) {
      console.error('Error sending data to backend', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      bio,
      educationHistory,
      jobHistory,
      projects,
      awards,
      languages,
      skills
    };
    console.log(formData);
    sendFormDataToBackend(formData);
  }

  return (
    <>
      <div className="w-full flex h-full items-start flex-col justify-start bg-white">
        <Head>
          <title>FillInfoManualy - AI Resume</title>
          <meta property="og:title" content="FillInfoManualy - AI Resume" />
        </Head>
        <Navbar></Navbar>
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center bg-[#e4e4e4] shadow-xl p-10 gap-y-10">
          <h1 className="">将简历拖拽至此处</h1>
          <button type="button" className="text-black bg-[#14a9ff] button">
            上传文件
          </button>
          <span className="text-gray-600 text-lg">
            将文件大小控制在6M以内，支持格式pdf/.doc/.docx/.jpg/.png上传成功后，可选择解析简历并填充，便于后续填写、修改。
          </span>
        </div>
        <form className="w-full max-w-6xl mx-auto" onSubmit={handleSubmit}>
          <div className="w-full max-w-6xl mx-auto mt-10">
            <h1 className="text-black my-4 ml-2">基本信息：</h1>
            <div className="fill-info-manualy-container01">
              <div className="fill-info-manualy-container02">
                <section className="fill-info-manualy-cards">
                  <div className="fill-info-manualy-container03">
                    <span className="fill-info-manualy-text03">姓</span>
                    <span className="fill-info-manualy-text04">手机号码</span>
                    <span className="fill-info-manualy-text05">微信号</span>
                  </div>
                  <div className="fill-info-manualy-container04">
                    <input
                      type="text"
                      placeholder="请输入你的姓氏"
                      className="fill-info-manualy-textinput input"
                      onChange={(e) => setBio({ ...bio, lastName: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="请输入你的手机号码"
                      className="fill-info-manualy-textinput01 input"
                      onChange={(e) => setBio({ ...bio, phoneNumber: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="请输入你的微信号"
                      className="fill-info-manualy-textinput02 input"
                      onChange={(e) => setBio({ ...bio, wechatId: e.target.value })}
                    />
                  </div>
                </section>
              </div>
              <div className="fill-info-manualy-container05">
                <section className="fill-info-manualy-cards01">
                  <div className="fill-info-manualy-container06">
                    <span className="fill-info-manualy-text06">名</span>
                    <span className="fill-info-manualy-text07">邮箱</span>
                  </div>
                  <div className="fill-info-manualy-container07">
                    <input
                      type="text"
                      placeholder="请输入你的名字"
                      className="fill-info-manualy-textinput03 input"
                      onChange={(e) => setBio({ ...bio, firstName: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="请输入你的邮箱"
                      className="fill-info-manualy-textinput04 input"
                      onChange={(e) => setBio({ ...bio, emailAddress: e.target.value })}
                    />
                  </div>
                </section>
              </div>
            </div>
            <h1 className="fill-info-manualy-text08">教育经历：</h1>
            {educationHistory.map((education, index) => (
              <div key={index}>
                <div className="fill-info-manualy-container08">
                  <section className="fill-info-manualy-cards02">
                    <div className="fill-info-manualy-container09">
                      <span className="fill-info-manualy-text09">学历</span>
                      <span className="fill-info-manualy-text10">城市</span>
                      <span className="fill-info-manualy-text11">起止时间</span>
                      <span className="fill-info-manualy-text12">专业</span>
                    </div>
                    <div className="fill-info-manualy-container10">
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput05 input"
                        value={education.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput06 input"
                        value={education.city}
                        onChange={(e) => handleEducationChange(index, 'city', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput07 input"
                        value={education.enrolledTime}
                        onChange={(e) => handleEducationChange(index, 'enrolledTime', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput08 input"
                        value={education.major}
                        onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                      />
                    </div>
                  </section>
                  <section className="fill-info-manualy-cards03">
                    <div className="fill-info-manualy-container11">
                      <span className="fill-info-manualy-text13">学校名称</span>
                      <span className="fill-info-manualy-text14">国家</span>
                      <span className="fill-info-manualy-text15">院系</span>
                      <span className="fill-info-manualy-text16">GPA</span>
                    </div>
                    <div className="fill-info-manualy-container12">
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput09 input"
                        value={education.schoolName}
                        onChange={(e) => handleEducationChange(index, 'schoolName', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput10 input"
                        value={education.state}
                        onChange={(e) => handleEducationChange(index, 'state', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput11 input"
                        value={education.department}
                        onChange={(e) => handleEducationChange(index, 'department', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput12 input"
                        value={education.gpa}
                        onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                      />
                    </div>
                  </section>
                </div>
                <div className="fill-info-manualy-container13">
                  <Cards
                    rootClassName="cards-root-class-name1"
                    value={education.awards}
                    onChange={(e) => handleEducationChange(index, 'awards', e.target.value)}
                    value1={education.courses}
                    onChange1={(e) => handleEducationChange(index, 'courses', e.target.value)}
                  ></Cards>
                </div>
              </div>
            ))}
            <div className='flex flex-row items-center justify-between'>
              <button type="button" className="fill-info-manualy-button1 button" onClick={() => addMore('education')}>
                <span className="fill-info-manualy-text17">
                  添加学历
                  <br />
                </span>
              </button>
              <button type="button" className={`${educationHistory.length > 1 ? "fill-info-manualy-button1 button" : "hidden"}`} onClick={() => reduceOne('education')}>
                <span className="fill-info-manualy-text17">
                  删除记录
                  <br />
                </span>
              </button>
            </div>
            <h1 className="fill-info-manualy-text20">工作/实习经历</h1>
            {jobHistory.map((job, index) => (
              <div key={index}>
                <div className="fill-info-manualy-container14">
                  <section className="fill-info-manualy-cards04">
                    <div className="fill-info-manualy-container15">
                      <span className="fill-info-manualy-text21">类型</span>
                      <span className="fill-info-manualy-text22">职位</span>
                      <span className="fill-info-manualy-text23">就职时间</span>
                    </div>
                    <div className="fill-info-manualy-container16">
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput13 input"
                        value={job.jobType}
                        onChange={(e) => handleJobChange(index, 'jobType', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput14 input"
                        value={job.position}
                        onChange={(e) => handleJobChange(index, 'position', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput15 input"
                        value={job.enrolledTime}
                        onChange={(e) => handleJobChange(index, 'enrolledTime', e.target.value)}
                      />
                    </div>
                  </section>
                </div>
                <Cards
                  text="工作内容"
                  text1="成就与贡献"
                  rootClassName="cards-root-class-name"
                  value={job.jobContent}
                  onChange={(e) => handleJobChange(index, 'jobContent', e.target.value)}
                  value1={job.achievement}
                  onChange1={(e) => handleJobChange(index, 'achievement', e.target.value)}
                ></Cards>
              </div>
            ))}
            <div className='flex flex-row items-center justify-between'>
              <button type="button" className="fill-info-manualy-button2 button" onClick={() => addMore('job')}>
                <span className="fill-info-manualy-text27">
                  添加工作/实习经历
                  <br />
                </span>
              </button>
              <button type="button" className={`${jobHistory.length > 1 ? "fill-info-manualy-button1 button" : "hidden"}`} onClick={() => reduceOne('job')}>
                <span className="fill-info-manualy-text17">
                  删除记录
                  <br />
                </span>
              </button>
            </div>
            <h1 className="fill-info-manualy-text30">项目经历</h1>
            {projects.map((project, index) => (
              <div key={index}>
                <div className="fill-info-manualy-container19">
                  <section className="fill-info-manualy-cards06">
                    <div className="fill-info-manualy-container20">
                      <span className="fill-info-manualy-text31">项目名称</span>
                      <span className="fill-info-manualy-text32">起止时间</span>
                    </div>
                    <div className="fill-info-manualy-container21">
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput19 input"
                        value={project.projectName}
                        onChange={(e) => handleProjectChange(index, 'projectName', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput20 input"
                        value={project.timeRange}
                        onChange={(e) => handleProjectChange(index, 'timeRange', e.target.value)}
                      />
                    </div>
                  </section>
                  <section className="fill-info-manualy-cards07">
                    <div className="fill-info-manualy-container22">
                      <span className="fill-info-manualy-text33">项目链接</span>
                      <span className="fill-info-manualy-text34">项目职位</span>
                    </div>
                    <div className="fill-info-manualy-container23">
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput21 input"
                        value={project.projectLink}
                        onChange={(e) => handleProjectChange(index, 'projectLink', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput22 input"
                        value={project.projectRole}
                        onChange={(e) => handleProjectChange(index, 'projectRole', e.target.value)}
                      />
                    </div>
                  </section>
                </div>
                <Cards
                  text="项目描述"
                  text1="项目成就"
                  rootClassName="cards-root-class-name1"
                  value={project.details}
                  onChange={(e) => handleProjectChange(index, 'details', e.target.value)}
                ></Cards>
              </div>
            ))}
            <div className='flex flex-row items-center justify-between'>
              <button type="button" className="fill-info-manualy-button3 button" onClick={() => addMore('project')}>
                <span className="fill-info-manualy-text27">
                  添加项目经历
                  <br />
                </span>
              </button>
              <button type="button" className={`${projects.length > 1 ? "fill-info-manualy-button1 button" : "hidden"}`} onClick={() => reduceOne('project')}>
                <span className="fill-info-manualy-text17">
                  删除记录
                  <br />
                </span>
              </button>
            </div>
            <h1 className="fill-info-manualy-text38">获奖信息</h1>
            {awards.map((award, index) => (
              <div key={index}>
                <div className="fill-info-manualy-container24">
                  <section className="fill-info-manualy-cards08">
                    <div className="fill-info-manualy-container25">
                      <span className="fill-info-manualy-text39">获奖名称</span>
                      <span className="fill-info-manualy-text39">获奖类型</span>
                      <span className="fill-info-manualy-text40">获奖时间</span>
                    </div>
                    <div className="fill-info-manualy-container26">
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput23 input"
                        value={award.awardName}
                        onChange={(e) => handleAwardChange(index, 'awardName', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput23 input"
                        value={award.awardType}
                        onChange={(e) => handleAwardChange(index, 'awardType', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput24 input"
                        value={award.timeReceived}
                        onChange={(e) => handleAwardChange(index, 'timeReceived', e.target.value)}
                      />
                    </div>
                  </section>
                </div>
                <Cards
                  text="获奖详情"
                  rootClassName="cards-root-class-name2"
                  value={award.details}
                  onChange={(e) => handleAwardChange(index, 'details', e.target.value)}
                ></Cards>
              </div>
            ))}
            <div className='flex flex-row items-center justify-between'>
              <button type="button" className="fill-info-manualy-button4 button" onClick={() => addMore('award')}>
                <span className="fill-info-manualy-text27">
                  添加获奖信息
                  <br />
                </span>
              </button>
              <button type="button" className={`${awards.length > 1 ? "fill-info-manualy-button1 button" : "hidden"}`} onClick={() => reduceOne('award')}>
                <span className="fill-info-manualy-text17">
                  删除记录
                  <br />
                </span>
              </button>
            </div>
            <h1 className="fill-info-manualy-text47">语言能力</h1>
            {languages.map((language, index) => (
              <div key={index} className="fill-info-manualy-container31">
                <section className="fill-info-manualy-cards11">
                  <div className="fill-info-manualy-container32">
                    <span className="fill-info-manualy-text48">语言</span>
                    <span className="fill-info-manualy-text49">证书类型</span>
                  </div>
                  <div className="fill-info-manualy-container33">
                    <input
                      type="text"
                      placeholder=""
                      className="fill-info-manualy-textinput27 input"
                      value={language.languageName}
                      onChange={(e) => handleLanguageChange(index, 'languageName', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder=""
                      className="fill-info-manualy-textinput28 input"
                      value={language.license}
                      onChange={(e) => handleLanguageChange(index, 'license', e.target.value)}
                    />
                  </div>
                </section>
                <section className="fill-info-manualy-cards12">
                  <div className="fill-info-manualy-container34">
                    <span className="fill-info-manualy-text50">熟练程度</span>
                    <span className="fill-info-manualy-text51">分数</span>
                  </div>
                  <div className="fill-info-manualy-container35">
                    <input
                      type="text"
                      placeholder=""
                      className="fill-info-manualy-textinput29 input"
                      value={language.proficiency}
                      onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder=""
                      className="fill-info-manualy-textinput30 input"
                      value={language.score}
                      onChange={(e) => handleLanguageChange(index, 'score', e.target.value)}
                    />
                  </div>
                </section>
              </div>
            ))}
            <div className='flex flex-row items-center justify-between'>
              <button type="button" className="fill-info-manualy-button5 button" onClick={() => addMore('language')}>
                <span className="fill-info-manualy-text27">
                  添加语言能力
                  <br />
                </span>
              </button>
              <button type="button" className={`${languages.length > 1 ? "fill-info-manualy-button1 button" : "hidden"}`} onClick={() => reduceOne('language')}>
                <span className="fill-info-manualy-text17">
                  删除记录
                  <br />
                </span>
              </button>
            </div>
            <h1 className="fill-info-manualy-text55">技能</h1>
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="fill-info-manualy-container36">
                  <section className="fill-info-manualy-cards13">
                    <div className="fill-info-manualy-container37">
                      <span className="fill-info-manualy-text56">技能名称</span>
                    </div>
                    <div className="fill-info-manualy-container38">
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput31 input"
                        value={skill.skillName}
                        onChange={(e) => handleSkillChange(index, 'skillName', e.target.value)}
                      />
                    </div>
                  </section>
                  <section className="fill-info-manualy-cards14">
                    <div className="fill-info-manualy-container39">
                      <span className="fill-info-manualy-text57">熟练程度</span>
                    </div>
                    <div className="fill-info-manualy-container40">
                      <input
                        type="text"
                        placeholder=""
                        className="fill-info-manualy-textinput32 input"
                        value={skill.proficiency}
                        onChange={(e) => handleSkillChange(index, 'proficiency', e.target.value)}
                      />
                    </div>
                  </section>
                </div>
              </div>
            ))}
            <div className="w-full flex flex-row justify-between items-center">
              <button type="button" className="fill-info-manualy-button6 button" onClick={() => addMore('skill')}>
                <span className="fill-info-manualy-text58">
                  添加技能
                  <br />
                </span>
              </button>
              <button type="button" className={`${skills.length > 1 ? "fill-info-manualy-button1 button" : "hidden"}`} onClick={() => reduceOne('skill')}>
                <span className="fill-info-manualy-text17">
                  删除记录
                  <br />
                </span>
              </button>
            </div>
          </div>
          <button type="submit" className="button fill-info-manualy-link">
            <span className="p-auto">
              下一步
              <br />
            </span>
          </button>
        </form >
      </div >
      <style jsx>
        {`
          .fill-info-manualy-container01 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .fill-info-manualy-container02 {
            flex: 0 0 auto;
            width: 600px;
            height: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .fill-info-manualy-cards {
            gap: var(--dl-space-space-fiveunits);
            width: 600px;
            height: 249px;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 20px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container03 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text03 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text04 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text05 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container04 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput01 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput02 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-container05 {
            flex: 0 0 auto;
            width: 600px;
            height: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .fill-info-manualy-cards01 {
            gap: var(--dl-space-space-fiveunits);
            width: 585px;
            height: 186px;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: var(--dl-space-space-oneandhalfunits);
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container06 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text06 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text07 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container07 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput03 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput04 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-text08 {
            color: var(--dl-color-gray-black);
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-twounits);
            margin-bottom: var(--dl-space-space-twounits);
          }
          .fill-info-manualy-container08 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .fill-info-manualy-cards02 {
            gap: var(--dl-space-space-fiveunits);
            width: 600px;
            height: auto;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 20px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container09 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text09 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text10 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text11 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text12 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container10 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput05 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput06 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput07 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput08 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-cards03 {
            gap: var(--dl-space-space-fiveunits);
            width: 600px;
            height: auto;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: var(--dl-space-space-oneandhalfunits);
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container11 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text13 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text14 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text15 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text16 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container12 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput09 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput10 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput11 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput12 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-container13 {
            flex: 0 0 auto;
            width: auto;
            height: 249px;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .fill-info-manualy-button1 {
            align-self: flex-end;
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-fiveunits);
            margin-right: var(--dl-space-space-fiveunits);
            margin-bottom: var(--dl-space-space-fourunits);
            background-color: var(--dl-color-primary-500);
          }
          .fill-info-manualy-text17 {
            color: var(--dl-color-gray-white);
          }
          .fill-info-manualy-text20 {
            color: var(--dl-color-gray-black);
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-twounits);
            margin-bottom: var(--dl-space-space-twounits);
          }
          .fill-info-manualy-container14 {
            width: auto;
            height: 198px;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .fill-info-manualy-cards04 {
            gap: var(--dl-space-space-fiveunits);
            width: 625px;
            height: 215px;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 20px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container15 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text21 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text22 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text23 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container16 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput13 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput14 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput15 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-cards05 {
            gap: var(--dl-space-space-fiveunits);
            width: 570px;
            height: 215px;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 20px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container17 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text24 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text25 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text26 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container18 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput16 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput17 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput18 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-button2 {
            align-self: flex-end;
            margin-top: var(--dl-space-space-oneandhalfunits);
            margin-left: var(--dl-space-space-fiveunits);
            margin-right: var(--dl-space-space-fiveunits);
            margin-bottom: var(--dl-space-space-fourunits);
            background-color: var(--dl-color-primary-500);
          }
          .fill-info-manualy-text27 {
            color: var(--dl-color-gray-white);
          }
          .fill-info-manualy-text30 {
            color: var(--dl-color-gray-black);
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-twounits);
            margin-bottom: var(--dl-space-space-twounits);
          }
          .fill-info-manualy-container19 {
            flex: 0 0 auto;
            width: auto;
            height: 158px;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .fill-info-manualy-cards06 {
            gap: var(--dl-space-space-fiveunits);
            width: 600px;
            height: 158px;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 13px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container20 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text31 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text32 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container21 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput19 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput20 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-cards07 {
            gap: var(--dl-space-space-fiveunits);
            width: 600px;
            height: 158px;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 13px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container22 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text33 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text34 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container23 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput21 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput22 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-button3 {
            color: var(--dl-color-gray-white);
            align-self: flex-end;
            margin-top: var(--dl-space-space-oneandhalfunits);
            margin-left: var(--dl-space-space-fiveunits);
            margin-right: var(--dl-space-space-fiveunits);
            margin-bottom: var(--dl-space-space-fourunits);
            background-color: var(--dl-color-primary-500);
          }
          .fill-info-manualy-text38 {
            color: var(--dl-color-gray-black);
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-twounits);
            margin-bottom: var(--dl-space-space-twounits);
          }
          .fill-info-manualy-container24 {
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .fill-info-manualy-cards08 {
            gap: var(--dl-space-space-fiveunits);
            width: 600px;
            height: fit-content;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 10px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: 10px;
            justify-content: center;
          }
          .fill-info-manualy-container25 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text39 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text40 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container26 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput23 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput24 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-cards09 {
            gap: var(--dl-space-space-fiveunits);
            width: 600px;
            height: 158px;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 13px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container27 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text41 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text42 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container28 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput25 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput26 {
            align-self: center;
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-cards10 {
            gap: var(--dl-space-space-fiveunits);
            width: 1200px;
            height: 166px;
            display: flex;
            position: relative;
            max-width: 1440px;
            align-items: center;
            padding-top: 20px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container29 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text43 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: var(--dl-space-space-threeunits);
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: var(--dl-space-space-threeunits);
          }
          .fill-info-manualy-container30 {
            flex: 0 0 auto;
            width: 783px;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textarea {
            width: 783px;
            height: 100px;
            margin-top: var(--dl-space-space-unit);
            margin-bottom: var(--dl-space-space-unit);
          }
          .fill-info-manualy-button4 {
            color: var(--dl-color-gray-white);
            align-self: flex-end;
            margin-top: var(--dl-space-space-oneandhalfunits);
            margin-left: var(--dl-space-space-fiveunits);
            margin-right: var(--dl-space-space-fiveunits);
            margin-bottom: var(--dl-space-space-fourunits);
            background-color: var(--dl-color-primary-500);
          }
          .fill-info-manualy-text47 {
            color: var(--dl-color-gray-black);
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-twounits);
            margin-bottom: var(--dl-space-space-twounits);
          }
          .fill-info-manualy-container31 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .fill-info-manualy-cards11 {
            gap: var(--dl-space-space-fiveunits);
            width: 600px;
            height: auto;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 13px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container32 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text48 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text49 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container33 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput27 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput28 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-cards12 {
            gap: var(--dl-space-space-fiveunits);
            width: 600px;
            height: auto;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 13px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container34 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text50 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-text51 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container35 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput29 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-textinput30 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-button5 {
            color: var(--dl-color-gray-white);
            align-self: flex-end;
            margin-top: var(--dl-space-space-oneandhalfunits);
            margin-left: var(--dl-space-space-fiveunits);
            margin-right: var(--dl-space-space-fiveunits);
            margin-bottom: var(--dl-space-space-fourunits);
            background-color: var(--dl-color-primary-500);
          }
          .fill-info-manualy-text55 {
            color: var(--dl-color-gray-black);
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-twounits);
            margin-bottom: var(--dl-space-space-twounits);
          }
          .fill-info-manualy-container36 {
            flex: 0 0 auto;
            width: auto;
            height: 102px;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .fill-info-manualy-cards13 {
            gap: var(--dl-space-space-fiveunits);
            width: 600px;
            height: 102px;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 13px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container37 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text56 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container38 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput31 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-cards14 {
            gap: var(--dl-space-space-fiveunits);
            width: 600px;
            height: 102px;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: 13px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .fill-info-manualy-container39 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .fill-info-manualy-text57 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: 19px;
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: 19px;
          }
          .fill-info-manualy-container40 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .fill-info-manualy-textinput32 {
            margin-top: 12px;
            padding-left: 1px;
            margin-bottom: 12px;
            padding-right: 1px;
          }
          .fill-info-manualy-container41 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .fill-info-manualy-container42 {
            flex: 0 0 auto;
            width: auto;
            border: 2px dashed rgba(120, 120, 120, 0.4);
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .fill-info-manualy-button6 {
            align-self: flex-end;
            margin-top: 21px;
            margin-left: var(--dl-space-space-fiveunits);
            margin-right: var(--dl-space-space-fiveunits);
            margin-bottom: var(--dl-space-space-fourunits);
            background-color: var(--dl-color-primary-500);
          }
          .fill-info-manualy-text58 {
            color: var(--dl-color-gray-white);
          }
          .fill-info-manualy-link {
            color: #000000;
            width: 185px;
            align-self: center;
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-fiveunits);
            margin-right: var(--dl-space-space-fiveunits);
            margin-bottom: var(--dl-space-space-fourunits);
            text-decoration: none;
            background-color: var(--dl-color-primary-700);
          }
          @media (max-width: 767px) {
            .fill-info-manualy-testimonial-card {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .fill-info-manualy-testimonial {
              margin-right: var(--dl-space-space-twounits);
            }
            .fill-info-manualy-cards {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards01 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards02 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards03 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards04 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards05 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards06 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards07 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards08 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards09 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards10 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards11 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards12 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards13 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .fill-info-manualy-cards14 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
          }
          @media (max-width: 479px) {
            .fill-info-manualy-testimonial-card {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              flex-direction: column;
              padding-bottom: var(--dl-space-space-twounits);
            }
            .fill-info-manualy-testimonial {
              align-items: center;
              margin-right: 0px;
              margin-bottom: var(--dl-space-space-unit);
            }
            .fill-info-manualy-text01 {
              text-align: left;
            }
          }
        `}
      </style>
    </>
  )
}

export default FillInfoManualy
