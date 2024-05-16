import React, { useState,useEffect } from 'react';
import Navbar from '../components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import ResumeCard from '../components/resumeCard';
import { setUserDetail, setResumeCards } from '../store/features/resumeSlice';
 

const SplitBackgroundPage = () => {

    const dispatch = useDispatch();
    const resumeData = useSelector((state) => state.resume.cards);
    const userId = useSelector((state) => state.user.id); // 从 Redux 获取用户 ID

    useEffect(() => {
        if (userId) {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/improved-users/${userId}`)
            .then(response => response.json())
            .then(userData => {
              dispatch(setUserDetail(userData));
              dispatch(setResumeCards([userData])); 
            })
            .catch(error => {
              console.error('Error fetching user detail:', error);
            });
        }
    },[userId, dispatch])
    
    // const [resumeData, setResumeData] = useState( [{
    //     title: "字节后端开发岗简历0309", details: "创建时间:2024年3月1日"
    // },{
    //     title: "字节后端开发岗简历0309", details: "创建时间:2024年3月1日"
    // }]);


    const addResume = (newResume) => {
        setResumeData([...resumeData, newResume]);
    };
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
                <div className="resumeContainer">
          {resumeData.length > 0 && resumeData.map((data, index) => (
            <ResumeCard key={index} resumeData={data} />
          ))}
        </div>
            </div>


            <style jsx>{`
                .split-background {
                    display: grid;
                    grid-template-rows: auto auto 1fr;
                    gap:20px;
                    align-items: start; /* 对齐到容器的顶部 */
                    justify-content: center; /* 水平居中 */
                    min-height: 100vh;
                    width: 100%;
                    position: relative;
                }
                .top-half, .bottom-half {
                    position: absolute;
                    width: 100%;
                    height: 50%; /* 设置为视窗高度的一半 */
                    z-index: 0; /* 确保它们位于背景层 */
                 
                }
                .top-half {
                    background-color: #1D80A7;
                    top: 0; /* 顶部对齐 */
                }
                
                .bottom-half {
                    background-color: #EDF8FD;
                    bottom: 0; /* 底部对齐 */
                }
                
                .content-container {
                    z-index: 1;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .text-container {
                    font-size: 32px;
                    color: #EDF8FD;
                    z-index: 2;
                }
                .text-container-lower {
                    font-size: 24px;
                    color: #1D80A7;
                    text-align: center;
                    z-index: 2;
                }
                .rectangle-container {
                    grid-row: 2; 
                    display: grid;
                    grid-template-columns: repeat(2, 1fr); /* 两列布局 */
                    gap: 100px; /* 列之间的间隔 */
                    justify-content: center; /* 水平居中 */
                    align-items: start; /* 对齐到顶部 */
                    padding: 20px;
                    box-sizing: border-box;
                    width: 100%; /* 使用 100% 宽度 */
                    z-index: 1;
                    margin-bottom: 50px; 
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
                .resumeContainer{
                    display: grid;
                    grid-row: 3;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 动态数量的列 */
                    gap: 40px;
                    align-items: start;
                    justify-content: center;
                    padding: 20px;
                    box-sizing: border-box;
                    width: 100%; /* 使用 100% 宽度 */
                    z-index: 1;
                    position: relative; /* 确保它相对于分割背景定位 */
                }

               
            `}</style>
        </>
    );
}

export default SplitBackgroundPage;
