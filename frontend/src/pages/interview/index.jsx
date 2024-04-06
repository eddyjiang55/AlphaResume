"use client"
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Navbar from '@/components/navbar'


const Interview = () => {
  return (
    <div className="w-full flex h-screen items-start flex-col justify-start bg-white">
      <Head>
        <title>FillInfoManualy - AI Resume</title>
        <meta property="og:title" content="FillInfoManualy - AI Resume" />
      </Head>
      <Navbar></Navbar>
      <div className="w-full max-w-[1536px] h-full px-24 grid grid-cols-12 justify-center gap-x-8 mx-auto">
        <div className="col-span-6 flex flex-col items-end justify-center">
          <Image src="/img1.jpg" alt="Picture of the author" width={500} height={500} className='rounded-2xl shadow-lg' />
        </div>
        <div className='col-span-6 flex flex-col justify-center items-start py-auto gap-8 px-10'>
          <p className="text-2xl text-black">
            <span className='text-[#52cff7] text-5xl'>
              请相信我们
            </span>
            , 让我们的专业面试官助你在下一场面试中
            <span className="text-[#b60000]">胜出</span>
            。
          </p>
          <p className="text-2xl text-black">
            我们能为你提供数以千计的独特面试问题及答案，帮你在众多竞争者中脱颖而出。
          </p>
          <div className="rounded-lg border border-black bg-white w-full mt-4 p-2 h-12 flex flex-row justify-start items-center shadow-lg">
            <input type="text" placeholder="请输入你的理想职位，专业，话题..." className='font-normal text-base text-[#909090] border-none h-full w-full outline-none' />
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search w-5 h-5" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </div>
          <Link href="/interview/steps">
            <button className="bg-[#EEF8FF] rounded-full text-xl text-black shadow-lg py-3 px-8 flex self-center mt-4">
              开始新面试
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Interview;