import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router'; // 导入 useRouter 钩子
import Navbar from '../components/navbar';
import ResumeNavbar from "../components/resume-navbar";
import ResumeEditer from '../components/editer';
import ResumeRender from '../components/renderer';
import LoadingBar from '../components/LoadingBar';

export async function getServerSideProps(context) {
  let dbFormData = {}
  if (context.query.id) {
    dbFormData = { _id: context.query.id };
  }
  // let dbFormData = { _id: '123' };
  return { props: { dbFormData } }
}

export default function GeneratedResumePage({ dbFormData }) {

  const [loading, setLoading] = useState(true);
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/improved-users/resume-result",
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: dbFormData._id
            }),
          }
        );
        console.log(response.status === 200);
        if (response.status === 200) {
          setLoading(false);
          clearInterval(intervalId);
        } else if (response.status === 202) {
          console.log('Result is still running');
        } else {
          throw new Error('Failed to fetch: ' + response.statusText);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (loading) {
      fetchData();
    }

    const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, [dbFormData]);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const markdownResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/improved-users/markdown`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: dbFormData._id })
        });
        if (markdownResponse.status === 200) {
          const markdownData = await markdownResponse.text();  // Assuming server responds with text
          setMarkdownContent(markdownData);
        } else {
          throw new Error('Failed to fetch markdown: ' + markdownResponse.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (!loading) {
      fetchMarkdown();
    }
  }, [loading]);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-light-blue">
      <Navbar />
      <ResumeNavbar />
      <div className='grid grid-cols-12 max-h-[calc(100%-250px)] h-full pb-2 overflow-y-auto gap-x-1'>
        <div id="edit zone" className='col-span-5 p-8 flex flex-col justify-center items-center'>
          <h2 className="text-alpha-blue font-bold text-4xl mb-8">编辑简历</h2>
          <div className='w-full rounded-lg bg-white shadow-lg flex-1'>
            {loading ? <LoadingBar /> :
              <ResumeEditer markdownData={markdownContent} editMarkdownData={setMarkdownContent} />
            }
          </div>

        </div>
        <div id="output zone" className='col-span-5 p-8 flex flex-col justify-center items-center'>
          <h2 className="text-alpha-blue font-bold text-4xl mb-8">导出效果</h2>
          <div className='w-full rounded-lg bg-white shadow-lg flex-1'>
            {loading ? <LoadingBar /> :
              <ResumeRender markdownData={markdownContent} />
            }
          </div>

        </div>

        <div id="format zone" className='p-8 flex flex-col justify-center items-center w-72'>
          <h2 class="text-alpha-blue font-bold text-4xl mb-8">格式调节</h2>
          <div class="w-full rounded-lg bg-white shadow-lg flex-1 p-4">
            <div class="mb-4 flex flex-col items-center">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                导入 Markdown
              </button>
            </div>
            <div class="mb-4 flex flex-col items-center">
              <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-40">
                导出为 PDF
              </button>
            </div>
            <div class="mb-4 flex flex-col items-center">
              <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-40">
                导出为 Markdown
              </button>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="paper-size">
                纸张尺寸
              </label>
              <select id="paper-size" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option>A4</option>
                <option>A3</option>
                <option>Letter</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="theme-color">
                主题色
              </label>
              <input type="color" id="theme-color" name="theme-color" value="#000000" class="w-full h-10 rounded"></input>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="font-chinese">
                语言
              </label>
              <select id="font-chinese" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option>中文</option>
                <option>English</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="font-english">
                字体
              </label>
              <select id="font-english" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option>微软雅黑</option>
                <option>仿宋</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="font-size">
                字号: <span id="font-size-value">16</span>
              </label>
              <input type="range" id="font-size" name="font-size" min="12" max="20" value="16" class="w-full"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}