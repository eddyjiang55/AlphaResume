import Link from "next/link";
import { useRouter } from "next/router"; // 导入 useRouter 钩子

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
  { name: "结束", path: "/fill-info-step10" },
];

const ResumeNavbar = (currentIndex) => {
  const router = useRouter(); // 使用 useRouter 钩子
  return (
    <div className="w-full flex flex-row justify-around items-center py-4 px-auto bg-[#B2DDEE]">
      {buttons.map((button) => (
        <Link
          key={button.name}
          href={button.path + "?id=" + currentIndex.currentIndex}
          passHref
        >
          <button
            className={`rounded-xl px-6 py-4 grow transition-colors duration-150 hover:bg-[#1D80A7] hover:text-white hover:font-bold ${
              router.pathname === button.path
                ? "bg-[#1D80A7] text-white font-bold"
                : ""
            }`}
          >
            <p className="text-base">{button.name} </p>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ResumeNavbar;
