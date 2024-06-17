import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";

const ResumeFormatter = ({ markdownContent, htmlContent }) => {
  const exportMarkdown = () => {
    const blob = new Blob([markdownContent], {
      type: "text/markdown;charset=utf-8",
    });
    saveAs(blob, "document.md");
  };

  // Function to export PDF
  const exportPDF = () => {
    const element = document.createElement("div");
    element.innerHTML = htmlContent;
    html2pdf().from(element).save("document.pdf");
  };

  return (
    <>
      <div class="mb-4 flex flex-col items-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          导入 Markdown
        </button>
      </div>
      <div class="mb-4 flex flex-col items-center">
        <button
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-40"
          onClick={exportPDF}
        >
          导出为 PDF
        </button>
      </div>
      <div class="mb-4 flex flex-col items-center">
        <button
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-40"
          onClick={exportMarkdown}
        >
          导出为 Markdown
        </button>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="paper-size"
        >
          纸张尺寸
        </label>
        <select
          id="paper-size"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>A4</option>
          <option>A3</option>
          <option>Letter</option>
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="theme-color"
        >
          主题色
        </label>
        <input
          type="color"
          id="theme-color"
          name="theme-color"
          value="#000000"
          class="w-full h-10 rounded"
        ></input>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="font-chinese"
        >
          语言
        </label>
        <select
          id="font-chinese"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>中文</option>
          <option>English</option>
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="font-english"
        >
          字体
        </label>
        <select
          id="font-english"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>微软雅黑</option>
          <option>仿宋</option>
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="font-size"
        >
          字号: <span id="font-size-value">16</span>
        </label>
        <input
          type="range"
          id="font-size"
          name="font-size"
          min="12"
          max="20"
          value="16"
          class="w-full"
        ></input>
      </div>
    </>
  );
};

export default ResumeFormatter;
