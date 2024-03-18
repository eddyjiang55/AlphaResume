mport Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Image src="/img/Logo-x.jpg" alt="Logo" width={190} height={100} />
                </div>
                <div className="navigation">
                    <Link href="/resume-optimization" className="nav-link">简历优化</Link>
                    <Link href="/mock-interview" className="nav-link">模拟面试</Link>
                    <Link href="/personal-info" className="nav-link">个人信息</Link>
                </div>
                <div className="actions">
                    <button className="action-button">登陆</button>
                    <button className="action-button">获取</button>
                </div>
            </nav>
            <style jsx>{`
                .navbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: white;
                    padding: 0 20px;
                    position: fixed;
                    width: 100%;
                    z-index: 10;
                    top: 0;
                    font-size: 20px;
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
                .nav-link {
                    color: #1D80A7;
                    text-decoration: none;
                    font-size: 16px;
                    cursor: pointer;
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

