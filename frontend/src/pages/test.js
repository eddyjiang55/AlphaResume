import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
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
        <div className="flex flex-col w-full h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden bg-light-blue">
        </div>
    );
}

export default SplitBackgroundPage;
