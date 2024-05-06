import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { navigationItems } from '../lib/navbarData';

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const ref = useRef(null);

    // const toggleDropdown = (index) => {
    //     if (openDropdown === index) {
    //         setOpenDropdown(null);
    //     } else {
    //         setOpenDropdown(index);
    //     }
    // };

    const handleMouseEnter = (index) => {
        setOpenDropdown(index);
    };

    // const handleMouseLeave = () => {
    //     setOpenDropdown(null);
    // };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className="w-full flex flex-row justify-between items-center bg-white px-16">
                <div className="shrink-0">
                    <Link href='/'><Image src="/img/Logo_x.jpg" alt="Logo" width={190} height={100} /></Link>
                </div>
                <div className="flex flex-row justify-between items-center gap-x-24" ref={ref}>
                    {navigationItems.map((item, index) => (
                        <div key={index} className="inline-block relative">
                            <div className={`w-full flex items-center text-lg text-alpha-blue p-2 border-b-2 ${openDropdown === index ? "border-alpha-blue" : "border-transparent"}`}
                                // onClick={() => toggleDropdown(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                // onMouseLeave={handleMouseLeave}
                            >
                                {item.title}
                                {openDropdown === index ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up w-4 h-4" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M6 15l6 -6l6 6" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down w-4 h-4" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M6 9l6 6l6 -6" />
                                    </svg>
                                )}
                            </div>
                            {openDropdown === index && (
                                <div className="absolute w-auto min-w-[460px] left-0 bg-white text-black mt-6 p-1 z-50 rounded-lg border-[#b2ddee] border-2 shadow-inner">
                                    {item.links.map((link, linkIndex) => (
                                        <div className="grid grid-cols-5 items-center gap-x-4 px-8">
                                            <div className='w-16 h-16 rounded-full p-2 bg-[#b2ddee] text-alpha-blue'>
                                                {link.icon}
                                            </div>
                                            <Link key={linkIndex} href={link.url} className="p-1 col-span-4">
                                                <div className="flex flex-col px-6 py-8 rounded-lg hover:bg-[#b2ddee]">
                                                    <div className="item-title font-bold">{link.title}</div>
                                                    <div className="item-description text-sm">{link.description}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
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
                    border-radius: 10px;
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
