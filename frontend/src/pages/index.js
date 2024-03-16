"use client"
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import Navbar from '../components/navbar'

const Home = (props) => {
  // const accordionContainers = window.document.querySelectorAll('[data-role="accordion-container"]'); // All accordion containers
  // const accordionContents = document.querySelectorAll('[data-role="accordion-content"]'); // All accordion content
  // const accordionIconsClosed = document.querySelectorAll('[data-role="accordion-icon-closed"]'); // All accordion closed icons
  // const accordionIconsOpen = document.querySelectorAll('[data-role="accordion-icon-open"]'); // All accordion open icons

  // accordionContents.forEach((accordionContent) => {
  //     accordionContent.style.display = "none"; //Hides all accordion contents
  // });

  // accordionIconsClosed.forEach((icon) => {
  //   icon.style.display = "flex"
  // })

  // accordionIconsOpen.forEach((icon) => {
  //   icon.style.display = "none"
  // })

  // accordionContainers.forEach((accordionContainer, index) => {
  //     accordionContainer.addEventListener("click", () => {
  //         if (accordionContents[index].style.display === "flex") {
  //             // If the accordion is already open, close it
  //             accordionContents[index].style.display = "none";
  //             accordionIconsClosed[index].style.display = "flex";
  //             accordionIconsOpen[index].style.display = "none"
  //         } else {
  //             // If the accordion is closed, open it
  //             accordionContents.forEach((accordionContent) => {
  //                 accordionContent.style.display = "none"; //Hides all accordion contents
  //             });

  //             accordionIconsClosed.forEach((accordionIcon) => {
  //                 accordionIcon.style.display = "flex"; // Resets all icon transforms to 0deg (default)
  //             });

  //             accordionIconsOpen.forEach((accordionIcon) => {
  //               accordionIcon.style.display = "none";
  //             })

  //             accordionContents[index].style.display = "flex"; // Shows accordion content
  //             accordionIconsClosed[index].style.display = "none"; // Rotates accordion icon 180deg
  //             accordionIconsOpen[index].style.display = "flex";
  //         }
  //     });
  // });

  return (
    <>
      <div className="w-full flex h-full items-start flex-col justify-start bg-white">
        <Head>
          <title>AI Resume</title>
          <meta property="og:title" content="AI Resume" />
        </Head>
        <Navbar></Navbar>
        <section className="gap-y-6 w-full h-fit flex flex-col justify-between max-w-[1440px] items-start p-10 mt-20 mx-auto">
          <div className="flex w-full">
            <h1 className="text-black h-fit text-3xl max-w-[900px] normal-case text-center font-medium">我的简历</h1>
          </div>
          <div className="flex flex-row-reverse w-full">
            <div className="w-52 flex flex-row items-center justify-center">
              <Link href="/resume">
                <span className="text-black normal-case font-normal pr-6 pb-3 no-underline bg-[#14a9ff] button">新建简历</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full h-auto flex flex-row max-w-[1440px] mt-40 items-center pt-18 pl-4 pr-3 pb-2 mx-auto">
            <div className="flex-row w-full h-auto flex items-start pr-0 justify-around">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="w-[var(--dl-size-size-xxlarge)] h-[280px] object-cover pl-10 pr-10"
              />
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="w-[var(--dl-size-size-xxlarge)] h-[280px] object-cover pl-10 pr-10"
              />
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="w-[var(--dl-size-size-xxlarge)] h-[280px] object-cover pl-10 pr-10"
              />
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="w-[var(--dl-size-size-xxlarge)] h-[280px] object-cover pl-10 pr-10"
              />
            </div>
        </section>
        <div>
          <div className="contents">
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
