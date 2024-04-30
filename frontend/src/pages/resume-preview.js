import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageComponent from '../components/pageComponent'
import { splitMarkdownIntoPages } from '../lib/process-page'

import Navbar from '../components/navbar'

const ResumePreview = (props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [resumeData, setResumeData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const taskId = router.asPath.split('=')[1];
  const resumeBodyRef = useRef(null);

  const onElementClick = (node) => {
    let contentArray = [];
    let textToDisplay = '';
    console.log(node);
    if (node.tagName === 'p') {
      // Extract text content directly from the paragraph node
      textToDisplay = node.children.map((child) => child.value).join('');
    }
    // else if (node.tagName === 'li') {
    //   // Extract text from all list items within the parent list
    //   // console.log(node);
    //   // textToDisplay = node.parentNode.children.map(item => item.children.map(child => child.value).join('')).join('\n');
    // }
    else {
      node.children.forEach((child) => {
        // Each child's actual text content is nested inside its properties, so we need to access it

        // If the text content is a simple string, add it to the array
        if (child.type === 'text') {
          contentArray.push(child.value);
        } else if (child.type === 'element') {
          // If the text content is an array (for nested elements within the list item), join them
          const combinedText = child.children.map((item) => {
            // This assumes the nested structure isn't too complex; adjust as needed for deeper nesting
            return item.type === 'text' ? item.value : item.children;
          }).join('');
          contentArray.push(combinedText);
        }
      });
    }
    // console.log(contentArray);
    textToDisplay += contentArray.join('');

    setResumeData(textToDisplay);
  };

  const downloadResume = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/file/${taskId}`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', true);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (resumeBodyRef.current) {
        const { scrollTop, offsetHeight } = resumeBodyRef.current;
        // Assuming each pageComponent has the same height and fully occupies the visible area
        const pageIndex = Math.round((scrollTop + offsetHeight) / offsetHeight);
        setCurrentPage(pageIndex);
      }
    };

    const resumeBodyEl = resumeBodyRef.current;
    if (resumeBodyEl) resumeBodyEl.addEventListener('scroll', handleScroll);

    return () => { if (resumeBodyEl) resumeBodyEl.removeEventListener('scroll', handleScroll); }
  }, [pages]);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/result/${taskId}`, { method: 'GET' });
        if (response.status === 200) {
          const data = await response.json();
          // setResumeData(data.result);
          // console.log(data.result)
          const resumepages = splitMarkdownIntoPages(data.result);
          setPages(resumepages);
          setLoading(false);  // Stop polling once data is received
        } else if (response.status === 202) {
          console.log('Result is still running, waiting for next interval');
        } else {
          console.error('Error fetching resume data:', response.status);
          setLoading(false);  // Stop polling if there is an error other than 202
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
        setLoading(false);  // Stop polling if there is a network or server error
      }
    }

    fetchResumeData();

    const intervalId = setInterval(() => {
      if (loading) {
        fetchResumeData();
      } else {
        clearInterval(intervalId);  // Clear interval if not loading
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [taskId, loading]);

  return (
    <>
      <div className="w-full flex h-full items-start flex-col justify-start bg-white">
        <Head>
          <title>ResumePreview - AI Resume</title>
          <meta property="og:title" content="ResumePreview - AI Resume" />
        </Head>
        <Navbar></Navbar>
        <div className="w-full max-w-[1740px] mx-auto flex-col flex items-center">
          <div className="flex flex-row gap-x-12 w-full">
            <section className="w-1/2">
              <div className="w-full h-auto flex flex-col items-center py-10">
                <h1 className="text-3xl text-black font-semibold">分区修改</h1>
                <textarea
                  value={resumeData}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  placeholder="请在右侧选择想要修改的部分"
                  rows={15}
                  className="mx-4 my-8 p-1 w-full h-auto rounded-lg border border-solid border-px border-slate-600 focus:border-1 transition-all duration-200"
                ></textarea>
                <button type="button" className="text-white text-lg bg-blue-400 rounded-full px-8 py-4">
                  AI建议
                </button>
              </div>
            </section>
            <section className="w-1/2">
              <div className="w-full h-full flex flex-col items-center py-10 gap-y-8">
                <h1 className="text-3xl text-black font-semibold w">简历预览</h1>
                {loading ? (
                  <div className="w-full h-full rounded-lg bg-gray-300 animate-pulse"></div>
                ) : (
                  // <div className='markdown-body'>
                  //   <Markdown className="" remarkPlugins={[remarkGfm]}>{resumeData}</Markdown>
                  // </div>
                  // <iframe src={process.env.NEXT_PUBLIC_API_URL + `/api/file/${taskId}`} className="w-full h-[864px] rounded-lg border border-solid border-px border-slate-600"></iframe>
                  // <div className="w-full h-auto" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                  <div className='w-full flex flex-col justify-center items-center gap-y-8'>
                    <div className="h-[60vh] overflow-auto resume-body" ref={resumeBodyRef}>
                      {pages.map((pageContent, index) => (
                        <PageComponent key={index} content={pageContent} pageIndex={index + 1} onElementClick={onElementClick} />
                      ))}
                    </div>
                    <div className="page-indicator">Page {currentPage} of {pages.length}</div>
                  </div>
                )}

              </div>
            </section>
          </div>
          <div className="flex flex-row justify-around items-center w-full">
            <Link href="/fill-info-manualy">
              <span className="text-black text-lg bg-[#85DCFF] button">
                上一步
                <br />
              </span>
            </Link>
            <button type="button" className="text-black text-lg bg-[#85DCFF] button" onClick={() => downloadResume(taskId)}>
              <span>
                <span>导出简历</span>
                <br />
              </span>
            </button>
          </div>


        </div>
      </div>
      <style jsx>
        {`
          .resume-preview-textarea {
            width: 469px;
            height: 580px;
            margin-top: var(--dl-space-space-oneandhalfunits);
            margin-left: var(--dl-space-space-unit);
            margin-right: var(--dl-space-space-unit);
            margin-bottom: var(--dl-space-space-oneandhalfunits);
            padding-bottom: 0px;
          }
          .resume-preview-link {
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
          .resume-preview-button {
            color: #000000;
            width: 185px;
            align-self: center;
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-fiveunits);
            margin-right: var(--dl-space-space-fiveunits);
            margin-bottom: var(--dl-space-space-fourunits);
            background-color: var(--dl-color-primary-700);
          }
          @media (max-width: 767px) {
            .resume-preview-cards {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
          }
        `}
      </style>
    </>
  )
}

export default ResumePreview
