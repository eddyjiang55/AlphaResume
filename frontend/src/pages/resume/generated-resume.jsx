import { useState, useEffect, useCallback } from "react";
// import { useRouter } from 'next/router'; // 导入 useRouter 钩子
import ResumeEditer from "@/components/GenerateResumePage/editer";
import ResumeRender from "@/components/GenerateResumePage/renderer";
import LoadingBar from "@/components/GenerateResumePage/loadingBar";
import dynamic from "next/dynamic";
import { saveAs } from "file-saver";
const Formatter = dynamic(
  () => import("@/components/GenerateResumePage/formatter"),
  {
    ssr: false,
  }
);
import { renderMarkdown } from "@/utils/markdown";

export async function getServerSideProps(context) {
  let dbFormData = {};
  if (context.query.id) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `/api/improved-users/${context.query.id}/basicInformation`
    );
    const data = await res.json();
    dbFormData = { _id: context.query.id, resumeTitle: data.data.title };
  }
  // let dbFormData = { _id: '123' };
  return { props: { dbFormData } };
}

export default function GeneratedResumePage({ dbFormData }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  const exportMarkdown = useCallback(() => {
    if (dbFormData.resumeTitle === "") {
      return;
    }
    const blob = new Blob([markdownContent], {
      type: "text/markdown;charset=utf-8",
    });
    saveAs(blob, `${dbFormData.resumeTitle}.md`);
  }, [markdownContent, dbFormData.resumeTitle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/improved-users/resume-result",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: dbFormData._id,
            }),
          }
        );
        console.log(response.status === 200);
        if (response.status === 200) {
          setLoading(false);
          clearInterval(intervalId);
        } else if (response.status === 202) {
          console.log("Result is still running");
          const progressData = await response.json();
          setProgress(progressData.progress);
        } else {
          throw new Error("Failed to fetch: " + response.statusText);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (loading) {
      fetchData();
    }

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, [dbFormData]);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const markdownResponse = await fetch(
          process.env.NEXT_PUBLIC_API_URL + `/api/improved-users/markdown`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: dbFormData._id }),
          }
        );
        if (markdownResponse.status === 200) {
          const markdownData = await markdownResponse.text(); // Assuming server responds with text
          setMarkdownContent(markdownData);
        } else {
          throw new Error(
            "Failed to fetch markdown: " + markdownResponse.statusText
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!loading) {
      fetchMarkdown();
    }
  }, [loading]);

  useEffect(() => {
    if (markdownContent) {
      // console.log(markdownContent);
      const htmlContent = renderMarkdown(markdownContent);
      setHtmlContent(htmlContent);
    }
  }, [markdownContent]);

  return (
    <>
      <div className="grid grid-cols-12 h-full pb-2 overflow-y-auto gap-x-1">
        <div
          id="edit zone"
          className="col-span-5 p-8 flex flex-col justify-center items-center"
        >
          <h2 className="text-alpha-blue font-bold text-4xl mb-8">编辑简历</h2>
          <div className="w-full rounded-lg bg-white shadow-lg flex-1">
            {loading ? (
              <div className="h-full flex flex-col justify-center mx-8">
                <div className="flex justify-between mb-1">
                  <span className="text-lg font-medium text-alpha-blue dark:text-white">
                    Resume Generating...
                  </span>
                  <span className="text-base font-medium text-alpha-blue dark:text-white">
                    {progress}%
                  </span>
                </div>
                <LoadingBar progress={progress} />
              </div>
            ) : (
              <ResumeEditer
                markdownData={markdownContent}
                editMarkdownData={setMarkdownContent}
              />
            )}
          </div>
        </div>
        <div
          id="output zone"
          className="col-span-5 p-8 flex flex-col justify-center items-center"
        >
          <h2 className="text-alpha-blue font-bold text-4xl mb-8">导出效果</h2>
          <div className="w-full rounded-lg bg-white shadow-lg flex-1">
            {loading ? (
              <div className="h-full flex flex-col justify-center mx-8">
                <div className="flex justify-between mb-1">
                  <span className="text-lg font-medium text-alpha-blue dark:text-white">
                    Resume Generating...
                  </span>
                  <span className="text-base font-medium text-alpha-blue dark:text-white">
                    {progress}%
                  </span>
                </div>
                <LoadingBar progress={progress} />
              </div>
            ) : (
              <ResumeRender htmlContent={htmlContent} />
            )}
          </div>
        </div>

        <div
          id="format zone"
          className="p-8 flex flex-col justify-center items-center w-72"
        >
          <h2 className="text-alpha-blue font-bold text-4xl mb-8">格式调节</h2>
          <div className="w-full rounded-lg bg-white shadow-lg flex-1 p-4">
            <Formatter exportMarkdown={exportMarkdown} htmlContent={htmlContent} resumeTitle={dbFormData.resumeTitle} />
          </div>
        </div>
      </div>
    </>
  );
}
