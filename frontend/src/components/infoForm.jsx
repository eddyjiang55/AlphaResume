import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const InformationForm = ({ shouldSubmit, handleSubmit }) => {
  const [bio, setBio] = useState([
    {
      姓: "",
      名: "",
      手机号码: "",
      邮箱: "",
      微信号: "",
      年龄: 0,
      城市: "",
    },
  ]);

  const handleBioChange = (index, field, value) => {
    setBio({ ...bio, [field]: value });
  };

  // Education history part state
  const [educationHistory, setEducationHistory] = useState([
    {
      学历: "",
      学校名称: "",
      城市: "",
      国家: "",
      起止时间: "",
      院系: "",
      专业: "",
      GPA: "",
      获奖记录: "",
      主修课程: "",
    },
  ]);

  const handleEducationChange = (index, field, value) => {
    const newEducationHistory = [...educationHistory];
    newEducationHistory[index] = {
      ...newEducationHistory[index],
      [field]: value,
    };
    setEducationHistory(newEducationHistory);
  };

  // Job/Intern history part state
  const [jobHistory, setJobHistory] = useState([
    {
      公司名字: "",
      工作类型: "",
      工作职位: "",
      就职时间: "",
      工作内容: "",
      成就与贡献: "",
    },
  ]);

  const handleJobChange = (index, field, value) => {
    const newJobHistory = [...jobHistory];
    newJobHistory[index] = { ...newJobHistory[index], [field]: value };
    setJobHistory(newJobHistory);
  };

  // Project part state
  const [projects, setProjects] = useState([
    {
      项目名称: "",
      项目链接: "",
      项目起止时间: "",
      项目职位: "",
      项目描述: "",
      项目成就: "",
    },
  ]);

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  // Award part state
  const [awards, setAwards] = useState([
    {
      获奖类型: "",
      获奖名称: "",
      获奖时间: "",
      获奖详情: "",
    },
  ]);

  const handleAwardChange = (index, field, value) => {
    const newAwards = [...awards];
    newAwards[index] = { ...newAwards[index], [field]: value };
    setAwards(newAwards);
  };

  // Language part state
  const [languages, setLanguages] = useState([
    {
      语言: "",
      熟练程度: "",
      证书类型: "",
      分数: "",
    },
  ]);

  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    setLanguages(newLanguages);
  };

  // Skills part state
  const [skills, setSkills] = useState([
    {
      技能名称: "",
      熟练程度: "",
    },
  ]);

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setSkills(newSkills);
  };

  // Unified function to add more inputs
  const addMore = (section) => {
    switch (section) {
      case "education":
        setEducationHistory([
          ...educationHistory,
          {
            学历: "",
            学校名称: "",
            城市: "",
            国家: "",
            起止时间: "",
            院系: "",
            专业: "",
            GPA: "",
            获奖记录: "",
            主修课程: "",
          },
        ]);
        break;
      case "jobHistory":
        setJobHistory([
          ...jobHistory,
          {
            公司名字: "",
            工作类型: "",
            工作职位: "",
            就职时间: "",
            工作内容: "",
            成就与贡献: "",
          },
        ]);
        break;
      case "projects":
        setProjects([
          ...projects,
          {
            项目名称: "",
            项目链接: "",
            项目起止时间: "",
            项目职位: "",
            项目描述: "",
            项目成就: "",
          },
        ]);
        break;
      case "awards":
        setAwards([
          ...awards,
          {
            获奖类型: "",
            获奖名称: "",
            获奖时间: "",
            获奖详情: "",
          },
        ]);
        break;
      case "languages":
        setLanguages([
          ...languages,
          {
            语言: "",
            熟练程度: "",
            证书类型: "",
            分数: "",
          },
        ]);
        break;
      case "skills":
        setSkills([
          ...skills,
          {
            技能名称: "",
            熟练程度: "",
          },
        ]);
        break;
      default:
        break;
    }
  };

  const reduceOne = (section) => {
    switch (section) {
      case "education":
        if (educationHistory.length > 1) {
          const newEducationHistory = [...educationHistory];
          newEducationHistory.pop();
          setEducationHistory(newEducationHistory);
        }
        break;
      case "jobHistory":
        if (jobHistory.length > 1) {
          const newJobHistory = [...jobHistory];
          newJobHistory.pop();
          setJobHistory(newJobHistory);
        }
        break;
      case "projects":
        if (projects.length > 1) {
          const newProjects = [...projects];
          newProjects.pop();
          setProjects(newProjects);
        }
        break;
      case "awards":
        if (awards.length > 1) {
          const newAwards = [...awards];
          newAwards.pop();
          setAwards(newAwards);
        }
        break;
      case "languages":
        if (languages.length > 1) {
          const newLanguages = [...languages];
          newLanguages.pop();
          setLanguages(newLanguages);
        }
        break;
      case "skills":
        if (skills.length > 1) {
          const newSkills = [...skills];
          newSkills.pop();
          setSkills(newSkills);
        }
        break;
    }
  };

  const formDataFields = [
    {
      section: "bio",
      sectionName: "基本信息",
      extendable: false,
      fields: [
        { label: "姓", name: "lastName", type: "text" },
        { label: "名", name: "firstName", type: "text" },
        { label: "手机号码", name: "mobile", type: "text" },
        { label: "微信号", name: "wechat", type: "text" },
        { label: "邮箱", name: "email", type: "text" },
        { label: "年龄", name: "age", type: "number" },
        { label: "城市", name: "city", type: "text" },
      ],
      states: bio,
      changeState: handleBioChange,
    },
    {
      section: "education",
      sectionName: "教育经历",
      extendable: true,
      addButtonText: "添加学历",
      reduceButtonText: "删除记录",
      fields: [
        { label: "学历", name: "degree", type: "text" },
        { label: "学校名称", name: "schoolName", type: "text" },
        { label: "城市", name: "city", type: "text" },
        { label: "国家", name: "country", type: "text" },
        { label: "起止时间", name: "period", type: "text" },
        { label: "院系", name: "department", type: "text" },
        { label: "专业", name: "major", type: "text" },
        { label: "GPA", name: "gpa", type: "text" },
        { label: "获奖记录", name: "awards", type: "textarea" },
        { label: "主修课程", name: "mainCourses", type: "textarea" },
      ],
      states: educationHistory,
      changeState: handleEducationChange,
    },
    {
      section: "jobHistory",
      sectionName: "工作/实习经历",
      extendable: true,
      addButtonText: "添加工作经历",
      reduceButtonText: "删除记录",
      fields: [
        { label: "公司名字", name: "companyName", type: "text" },
        { label: "工作类型", name: "jobType", type: "text" },
        { label: "工作职位", name: "jobPosition", type: "text" },
        { label: "就职时间", name: "employmentPeriod", type: "text" },
        { label: "工作内容", name: "jobDescription", type: "textarea" },
        { label: "成就与贡献", name: "achievements", type: "textarea" },
      ],
      states: jobHistory,
      changeState: handleJobChange,
    },
    {
      section: "projects",
      sectionName: "项目经历",
      extendable: true,
      addButtonText: "添加项目",
      reduceButtonText: "删除记录",
      fields: [
        { label: "项目名称", name: "projectName", type: "text" },
        { label: "项目链接", name: "projectLink", type: "text" },
        { label: "项目起止时间", name: "projectPeriod", type: "text" },
        { label: "项目职位", name: "projectRole", type: "text" },
        { label: "项目描述", name: "projectDescription", type: "textarea" },
        { label: "项目成就", name: "projectAchievements", type: "textarea" },
      ],
      states: projects,
      changeState: handleProjectChange,
    },
    {
      section: "awards",
      sectionName: "获奖信息",
      extendable: true,
      addButtonText: "添加获奖记录",
      reduceButtonText: "删除记录",
      fields: [
        { label: "获奖类型", name: "awardType", type: "text" },
        { label: "获奖名称", name: "awardName", type: "text" },
        { label: "获奖时间", name: "awardTime", type: "text" },
        { label: "获奖详情", name: "awardDetails", type: "textarea" },
      ],
      states: awards,
      changeState: handleAwardChange,
    },
    {
      section: "languages",
      sectionName: "语言能力",
      extendable: true,
      addButtonText: "添加语言",
      reduceButtonText: "删除记录",
      fields: [
        { label: "语言", name: "language", type: "text" },
        { label: "熟练程度", name: "proficiencyLevel", type: "text" },
        { label: "证书类型", name: "certificateType", type: "text" },
        { label: "分数", name: "score", type: "text" },
      ],
      states: languages,
      changeState: handleLanguageChange,
    },
    {
      section: "skills",
      sectionName: "技能",
      extendable: true,
      addButtonText: "添加技能",
      reduceButtonText: "删除记录",
      fields: [
        { label: "技能名称", name: "skillName", type: "text" },
        { label: "熟练程度", name: "proficiency", type: "text" },
      ],
      states: skills,
      changeState: handleSkillChange,
    },
  ];

  useEffect(() => {
    if (shouldSubmit) {
      const formData = {
        id: uuidv4(),
        基本信息: bio,
        教育经历: educationHistory,
        工作_实习经历: jobHistory,
        项目经历: projects,
        获奖信息: awards,
        语言能力: languages,
        技能: skills,
      };
      console.log(formData);
      handleSubmit(formData);
    }
  }, [shouldSubmit]);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center bg-[#e4e4e4] shadow-xl p-10 gap-y-10">
        <h1 className="">将简历拖拽至此处</h1>
        <button type="button" className="text-black bg-[#14a9ff] button">
          上传文件
        </button>
        <span className="text-gray-600 text-lg">
          将文件大小控制在6M以内，支持格式pdf/.doc/.docx/.jpg/.png上传成功后，可选择解析简历并填充，便于后续填写、修改。
        </span>
      </div>
      <form className="w-full mx-auto mt-10">
        {formDataFields.map((section, sectionIndex) => (
          <section key={sectionIndex} className="mb-8">
            <h2 className="text-black my-4 ml-2 text-2xl">
              {section.sectionName}
            </h2>
            {section.states.map((state, stateIndex) => (
              <div
                key={stateIndex}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6"
              >
                {section.fields.map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className={`${
                      field.type === "textarea" ? "md:col-span-2" : ""
                    }`}
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        rows="6"
                        onChange={(e) =>
                          section.changeState(
                            stateIndex,
                            field.label,
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
            {section.extendable && (
              <div className="md:col-span-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => addMore(section.section)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded text-lg font-normal"
                >
                  {section.addButtonText}
                </button>
                <button
                  type="button"
                  onClick={() => reduceOne(section.section)}
                  className={`${
                    section.states.length > 1
                      ? "mt-2 px-4 py-2 bg-red-500 text-white rounded"
                      : "hidden"
                  }`}
                >
                  {section.reduceButtonText}
                </button>
              </div>
            )}
          </section>
        ))}
      </form>
    </>
  );
};

export default InformationForm;
