import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import InformationForm from "@/components/infoForm";
// import sampleData from '../lib/personal_info.json'

import Navbar from "@/components/navbar";
// import Cards from '../components/cards'

const FillInfoManualy = (props) => {
  const router = useRouter();
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const sendFormDataToBackend = async (formData) => {
    try {
      const response = await fetch("http://localhost:8000/api/resume", {
        // Replace with your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Data successfully sent to the backend", responseData);
      router.push({
        pathname: "/resume/review",
        query: { taskId: responseData.id },
      });
      // router.reload();
    } catch (error) {
      console.error("Error sending data to backend", error);
    }
  };

  return (
    <>
      <div className="w-full flex h-full items-start flex-col justify-start bg-white">
        <Head>
          <title>FillInfoManualy - AI Resume</title>
          <meta property="og:title" content="FillInfoManualy - AI Resume" />
        </Head>
        <Navbar></Navbar>
        <div className="w-full max-w-6xl mx-auto">
          <InformationForm
            shouldSubmit={shouldSubmit}
            handleSubmit={sendFormDataToBackend}
          />
          <div className="mb-20">
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded text-lg font-normal"
              onClick={() => setShouldSubmit(true)}
            >
              下一步
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FillInfoManualy;
