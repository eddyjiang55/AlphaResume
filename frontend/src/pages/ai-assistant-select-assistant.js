import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import Navbar from '../components/navbar'

const AIAssistantSelectAssistant = (props) => {
  return (
    <>
      <div className="w-full flex h-full items-start flex-col justify-start bg-white overflow-hidden">
        <Head>
          <title>AIAssistant-SelectAssistant - AI Resume</title>
          <meta
            property="og:title"
            content="AIAssistant-SelectAssistant - AI Resume"
          />
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
            <Link href="/ai-assistant-video">
              <span className="text-white bg-[#14a9ff] button">
                开始聊天
              </span>
            </Link>
          </section>
          <section className="w-full flex flex-row justify-around items-center py-9 px-20 border border-solid border-px border-black">
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8c2VhcmNofDQyfHxmZW1hbGV8ZW58MHx8fHwxNzAwMjkxMTE5fDA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=200"
              className="w-52 object-cover"
            />
            <span className="text-black text-[40px]">Lucy</span>
            <button
              type="button"
              className="text-black bg-[#14a9ff] button"
            >
              开始聊天
            </button>
          </section>
          <section className="w-full flex flex-row justify-around items-center py-9 px-20 border border-solid border-px border-black">
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1605642969091-694bacbbf7d8?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDQ4fHxmZW1hbGV8ZW58MHx8fHwxNzAwMjkxMTE5fDA&amp;ixlib=rb-4.0.3&amp;w=200"
              className="w-52 object-cover"
            />
            <span className="text-black text-[40px]">Tina</span>
            <button
              type="button"
              className="text-black bg-[#14a9ff] button"
            >
              开始聊天
            </button>
          </section>
        </div>
      </div>
      {/* <style jsx>
        {`
          .ai-assistant-select-assistant-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
            background-color: #3e3e3e;
          }
          .ai-assistant-select-assistant-cards {
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
            padding-bottom: var(--dl-space-space-unit);
            justify-content: center;
            background-color: var(--dl-color-gray-white);
          }
          .ai-assistant-select-assistant-image {
            width: 200px;
            object-fit: cover;
          }
          .ai-assistant-select-assistant-text {
            color: var(--dl-color-gray-black);
            font-size: 40px;
            margin-left: 100px;
            margin-right: 100px;
          }
          .ai-assistant-select-assistant-link {
            color: var(--dl-color-gray-white);
            margin-left: 100px;
            text-decoration: none;
            background-color: var(--dl-color-primary-500);
          }
          .ai-assistant-select-assistant-cards1 {
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
            padding-bottom: var(--dl-space-space-unit);
            justify-content: center;
            background-color: var(--dl-color-gray-white);
          }
          .ai-assistant-select-assistant-image1 {
            width: 200px;
            object-fit: cover;
          }
          .ai-assistant-select-assistant-text1 {
            color: var(--dl-color-gray-black);
            font-size: 40px;
            margin-left: 100px;
            margin-right: 100px;
          }
          .ai-assistant-select-assistant-button {
            color: var(--dl-color-gray-white);
            margin-left: 100px;
            background-color: var(--dl-color-primary-500);
          }
          .ai-assistant-select-assistant-cards2 {
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
            padding-bottom: 52px;
            justify-content: center;
            background-color: var(--dl-color-gray-white);
          }
          .ai-assistant-select-assistant-image2 {
            width: 200px;
            object-fit: cover;
          }
          .ai-assistant-select-assistant-text2 {
            color: var(--dl-color-gray-black);
            font-size: 40px;
            margin-left: 100px;
            margin-right: 100px;
          }
          .ai-assistant-select-assistant-button1 {
            color: var(--dl-color-gray-white);
            margin-left: 100px;
            background-color: var(--dl-color-primary-500);
          }
          @media (max-width: 1200px) {
            .ai-assistant-select-assistant-container {
              background-color: var(--dl-color-gray-white);
            }
            .ai-assistant-select-assistant-image {
              width: 160px;
              height: 160px;
            }
            .ai-assistant-select-assistant-image1 {
              width: 160px;
              height: 160px;
            }
            .ai-assistant-select-assistant-image2 {
              width: 160px;
              height: 160px;
            }
          }
          @media (max-width: 767px) {
            .ai-assistant-select-assistant-cards {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .ai-assistant-select-assistant-cards1 {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
            .ai-assistant-select-assistant-cards2 {
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

export default AIAssistantSelectAssistant
