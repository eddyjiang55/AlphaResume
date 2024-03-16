import React from 'react'
import Head from 'next/head'

import Navbar from '../components/navbar'
import Card from '../components/card'

const AIAssistantText = (props) => {
  return (
    <>
      <div className="ai-assistant-text-container">
        <Head>
          <title>AIAssistant-Text - AI Resume</title>
          <meta property="og:title" content="AIAssistant-Text - AI Resume" />
        </Head>
        <Navbar rootClassName="navbar-root-class-name7"></Navbar>
        <section className="ai-assistant-text-cards">
          <div className="ai-assistant-text-container1">
            <div className="ai-assistant-text-container2">
              <Card
                Header="文字聊天"
                image_src1="https://images.unsplash.com/photo-1586985564150-11ee04838034?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHZpZGVvY2FsbHxlbnwwfHx8fDE3MDAyODE0OTZ8MA&amp;ixlib=rb-4.0.3&amp;h=300"
                rootClassName="card-root-class-name4"
              ></Card>
            </div>
            <button type="button" className="ai-assistant-text-button button">
              选择
            </button>
          </div>
        </section>
      </div>
      <style jsx>
        {`
          .ai-assistant-text-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
            background-color: var(--dl-color-gray-white);
          }
          .ai-assistant-text-cards {
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
          .ai-assistant-text-container1 {
            flex: 0 0 auto;
            width: 317px;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .ai-assistant-text-container2 {
            flex: 0 0 auto;
            width: 317px;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .ai-assistant-text-button {
            color: var(--dl-color-gray-white);
            background-color: var(--dl-color-primary-500);
          }
          @media (max-width: 767px) {
            .ai-assistant-text-cards {
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

export default AIAssistantText
