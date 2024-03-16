import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import Navbar from '../components/navbar'
import Card from '../components/card'

const AIAssistantSelect = (props) => {
  return (
    <>
      <div className="w-full flex h-full items-start flex-col justify-start bg-white">
        <Head>
          <title>AIAssistantSelect - AI Resume</title>
          <meta property="og:title" content="AIAssistantSelect - AI Resume" />
        </Head>
        <Navbar></Navbar>
        <section className="p-10 w-full max-w-[1440px] flex items-center justify-center gap-16 mx-auto mt-20">
          <div className="flex w-80 h-auto items-center flex-col gap-y-4">
            <div className="">
              <Card
                Header="视频通话"
                image_src1="https://images.unsplash.com/photo-1586985564150-11ee04838034?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHZpZGVvY2FsbHxlbnwwfHx8fDE3MDAyODE0OTZ8MA&amp;ixlib=rb-4.0.3&amp;h=300"
                rootClassName="card-root-class-name1"
              ></Card>
            </div>
            <Link href="/ai-assistant-select-assistant">
              <span className="bg-[#14a9ff] text-white button">选择</span>
            </Link>
          </div>
          <div className="flex w-80 h-auto items-center flex-col gap-y-4">
            <Card
              Header="文字/语音聊天"
              image_src="https://images.unsplash.com/photo-1503324010925-71cfe52dad2a?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHBob25lY2FsbHxlbnwwfHx8fDE3MDAyODE0NzZ8MA&amp;ixlib=rb-4.0.3&amp;w=400"
              image_src1="https://images.unsplash.com/photo-1503324010925-71cfe52dad2a?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHBob25lY2FsbHxlbnwwfHx8fDE3MDAyODE0NzZ8MA&amp;ixlib=rb-4.0.3&amp;h=300"
              rootClassName="card-root-class-name2"
            ></Card>
            <Link href="/ai-assistant-select-assistant">
              <span className="bg-[#14a9ff] text-white button">选择</span>
            </Link>
          </div>
        </section>
      </div>
      {/* <style jsx>
        {`
          .ai-assistant-select-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
            background-color: var(--dl-color-gray-white);
          }
          .ai-assistant-select-cards {
            gap: var(--dl-space-space-fiveunits);
            width: 100%;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: var(--dl-space-space-twounits);
            padding-left: var(--dl-space-space-fiveunits);
            padding-right: var(--dl-space-space-fiveunits);
            flex-direction: row;
            padding-bottom: 120px;
            justify-content: center;
          }
          .ai-assistant-select-container1 {
            flex: 0 0 auto;
            width: 317px;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .ai-assistant-select-container2 {
            flex: 0 0 auto;
            width: 317px;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .ai-assistant-select-link {
            color: var(--dl-color-gray-white);
            text-decoration: none;
            background-color: var(--dl-color-primary-500);
          }
          .ai-assistant-select-container3 {
            flex: 0 0 auto;
            width: 317px;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .ai-assistant-select-link1 {
            color: var(--dl-color-gray-white);
            text-decoration: none;
            background-color: var(--dl-color-primary-500);
          }
          @media (max-width: 767px) {
            .ai-assistant-select-cards {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
          }
        `}
      </style> */}
    </>
  )
}

export default AIAssistantSelect
