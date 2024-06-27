import { useState } from "react";

const ResumeFormatter = ({ exportMarkdown, exportPDF }) => {
  const [paperSize, setPaperSize] = useState("A4");
  const [themeColor, setThemeColor] = useState("#000000");
  const [language, setLanguage] = useState("中文");
  const [font, setFont] = useState("微软雅黑");
  const [fontSize, setFontSize] = useState(16);

  return (
    <>
      <div className="mb-4 flex flex-col items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          导入 Markdown
        </button>
      </div>
      <div className="mb-4 flex flex-col items-center">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-40"
          onClick={exportPDF}
        >
          导出为 PDF
        </button>
      </div>
      <div className="mb-4 flex flex-col items-center">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-40"
          onClick={exportMarkdown}
        >
          导出为 Markdown
        </button>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="paper-size"
        >
          纸张尺寸
        </label>
        <select
          id="paper-size"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={paperSize}
          onChange={(e) => setPaperSize(e.target.value)}
        >
          <option>A4</option>
          <option>A3</option>
          <option>Letter</option>
        </select>
      </div>
      <div className="mb-4">
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
      </div>
      <div className="mb-4">
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
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>中文</option>
          <option>English</option>
        </select>
      </div>
      <div className="mb-4">
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
          <option>微软雅黑</option>
          <option>仿宋</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="font-size"
        >
          字号: <span id="font-size-value">16</span>
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
