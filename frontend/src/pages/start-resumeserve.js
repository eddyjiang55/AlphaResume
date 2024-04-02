import React from 'react';
import Navbar from '../components/Navbar';

const SplitBackgroundPage = () => {
    return (
        <>
        <Navbar />
            <div className="background">
                <div className='backward'>
                    <img src='/img/back.svg'width={40} height={40} ></img>
                    <a href='/'>返回</a>
                </div>
                <div className='inner-div'>
                    <div className="text-title">欢迎来到Alpha Resume，您的专业简历定制师！</div>
                    <div className='text-describe'>用几分钟时间生成您的专业简历。</div>
                </div>
                <div className='choose'>
                    <div className='title'>方式一：</div>
                    <div className='introduce'>
                        <div className='container'>
                            <img className='img' src='/img/fill_information.svg'></img>
                            <span>输入您的信息</span>
                        </div>
                        <div className='container'>
                            <img className='img' src='/img/choose_option.svg'></img>
                            <span>我们将助您快速构建简历</span>
                        </div>
                        <div className='container'>
                            <button className='form-b' type="submit">开始填写</button>
                        </div>
                    </div>
                    <div className='title'>方式一：</div>
                    <div className='introduce'>
                        <div className='container'>
                            <img className='img' src='/img/fill_information.svg'></img>
                            <span>告诉我们您的信息</span>
                        </div>
                        <div className='container'>
                            <img className='img' src='/img/choose_option.svg'></img>
                            <span>选择您要投递的岗位</span>
                        </div>
                        <div className='container'>
                            <button className='form-b' type="submit">进入聊天</button>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .form-b {
                    padding: 10px 50px;
                    border: none;
                    border-radius: 30px;
                    color: white;
                    background-color: #1D80A7; /* Bootstrap 蓝色按钮颜色 */
                    cursor: pointer;
                    }
                    .form-b:hover {
                    background-color: #B2DDEE;
                    color:black;
                    }
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
                    background-color:#FFFFFF;
                    width:80%;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
                    margin-bottom:20px;
                }
                .img{
                    width:100px;
                }
                .choose{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .title{
                    padding:10px 100px;
                    width:100%;
                    text-align:left;
                    color:#1D80A7;
                    font-weight:bold;
                    font-size:20px;
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
