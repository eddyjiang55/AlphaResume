import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router'; // 导入 useRouter 钩子
import Navbar from '../components/navbar';
import ResumeNavbar from "../components/resume-navbar";
import ResumeEditer from '../components/editer';
import ResumeRender from '../components/renderer';
import LoadingBar from '../components/LoadingBar';

export async function getServerSideProps(context) {
  let dbFormData = { _id: context.query.id };
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
      <div className='grid grid-cols-12 max-h-[calc(100%-250px)] h-full gap-x-8 pb-2 overflow-y-auto'>
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

        <div id="format zone" className='col-span-2 p-8 flex flex-col justify-center items-center'>
          <h2 className="text-alpha-blue font-bold text-4xl mb-8">格式调节</h2>
          <div className='w-full rounded-lg bg-white shadow-lg flex-1'>
          </div>
        </div>
      </div>
    </div>
  )
}