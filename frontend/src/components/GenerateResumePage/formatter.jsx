import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

const ResumeFormatter = ({
  pagesize,
  handleChangePageSize,
  exportMarkdown,
  resumeTitle,
}) => {
  const [themeColor, setThemeColor] = useState("#000000");
  const [language, setLanguage] = useState("zh");
  const [font, setFont] = useState("微软雅黑");
  const [fontSize, setFontSize] = useState(16);

  const fontOptions = {
    zh: ["微软雅黑", "仿宋", "宋体", "黑体"],
    en: ["Arial", "Times New Roman", "Courier New", "Georgia"],
  };

  const langOptions = [
    { key: "zh", value: "中文" },
    { key: "en", value: "English" },
  ];

  const handleChangeofLanguage = (e) => {
    setLanguage(e.target.value);
  };

  useEffect(() => {
    // Change theme-title's font color
    console.log(themeColor);
    document.documentElement.style.setProperty("--theme-color", themeColor);
  }, [themeColor]);

  useEffect(() => {
    // Change font size
    document.documentElement.style.setProperty(
      "--base-font-size",
      `${fontSize}px`
    );
  }, [fontSize]);

  useEffect(() => {
    // Change language
    const root = document.documentElement;
    if (language === "zh") {
      root.setAttribute("lang", "zh");
      setFont(fontOptions.zh[0]);
    } else {
      root.setAttribute("lang", "en");
      setFont(fontOptions.en[0]);
    }
  }, [language]);

  useEffect(() => {
    // Change font family for export section
    const exportContainer = document.querySelector(".resume-body");
    if (exportContainer) {
      exportContainer.style.fontFamily = font;
    }
  }, [font]);

  const exportPDF = () => {
    console.log(resumeTitle);
    if (resumeTitle === "") {
      return;
    }
    const exportContainer = document.querySelector(".resume-body");
    html2pdf().from(exportContainer).save(`${resumeTitle}.pdf`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          导入 Markdown
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={exportPDF}
        >
          导出为 PDF
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={exportMarkdown}
        >
          导出为 Markdown
        </button>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="paper-size"
        >
          纸张尺寸
        </label>
        <select
          id="paper-size"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={pagesize}
          onChange={(e) => handleChangePageSize(e.target.value)}
        >
          <option>A4</option>
          <option>Letter</option>
        </select>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="theme-color"
        >
          主题色
        </label>
        <input
          type="color"
          id="theme-color"
          name="theme-color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
          className="w-full h-10 rounded"
        ></input>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="font-chinese"
        >
          语言
        </label>
        <select
          id="font-chinese"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={language}
          onChange={handleChangeofLanguage}
        >
          {langOptions.map((langOption) => (
            <option key={langOption.key} value={langOption.key}>
              {langOption.value}
            </option>
          ))}
        </select>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="font-english"
        >
          字体
        </label>
        <select
          id="font-english"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          {fontOptions[language].map((fontOption) => (
            <option key={fontOption} value={fontOption}>
              {fontOption}
            </option>
          ))}
        </select>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="font-size"
        >
          字号: <span id="font-size-value">{fontSize}</span>
        </label>
        <input
          type="range"
          id="font-size"
          name="font-size"
          min="12"
          max="20"
          value={fontSize}
          onChange={(e) => {
            setFontSize(e.target.value);
            document.getElementById("font-size-value").innerText =
              e.target.value;
          }}
          className="w-full"
        ></input>
      </div>
    </>
  );
};

export default ResumeFormatter;
