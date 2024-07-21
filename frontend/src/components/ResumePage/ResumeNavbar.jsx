import { useRouter } from "next/router"; // 导入 useRouter 钩子

const steps = [
  { name: "基础信息", path: "/resume/fill-info-step1" },
  { name: "个人评价", path: "/resume/fill-info-step2" },
  { name: "教育经历", path: "/resume/fill-info-step3" },
  { name: "职业经历", path: "/resume/fill-info-step4" },
  { name: "项目经历", path: "/resume/fill-info-step5" },
  { name: "获奖与证书", path: "/resume/fill-info-step6" },
  { name: "科研论文与知识产权", path: "/resume/fill-info-step7" },
  { name: "技能", path: "/resume/fill-info-step8" },
  { name: "语言", path: "/resume/fill-info-step9" },
  { name: "结束", path: "/resume/fill-info-step10" },
];

const ResumeNavbar = () => {
  const router = useRouter(); // 使用 useRouter 钩子
  return (
    <div className="w-full flex flex-row justify-around items-center py-4 px-auto bg-[#B2DDEE] gap-x-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`rounded-xl px-6 py-4 transition-colors duration-150 first:ml-6 last:mr-6 ${
            router.pathname === step.path
              ? "bg-alpha-blue text-white font-bold"
              : ""
          }`}
        >
          <p className="text-base text-black text-center whitespace-nowrap">{step.name} </p>
        </div>
      ))}
    </div>
  );
};

export default ResumeNavbar;
