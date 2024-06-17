import React from 'react';
import Navbar from '../components/navbar';
import Link from 'next/link';
import Image from 'next/image';
import { backIcon } from '../lib/iconLab';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import fillInfo from '../../public/img/fill_information.svg';
import resumeImg from '../../public/img/resume.svg';
import chatImg from '../../public/img/chat.svg';

const SplitBackgroundPage = () => {
    const router = useRouter();
    const user = useSelector((state) => state.user);
    const handleAuth = async (destination) => {
        if (!user.phoneNumber) {
            router.push('/login');
        } else {
            router.push(destination);
        }
    };
    return (
        <div className='flex flex-col w-full h-screen bg-light-blue'>
            <Navbar />
            <Link href='/'>
                <div className='flex items-center pl-8 pt-5 text-alpha-blue'>
                    <div className="w-8 h-8">{backIcon}</div>
                    <p className='text-lg'>返回</p>
                </div>
            </Link>
            <div className='flex flex-col justify-center items-center gap-y-12 my-8'>
                <div className="text-[36px] text-alpha-blue">欢迎来到Alpha Resume，您的专业简历定制师！</div>
                <div className="text-2xl text-black">用几分钟时间生成您的专业简历。</div>
            </div>
            <div className='flex flex-col justify-center items-start w-full max-w-7xl mx-auto my-8 gap-y-8'>
                <p className='text-alpha-blue text-left font-bold text-xl'>方式一：</p>
                <div className='w-full rounded-xl bg-white shadow-xl p-12 flex flex-row justify-evenly items-center gap-x-5'>
                    <div className='flex flex-col justify-center items-center gap-y-6'>
                        <Image src={fillInfo} alt="fill information" style={{
                            width: "80px",
                            height: "auto"
                        }} />
                        <span className='font-bold text-2xl text-black whitespace-nowrap'>输入您的信息</span>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-y-6'>
                        <Image src={resumeImg} alt="resume image" style={{
                            width: "80px",
                            height: "auto"
                        }} />
                        <span className='font-bold text-2xl text-black whitespace-nowrap'>我们将助您快速构建简历</span>
                    </div>
                    <button className='font-bold text-2xl text-white hover:text-black rounded-full bg-alpha-blue hover:bg-[#B2DDEE] px-12 py-3 transition-all duration-100' type="button" onClick={() => handleAuth('/fill-info-step1')}>开始填写</button>
                </div>
                <p className='text-alpha-blue text-left font-bold text-xl'>方式二：</p>
                <div className='w-full rounded-xl bg-white shadow-xl p-12 flex flex-row justify-evenly items-center gap-x-5'>
                    <div className='flex flex-col justify-center items-center gap-y-6'>
                        <Image src={chatImg} alt="chat image" style={{
                            width: "80px",
                            height: "auto"
                        }} />
                        <span className='font-bold text-2xl text-black whitespace-nowrap'>与AI机器人对话</span>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-y-6'>
                        <Image src={resumeImg} alt="resume image" style={{
                            width: "80px",
                            height: "auto"
                        }} />
                        <span className='font-bold text-2xl text-black whitespace-nowrap'>将根据聊天信息助您快速构建</span>
                    </div>
                    <button className='font-bold text-2xl text-white hover:text-black rounded-full bg-alpha-blue hover:bg-[#B2DDEE] px-12 py-3 transition-all duration-100' type="button" onClick={() => handleAuth('/ai-assistant-chat')}>
                        进入聊天
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SplitBackgroundPage;
