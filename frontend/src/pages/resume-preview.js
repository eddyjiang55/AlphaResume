import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import Navbar from '../components/navbar'

const ResumePreview = (props) => {
  return (
    <>
      <div className="w-full flex h-full items-start flex-col justify-start bg-white">
        <Head>
          <title>ResumePreview - AI Resume</title>
          <meta property="og:title" content="ResumePreview - AI Resume" />
        </Head>
        <Navbar></Navbar>
        <div className="w-full max-w-[1440px] mx-auto flex-col flex items-center">
          <section className="w-1/2">
            <div className="w-full h-auto flex flex-col items-center py-10">
              <h1 className="text-xl text-black font-semibold">手动修改</h1>
              <textarea
                placeholder="placeholder"
                rows={15}
                className="mx-4 my-8 p-1 w-full h-auto rounded-lg border border-solid border-px border-slate-600 focus:border-1 transition-all duration-200"
              ></textarea>
            </div>
            <div className="flex flex-row justify-between items-center">
              <Link href="/fill-info-manualy">
                <span className="text-black text-lg bg-[#85DCFF] button">
                  上一步
                  <br />
                </span>
              </Link>
              <button type="button" className="text-black text-lg bg-[#85DCFF] button">
                <span>
                  <span>导出简历</span>
                  <br />
                </span>
              </button>
            </div>
          </section>

        </div>
      </div>
      <style jsx>
        {`
          .resume-preview-textarea {
            width: 469px;
            height: 580px;
            margin-top: var(--dl-space-space-oneandhalfunits);
            margin-left: var(--dl-space-space-unit);
            margin-right: var(--dl-space-space-unit);
            margin-bottom: var(--dl-space-space-oneandhalfunits);
            padding-bottom: 0px;
          }
          .resume-preview-link {
            color: #000000;
            width: 185px;
            align-self: center;
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-fiveunits);
            margin-right: var(--dl-space-space-fiveunits);
            margin-bottom: var(--dl-space-space-fourunits);
            text-decoration: none;
            background-color: var(--dl-color-primary-700);
          }
          .resume-preview-button {
            color: #000000;
            width: 185px;
            align-self: center;
            margin-top: var(--dl-space-space-threeunits);
            margin-left: var(--dl-space-space-fiveunits);
            margin-right: var(--dl-space-space-fiveunits);
            margin-bottom: var(--dl-space-space-fourunits);
            background-color: var(--dl-color-primary-700);
          }
          @media (max-width: 767px) {
            .resume-preview-cards {
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

export default ResumePreview
