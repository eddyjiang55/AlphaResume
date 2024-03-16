import React from 'react'
import Head from 'next/head'

import Navbar from '../components/navbar'

const AIAssistantVideo = (props) => {
  return (
    <>
      <div className="w-full flex h-full items-start flex-col justify-start bg-white overflow-hidden">
        <Head>
          <title>AIAssistant-Video - AI Resume</title>
          <meta property="og:title" content="AIAssistant-Video - AI Resume" />
        </Head>
        <Navbar></Navbar>
        <div className="w-full max-w-[1440px] flex-col items-center justify-center mx-auto overflow-auto">
          <section className="w-full flex flex-row justify-around items-center py-9 px-20 border border-solid border-px border-black">
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1524638431109-93d95c968f03?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDIzfHxmZW1hbGV8ZW58MHx8fHwxNzAwMjkxMTE4fDA&amp;ixlib=rb-4.0.3&amp;w=200"
              className="w-52 object-cover"
            />
            <span className="text-black text-[40px]">Alice</span>
            <button type="button" className="text-white bg-[#14a9ff] button">
              开始视频
            </button>
          </section>
          <section className="w-full flex flex-row justify-around items-center py-9 px-20 border border-solid border-px border-black">
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1701309209296-bdfe97087074?ixid=M3w5MTMyMXwwfDF8YWxsfDU5fHx8fHx8Mnx8MTcwMTQ4NTA3NHw&amp;ixlib=rb-4.0.3&amp;w=200"
              className="w-52 object-cover"
            />
            <span className="text-black text-[40px]">Mary</span>
            <button type="button" className="text-black bg-[#14a9ff] button">
              开始视频
            </button>
          </section>
        </div>
      </div>
      {/* <style jsx>
        {`
          .ai-assistant-video-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
            background-color: var(--dl-color-gray-white);
          }
          .ai-assistant-video-cards {
            gap: var(--dl-space-space-fiveunits);
            width: 100%;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: var(--dl-space-space-twounits);
            border-color: var(--dl-color-gray-700);
            border-style: solid;
            border-width: 1px;
            padding-left: var(--dl-space-space-fiveunits);
            padding-right: var(--dl-space-space-fiveunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .ai-assistant-video-image {
            width: 200px;
            object-fit: cover;
          }
          .ai-assistant-video-text {
            color: var(--dl-color-gray-black);
            font-size: 40px;
            margin-left: 150px;
            margin-right: 150px;
          }
          .ai-assistant-video-button {
            color: var(--dl-color-gray-white);
            margin-left: 100px;
            background-color: var(--dl-color-primary-500);
          }
          .ai-assistant-video-cards1 {
            gap: var(--dl-space-space-fiveunits);
            width: 100%;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: var(--dl-space-space-twounits);
            border-color: var(--dl-color-gray-700);
            border-width: 1px;
            padding-left: var(--dl-space-space-fiveunits);
            padding-right: var(--dl-space-space-fiveunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .ai-assistant-video-image1 {
            width: 200px;
            object-fit: cover;
          }
          .ai-assistant-video-text1 {
            color: var(--dl-color-gray-black);
            font-size: 40px;
            margin-left: 150px;
            margin-right: 150px;
          }
          .ai-assistant-video-button1 {
            color: var(--dl-color-gray-white);
            margin-left: 100px;
            background-color: var(--dl-color-primary-500);
          }
          @media (max-width: 1200px) {
            .ai-assistant-video-image {
              width: 160px;
              height: 160px;
            }
            .ai-assistant-video-image1 {
              width: 160px;
              height: 160px;
            }
          }
          @media (max-width: 767px) {
            .ai-assistant-video-cards {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .ai-assistant-video-cards1 {
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

export default AIAssistantVideo
