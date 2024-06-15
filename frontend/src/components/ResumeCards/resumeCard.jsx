import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import ResumeCardLoading from "./resumeCardLoading";
import { formatDateToLocalTime } from "@/utils/timeRelated";

const fetchRecordById = async (id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/improved-users/${id}/basicInformation`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const rawData = await response.json();
  return {
    title: rawData.data?.title || "",
    updateTime: rawData.updateTime,
  };
};

function ResumeBox({ resumeId, userPhoneNumber, deletefromCards }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const loadRecord = async () => {
      const record = await fetchRecordById(resumeId);
      setData(record);
      setLoading(false);
    };

    loadRecord();
  }, [resumeId]);

  const confirmDelete = () => {
    setShowConfirm(true);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    // 使用写死的 ID 进行路由跳转
    router.push(`/fill-info-step1?id=${resumeId}`);
  };

  const handleDelete = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/improved-users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: userPhoneNumber,
        improvedUserId: resumeId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setShowConfirm(false); // 关闭确认框
        return response.json();
      })
      .then((data) => {
        console.log("Delete successful:", data);
        deletefromCards(resumeId);
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };

  const handleDownloadPdf = (resumeHistoryId) => {
    const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/download-pdf/${resumeHistoryId}`;

    fetch(downloadUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.blob();
      })
      .then((blob) => {
        // Create a local URL for the blob object
        const url = window.URL.createObjectURL(blob);
        // Create a new anchor element
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume.pdf"; // Set the filename
        document.body.appendChild(a);
        a.click();

        // Cleanup
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Download error:", error));
  };

  if (loading) return <ResumeCardLoading />;

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-md w-full h-[280px] relative">
        <div className="flex flex-col justify-center items-center gap-y-6 w-full h-full">
          <div className="text-black text-2xl font-bold 2xl:text-3xl my-auto">
            {data.title}
          </div>
          <div className="text-sm font-normal text-[#757575] my-auto">
            上次修改：{formatDateToLocalTime(data.updateTime)}
          </div>
          <div className="flex flex-row justify-center items-center gap-x-12">
            <Link href={`/fill-info-step1?id=${resumeId}`}>
              <button className="py-2 px-6 text-white text-base 2xl:text-lg font-bold bg-alpha-blue rounded-full">
                编辑
              </button>
            </Link>
            <button
              className="py-2 px-6 text-white text-base 2xl:text-lg font-bold bg-alpha-blue rounded-full"
              onClick={() => {
                handleDownloadPdf("87c1fbdc-a883-48ce-9864-0cc2b1e34138");
              }}
            >
              下载PDF
            </button>
          </div>
        </div>
        <div className="absolute top-5 right-5">
          <button onClick={toggleMenu}>
            <Image src="/img/more.svg" alt="更多" width={20} height={20} />
          </button>
          {menuVisible && (
            <div
              className="flex flex-col rounded-lg shadow-md absolute bg-white border border-alpha-blue z-50"
              ref={menuRef}
            >
              <ul>
                <li key="edit">
                  <button
                    className="px-8 py-2 border-b border-alpha-blue whitespace-nowrap text-base text-black font-normal"
                    onClick={handleClick}
                  >
                    编辑
                  </button>
                </li>
                <li key="view">
                  {" "}
                  <button
                    className="px-8 py-2 border-b border-alpha-blue whitespace-nowrap text-base text-black font-normal"
                    onClick={() =>
                      handleClick("f0c086b6-1c3b-4e87-b39e-39e7d4392b1b")
                    }
                  >
                    预览
                  </button>
                </li>
                <li key="delete">
                  <button
                    className="px-8 py-2 whitespace-nowrap text-base text-black font-normal"
                    onClick={confirmDelete}
                  >
                    删除
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50">
          <div className="w-[300px] p-5 bg-white rounded-lg flex flex-col items-center gap-y-5">
            <p className="font-semibold text-lg text-black text-center w-full">
              是否确认删除简历？
            </p>
            <div className="flex flex-row justify-center items-center gap-x-2">
              <button
                className="px-8 py-2 rounded-lg bg-red-500 text-white font-normal text-base"
                onClick={handleDelete}
              >
                删除
              </button>
              <button
                className="px-8 py-2 rounded-lg bg-gray-500 text-white font-normal text-base"
                onClick={() => setShowConfirm(false)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResumeBox;
