import React from 'react';
import Navbar from '../components/navbar';

const SplitBackgroundPage = () => {
    return (
        <>
        <Navbar></Navbar>
            <div className="split-background">
                <div className="top-half"></div>
                <div className="content-container">
                    <div className="text-container">
                        开始创建你的专业定制简历
                    </div>
                    <div className="rectangle-container">
                        <div className="rectangle">
                            <div className="inner-div">
                                <div className="text-title">怎么写一个好简历</div>
                                <div className='text-describe'>x个来自行业专家的专业简历书写模板及其相关知识点。</div>
                            </div>
                            <div className="inner-div">
                                <div className="small">
                                    <div className="row">
                                        <div className="item1">
                                            <img src="/img/check_mark.svg" width={50} height={50}></img>
                                            <span>简历优点</span>
                                        </div>
                                        <div className="item1">
                                            <img src="/img/check_mark.svg" width={50} height={50}></img>
                                            <span>对岗位理解</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="item1">
                                            <img src="/img/check_mark.svg"  width={50} height={50}></img>
                                            <span>观念靠拢</span>
                                        </div>
                                        <div className="item1">
                                            <img src="/img/check_mark.svg"  width={50} height={50}></img>
                                            <span>易错点解析</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="actions">
                                    <button className="action-button">查看知识文档</button>
                                </div>
                            </div>
                        </div>
                        <div className="rectangle right">
                            <div className="inner-div">
                                <div className="text-title">简历生成器</div>
                                <div className='text-describe'>来自行业专家的专业简历书写模板及其相关知识点。</div>
                            </div>
                            <div className="inner-div">
                                <div className="small">
                                    <div className="row">
                                        <div className="item1">
                                            <img src="/img/check_mark.svg" width={50} height={50}></img>
                                            <span><em>AI</em> 赋能</span>
                                        </div>
                                        <div className="item1">
                                            <img src="/img/check_mark.svg" width={50} height={50}></img>
                                            <span><em>ATS</em> 筛选</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="item1">
                                            <img src="/img/check_mark.svg"  width={50} height={50}></img>
                                            <span>专家合作</span>
                                        </div>
                                        <div className="item1">
                                            <img src="/img/check_mark.svg"  width={50} height={50}></img>
                                            <span>快速生成</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="actions">
                                    <button className="action-button">
                                        <a href='/start-resumeserve'>简历生成</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-container-lower">
                        你的简历将会显示在这里<br/>
                        开始创建吧！
                    </div>
                </div>
                <div className="bottom-half"></div>
            </div>
            <style jsx>{`
                .split-background {
                    position: relative;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 1;
                }
                .top-half, .bottom-half {
                    position: absolute;
                    width: 100%;
                    z-index: -1;
                }
                .top-half {
                    top: 0;
                    height: 50%;
                    background-color: #1D80A7;
                }
                .bottom-half {
                    bottom: 0;
                    height: 50%;
                    background-color: #EDF8FD;
                }
                .content-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 50px;
                }
                .text-container {
                    font-size: 32px;
                    color: #EDF8FD;
                }
                .text-container-lower {
                    font-size: 24px;
                    color: #1D80A7;
                    text-align: center;
                }
                .rectangle-container {
                    display: flex;
                    gap: 100px;
                }
                .rectangle {
                    width: 800px;
                    height: 600px;
                    background-color: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
                }
                .rectangle:hover{
                    background-color:#B2DDEE;
                }
                .inner-div {
                    align-items: left;
                }
                .text-title{
                    font-size: 48px;
                    font-weight: bold;
                    padding: 50px;
                }
                .text-describe{
                    font-size: 24px;
                    padding-left: 70px;
                }
                .small{
                    padding-top:30px;
                    padding-bottom:30px;
                    padding-left:70px;
                }
                .small .row {
                    display: flex;
                    justify-content: flex-start;
                    padding:20px;
                }
                .small .item1 {
                    display: flex;
                    align-items: center;
                    margin-right: 100px;
                }
                .small .item1 img {
                    margin-right: 10px;
                }
                
                .small .item1 span {
                }
                .actions {
                    display: flex;
                    gap: 10px;
                    margin-left: 70px;
                }
                .action-button {
                    font-size: 24px;
                    font-weight: bold;
                    padding: 8px 16px;
                    background-color: #1D80A7;
                    color: white;
                    cursor: pointer;
                    border-radius: 50px;
                    padding-left: 30px;
                    padding-right: 30px;
                }
            `}</style>
        </>
    );
}

export default SplitBackgroundPage;
