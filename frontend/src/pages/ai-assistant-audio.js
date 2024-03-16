import React from 'react'
import Head from 'next/head'

import Navbar from '../components/navbar'
import Card from '../components/card'

const AIAssistantAudio = (props) => {
  return (
    <>
      <div className="ai-assistant-audio-container">
        <Head>
          <title>AIAssistant-Audio - AI Resume</title>
          <meta property="og:title" content="AIAssistant-Audio - AI Resume" />
        </Head>
        <Navbar rootClassName="navbar-root-class-name6"></Navbar>
        <section className="ai-assistant-audio-cards">
          <div className="ai-assistant-audio-container1">
            <Card
              Header="语音聊天"
              image_src="https://images.unsplash.com/photo-1503324010925-71cfe52dad2a?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHBob25lY2FsbHxlbnwwfHx8fDE3MDAyODE0NzZ8MA&amp;ixlib=rb-4.0.3&amp;w=400"
              image_src1="https://images.unsplash.com/photo-1503324010925-71cfe52dad2a?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHBob25lY2FsbHxlbnwwfHx8fDE3MDAyODE0NzZ8MA&amp;ixlib=rb-4.0.3&amp;h=300"
              rootClassName="card-root-class-name3"
            ></Card>
            <button type="button" className="ai-assistant-audio-button button">
              选择
            </button>
          </div>
        </section>
      </div>
      <style jsx>
        {`
          .ai-assistant-audio-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
            background-color: var(--dl-color-gray-white);
          }
          .ai-assistant-audio-cards {
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
          .ai-assistant-audio-container1 {
            flex: 0 0 auto;
            width: 317px;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .ai-assistant-audio-button {
            color: var(--dl-color-gray-white);
            background-color: var(--dl-color-primary-500);
          }
          @media (max-width: 767px) {
            .ai-assistant-audio-cards {
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

export default AIAssistantAudio
