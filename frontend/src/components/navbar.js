// components/Navbar.js

import Image from 'next/image';
import Link from 'next/link';

<<<<<<< Updated upstream
const Navbar = (props) => {
  return (
    <>
      <div className="relative flex bg-[#349bf7] w-full mx-auto overflow-hidden">
        <header data-thq="thq-navbar" className="w-full flex relative max-w-[1440px] self-center items-center justify-between p-10 mx-auto">
          <div className="w-52 flex justify-center items-center">
            <Link href="/">
              <span className="text-white text-4xl font-semibold">{props.Logo}</span>
            </Link>
          </div>
          <div
            data-thq="thq-navbar-nav"
            data-role="Nav"
            className="flex"
          >
            <nav
              data-thq="thq-navbar-nav-links"
              data-role="Nav"
              className="flex flex-1 text-white flex-row items-center gap-x-16"
            >
              <button className="text-white text-lg font-medium hover:opacity-50 transition-opacity duration-200">
                {props.button}
              </button>
              <button className="text-white text-lg font-medium hover:opacity-50 transition-opacity duration-200">
                {props.button1}
              </button>
              <button className="text-white text-lg font-medium hover:opacity-50 transition-opacity duration-200">
                {props.button2}
              </button>
            </nav>
          </div>
          <div data-thq="thq-navbar-btn-group" className="w-52 flex flex-row items-center justify-center">
            <div className=""></div>
            <button className="bg-[#f7f7f7] ext-black normal-case font-normal pr-6 pb-3 no-underline button">{props.View}</button>
          </div>
          {/* <div data-thq="thq-burger-menu" className="hidden items-center justify-center">
            <button className="button navbar-button3">
              <svg viewBox="0 0 1024 1024" className="navbar-icon">
                <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </button>
          </div>
          <div data-thq="thq-mobile-menu" className="navbar-mobile-menu">
            <div
              data-thq="thq-mobile-menu-nav"
              data-role="Nav"
              className="navbar-nav1"
            >
              <div className="navbar-container1">
                <span className="navbar-logo1">{props.Logo1}</span>
                <div data-thq="thq-close-menu" className="navbar-menu-close">
                  <svg viewBox="0 0 1024 1024" className="navbar-icon02">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
=======
const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Image src="/img/Logo-x.jpg" alt="Logo" width={190} height={100} />
>>>>>>> Stashed changes
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

