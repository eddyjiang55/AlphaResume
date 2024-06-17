import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { setResumeCards } from '@/store/features/resumeSlice';
import Link from 'next/link';

const CardsPart = dynamic(() => import('@/components/ResumeCards/ResumeCardPart'), {
    ssr: false,
    loading: () => <div className='max-w-7xl 2xl:max-w-[1380px] mx-auto w-full h-2/5 rounded-lg bg-gray-200 animate-pulse' />
});

const SplitBackgroundPage = () => {
    const dispatch = useDispatch();
    const User = useSelector((state) => state.user);
    const ResumeCards = useSelector((state) => state.resume.cards);
    console.log(User);

    useEffect(() => {
        if (User.id) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/${User.id}`)
                .then(response => response.json())
                .then(userData => {
                    console.log(userData);
                    dispatch(setResumeCards(userData.resumeIdList));
                })
                .catch(error => {
                    console.error('Error fetching user detail:', error);
                });
        }
    }, [User.id, dispatch]);

    return (
        <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden bg-light-blue">
            <Navbar />
            <div className="relative flex-grow py-20">
                <div className="absolute inset-0 bg-alpha-blue h-1/2 w-full"></div>
                <div className="relative flex flex-col justify-center items-center gap-y-12 z-10 mx-auto px-4">
                    <div className="text-3xl text-light-blue">
                        开始创建你的专业定制简历
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center mx-auto w-full max-w-screen-lg">
                        <div className="bg-white hover:bg-[#B2DDEE] rounded-lg p-10 shadow-lg">
                            <div className="flex flex-col justify-center items-center gap-y-12 w-full">
                                <h1 className="text-black text-[32px] md:text-[40px] font-bold 2xl:text-[48px]">怎么写一个好简历</h1>
                                <p className='text-black font-normal text-lg 2xl:text-2xl'>x个来自行业专家的专业简历书写模板及其相关知识点。</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto">
                                    <div className="flex flex-row justify-center items-center gap-x-4">
                                        <Image src="/img/check_mark.svg" alt='check-mark' width={50} height={50} />
                                        <span className='font-normal text-black text-base'>简历优点</span>
                                    </div>
                                    <div className="flex flex-row justify-center items-center gap-x-4">
                                        <Image src="/img/check_mark.svg" alt='check-mark' width={50} height={50} />
                                        <span className='font-normal text-black text-base'>对岗位理解</span>
                                    </div>
                                    <div className="flex flex-row justify-center items-center gap-x-4">
                                        <Image src="/img/check_mark.svg" alt='check-mark' width={50} height={50} />
                                        <span className='font-normal text-black text-base'>观念靠拢</span>
                                    </div>
                                    <div className="flex flex-row justify-center items-center gap-x-4">
                                        <Image src="/img/check_mark.svg" alt='check-mark' width={50} height={50} />
                                        <span className='font-normal text-black text-base'>易错点解析</span>
                                    </div>
                                </div>
                                <button className="text-2xl font-bold text-white py-4 px-8 bg-alpha-blue rounded-full">查看知识文档</button>
                            </div>
                        </div>
                        <div className="bg-white hover:bg-[#B2DDEE] rounded-lg p-10 shadow-lg">
                            <div className="flex flex-col justify-center items-center gap-y-12 w-full">
                                <h1 className="text-black text-[32px] md:text-[40px] font-bold 2xl:text-[48px]">简历生成器</h1>
                                <p className='text-black font-normal text-lg 2xl:text-2xl'>来自行业专家的专业简历书写模板及其相关知识点。</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto">
                                    <div className="flex flex-row justify-center items-center gap-x-4">
                                        <Image src="/img/check_mark.svg" alt='check-mark' width={50} height={50} />
                                        <span className='font-normal text-black text-base'><em>AI</em> 赋能</span>
                                    </div>
                                    <div className="flex flex-row justify-center items-center gap-x-4">
                                        <Image src="/img/check_mark.svg" alt='check-mark' width={50} height={50} />
                                        <span className='font-normal text-black text-base'><em>ATS</em> 筛选</span>
                                    </div>
                                    <div className="flex flex-row justify-center items-center gap-x-4">
                                        <Image src="/img/check_mark.svg" alt='check-mark' width={50} height={50} />
                                        <span className='font-normal text-black text-base'>专家合作</span>
                                    </div>
                                    <div className="flex flex-row justify-center items-center gap-x-4">
                                        <Image src="/img/check_mark.svg" alt='check-mark' width={50} height={50} />
                                        <span className='font-normal text-black text-base'>快速生成</span>
                                    </div>
                                </div>
                                <Link href='/start-resumeserve'>
                                    <button className="text-2xl font-bold text-white py-4 px-8 bg-alpha-blue rounded-full">
                                        简历生成
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="text-2xl text-alpha-blue font-normal text-center">
                        你的简历将会显示在这里<br />
                        开始创建吧！
                    </div>
                </div>
            </div>
            <div className="w-full h-auto max-w-7xl 2xl:max-w-[1380px] mx-auto mb-16">
                <CardsPart resumeIdList={ResumeCards} userPhoneNumber={User.phoneNumber} />
            </div>
        </div>
    );
}

export default SplitBackgroundPage;
