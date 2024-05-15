import React, { useState } from 'react';
import { useRouter } from 'next/router'; // 导入 useRouter 钩子
import Navbar from '../components/navbar';
import ResumeNavbar from "../components/resume-navbar";
import ResumeEditer from '../components/editer';

const GeneratedResumePage = () => {

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <Navbar />
      <ResumeNavbar />
      <div className='grid grid-cols-12 h-[calc(100%-170px)]'>
        <div id="edit zone" className='col-span-5 h-full overflow-y-auto py-8'>
          <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">编辑简历</h2>
          <ResumeEditer />

        </div>
        <div id="output zone" className='col-span-5 py-8'>
          <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">导出效果</h2>

        </div>
        <div id="format zone" className='col-span-2 py-8'>
          <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">格式调节</h2>
        </div>
      </div>
    </div>
  )
}

export default GeneratedResumePage;