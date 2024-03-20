import React from 'react';
import Navbar from '../components/Navbar';

const SplitBackgroundPage = () => {
    return (
        <>
        <Navbar />
            <div className="background">
                <div className='backward'>
                    <img src='/img/back.svg'width={40} height={40} ></img>
                    <a href='/choose-resumeserve-type'>返回</a>
                </div>
                <div className='inner-div'>
                    <div className="text-title">欢迎来到Alpha Resume，您的专业简历定制师！</div>
                    <div className='text-describe'>用几分钟时间生成您的专业简历。</div>
                </div>
                <div className='introduce'>
                    <div className='container'>
                        <img src='/img/fill_information.svg'></img>
                        <span>告诉我们您的信息</span>
                    </div>
                    <div className='container'>
                        <img src='/img/choose_option.svg'></img>
                        <span>选择您要投递的岗位</span>
                    </div>
                    <div className='container'>
                        <img src='/img/build_resume.svg'></img>
                        <span>我们将在几分钟内助您快速构建简历</span>
                    </div>
                </div>
                <div className='start'>
                    <button className='begin' href='/resume_firststep'>开始</button>
                </div>
            </div>
            <style jsx>{`
                .background{
                    background-color: #EDF8FD;
                    min-height:100vh;
                }
                .backward {
                    display: flex;
                    align-items: center;
                    padding-left:30px;
                    padding-top:20px;
                    color:#1D80A7;
                }
                .inner-div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 50px;
                }
                .text-title{
                    font-size: 36px;
                    padding-top: 30px;
                    color:#1D80A7;
                }
                .text-describe{
                    font-size: 24px;
                    padding-bottom: 30px;
                }
                .introduce {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    padding:50px;
                }
                .container {
                    display: flex;
                    justify-content: center;
                    flex-direction: column; 
                    align-items: center;
                    gap:50px;
                    font-size:24px;
                    font-weight: bold;
                }
                .start{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 50px;
                    margin-top: auto;
                }
                .begin{
                    padding: 8px;
                    border: 1px solid #1D80A7;
                    background-color: white;
                    color: #1D80A7;
                    cursor: pointer;
                    border-radius: 30px;
                    padding-left: 50px;
                    padding-right: 50px;
                    font-size:30px;
                    font-weight: bold;
                }
                .begin:hover{
                    background-color: #1D80A7;
                    color: white;
                }
            `}</style>
        </>
    );
}

export default SplitBackgroundPage;
