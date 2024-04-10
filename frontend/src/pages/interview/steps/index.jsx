import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "@/components/navbar";
import Stepper from "@/components/stepper";
import InformationForm from "@/components/infoForm";
import ChatbotPage from "@/components/chatbot";

const InterviewSteps = [
  "完善简历",
  "面试中",
  "综合评估报告",
  "分区详细报告",
  "针对性训练",
];

const InterviewStepContent = {
  0: <InformationForm />,
  1: <ChatbotPage />,
  2: <></>,
  3: <></>,
  4: <></>,
};

const MimicInterviewPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="w-full flex h-screen items-start flex-col justify-start bg-white overflow-hidden">
      <Head>
        <title>FillInfoManualy - AI Resume</title>
        <meta property="og:title" content="Interview steps" />
      </Head>
      <Navbar></Navbar>
      <div className="w-full h-full grid grid-cols-10 bg-white">
        <div className="h-full overflow-hidden col-span-2 bg-black flex flex-col items-center justify-between gap-y-8">
          <div className="flex flex-col justify-start items-center gap-y-8">
            <p className="text-3xl font-bold text-white text-center my-8">
              模拟面试
            </p>
            <Stepper steps={InterviewSteps} currentStep={currentStep} />
          </div>
          <Link
            href="/"
            className="bg-[#EEF8FF] rounded-lg text-xl text-black shadow-lg py-4 px-9 mb-8"
          >
            <button>主页</button>
          </Link>
        </div>
        <div className="h-full col-span-8 flex flex-col justify-center items-center w-full overflow-y-auto">
          <div className="h-full w-full max-w-6xl mx-auto">
            {InterviewStepContent[currentStep]}
            <div className="w-full flex flex-row justify-between items-center px-20 my-10">
              <button
                className="bg-[#EEF8FF] rounded-lg text-xl text-black shadow-lg py-4 px-9 mb-8"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                上一步
              </button>
              {currentStep === 5 ? (
                <Link href="/interview">
                  <button className="bg-[#14a9ff] rounded-lg text-xl text-white shadow-lg py-4 px-9 mb-8">
                    完成
                  </button>
                </Link>
              ) : (
                <button
                  className={`${currentStep}bg-[#EEF8FF] rounded-lg text-xl text-black shadow-lg py-4 px-9 mb-8`}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  下一步
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MimicInterviewPage;
