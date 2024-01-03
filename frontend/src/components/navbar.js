import React from 'react'
import Link from 'next/link'

import PropTypes from 'prop-types'

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
                </div>
              </div>
              <nav
                data-thq="thq-mobile-menu-nav-links"
                data-role="Nav"
                className="navbar-nav2"
              >
                <span className="navbar-text">{props.text}</span>
                <span className="navbar-text1">{props.text1}</span>
                <span className="navbar-text2">{props.text2}</span>
                <span className="navbar-text3">{props.text3}</span>
                <span className="navbar-text4">{props.text4}</span>
              </nav>
              <div className="navbar-container2">
                <button className="navbar-login button">{props.Login}</button>
                <button className="button">{props.Register}</button>
              </div>
            </div>
            <div className="navbar-icon-group">
              <svg
                viewBox="0 0 950.8571428571428 1024"
                className="navbar-icon04"
              >
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="navbar-icon06"
              >
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg
                viewBox="0 0 602.2582857142856 1024"
                className="navbar-icon08"
              >
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div> */}
        </header>
      </div>
      {/* <style jsx>
        {`
          .navbar-burger-menu {
            display: none;
            align-items: center;
            justify-content: center;
          }
          .navbar-icon {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          .navbar-mobile-menu {
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100vh;
            display: none;
            padding: 32px;
            z-index: 100;
            position: fixed;
            flex-direction: column;
            justify-content: space-between;
            background-color: #fff;
          }
          .navbar-nav1 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .navbar-container1 {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: var(--dl-space-space-threeunits);
            justify-content: space-between;
          }
          .navbar-logo1 {
            color: rgb(255, 255, 255);
            font-size: 32px;
            font-style: normal;
            font-weight: 600;
          }
          .navbar-menu-close {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .navbar-icon02 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          .navbar-nav2 {
            flex: 0 0 auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .navbar-text {
            margin-bottom: var(--dl-space-space-unit);
          }
          .navbar-text1 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .navbar-text2 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .navbar-text3 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .navbar-text4 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .navbar-container2 {
            flex: 0 0 auto;
            width: auto;
            display: flex;
            margin-top: var(--dl-space-space-unit);
            align-items: center;
            flex-direction: row;
          }
          .navbar-login {
            margin-right: var(--dl-space-space-twounits);
          }
          .navbar-icon-group {
            display: flex;
          }
          .navbar-icon04 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
            margin-right: var(--dl-space-space-twounits);
          }
          .navbar-icon06 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
            margin-right: var(--dl-space-space-twounits);
          }
          .navbar-icon08 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }

          .navbar-root-class-name9 {
            background-color: #349bf7;
          }

          @media (max-width: 991px) {
            .navbar-desktop-menu {
              display: none;
            }
            .navbar-btn-group {
              display: none;
            }
            .navbar-burger-menu {
              display: flex;
            }
            .navbar-button3 {
              display: flex;
              padding: var(--dl-space-space-unit);
              flex-direction: row;
            }
            .navbar-logo1 {
              color: #000000;
            }
          }
          @media (max-width: 767px) {
            .navbar-navbar {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
          }
          @media (max-width: 479px) {
            .navbar-navbar {
              padding: var(--dl-space-space-unit);
            }
            .navbar-mobile-menu {
              padding: 16px;
            }
          }
        `}
      </style> */}
    </>
  )
}

Navbar.defaultProps = {
  button: '简历',
  text3: 'Team',
  text4: 'Blog',
  Register: 'Register',
  text2: 'Pricing',
  Logo: 'Character',
  text1: 'Features',
  View: '注册/登录',
  Login: 'Login',
  button2: '面试',
  rootClassName: '',
  button1: '求职信',
  text: 'About',
  Logo1: 'Character',
}

Navbar.propTypes = {
  button: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  Register: PropTypes.string,
  text2: PropTypes.string,
  Logo: PropTypes.string,
  text1: PropTypes.string,
  View: PropTypes.string,
  Login: PropTypes.string,
  button2: PropTypes.string,
  rootClassName: PropTypes.string,
  button1: PropTypes.string,
  text: PropTypes.string,
  Logo1: PropTypes.string,
}

export default Navbar
