import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Link href='/'><Image src="/img/Logo_x.jpg" alt="Logo" width={190} height={100} /></Link>
                </div>
                <div className="navigation">
                    <div className="dropdown">
                        <Link href="/" className="nav-link">简历优化</Link>
                        <div className="dropdown-content">
                            <Link href="/resume-tips" className="dropdown-item">
                                <div className="item-text">
                                    <div className="item-title">简历教程</div>
                                    <div className="item-description">x个来自行业专家的专业简历书写模板及其相关知识点。</div>
                                </div>
                            </Link>
                            <Link href="/resume-templates" className="dropdown-item">
                                <div className="item-text">
                                    <div className="item-title">简历生成器</div>
                                    <div className="item-description">来自行业专家的专业简历书写模板及其相关知识点。</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <Link href="/" className="nav-link">模拟面试</Link>
                        <div className="dropdown-content">
                            <Link href="/resume-tips" className="dropdown-item">
                                <div className="item-text">
                                    <div className="item-title">模拟面试</div>
                                    <div className="item-description">人工智能模拟全真面试，覆盖各行业技术面，反馈全面，题库紧跟趋势，助您充分准备面试。</div>
                                </div>
                            </Link>
                            <Link href="/resume-templates" className="dropdown-item">
                                <div className="item-text">
                                    <div className="item-title">针对性面试训练</div>
                                    <div className="item-description">平台提供定制面试训练：行为、技术、HR、自我介绍，基于最新行业数据，助您自信应试。</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <Link href="/" className="nav-link">个人信息</Link>
                        <div className="dropdown-content">
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <Link href='/login'><button className="action-button">登陆</button></Link>
                    <button className="action-button">获取</button>
                </div>
            </nav>
            <style jsx>{`
                .navbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: white;
                    width: 100%;
                    font-size: 20px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
                .logo {
                    flex-shrink: 0;
                    margin-left: 70px;
                }
                .navigation {
                    display: flex;
                    justify-content: space-between;
                    gap: 100px;
                    color: #1D80A7;
                }
                .dropdown {
                    position: relative;
                    display: inline-block;
                }
                .dropdown-content {
                    display: none;
                    position: absolute;
                    background-color: white;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                    z-index: 1000;
                    min-width: 300px;
                    border-radius: 10px;
                }
                .dropdown:hover .dropdown-content {
                    display: block;
                }
                .dropdown-item {
                    display: flex;
                    align-items: center; /* 确保图片和文本在垂直方向上居中 */
                    gap: 10px;
                    padding: 12px;
                    border-bottom: 1px solid #f0f0f0;
                    text-decoration: none;
                    color: black;
                }
                .item-text {
                    display: flex;
                    flex-direction: column;
                    padding:30px 60px;
                }
                .item-text:hover{
                    background-color: #B2DDEE;
                }
                .item-title {
                    font-weight: bold;
                }
                .item-description {
                    font-size: 12px;
                    color: #888;
                }
                .nav-link {
                    color: #1D80A7;
                    text-decoration: none;
                    font-size: 16px;
                    cursor: pointer;
                    display: block;
                    padding: 12px 16px;
                }
                .nav-link:hover {
                    text-decoration: underline;
                }
                .actions {
                    display: flex;
                    gap: 10px;
                    margin-right: 70px;
                }
                .action-button {
                    padding: 8px 16px;
                    border: 1px solid #1D80A7;
                    background-color: white;
                    color: #1D80A7;
                    cursor: pointer;
                    border-radius: 5px;
                    padding-left: 30px;
                    padding-right: 30px;
                }
                .action-button:hover {
                    background-color: #1D80A7;
                    color: white;
                }
            `}</style>
        </>
    );
};

export default Navbar;
