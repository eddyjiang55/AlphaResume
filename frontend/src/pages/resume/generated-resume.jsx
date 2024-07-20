import { useState, useEffect, useCallback } from "react";
// import { useRouter } from 'next/router'; // 导入 useRouter 钩子
import ResumeEditer from "@/components/GenerateResumePage/editer";
import ResumeRender from "@/components/GenerateResumePage/renderer";
import ResumerRenderPage from "@/components/GenerateResumePage/pageComponent";
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
    console.log(data);
    dbFormData = { _id: context.query.id, resumeTitle: data.data.title };
  }
  console.log(dbFormData);
  // let dbFormData = { _id: '123' };
  return { props: { dbFormData } };
}

export default function GeneratedResumePage({ dbFormData }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [paperSize, setPaperSize] = useState("A4");
  const [fontSize, setFontSize] = useState(15);

  const exportMarkdown = useCallback(() => {
    if (dbFormData.resumeTitle === "") {
      return;
    }
    const blob = new Blob([markdownContent], {
      type: "text/markdown;charset=utf-8",
    });
    saveAs(blob, `${dbFormData.resumeTitle}.md`);
  }, [markdownContent, dbFormData.resumeTitle]);

  const handleChangePageSize = (size) => {
    setPaperSize(size);
  };

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
      console.log(markdownContent);
      const processedHtmlContent = renderMarkdown(markdownContent);
      console.log(processedHtmlContent);
      setHtmlContent(processedHtmlContent);
    }
  }, [markdownContent]);

  useEffect(() => {
    // Change font size
    document.documentElement.style.setProperty(
      "--base-font-size",
      `${fontSize}px`
    );
  }, [fontSize]);

  return (
    <>
      <div className="grid grid-cols-12 py-4 gap-x-1 h-full max-h-[calc(100vh-8rem-100px)] overflow-y-hidden">
        <div
          id="edit zone"
          className="col-span-5 px-2 flex flex-col justify-center items-center max-h-full"
        >
          <h2 className="text-alpha-blue font-bold text-4xl mb-8">编辑简历</h2>
          <div className="w-full h-full rounded-lg bg-white shadow-lg">
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
          className="col-span-5 px-2 flex-1 flex flex-col justify-center items-center h-full overflow-auto"
        >
          <h2 className="text-alpha-blue font-bold text-4xl mb-8">导出效果</h2>
          <div id="preview" className="h-full overflow-auto">
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
              <ResumerRenderPage
                htmlContent={htmlContent}
                paperSize={paperSize}
                fontSize={fontSize}
              />
            )}
          </div>
        </div>

        <div
          id="format zone"
          className="px-4 flex flex-col justify-center items-center col-span-2 w-full max-h-full"
        >
          <h2 className="text-alpha-blue font-bold text-4xl mb-8">格式调节</h2>
          <div className="w-3/4 rounded-lg bg-white shadow-lg flex-1 h-full p-6 mx-auto">
            <Formatter
              pageSize={paperSize}
              handleChangePageSize={handleChangePageSize}
              exportMarkdown={exportMarkdown}
              resumeTitle={dbFormData.resumeTitle}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
          </div>
        </div>
      </div>
    </>
  );
}
