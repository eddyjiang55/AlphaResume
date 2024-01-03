import React from 'react'
import Head from 'next/head'

import Navbar from '../components/navbar'

const MultipleResumeThroughOneClick = (props) => {
  return (
    <>
      <div className="multiple-resume-through-one-click-container">
        <Head>
          <title>MultipleResumeThroughOneClick - AI Resume</title>
          <meta
            property="og:title"
            content="MultipleResumeThroughOneClick - AI Resume"
          />
        </Head>
        <Navbar rootClassName="navbar-root-class-name11"></Navbar>
        <section className="multiple-resume-through-one-click-cards">
          <div className="multiple-resume-through-one-click-container1">
            <h1 className="multiple-resume-through-one-click-text">
              请输入您需要投递的岗位JD
            </h1>
            <textarea
              placeholder="placeholder"
              className="multiple-resume-through-one-click-textarea textarea"
            ></textarea>
            <textarea
              placeholder="placeholder"
              className="multiple-resume-through-one-click-textarea1 textarea"
            ></textarea>
            <button
              type="button"
              className="button multiple-resume-through-one-click-button"
            >
              添加新JD
            </button>
          </div>
        </section>
        <button
          type="button"
          className="multiple-resume-through-one-click-button1 button"
        >
          <span>
            <span>一键生成</span>
            <br></br>
          </span>
        </button>
      </div>
      <style jsx>
        {`
          .multiple-resume-through-one-click-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
            background-color: var(--dl-color-gray-white);
          }
          .multiple-resume-through-one-click-cards {
            gap: var(--dl-space-space-fiveunits);
            width: 50%;
            display: flex;
            max-width: 1440px;
            align-items: center;
            padding-top: var(--dl-space-space-twounits);
            padding-left: var(--dl-space-space-twounits);
            padding-right: var(--dl-space-space-twounits);
            flex-direction: column;
            padding-bottom: 120px;
            justify-content: flex-start;
          }
          .multiple-resume-through-one-click-container1 {
            width: 552px;
            height: 658px;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .multiple-resume-through-one-click-text {
            color: var(--dl-color-gray-black);
            margin-top: var(--dl-space-space-oneandhalfunits);
          }
          .multiple-resume-through-one-click-textarea {
            width: 469px;
            height: 580px;
            margin-top: var(--dl-space-space-oneandhalfunits);
            margin-left: var(--dl-space-space-unit);
            margin-right: var(--dl-space-space-unit);
            margin-bottom: var(--dl-space-space-oneandhalfunits);
            padding-bottom: 0px;
          }
          .multiple-resume-through-one-click-textarea1 {
            width: 469px;
            height: 580px;
            margin-top: var(--dl-space-space-oneandhalfunits);
            margin-left: var(--dl-space-space-unit);
            margin-right: var(--dl-space-space-unit);
            margin-bottom: var(--dl-space-space-oneandhalfunits);
            padding-bottom: 0px;
          }
          .multiple-resume-through-one-click-button1 {
            color: #000000;
            width: 185px;
            align-self: center;
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-fiveunits);
            margin-right: var(--dl-space-space-fiveunits);
            margin-bottom: var(--dl-space-space-fourunits);
            background-color: var(--dl-color-primary-700);
          }
          @media (max-width: 1200px) {
            .multiple-resume-through-one-click-container1 {
              height: 716px;
            }
            .multiple-resume-through-one-click-text {
              color: var(--dl-color-gray-black);
              margin-bottom: var(--dl-space-space-twounits);
            }
            .multiple-resume-through-one-click-textarea {
              height: 158px;
            }
            .multiple-resume-through-one-click-textarea1 {
              height: 158px;
            }
            .multiple-resume-through-one-click-button {
              color: var(--dl-color-gray-white);
              margin-top: var(--dl-space-space-twounits);
              background-color: var(--dl-color-primary-500);
            }
          }
          @media (max-width: 767px) {
            .multiple-resume-through-one-click-cards {
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

export default MultipleResumeThroughOneClick
